import React, {useRef,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = useRef(false)

    const {Socket, room} = useContext(socketContext);
    console.log(room)
    

    const draw = (x, y) => {
        const ctx = canvas.current.getContext("2d")
        ctx.lineWidth = 10;
        ctx.lineCap = "round";
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x,y);
    }

    useEffect(() => {
        if (canvas.current) {
            canvas.current.addEventListener("mousedown", () => MouseDown.current = true)
            canvas.current.addEventListener("mouseup", () => MouseDown.current = false)
            canvas.current.addEventListener("mousemove", e => {
                if (MouseDown.current) {
                    console.log(e.layerX, e.layerY)
                    draw(e.layerX, e.layerY)
                    Socket.emit("canvas-edited", e.layerX, e.layerY, room)
                }
            })
    
        }
    })

    useEffect(() => {
        if (!Socket) return
        const handler = (x,y) => console.log(x,y)
        Socket.on("canvas-update", handler)

        return () => Socket.off("canvas-update", handler)

    }, [Socket])

    return <canvas ref = {canvas} width = {props.width} height = {props.height} />
}

export default Canvas