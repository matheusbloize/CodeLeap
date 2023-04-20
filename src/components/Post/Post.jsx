// CSS and Images
import "./Post.css"
import deleteIcon from "/images/delete.png"
import editBase from "/images/edit_base.png"
import editPen from "/images/edit_pen.png"

// Hooks
import { useState, useEffect } from "react"

// Moment
import moment from "moment/moment"

const Post = ({ posts, loading, deleteCall, editCall }) => {

  const handleDelete = (id) => {
    deleteCall(id)
  }

  const handleEdit = (id) => {
    editCall(id)
  }

  const checkTheTime = (data) => {
    const date = data.split("T")[0]
    const time = data.split("T")[1].split(".")[0]
    return moment.utc(`${date} ${time}`).local().startOf('seconds').fromNow()
  }

  return (
    <div>
      {posts && posts.length > 0 && posts.map((data, index) => (
        <div className="post" key={index}>
          <div className="postTop">
            <h2>{data.title}</h2>
            {data.username === localStorage.getItem("username") && (
              <>
                <img onClick={() => handleDelete(data.id)} src={deleteIcon} alt="Delete Icon" />
                <div onClick={() => handleEdit(data.id)} className="editIcon">
                  <img src={editBase} alt="Edit Base" />
                  <img src={editPen} alt="Edit Pen" />
                </div>
              </>
            )}
          </div>
          <div className="postMain">
            <div className="postMain-userInfo">
              <h3>@{data.username}</h3>
              <p>{checkTheTime(data.created_datetime)}</p>
            </div>
            <p>{data.content}</p>
          </div>
        </div>
      ))}
      {loading && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="loading"></div>
        </div>
      )}
    </div>
  )
}

export default Post