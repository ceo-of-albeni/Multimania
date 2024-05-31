import "./ideas.scss";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useSearchParams } from "react-router-dom";
import IdeasList from "../../components/IdeasList/IdeasList";

const IdeasPage = () => {
  return (
    <div>
      <IdeasList />
    </div>
  );
};

export default IdeasPage;
