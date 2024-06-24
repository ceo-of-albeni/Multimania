import React from "react";
import "./projectCard.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProjectCard = ({ item }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  // console.log(item);

  const getTrimmedText = () => {
    if (item.description.length > 100) {
      return item.description.substring(0, 100).trimEnd() + "...";
    } else {
      return item.description;
    }
  };

  const authorFirstName = item?.author?.firstName || "Unknown";
  const authorLastName = item?.author?.lastName || "Unknown";

  return (
    <div className="project_main-div">
      <div className="project_innerdiv-one">
        <img src={item.imageUrl} height="210" alt="" />
      </div>
      <div className="project_innerdiv-two">
        <span className="project_innerdiv-two-span">
          {authorFirstName}
          {" " + authorLastName}
        </span>
        <div className="project_innerdiv-two-div-1">
          <p>{item.name}</p>
        </div>
        <div className="project_innerdiv-two-div-2">
          <span>{getTrimmedText()}</span>
        </div>
        <div className="project_innerdiv-two-div-3">
          <a onClick={() => navigate(`/project/${item.id}`)}>
            {t("card.button")} <span></span>
          </a>
          <div className="project_div-teammates">
            <div className="project_teammate">
              <img src={item.author?.pfp} alt="" />
            </div>
            {item.members?.map((developer, index) => (
              <div className="project_teammate">
                <img src={developer.pfp} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
