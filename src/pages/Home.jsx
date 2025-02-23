import { useEffect, useState } from "react"
import NotLogin from "./NotLogin.jsx"
import Dash from "@components/Dash.jsx"
function Home() {
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    if (window.localStorage.getItem("sb-lysuqcspfpugxozttfek-auth-token") == null) {
      setIsLogin(false)
    } else {
      setIsLogin(true)
    }
  },[])

  return (
    <>
      {isLogin ? <Dash /> : <NotLogin />}
    </>
  )
}

export default Home
