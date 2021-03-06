import react from 'react'
import React, {useRef,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'
import CanvasControls from './CanvasControls'

 const Canvas = (props) => {
    const {Socket, room, isAdmin} = useContext(socketContext);
    
    // Reference to MouseDown and canvas 
    const canvas = useRef()
    let MouseDown = useRef(false)


    // reference to pen color and size 
    let color = useRef("#000000")
    let penSize = useRef(10)

    //canvas clearing function 
    const clear = () => {
        Socket.emit("canvas-cleared", room)
        const context = canvas.current.getContext('2d');
        context.clearRect(0, 0, canvas.current.width, canvas.current.height)
    }

    // canvas drawing function 
    const draw = (x, y, x2, y2) => {
        const ctx = canvas.current.getContext("2d")
        ctx.beginPath();
        ctx.strokeStyle = color.current;
        ctx.lineWidth = penSize.current;
        ctx.lineCap = "round";
        ctx.moveTo(x,y);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }

    // clearing canvas 
    useEffect(() => {
        if (!isAdmin && Socket) {
            Socket.on("canvas-cleared", () => clear())
        }
    })
    
    // Admin canvas editing controls 
    useEffect(() => {
        if (canvas.current && isAdmin) {
            let x = 0
            let y = 0
            canvas.current.addEventListener("mousedown", (e) => {
                x = e.offsetX 
                y = e.offsetY 
                MouseDown.current = true}
            )

            canvas.current.addEventListener("mouseup", (e) => {
                x = e.offsetX 
                y = e.offsetY 
                MouseDown.current = false
            })
            canvas.current.addEventListener("mousemove", e => {
                if (MouseDown.current) {
                    draw(x,y,e.offsetX, e.offsetY)
                    Socket.emit("canvas-edited", x, y, e.offsetX, e.offsetY, room)
                    x = e.offsetX 
                    y = e.offsetY 
                    Socket.emit("canvas-image-edited", canvas.current.toDataURL("image/png"), room)
                }
            })

            canvas.current.addEventListener("touchstart", (e) => {
                e.preventDefault()

                let bcr = e.target.getBoundingClientRect();
                x = e.targetTouches[0].clientX - bcr.x;
                y = e.targetTouches[0].clientY - bcr.y;
                MouseDown.current = true}
            )

            canvas.current.addEventListener("touchend", (e) => {
                e.preventDefault()
                MouseDown.current = false
            })
            canvas.current.addEventListener("touchmove", e => {
                e.preventDefault()

                if (MouseDown.current) {
                    let bcr = e.target.getBoundingClientRect();
                    let x2 = e.targetTouches[0].clientX - bcr.x;
                    let y2 = e.targetTouches[0].clientY - bcr.y;    

                    draw(x,y,x2,y2)
                    Socket.emit("canvas-edited", x, y, e.offsetX, e.offsetY, room)
                    x = x2 
                    y = y2 
                    Socket.emit("canvas-image-edited", canvas.current.toDataURL("image/png"), room)
                }
            })
    
        }
    })


    // Drawing image on update 
    useEffect(() => {
        const drawIMG = (data) => {
            const ctx = canvas.current.getContext("2d")
            var img = new Image();
            img.src = data;
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    
        if (!Socket) return // returning if Socket has not yet connected 
        const handler = (data) => {
            drawIMG(data)
        }
        Socket.on("canvas-image-update", handler)
        return () => Socket.off("canvas-image-update", handler)

    }, [Socket, props])


    return (
        <react.Fragment>
            <canvas ref = {canvas} width = {props.width} height = {props.width * 9/16} />
            {isAdmin && <CanvasControls onClear = {clear} onPenChange = {(value) => penSize.current = value} onColorChange = {value => color.current = value}  />}
        </react.Fragment>)
}

export default Canvas