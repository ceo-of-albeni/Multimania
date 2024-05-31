import React from "react";
import "./homepage.scss";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Startup from "../../img/1190422.png";
import Article from "../../img/article.jpeg";
import Patent from "../../img/patent.png";
import Inbl from "../../img/inbl.png";

const HomePage = () => {
  return (
    <div>
      <div className="home_greetig-div">
        <h1>Welcome to MULTIMANIA!</h1>
        <p>
          The ultimate hub for innovators and dreamers. Here, you can share your
          startup ideas, connect with like-minded visionaries, and build the
          perfect team to bring your vision to life. Join our vibrant community
          and turn your ideas into reality. Your journey to success starts here!
        </p>
      </div>
      <div className="home_main-div">
        <Card className="home_card" sx={{ maxWidth: 345 }}>
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              StartUp
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image={Startup}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                A startup is a new business that tries to bring a unique product
                or service to the market. These businesses aim to grow quickly
                and often use new ideas and technology. Startups usually begin
                with some risk and often need money from investors to get going.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="home_card" sx={{ maxWidth: 345 }}>
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              Patent
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image={Patent}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                A patent is a special right given by the government to an
                inventor. It means the inventor is the only one allowed to make,
                use, or sell their invention for a certain number of years. This
                helps protect their idea from being copied by others.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="home_card" sx={{ maxWidth: 345 }}>
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              Incorporation
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image={Inbl}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                A patent is a special right given by the government to an
                inventor. It means the inventor is the only one allowed to make,
                use, or sell their invention for a certain number of years. This
                helps protect their idea from being copied by others.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className="home_card" sx={{ maxWidth: 345 }}>
          <CardActionArea style={{ display: "flex", flexDirection: "column" }}>
            <Typography gutterBottom variant="h5" component="div">
              Article
            </Typography>
            <CardMedia
              component="img"
              height="140"
              image={Article}
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                An article is a piece of writing that is published in a
                newspaper, magazine, or online. It usually provides information
                about a specific topic, event, or issue. Articles are written to
                inform, entertain, or persuade readers.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default HomePage;
