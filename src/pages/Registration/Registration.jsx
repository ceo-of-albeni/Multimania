import React, { useState, useContext, useEffect } from "react";
import "./registration.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { authContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const { handleRegister, error, setError } = useContext(authContext);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const createUser = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim()
    ) {
      alert("Some inputs are empty!");
      return;
    }

    if (password !== passwordConfirm) {
      alert("Passwords are not the same!");
      return;
    }

    let newObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    try {
      await handleRegister(newObj);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setError(false);
  // }, []);

  const openConfirm = () => {
    createUser();

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !passwordConfirm.trim() ||
      password !== passwordConfirm
    ) {
      // alert("You filled the form incorrectly!!");
      // return;
    } else {
      navigate("/confirm");
    }
  };

  return (
    <div className="register">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="register__inner">
        <a href="javascript:history.go(-1)">
          <ArrowBackIcon className="arrow_reg" />
        </a>
        <form action="">
          <div>{t("register.registration")}</div>
          <label>{t("register.first_name")}</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t("register.ph_first_name")}
            name="name"
          />
          <label>{t("register.last_name")}</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder={t("register.ph_last_name")}
            name="surname"
          />
          <label>{t("register.email")}</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("register.ph_email")}
            name="email"
          />
          <label>{t("register.password")}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("register.ph_password")}
            name="password"
          />
          <label>{t("register.confirm_pw")}</label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder={t("register.ph_confirm_pw")}
            name="con_password"
          />
          <button onClick={openConfirm}>{t("register.signup")}</button>
        </form>
      </div>
    </div>
  );
};
export default Registration;
