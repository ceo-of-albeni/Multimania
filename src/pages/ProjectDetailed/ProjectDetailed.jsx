// ProjectDetails.jsx
import React from "react";
import "./projectDetailed.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import { Avatar } from "@mui/material";

const developers = [
  {
    name: "John Doe",
    role: "Frontend Developer",
    avatar:
      "https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg", // URL to the profile picture
  },
  {
    name: "Jane Smith",
    role: "Backend Developer",
    avatar:
      "https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg", // URL to the profile picture
  },
  // Add more developers as needed
];

const ProjectDetails = () => {
  return (
    <div className="project-details">
      <div className="back-button">
        <ArrowBack /> Back to Projects
      </div>
      <div className="progress-bar">
        <LinearProgress variant="determinate" value={50} />
      </div>

      <div className="project-info">
        <h2>Project Title</h2>
        <img
          src="https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg"
          alt="Project Image"
          className="project-image"
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
          ipsum non ornare sollicitudin. Integer id eleifend nisi. Lorem ipsum
          dolor sit amet consectetur, adipisicing elit. Nihil repudiandae magnam
          nobis culpa placeat laborum sequi quidem vitae, saepe nam sit
          blanditiis inventore laudantium in est. Assumenda sed molestiae dolor!
        </p>
        {/* Add more detailed information here */}
      </div>
      <div className="developers-block">
        <h3>Developers</h3>
        <div className="developer-list">
          {developers.map((developer, index) => (
            <div key={index} className="developer">
              <Avatar
                alt={developer.name}
                src={developer.avatar}
                className="avatar"
              />
              <div className="developer-info">
                <h4>{developer.name}</h4>
                <p>{developer.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
