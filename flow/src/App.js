import {useEffect, useState} from "react"
import {io} from "socket.io-client"
import socketContext from "./contexts/socketContext"
import {Switch, BrowserRouter, Route} from "react-router-dom"
import Homepage from "./components/homepage"

function App() {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const s = io("http://localhost:4000")
    setSocket(s)
    return () => s.disconnect()
  }, [setSocket])

  return (
    <socketContext.Provider value = {socket}>
      <BrowserRouter>
        <Switch>
          <Route to = "/" render = {(props) => <Homepage {...props} />} />
        </Switch>
      </BrowserRouter>
    </socketContext.Provider>
  );
}

export default App;
