import React from "react";
import "./homepage.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Startup from "../../img/startup.png";
import Article from "../../img/article.png";
import Patent from "../../img/patent.png";
import Inbl from "../../img/inbl.png";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="home_anim">
      <div>
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
      <div className="home_greetig-div">
        <h1>{t("home_anim.title")}</h1>
        {/* <p>
          The ultimate hub for innovators and dreamers. Here, you can share your
          startup ideas, connect with like-minded visionaries, and build the
          perfect team to bring your vision to life. Join our vibrant community
          and turn your ideas into reality. Your journey to success starts here!
        </p> */}
      </div>
      <div className="home_main-div">
        <div className="home_card">
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              {t("home_anim.startup_title")}
            </Typography>
            {/* <CardMedia
              component="img"
              // height="140"
              image={Startup}
              alt="green iguana"
            /> */}
            <img src={Startup} height="150" alt="" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {t("home_anim.startup_text")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div className="home_card">
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              {t("home_anim.patent_title")}
            </Typography>
            <img src={Patent} height="150" alt="" />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {t("home_anim.patent_text")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div className="home_card">
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              {t("home_anim.incorporation_title")}
            </Typography>
            <img src={Inbl} height="150" alt="" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {t("home_anim.incorporation_text")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div className="home_card">
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              {t("home_anim.article_title")}
            </Typography>
            <img src={Article} height="150" alt="" />

            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {t("home_anim.article_text")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
      </div>
      {/* <p id="about_p">
        The ultimate hub for innovators and dreamers. Here, you can share your
        startup ideas, connect with like-minded visionaries, and build the
        perfect team to bring your vision to life. Join our vibrant community
        and turn your ideas into reality. Your journey to success starts here!
      </p> */}
    </div>
  );
};

export default HomePage;
