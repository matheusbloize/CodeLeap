// CSS and Images
import "./Post.css"
import deleteIcon from "/images/delete.png"
import editBase from "/images/edit_base.png"
import editPen from "/images/edit_pen.png"

// Hooks
import { useState, useEffect } from "react"

const URL = "https://dev.codeleap.co.uk/careers/"

const Post = () => {
  const [postData, setPostData] = useState()

  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        console.log(data.next)
        setPostData(data.results)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {postData && postData.length > 0 && postData.map((data, index) => (
        <div className="post" key={index}>
          <div className="postTop">
            <h2>{data.title}</h2>
            {/* <img src={deleteIcon} alt="Delete Icon" />
            <div className="editIcon">
              <img src={editBase} alt="Edit Base" />
              <img src={editPen} alt="Edit Pen" />
            </div> */}
          </div>
          <div className="postMain">
            <div className="postMain-userInfo">
              <h3>@{data.username}</h3>
              <p>25 minutes ago</p>
            </div>
            <p>{data.content}</p>
          </div>
        </div>
      ))}
      {postData == undefined && (
        <div style={{display: "flex", justifyContent: "center"}}>
          <div className="loading"></div>
        </div>
      )}
    </div>
  )
}

export default Post