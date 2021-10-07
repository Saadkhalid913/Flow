import {useEffect, useState} from "react"
import {io} from "socket.io-client"
import socketContext from "./contexts/socketContext"
import {Switch, BrowserRouter, Route} from "react-router-dom"
import RoomScreen from "./components/RoomScreen"
import Room from "./components/Room"
function App() {
  const [socket, setSocket] = useState()
  const [room, setRoom] = useState()
  const [isAdmin, setIsAdmin] = useState()
  const [name, setName] = useState()

  useEffect(() => {
    const s = io("/")
    setSocket(s)
    return () => s.disconnect()
  }, [setSocket])

  return (
    <socketContext.Provider value = {{Socket: socket, room, setRoom, name, setName, isAdmin, setIsAdmin}}>
      <BrowserRouter>
        <Switch>
          <Route path = "/room/admin/:id" render = {(props) => <Room {...props} admin={true} />}/>
          <Route path = "/room/:id" render = {(props) => <Room {...props} />}/>
          <Route path = "/" render = {(props) => <RoomScreen {...props} />} />
        </Switch>
      </BrowserRouter>
    </socketContext.Provider>
  );
}

export default App;
