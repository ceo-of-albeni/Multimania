import React, { useContext, useEffect, useState } from "react";
import "./projectDetailed.scss";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { LinearProgress } from "@mui/material";
import { Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ideasContext } from "../../contexts/ideasContext";
import { useParams, useNavigate } from "react-router-dom";

const ProjectDetails = () => {
  const { t } = useTranslation();
  const { getOneIdea, oneIdea, applyToTeam, uploadLink } =
    useContext(ideasContext);
  const navigate = useNavigate();

  const { id } = useParams();

  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [file3, setFile3] = useState("");

  useEffect(() => {
    getOneIdea(id);
    console.log(oneIdea);
  }, []);

  const handleUpload1 = async () => {
    if (!file1) {
      alert("Empty!");
      return;
    }

    let newObj = {
      teamId: oneIdea.id,
      numberOfLink: "1",
    };

    uploadLink(newObj, file1);

    setFile1("");
  };

  const handleUpload2 = async () => {
    if (!file2) {
      alert("Empty!");
      return;
    }

    let newObj = {
      teamId: oneIdea.id,
      numberOfLink: "secondLink",
    };

    console.log(newObj);

    uploadLink(newObj, file1);

    setFile2("");
  };

  const handleUpload3 = async () => {
    if (!file3) {
      alert("Empty!");
      return;
    }

    let newObj = {
      teamId: oneIdea.id,
      numberOfLink: "thirdLink",
    };

    uploadLink(newObj, file1);

    setFile3("");
  };

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
                    <p style={{ color: "red" }}>
                      {oneIdea?.author?.firstName} {oneIdea?.author?.lastName}{" "}
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

              {localStorage.getItem("email") === null ? (
                <span></span>
              ) : (
                <div>
                  <div style={{ display: "flex" }}>
                    {/* <label className="custom-file-upload">
                      <input
                        type="file"
                        // accept=""
                        onChange={handleFileChange1}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512">
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                    </label> */}
                    <input
                      type="text"
                      placeholder="Link to Drive..."
                      value={file1}
                      onChange={(e) => setFile1(e.target.value)}
                    />
                    <button onClick={handleUpload1}>Upload first link</button>
                  </div>
                  <div style={{ display: "flex" }}>
                    {/* <label className="custom-file-upload">
                      <input
                        type="file"
                        // accept=""
                        onChange={handleFileChange2}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512">
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                    </label> */}
                    <input
                      type="text"
                      placeholder="Link to Drive..."
                      value={file2}
                      onChange={(e) => setFile2(e.target.value)}
                    />

                    <button onClick={handleUpload2}>Upload second link</button>
                  </div>
                  <div style={{ display: "flex" }}>
                    {/* <label className="custom-file-upload">
                      <input
                        type="file"
                        // accept=""
                        onChange={handleFileChange3}
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512">
                        <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                      </svg>
                    </label> */}
                    <input
                      type="text"
                      placeholder="Link to Drive..."
                      value={file3}
                      onChange={(e) => setFile3(e.target.value)}
                    />
                    <button onClick={handleUpload3}>Upload third link</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {localStorage.getItem("email") === null ? (
            <span></span>
          ) : (
            <button onClick={() => applyToTeam(id)}>Join</button>
            // oneIdea.members?.map((developer, index) =>
            //   developer.email == localStorage.getItem("email") ? (
            //     <button onClick={() => applyToTeam(id)}>Join</button>
            //   ) : (
            //     <span></span>
            //   )
            // )
          )}
        </div>
      ) : (
        <span></span>
      )}
    </div>
  );
};

export default ProjectDetails;
