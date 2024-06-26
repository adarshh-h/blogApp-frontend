import { useState } from "react";
// import ReactQuill from "react-quill";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";
import "react-quill/dist/quill.snow.css";
import toast from 'react-hot-toast';

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);
  

  async function createNewPost(ev) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    ev.preventDefault();
    const response = await fetch("https://blogapp-1-3glq.onrender.com/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });
  
    if (response.status===200) {
    setRedirect(true);
    toast.success(("Created Succesfully!"));
     }
  }

  if (redirect) {
  
    return <Navigate to={'/'} />
  }
  
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor value={content} onChange={setContent}/>
     
      <button style={{ marginTop: "5px" }}  >Create Post</button>
     
    </form>
  );
}
