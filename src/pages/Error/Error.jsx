// CSS and Images
import "./Error.css"
import astronaut from "/images/nasa.webp"

// hooks
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Error = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 3000);
  }, [])

  return (
    <div className='error'>
      <span>Not found</span>
      <p>Oops! The page you're trying to access cannot be found.</p>
      <img src={astronaut} alt="Nasa Astronaut" />
    </div>
  )
}

export default Error