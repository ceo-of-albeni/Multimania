import React from "react";
import "./projectCard.scss";

const ProjectCard = () => {
  return (
    <div className="project_main-div">
      <div className="project_innerdiv-one">
        <img
          src="https://demos.creative-tim.com/material-dashboard-react/static/media/home-decor-1.05e218fd495ccc65c99d.jpg"
          alt=""
        />
      </div>
      <div className="project_innerdiv-two">
        <span className="project_innerdiv-two-span">Project 2</span>
        <div className="project_innerdiv-two-div-1">
          <a href="">modern</a>
        </div>
        <div className="project_innerdiv-two-div-2">
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
            natus culpa saepe, earum ab quae!
          </span>
        </div>
        <div className="project_innerdiv-two-div-3">
          <a href="/project">
            View Project <span></span>
          </a>
          <div className="project_div-teammates">
            <div className="project_teammate">
              <img
                src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-4.85c82b6e60178804017f.jpg"
                alt=""
              />
            </div>
            <div className="project_teammate">
              <img
                src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-4.85c82b6e60178804017f.jpg"
                alt=""
              />
            </div>
            <div className="project_teammate">
              <img
                src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-4.85c82b6e60178804017f.jpg"
                alt=""
              />
            </div>
            <div className="project_teammate">
              <img
                src="https://demos.creative-tim.com/material-dashboard-react/static/media/team-4.85c82b6e60178804017f.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
