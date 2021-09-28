import React, {useRef, useEffect} from 'react'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = useRef(false)
    
    useEffect(() => {

        
        if (canvas.current) {
            const ctx = canvas.current.getContext("2d")
            const draw = (x, y) => {
                ctx.lineWidth = 10;
                ctx.lineCap = "round";

                ctx.lineTo(x,y);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x,y);
            }

            canvas.current.addEventListener("mousedown", () => MouseDown.current = true)
            canvas.current.addEventListener("mouseup", () => MouseDown.current = false)
            canvas.current.addEventListener("mousemove", e => {
                if (MouseDown.current) {
                    console.log(e.layerX, e.layerY)
                    draw(e.layerX, e.layerY)
                }
            })
    
        }
    })

    return <canvas ref = {canvas} width = {props.width} height = {props.height} />
}

export default Canvas