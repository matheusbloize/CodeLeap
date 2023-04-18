// CSS
import "./SignUp.css"

// Hooks
import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const [user, setUser] = useState("")
  const modalRef = useRef()
  const inputRef = useRef()
  const buttonRef = useRef()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (user == "") return

    console.log(user) // Context no user
    modalRef.current.style.display = "block"
    inputRef.current.disabled = true
    buttonRef.current.children[0].disabled = true
    buttonRef.current.children[0].style.cursor = "not-allowed"
    buttonRef.current.children[0].style.backgroundColor = "#ccc"

    setTimeout(() => {
      navigate("/main")
    }, 3000)
  }

  return (
    <div className='signup'>
      <div className="login">
        <h1>Welcome to CodeLeap network!</h1>
        <label>Please enter your username</label>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            placeholder="John doe"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <div ref={buttonRef} className="login-button">
            {user == "" ? (
              <input
                type="submit"
                value="ENTER"
                style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
                disabled
              />
            ) : (
              <input
                type="submit"
                value="ENTER"
                style={{ backgroundColor: "#7695EC", cursor: "pointer" }}
              />
            )}
          </div>
        </form>
      </div>
      {user && (
        <div ref={modalRef} className="welcome">
          <p>Welcome, {user} 😀</p>
        </div>
      )}
    </div>
  )
}

export default SignUp