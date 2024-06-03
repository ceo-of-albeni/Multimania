import * as React from "react";
import "./footer.scss";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer>
      <p>{t("footer.alatoo")}</p>
    </footer>
  );
};

export default Footer;
