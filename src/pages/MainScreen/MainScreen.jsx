// CSS and Images
import "./MainScreen.css"
import logoutIcon from "/images/logout.png"
import informationIcon from "/images/information.png"

// Components
import Post from "../../components/Post/Post"
import Pagination from "../../components/Pagination/Pagination"

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
  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState(URL)
  const [loading, setLoading] = useState(false)
  const [currentPostId, setCurrentPostId] = useState()
  const [editedTitle, setEditedTitle] = useState("")
  const [editedContent, setEditedContent] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [countTotalPages, setCountTotalPages] = useState()
  const [render, setRender] = useState(0)
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
      navigate("/")
    }

    setLoading(true)
  }, [])

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.results)
        setTotalPages(data.count)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [url])

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

          setRender((prev) => prev + 1)
          setUrl(URL)
          setCurrentPage(1)
        })
        .catch(err => console.log(err))

      congratsPostRef.current.style.display = "flex"
      setTitle("")
      setContent("")
      document.querySelectorAll(".mainCreatePost form input[type='text']")[0].disabled = true
      document.querySelectorAll(".mainCreatePost form input[type='text']")[1].disabled = true
      setTimeout(() => {
        congratsPostRef.current.style.display = "none"
        document.querySelectorAll(".mainCreatePost form input[type='text']")[0].disabled = false
        document.querySelectorAll(".mainCreatePost form input[type='text']")[1].disabled = false
      }, 2400)
    }
  }

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.results)
        setTotalPages(data.count)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [render])

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
    window.scrollTo(0, 0)
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
      setRender((prev) => prev + 1)
      setUrl(URL)
      setCurrentPage(1)
    }, 500)
    setTimeout(() => {
      congratsDeleteRef.current.style.display = "none"
    }, 2400)
  }

  const editCall = (id) => {
    baseModalRef.current.style.display = "block"
    window.scrollTo(0, 0)
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
      setRender((prev) => prev + 1)
      setUrl(URL)
      setCurrentPage(1)
    }, 500)
    setTimeout(() => {
      congratsEditRef.current.style.display = "none"
    }, 2400)
  }

  const handleEditedSubmit = (e) => {
    e.preventDefault()
    if (editedTitle == "" || editedContent == "") {
      return
    } else {
      editPost()
    }
  }

  const previousPage = () => {
    if (url === URL) return
    if (currentPage == 1) return
    setCurrentPage((prev) => prev - 1)
    let urlBase = url.split("offset=")[0]
    let urlFinal = parseInt(url.split("offset=")[1]) - 10
    setUrl(`${urlBase}offset=${urlFinal}`)
  }

  const nextPage = () => {
    if (url === URL) {
      setUrl("https://dev.codeleap.co.uk/careers/?limit=10&offset=10")
      setCurrentPage((prev) => prev + 1)
      setCountTotalPages(10)
    } else {
      if (totalPages.toString()[totalPages.toString().length - 1] != 0) {
        setCountTotalPages(`${totalPages.toString()[0]}${parseInt(totalPages.toString()[1]) + 1}`)
      }
      else {
        setCountTotalPages(`${totalPages.toString()[0]}${parseInt(totalPages.toString()[1])}`)
      }
      if (currentPage >= countTotalPages) return
      setCurrentPage((prev) => prev + 1)
      let urlBase = url.split("offset=")[0]
      let urlFinal = parseInt(url.split("offset=")[1]) + 10
      setUrl(`${urlBase}offset=${urlFinal}`)
    }
  }

  const returnHome = () => {
    setRender((prev) => prev + 1)
    setUrl(URL)
    setCurrentPage(1)
  }

  return (
    <div className='mainScreen'>
      <div ref={baseModalRef} onClick={removeModal} className="grayModal"></div>
      <div className="mainHeader" >
        <h1 onClick={returnHome}>CodeLeap Network</h1>
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
        <Post
          posts={posts}
          loading={loading}
          deleteCall={deleteCall}
          editCall={editCall}
        />
      </div>
      <Pagination
        currentPage={currentPage}
        previousPage={previousPage}
        nextPage={nextPage}
        totalPages={countTotalPages}
      />
      <div className="border" style={{ display: "block", height: "1em" }}></div>
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