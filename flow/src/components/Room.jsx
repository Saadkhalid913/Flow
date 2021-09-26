import React from 'react'

const Room = (props) => {
    return (
    <div>
        <h2>Code {props.match.params.id}</h2>
    </div>
    )
}

export default Room