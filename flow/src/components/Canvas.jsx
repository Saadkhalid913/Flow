import React, {useRef,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = useRef(false)

    const {Socket, room} = useContext(socketContext);
    console.log(room)
    

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
                    draw(x, y, e.offsetX, e.offsetY)
                    Socket.emit("canvas-edited", x, y, e.offsetX, e.offsetY, room)
                    x = e.offsetX
                    y = e.offsetY
                }
            })
    
        }
    })

    useEffect(() => {
        if (!Socket) return
        const handler = (x, y, offsetX, offsetY) => draw(x, y, offsetX, offsetY)
        Socket.on("canvas-update", handler)

        return () => Socket.off("canvas-update", handler)

    }, [Socket])

    return <canvas ref = {canvas} width = {props.width} height = {props.height} />
}

export default Canvas