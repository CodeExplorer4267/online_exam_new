import React, { useEffect, useState } from 'react'
import "./StudentMaterial.css"
import axios from 'axios'
const StudentMaterial = () => {
    const [files,setfiles]=useState([])
    useEffect(()=>{
      axios.get("http://localhost:5000/online-exam/get-all-materials")
      .then((res)=>{
        console.log(files)
        setfiles(res.data.files)
      })
      .catch((err)=>{
        console.log(err)
      })
    },[])


  return (
    <div className='student-material-container'>
       <div className="material-heading">
         <h1>All Materials</h1>
       </div>
       <div className="material-list">
           <table className='material-table'>
            <thead>
                <tr>
                    <th>File Name</th>
                    <th>Uploaded By</th>
                    <th>Uploaded At</th>
                    <th>Download</th>
                </tr>
            </thead>
            <tbody>
                {
                    files.map((file,index)=>(
                        <tr key={index}>
                            <td>{file.title}</td>
                            <td>{file.teacher_name}</td>
                            <td>{new Date(file.created_at).toLocaleDateString()}</td>
                            <td><a href={`http://localhost:5000/online-exam/download/${file.file_name}`} download>Download</a></td>
                        </tr>
                    ))
                }
            </tbody>
           </table>
       </div>
    </div>
  )
}

export default StudentMaterial
