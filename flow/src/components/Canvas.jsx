import react from 'react'
import React, {useRef,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'
import CanvasControls from './CanvasControls'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = useRef(false)
    let color = useRef(10)
    let penSize = useRef("#000000")
    const {Socket, room, isAdmin} = useContext(socketContext);

    
    const clear = () => {
        Socket.emit("canvas-cleared", room)
        const context = canvas.current.getContext('2d');
        context.clearRect(0, 0, canvas.current.width, canvas.current.height)
    }

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

    useEffect(() => {
        if (!isAdmin && Socket) {
            Socket.on("canvas-cleared", () => clear())
        }
    })
   
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
    
        }
    })

    useEffect(() => {
        const drawIMG = (data) => {
            const ctx = canvas.current.getContext("2d")
            var img = new Image();
            img.src = data;
            img.onload = function() {
                ctx.drawImage(img, 0, 0, canvas.current.width, canvas.current.height);
            }
        }
    
        if (!Socket) return
        const handler = (data) => {
            drawIMG(data)
        }
        Socket.on("canvas-image-update", handler)

        return () => Socket.off("canvas-image-update", handler)

    }, [Socket, props])


    return (
        <react.Fragment>
            <canvas ref = {canvas} width = {props.width} height = {props.width * 9/16} />
            <CanvasControls onClear = {clear} onPenChange = {(value) => penSize.current = value} onColorChange = {value => color.current = value}  />
        </react.Fragment>)
}

export default Canvas