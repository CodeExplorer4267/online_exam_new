import React from 'react'
import Stuchat_sidebar from './Stuchat_sidebar'
import Stuchat from './Stuchat'

const Stuchat_container = () => {
  return (
    <>
     <Stuchat_sidebar/>
     <div style={{
        width:"61%",
     }}>
        <Routes>
            <Route path="/:studentId/:teacherId" element={<Stuchat/>}/>
        </Routes>
     </div>
    </>
  )
}

export default Stuchat_container
