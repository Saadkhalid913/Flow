import React from 'react'

const CanvasControls = (props) => {
    const {onPenChange, onColorChange} = props

    return (
        <div className = "canvas-control">
            
            <div>
                <label htmlFor = "pen-size">Pen Size</label>
                <input name = "pen-size" onChange = {e => onPenChange(e.target.value)} defaultValue = "10" type = "range" min = "1" max = "100" />
            </div>
            <div>
                <label htmlFor = "pen-color">Pen Color</label>
                <input name = "pen-color" onChange = {e => onColorChange(e.target.value)} type = "color" />
            </div>

            <button onClick = {() => props.onClear()}>Clear</button>
        
        </div>
    )
}

export default CanvasControls