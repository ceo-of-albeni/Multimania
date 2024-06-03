import React from "react";
import classes from "./success.module.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function Success({ closeModal }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handleSuccessClick = (e) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    closeModal();
  };

  const closeM = () => {
    navigate("/");
    closeModal();
  };

  return (
    <div className={classes.success} onClick={handleOutsideClick}>
      <div className={classes.success__inner} onClick={handleSuccessClick}>
        <div>{t("success.fully")}</div>
        <button onClick={closeM}>OK</button>
      </div>
    </div>
  );
}
