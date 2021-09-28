import React, {useRef} from 'react'

 const Canvas = (props) => {
    const canvas = useRef()
    let MouseDown = false 
    if (canvas.current) {
        canvas.current.addEventListener("mousedown", () => MouseDown = true)
        canvas.current.addEventListener("mouseup", () => MouseDown = false)

        canvas.current.addEventListener("mousemove", e => {
            if (MouseDown) console.log(e.layerX, e.layerY)
        })

    }

    return <canvas ref = {canvas} width = {props.width} height = {props.height} />
}

export default Canvas