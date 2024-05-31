import React, { useEffect, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { coursesContext } from "../../contexts/coursesContext";
import Pagination from "@mui/material/Pagination";
import "./ideasList.scss";
import ProjectCard from "../ProjectCard/ProjectCard";

const IdeasList = ({ category }) => {
  // const { getPhoto, photo, coursesByCategory, getCoursesByCategory } =
  //   useContext(coursesContext);
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("default"); // Состояние для сортировки
  const [sortedCourses, setSortedCourses] = useState([]);

  // useEffect(() => {
  //   getCoursesByCategory(category).then(() => {
  //     setSortedCourses(coursesByCategory);
  //   });
  // }, [category, getCoursesByCategory]);

  const itemsOnPage = 4;
  const count = Math.ceil(sortedCourses.length / itemsOnPage);

  const handlePage = (e, p) => {
    setPage(p);
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const currentData = () => {
    const begin = (page - 1) * itemsOnPage;
    const end = begin + itemsOnPage;
    return sortedCourses.slice(begin, end);
  };

  return (
    <div>
      <div className="list_main-div">
        <h1>IDEAS</h1>

        <div className="list_courses-div">
          {/* {sortedCourses.length > 0 ? (
            currentData().map((item) => <IdeasCard key={item.id} item={item} />)
          ) : (
            <h3>Loading...</h3>
          )} */}
          {/* <IdeasCard /> */}
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>

        <Pagination count={count} page={page} onChange={handlePage} />
      </div>
    </div>
  );
};

export default IdeasList;
