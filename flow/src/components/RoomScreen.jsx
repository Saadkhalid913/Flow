import React, {useState, useContext} from 'react'
import socketContext from '../contexts/socketContext'

const RoomScreen = (props) => {
    const [code, setCode] = useState("")

    const Socket = useContext(socketContext)

    useEffect(() => {
        if (!Socket) return
        Socket.on("room-joined", code => console.log(code))
    })


    return (
        <div>
            <input onChange = {(e) => {setCode(e.target.value)}} />
        </div>
    )

}
