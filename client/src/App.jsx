import React, { useState } from 'react'
import './App.css'
import axios from "axios"

function App() {
  const [count, setCount] = useState(0)
  const [file,setFile] = React.useState({})

  const handleFormSubmit = (e)=>{
    e.preventDefault()
    if(file){
      console.log(file)
      const formData = new FormData()
      formData.append("file",file)
      formData.append("name","sur")
      axios.post("http://localhost:3450/api/user",formData)
        .then((response)=>{
          console.log(response)
        })
        .catch((err)=>{
          console.log(err)
        })
    }
  }

  return (
    <>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input type='file' onChange={(e)=>{
            setFile(e.target.files[0])
          }} />
          <input type='submit'/>
        </form>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
