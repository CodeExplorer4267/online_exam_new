import React from "react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MarksCircle = ({ percentage }) => {
  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#00b894", // green
          trailColor: "#dfe6e9",
        })}
      />
    </div>
  );
};

export default MarksCircle;
