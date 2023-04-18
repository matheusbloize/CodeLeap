// CSS
import "./MainScreen.css"

// Components
import Post from "../../components/Post/Post"

// Hooks
import { useState } from "react"

const URL = "https://dev.codeleap.co.uk/careers/"

const MainScreen = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  // const user, pegar do redux/context
  const postData = {
    "username": "testeOpa",
    "title": title,
    "content": content
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title == "" || content == "") {
      return
    } else {
      console.log(title, content)
  
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

      // Modal congratulations, you've posted
      // SetTimeout
      // location.reload()
    }

  }

  return (
    <div className='mainScreen'>
      <div className="mainHeader">
        <h1>CodeLeap Network</h1>
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
      <div className="posts">
        <Post />
      </div>
    </div>
  )
}

export default MainScreen