import { Route, Routes, BrowserRouter } from "react-router-dom"
import Homepage from "./pages/Homepage"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
