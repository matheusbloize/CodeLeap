// CSS and Images
import "./Home.css"
import logo from "/images/logo.png"

// Hooks
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/signup")
    }, 3000)
  }, [])

  return (
    <div className='home'>
      <div className="logo">
        <img src={logo} alt="CodeLeap Logo" />
      </div>
    </div>
  )
}

export default Home