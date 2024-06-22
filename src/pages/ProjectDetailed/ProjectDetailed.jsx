import React, { useContext, useEffect } from "react";
import "./projectDetailed.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ideasContext } from "../../contexts/ideasContext";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { getOneIdea, oneIdea, applyToTeam } = useContext(ideasContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    getOneIdea(id);
    console.log(oneIdea);
  }, []);

  let procenets;
  if (
    oneIdea.secondLink === null &&
    oneIdea.firstLink === null &&
    oneIdea.thirdfLink === null
  ) {
    procenets = 0;
  } else if (oneIdea.secondLink === null && oneIdea.firstLink !== null) {
    procenets = 35;
  } else if (
    oneIdea.secondLink !== null &&
    oneIdea.firstLink !== null &&
    oneIdea.thirdfLink === null
  ) {
    procenets = 75;
  } else if (
    oneIdea.secondLink !== null &&
    oneIdea.firstLink !== null &&
    oneIdea.thirdfLink !== null
  ) {
    procenets = 100;
  } else {
    procenets = 0;
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
                <div
                  className="developer"
                  onClick={() => navigate(`/user/${oneIdea?.author?.id}`)}>
                  <Avatar
                    // alt={developer.name}
                    src={oneIdea?.author?.pfp}
                    className="avatar"
                  />
                  <div className="developer-info">
                    <p>
                      {oneIdea?.author?.firstName} {oneIdea?.author?.lastName}{" "}
                      (author)
                    </p>
                  </div>
                </div>
                {oneIdea.members?.map((developer, index) => (
                  <div
                    key={index}
                    className="developer"
                    onClick={() => navigate(`/user/${developer?.id}`)}>
                    <Avatar
                      alt={developer.firstName}
                      src={developer.pfp}
                      className="avatar"
                    />
                    <div className="developer-info">
                      <p>
                        {developer.firstName} {developer.lastName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="progress-bar">
              <p>Progress:</p>
              <LinearProgress variant="determinate" value={procenets} />
            </div>
          </div>

          {localStorage.getItem("email") === null ? (
            <span></span>
          ) : (
            <button onClick={() => applyToTeam(id)}>Join</button>
          )}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ProjectDetails;
