import React from "react";
import ProfilePicture from "../../img/profile.png";
import "./profile.scss";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const ProfilePage = () => {
  return (
    <div className="profile_main-div">
      <div className="profile_img-ps">
        <div className="profile_img-container">
          <img src={ProfilePicture} width="350" alt="Profile" />
          <button className="edit-button">Edit</button>
        </div>
        <div className="profile_ps-div">
          <p>Full Name</p>
          <p>Group</p>
          <p>Faculty</p>
          <p>+996(999)000-000</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit
            illum consectetur animi voluptas. Itaque fugiat delectus voluptatem
            accusamus dignissimos, rem magni autem eligendi molestiae ut totam
            eaque, accusantium saepe ducimus id blanditiis veritatis veniam
            numquam tempora voluptatum debitis nesciunt repudiandae.
          </p>
          <button className="upload-button">Upload an idea</button>
        </div>
      </div>

      <div className="list_courses-div">
        <ProjectCard />
        <ProjectCard />
        <ProjectCard />
      </div>
    </div>
  );
};

export default ProfilePage;
