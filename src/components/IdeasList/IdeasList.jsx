import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import "./ideasList.scss";
import ProjectCard from "../ProjectCard/ProjectCard";
import { useTranslation } from "react-i18next";
import { ideasContext } from "../../contexts/ideasContext";

const IdeasList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const { t, i18n } = useTranslation();
  const { ideas, getAllIdeas } = useContext(ideasContext);

  useEffect(() => {
    getAllIdeas();
  }, []);

  const itemsOnPage = 6;
  const count = Math.ceil(ideas.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  const currentData = () => {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return ideas.slice(begin, end);
  };

  return (
    <div>
      <div className="list_main-div">
        <h1>{t("ideas.title")}</h1>
        <div className="list_courses-div">
          {ideas ? (
            currentData().map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))
          ) : (
            <h3>Loading...</h3>
          )}
        </div>

        <Pagination count={count} page={page} onChange={handlePage} />
      </div>
    </div>
  );
};

export default IdeasList;
