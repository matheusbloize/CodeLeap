// CSS and Images
import "./MainScreen.css"
import logoutIcon from "/images/logout.png"
import informationIcon from "/images/information.png"

// Components
import Post from "../../components/Post/Post"

// Hooks
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// Redux
import { useDispatch } from "react-redux"
import { changeUser } from "../../actions/userSlice"
import { logout } from "../../actions/userSlice"

const URL = "https://dev.codeleap.co.uk/careers/"

const MainScreen = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentPostId, setCurrentPostId] = useState()
  const [editedTitle, setEditedTitle] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const congratsPostRef = useRef()
  const congratsDeleteRef = useRef()
  const congratsEditRef = useRef()
  const welcomeRef = useRef()
  const baseModalRef = useRef()
  const deleteModalRef = useRef()
  const editModalRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const name = localStorage.getItem("username")

  useEffect(() => {
    dispatch(changeUser(name))

    if (name == "" || name == null) {
      navigate("/signup")
    }
  }, [])

  const postData = {
    "username": name,
    "title": title,
    "content": content
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title == "" || content == "") {
      return
    } else {
      fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
        .catch(err => console.log(err))

      congratsPostRef.current.style.display = "flex"
      setTitle("")
      setContent("")
      setTimeout(() => {
        congratsPostRef.current.style.display = "none"
      }, 2400)
    }
  }

  const showWelcomeModal = () => {
    welcomeRef.current.style.display = "flex"
    setTimeout(() => {
      welcomeRef.current.style.display = "none"
    }, 5000)
  }

  const logoutUser = () => {
    localStorage.removeItem("username")
    dispatch(logout())
    location.reload()
  }

  const removeModal = () => {
    setEditedTitle("")
    setEditedContent("")
    baseModalRef.current.style.display = "none"
    deleteModalRef.current.style.display = "none"
    editModalRef.current.style.display = "none"
  }

  const deleteCall = (id) => {
    baseModalRef.current.style.display = "block"
    deleteModalRef.current.style.display = "flex"
    setCurrentPostId(id)
  }

  const deletePost = () => {
    fetch(`${URL}${currentPostId}/`, {
      method: "DELETE",
    })
    removeModal()
    congratsDeleteRef.current.style.display = "flex"
      setTimeout(() => {
        congratsDeleteRef.current.style.display = "none"
      }, 2400)
    // atualizar pág ou rerenderizar posts
  }

  const editCall = (id) => {
    baseModalRef.current.style.display = "block"
    editModalRef.current.style.display = "flex"
    setCurrentPostId(id)
  }

  const editPost = () => {
    fetch(`${URL}${currentPostId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": editedTitle,
        "content": editedContent
      })
    })
    removeModal()
    congratsEditRef.current.style.display = "flex"
      setTimeout(() => {
        congratsEditRef.current.style.display = "none"
      }, 2400)
    // atualizar pág ou rerenderizar posts
  }

  const handleEditedSubmit = (e) => {
    e.preventDefault()
    if (editedTitle == "" || editedContent == "") {
      return
    } else {
      editPost()
    }
  }

  return (
    <div className='mainScreen'>
      <div ref={baseModalRef} onClick={removeModal} className="grayModal"></div>
      <div className="mainHeader" >
        <h1>CodeLeap Network</h1>
        <img src={informationIcon} alt="Information Icon" onClick={showWelcomeModal} />
      </div>
      <div className="mainCreatePost">
        <span>What's on your mind?</span>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Hello world"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Content</label>
          <input
            type="text"
            placeholder="Content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mainCreatePost-button">
            {title == "" || content == "" ? (
              <input
                type="submit"
                value="Create"
                style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
                disabled
              />
            ) : (
              <input
                type="submit"
                value="Create"
                style={{ backgroundColor: "#7695EC", cursor: "pointer" }}
              />
            )}
          </div>
        </form>
      </div>
      <div ref={deleteModalRef} className="modalDelete">
        <span>Are you sure you want to delete this item?</span>
        <div className="modalDelete-buttons">
          <button onClick={removeModal}>Cancel</button>
          <button onClick={deletePost}>Delete</button>
        </div>
      </div>
      <div ref={editModalRef} className="modalEdit">
        <span>Edit item</span>
        <form onSubmit={handleEditedSubmit}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Hello world"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <label>Content</label>
          <input
            type="text"
            placeholder="Content here"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
          <div className="modalEdit-buttons">
          <button onClick={removeModal}>Cancel</button>
          {editedTitle == "" || editedContent == "" ? (
              <input
                type="submit"
                value="Save"
                style={{ backgroundColor: "#ccc", cursor: "not-allowed" }}
                disabled
              />
            ) : (
              <input
                onClick={editPost}
                type="submit"
                value="Save"
                style={{ backgroundColor: "", cursor: "pointer" }}
              />
            )}
          </div>
        </form>
      </div>
      <div className="posts">
        <Post deleteCall={deleteCall} editCall={editCall} />
      </div>
      <div ref={congratsPostRef} className="modalCongrats">
        <p>Congratulations, you've posted 😄</p>
      </div>
      <div ref={congratsDeleteRef} className="modalCongrats">
        <p>Congratulations, you've deleted your post 😀</p>
      </div>
      <div ref={congratsEditRef} className="modalCongrats">
        <p>Congratulations, you've edited your post 😉</p>
      </div>
      <div ref={welcomeRef} className="modalWelcome">
        <p>Hello {name}, if you want to logout, click on that button below</p>
        <img onClick={logoutUser} src={logoutIcon} alt="Logout Icon" />
      </div>
    </div>
  )
}

export default MainScreen