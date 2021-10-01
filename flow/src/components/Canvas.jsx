import React, {useRef,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = useRef(false)
    let total = useRef(0)
    const {Socket, room} = useContext(socketContext);

    const draw = (x, y, x2, y2) => {
        const ctx = canvas.current.getContext("2d")
        ctx.beginPath();
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.moveTo(x,y);
        ctx.lineTo(x2,y2);
        ctx.stroke();
        ctx.closePath();
    }

   
    useEffect(() => {
        if (canvas.current) {
            const { width, height} = canvas.current
            let x = 0
            let y = 0
            canvas.current.addEventListener("mousedown", (e) => {
                x = e.offsetX 
                y = e.offsetY 
                console.log(e)
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
                    // Socket.emit("canvas-edited", x, y, e.offsetX, e.offsetY, room)
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
            total.current += data.length
            console.log(total.current)
            drawIMG(data)
        }
        Socket.on("canvas-image-update", handler)

        return () => Socket.off("canvas-image-update", handler)

    }, [Socket, props])

    // useEffect(() => {
    //     if (!Socket) return
    //     const handler = (x, y, offsetX, offsetY) => draw(x, y, offsetX, offsetY)
    //     Socket.on("canvas-update", handler)

    //     return () => Socket.off("canvas-update", handler)

    // }, [Socket])

    return <canvas ref = {canvas} width = {props.width} height = {props.height} />
}

export default Canvas