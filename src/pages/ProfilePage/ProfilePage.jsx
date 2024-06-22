import React, { useState, useContext, useEffect } from "react";
import "./profile.scss";
import { useTranslation } from "react-i18next";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { authContext } from "../../contexts/authContext";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ideasContext } from "../../contexts/ideasContext";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "30px 130px",
};

const ProfilePage = () => {
  const { t } = useTranslation();
  const {
    getOneUser,
    oneUser,
    updateProfileInfo,
    updateProfileTheme,
    updateProfilePicture,
  } = useContext(authContext);
  const {
    getAllMyIdeas,
    my_ideas,
    requestsToJoin,
    requests,
    approveRequest,
    declineRequest,
  } = useContext(ideasContext);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const handleClose2 = () => setOpen2(false);
  const handleClose3 = () => setOpen3(false);
  const handleOpen3 = () => setOpen3(true);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);

  const [teamId, setTeamId] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  function handleOpen2(id) {
    requestsToJoin(id);
    setOpen2(true);
    setTeamId(id);
    console.log(id);
  }

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [usefulLink, setUsefulLink] = useState("");
  const [image, setImage] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usefulLink1, setUsefulLink1] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [newIamge, setNewImage] = useState(null);

  useEffect(() => {
    if (oneUser) {
      setFirstName(oneUser.firstName);
      setLastName(oneUser.lastName);
      setUsefulLink1(oneUser.usefulLink);
      setAboutMe(oneUser.aboutMe);
    }
  }, [oneUser]);

  const handlePhotoChange = (event) => {
    const changedPic = event.target.files[0];
    setNewImage(changedPic);
  };

  function uploadPhoto() {
    const newPicture = new FormData();
    newPicture.append("image", newIamge);
    updateProfilePicture(newPicture);
  }

  let color;
  if (oneUser.colorTheme === "LIGHT") {
    color = "#f7f5f0";
  } else if (oneUser.colorTheme === "DARK") {
    color = "dimgray";
  } else if (oneUser.colorTheme === "GREEN") {
    color = "#4caf50";
  } else {
    color = oneUser.colorTheme;
  }

  function themePink() {
    updateProfileTheme("pink");
  }
  function themeGreen() {
    updateProfileTheme("green");
  }
  function themeLight() {
    updateProfileTheme("light");
  }
  function themeDark() {
    updateProfileTheme("dark");
  }

  function saveChanges() {
    const editedInfo = {
      firstName,
      lastName,
      aboutMe,
      usefulLink: usefulLink1,
    };
    console.log("Edited Info:", editedInfo);
    updateProfileInfo(editedInfo);
    window.location.reload();
  }

  const handleUpload = async () => {
    if (!image || !name || !description || !usefulLink) {
      alert("Some inputs are empty!");
      return;
    }

    const newArticle = new FormData();
    newArticle.append("image", image);
    newArticle.append("name", name);
    newArticle.append("usefulLink", usefulLink);
    newArticle.append("description", description);

    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const response = await fetch("http://localhost:3001/api/ideas", {
        method: "POST",
        body: newArticle,
        headers: {
          Authorization,
        },
      });

      if (!response.ok) {
        console.error(
          "Server returned an error:",
          response.status,
          response.statusText
        );
        const responseText = await response.text();
        console.error("Server Response:", responseText);
        alert("Error!");
        return;
      }

      alert("Idea created successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error during article creation:", error);
    }

    setName("");
    setDescription("");
    setUsefulLink("");
    setImage(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  function approve2() {
    approve(userId);
    window.location.reload();
  }

  async function approve(id) {
    await setUserId(id);

    let obj = {
      userId: userId,
      teamId: teamId,
    };

    console.log(obj);

    approveRequest(obj);
    handleOpen4();
  }

  function decline2() {
    decline(userId);
    window.location.reload();
  }

  async function decline(id) {
    await setUserId(id);

    let obj = {
      userId: userId,
      teamId: teamId,
    };

    console.log(obj);

    declineRequest(obj);
    handleOpen5();
  }

  useEffect(() => {
    getOneUser();
    getAllMyIdeas();
  }, []);

  return (
    <div>
      {/* upload */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <h4>{t("ideamodal.title")}</h4>
          <div className="article_form-inputs">
            <div className="short_inp">
              <p className="input_p">{t("ideamodal.idea_title")}</p>
              <input
                className="text_input"
                placeholder={t("ideamodal.ph")}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="input_p">{t("ideamodal.description")}</p>
              <input
                className="text_input"
                placeholder={t("ideamodal.ph")}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <p className="input_p">{t("ideamodal.need")}</p>
              <input
                className="text_input"
                placeholder={t("ideamodal.ph")}
                type="text"
                value={usefulLink}
                onChange={(e) => setUsefulLink(e.target.value)}
              />
              <p className="input_p">{t("ideamodal.photo")}</p>
              <label className="custom-file-upload">
                <input type="file" accept="" onChange={handleFileChange} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 640 512">
                  <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                </svg>
              </label>
            </div>

            <br />
            <button className="upload-button" onClick={handleUpload}>
              {t("ideamodal.upload")}
            </button>
          </div>
        </Box>
      </Modal>

      {/* edit */}
      <Modal
        className="supermaindiv"
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <div>
            <h4 style={{ marginLeft: "50px" }}>{t("edit_profile.title")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                <p className="input_p">{t("edit_profile.firstName")}</p>
                <input
                  className="text_input"
                  placeholder={t("edit_profile.ph")}
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <p className="input_p">{t("edit_profile.lastName")}</p>
                <input
                  className="text_input"
                  placeholder={t("edit_profile.ph")}
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />

                <p className="input_p">{t("edit_profile.usefulLink")}</p>
                <input
                  className="text_input"
                  placeholder={t("edit_profile.ph")}
                  type="text"
                  value={usefulLink1}
                  onChange={(e) => setUsefulLink1(e.target.value)}
                />
                <p className="input_p">{t("edit_profile.aboutMe")}</p>
                <input
                  className="text_input"
                  placeholder={t("edit_profile.ph")}
                  type="text"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
                <div className="theme_btns">
                  <button onClick={themeDark} id="dark"></button>
                  <button onClick={themeLight} id="light"></button>
                  <button onClick={themePink} id="pink"></button>
                  <button onClick={themeGreen} id="green"></button>
                </div>
              </div>

              <br />
            </div>
            <button onClick={saveChanges}>{t("edit_profile.edit")}</button>
            <div>
              <button onClick={handleOpen3} style={{ marginTop: "15px" }}>
                {t("edit_profile.savechanges")}
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* photo */}
      <Modal
        open={open3}
        onClose={handleClose3}
        className="supermaindiv"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <div>
            <h4 style={{ marginLeft: "50px" }}>{t("edit_profile.title")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                <p className="input_p">{t("edit_profile.picture")}</p>
                <label className="custom-file-upload">
                  <input type="file" accept="" onChange={handlePhotoChange} />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    viewBox="0 0 640 512">
                    <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
                  </svg>
                </label>
              </div>

              <br />
            </div>
            <div>
              <button
                onClick={uploadPhoto}
                style={{ marginTop: "15px", marginLeft: "50px" }}>
                Edit Profile Picture
              </button>
            </div>
          </div>
        </Box>
      </Modal>

      {/* requests */}
      <Modal
        open={open2}
        onClose={handleClose2}
        className="supermaindiv"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <div>
            <h4>{t("edit_profile.requests")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                {requests ? (
                  requests.map((item) => (
                    <div key={item.id}>
                      <p
                        style={{
                          fontSize: "20px",
                          marginTop: "30px",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                        onClick={() => navigate(`/user/${item?.id}`)}
                        // onClick={() => navigateNId(item.id)}
                        className="input_p">
                        {item?.firstName} {item?.lastName}
                      </p>
                      <button onClick={() => approve(item.id)}>
                        {t("edit_profile.approve")}
                      </button>
                      <button onClick={() => decline(item.id)}>
                        {t("edit_profile.decline")}
                      </button>
                    </div>
                  ))
                ) : (
                  <h3>Loading...</h3>
                )}
              </div>
              <br />
            </div>
          </div>
        </Box>
      </Modal>

      {/* sure? */}
      <Modal
        open={open4}
        onClose={handleClose4}
        className="supermaindiv"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <div>
            <h4>{t("edit_profile.sure")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                <button onClick={approve2}>{t("edit_profile.approve")}</button>
              </div>
              <br />
            </div>
          </div>
        </Box>
      </Modal>

      <Modal
        open={open5}
        onClose={handleClose5}
        className="supermaindiv"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="article_form" id="article_div" sx={style}>
          <div>
            <h4>{t("edit_profile.sure")}</h4>
            <div className="article_form-inputs">
              <div className="short_inp">
                <button onClick={decline2}>{t("edit_profile.decline")}</button>
              </div>
              <br />
            </div>
          </div>
        </Box>
      </Modal>

      <div className="userprofilepage" style={{ backgroundColor: `${color}` }}>
        <div className="profile_img-ps">
          <div className="profile_img-container">
            <img src={oneUser?.pfp} width="350" alt="Profile" />
            <button className="edit-button" onClick={handleOpen1}>
              {t("userprofilepage.edit_btn")}
            </button>
          </div>
          <div className="profile_ps-div">
            <p>
              {oneUser?.firstName} {oneUser?.lastName}
            </p>
            {/* <p>{oneUser.group}</p> */}
            <p>COM21-A</p>
            {/* <p>{oneUser.faculty}</p> */}
            <p>Computer Science</p>
            <p>
              <a href={oneUser.usefulLink}>{oneUser.usefulLink}</a>
            </p>
            <p>{oneUser.aboutMe}</p>
            <button onClick={handleOpen} className="upload-button">
              {t("userprofilepage.upload_btn")}
            </button>
          </div>
        </div>

        <div className="list_courses-div">
          {my_ideas ? (
            my_ideas.map((item) => (
              <div key={item.id} onClick={() => handleOpen2(item.id)}>
                <ProjectCard key={item.id} item={item} />
              </div>
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
