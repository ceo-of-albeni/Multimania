import React, { useState, useContext, useEffect } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { useTranslation } from "react-i18next";
import Logo from "../../img/logo_multimania-02.png";
import LoginModal from "../LoginModal/LoginModal";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = ({ closeModal }) => {
  const [activeModal, setActiveModal] = useState(null);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const { handleLogout, getOneUser, oneUser } = useContext(authContext);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);

  useEffect(() => {
    getOneUser();
  }, []);

  const handleChangeLanguage = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("language", selectedLanguage);
  };

  const openLoginModal = () => {
    if (activeModal === null) {
      setActiveModal("login");
    }
  };

  const closeModalHandler = () => {
    setActiveModal(null);
  };

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen);
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
          <div className="burger_icon" onClick={toggleBurgerMenu}>
            {isBurgerOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div className={`header_inner ${isBurgerOpen ? "active" : ""}`}>
            <div className="header_links">
              <a
                onClick={() => navigate("/ideas")}
                className="header_links__item">
                {t("navbar.ideas")}
              </a>
              {localStorage.getItem("email") === null ? (
                <span></span>
              ) : (
                <a
                  key={oneUser.id}
                  onClick={() => navigate(`/profile/${oneUser.id}`)}
                  className="header_links__item">
                  {t("navbar.profile")}
                </a>
              )}
            </div>
            <div>
              <select
                className="change_lang"
                onChange={handleChangeLanguage}
                value={i18n.language}>
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
