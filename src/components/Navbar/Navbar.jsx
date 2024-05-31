import React, { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTranslation } from "react-i18next";
import Logo from "../../img/logo_multimania-02.png";
import LoginModal from "../LoginModal/LoginModal";

const Navbar = ({ closeModal }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, handleLogout, currentUser, setError } =
    useContext(authContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  const openLoginModal = () => {
    if (activeModal === null) {
      setActiveModal("login");
    }
  };

  const closeModalHandler = () => {
    setActiveModal(null);
  };

  const loginUser = async () => {
    if (!email.trim() || !password.trim()) {
      alert("Some inputs are empty!");
      return;
    }

    let newObj = {
      email: email,
      password: password,
    };

    try {
      console.log("Sending login request:", newObj);
      await handleLogin(newObj);
      alert("Login successful!");
      closeModal();
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
      alert("Invalid email or password");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="header_navbar" style={{ backgroundColor: "black" }}>
        <div className="container_header">
          <img
            src={Logo}
            className="logo_nav"
            alt="logo"
            onClick={() => navigate("/")}
          />
          <div className="header_inner">
            <div className="header_links">
              <a href="/ideas" className="header_links__item">
                Ideas
              </a>
              <a href="/profile" className="header_links__item">
                Profile
              </a>

              {/* {localStorage.getItem("email") === null ? (
              <span></span>
            ) : (
              <a
                key={oneUser.id}
                onClick={() => navigate(`/profile/${oneUser.id}`)}
                className="header_links__item">
                {t("navbar.profile")}
              </a>
            )} */}
            </div>
            <div>
              <select className="change_lang" onChange={handleChangeLanguage}>
                <option value="en">En</option>
                <option value="ru">Ru</option>
              </select>
            </div>

            {localStorage.getItem("email") === null ? (
              <div className="login_btn" onClick={openLoginModal}>
                <div>{t("navbar.signin")}</div>
              </div>
            ) : (
              <div className="login_btn" onClick={handleLogout}>
                <div>{t("navbar.signout")}</div>
              </div>
            )}
          </div>
        </div>
        {activeModal === "login" && (
          <LoginModal closeModal={closeModalHandler} />
        )}
      </div>
    </>
  );
};

export default Navbar;
