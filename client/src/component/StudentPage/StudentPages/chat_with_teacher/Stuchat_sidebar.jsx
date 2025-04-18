import React, { useEffect, useState } from 'react'
import "./Stuchat_sidebar.css"
import axios from 'axios';
const Stuchat_sidebar = () => {

  const [teachers,setTeachers]=useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/online-exam/get-teachers')
    .then((res)=>{
        setTeachers(res.data.teachers)
    })
    .then((err)=>{
        console.log("Error while fetching teachers list",err)
    })
  },[teachers])
  
  return (
    <>
     <div className="stuchat-sidebar-container">
        <h3 className='stuchat-heading'>Chats</h3>
        <div className="available-teacher-chats">

        </div>
     </div>
    </>
  )
}

export default Stuchat_sidebar
