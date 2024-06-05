import React, { useContext, useEffect } from "react";
import "./projectDetailed.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ideasContext } from "../../contexts/ideasContext";
import { useParams, useNavigate } from "react-router-dom";

const developers = [
  {
    name: "Aliia Malaeva",
    id: 1,
    avatar:
      "https://www.wfla.com/wp-content/uploads/sites/71/2023/05/GettyImages-1389862392.jpg?w=2560&h=1440&crop=1", // URL to the profile picture
  },
  {
    name: "Nurmuhammed Ernestov",
    id: 2,
    avatar: "https://i.sstatic.net/l60Hf.png", // URL to the profile picture
  },
  {
    name: "Sardar Kasmaliev",
    id: 3,
    avatar: "https://i.sstatic.net/l60Hf.png", // URL to the profile picture
  },
  {
    name: "Abiy Kasmaliev",
    id: 4,
    avatar: "https://i.sstatic.net/l60Hf.png", // URL to the profile picture
  },
];

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { getOneIdea, oneIdea, applyToTeam } = useContext(ideasContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getOneIdea(id);
  }, []);

  function apply() {
    applyToTeam(id);
  }
  return (
    <div>
      {oneIdea ? (
        <div className="project-details">
          <a className="back-button" href="javascript:history.go(-1)">
            <ArrowBack /> {t("details.back_arrow")}
          </a>
          <p className="detailed_title">{oneIdea.name}</p>
          <div className="project-info">
            <img
              src={oneIdea.imageUrl}
              height="256"
              alt="Project Image"
              className="project-image"
            />
            <p>{oneIdea.description}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="developers-block">
              <h3>{t("details.developers")}</h3>
              <div className="developer-list">
                {developers.map((developer, index) => (
                  <div key={index} className="developer">
                    <Avatar
                      alt={developer.name}
                      src={developer.avatar}
                      className="avatar"
                    />
                    <div className="developer-info">
                      <p>{developer.name}</p>
                      {/* <p>{developer.role}</p> */}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="progress-bar">
              <p>Progress:</p>
              <LinearProgress variant="determinate" value={50} />
            </div>
          </div>
          {/* <div className="progress-bar">
            <p>Progress:</p>
            <LinearProgress variant="determinate" value={50} />
          </div> */}
          <button onClick={() => applyToTeam(id)}>Join</button>
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ProjectDetails;
