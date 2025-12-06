import React, { useState } from 'react';
import "./SidebarTeacher.css";
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaPlusCircle, 
  FaChartBar, 
  FaRobot, 
  FaComments, 
  FaBook,
  FaBars,
  FaTimes
} from "react-icons/fa";

const SidebarTeacher = () => {
  const navigate = useNavigate();
  const [activeOption, setActiveOption] = useState('student-list');
  const [collapsed, setCollapsed] = useState(false);

  const handleNavigation = (option) => {
    setActiveOption(option);
    navigate(`/teacher/${option}`);
  };

  return (
    <div className={`sidebar-teacher ${collapsed ? "collapsed" : ""}`}>
      
      {/* Toggle Button */}
      <div className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? <FaBars /> : <FaTimes />}
      </div>

      <div className="options">
        
        <div 
          className={`option ${activeOption==='student-list' ? 'active' : ''}`} 
          onClick={() => handleNavigation('student-list')}
        >
          <FaUsers className="icon" />
          {!collapsed && <span>Student List</span>}
        </div>

        <div 
          className={`option ${activeOption==='create-exam' ? 'active' : ''}`} 
          onClick={() => handleNavigation('create-exam')}
        >
          <FaPlusCircle className="icon" />
          {!collapsed && <span>Create Exam</span>}
        </div>

        <div 
          className={`option ${activeOption==='result' ? 'active' : ''}`} 
          onClick={() => handleNavigation('result')}
        >
          <FaChartBar className="icon" />
          {!collapsed && <span>Result</span>}
        </div>

        <div 
          className={`option ${activeOption==='question-generator' ? 'active' : ''}`} 
          onClick={() => handleNavigation('question-generator')}
        >
          <FaRobot className="icon" />
          {!collapsed && <span>AI Question Generator</span>}
        </div>

        <div 
          className={`option ${activeOption==='chat' ? 'active' : ''}`} 
          onClick={() => handleNavigation('chat')}
        >
          <FaComments className="icon" />
          {!collapsed && <span>Message</span>}
        </div>

        <div 
          className={`option ${activeOption==='material' ? 'active' : ''}`} 
          onClick={() => handleNavigation('material')}
        >
          <FaBook className="icon" />
          {!collapsed && <span>Material</span>}
        </div>

      </div>
    </div>
  );
};

export default SidebarTeacher;
