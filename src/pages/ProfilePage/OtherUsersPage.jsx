import React, { useContext, useEffect } from "react";
import "./profile.scss";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { authContext } from "../../contexts/authContext";
import { ideasContext } from "../../contexts/ideasContext";
import { useParams } from "react-router-dom";

const OtherUsersPage = () => {
  const { getOneUserById, otherUser } = useContext(authContext);
  const { ideas, getAllIdeas } = useContext(ideasContext);

  const { id } = useParams();

  let color;
  if (otherUser.colorTheme === "LIGHT") {
    color = "#f7f5f0";
  } else if (otherUser.colorTheme === "DARK") {
    color = "dimgray";
  } else if (otherUser.colorTheme === "GREEN") {
    color = "#4caf50";
  } else {
    color = otherUser.colorTheme;
  }

  useEffect(() => {
    getOneUserById(id);
    getAllIdeas();
    console.log(otherUser.id);
  }, []);

  return (
    <div>
      <div className="userprofilepage" style={{ backgroundColor: `${color}` }}>
        <div className="profile_img-ps">
          <div className="profile_img-container">
            <img src={otherUser?.pfp} width="350" alt="Profile" />
          </div>
          <div className="profile_ps-div">
            <p>
              {otherUser?.firstName} {otherUser?.lastName}
            </p>
            {/* <p>{otherUser.group}</p> */}
            <p>COM21-A</p>
            {/* <p>{otherUser.faculty}</p> */}
            <p>Computer Science</p>
            <p>
              <a href={otherUser.usefulLink}>{otherUser.usefulLink}</a>
            </p>
            <p>{otherUser.aboutMe}</p>
          </div>
        </div>

        <div className="list_courses-div">
          {ideas ? (
            ideas.map((item) =>
              item?.author.id === otherUser.id ? (
                <ProjectCard key={item.id} item={item} />
              ) : (
                <span></span>
              )
            )
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherUsersPage;
