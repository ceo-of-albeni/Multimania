import React, { useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const ideasContext = React.createContext();

const INIT_STATE = {
  ideas: [],
  oneIdea: [],
  my_ideas: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_IDEAS":
      return { ...state, ideas: action.payload };
    case "GET_MY_IDEAS":
      return { ...state, my_ideas: action.payload };
    case "GET_ONE_IDEA":
      return { ...state, oneIdea: action.payload };
    default:
      return state;
  }
}

const IdeaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const API = "http://localhost:3001/api";

  const location = useLocation();
  const navigate = useNavigate();

  async function getAllMyIdeas() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}/ideas/all/my`, config);
      dispatch({
        type: "GET_MY_IDEAS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllIdeas() {
    try {
      // const tokens = JSON.parse(localStorage.getItem("tokens"));
      const res = await axios(`${API}/ideas`);
      dispatch({
        type: "GET_IDEAS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function applyToTeam(id) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(`${API}/ideas/apply/to/team/${id}`, config);
      console.log(res.data);
      alert("Applied successful");
    } catch (err) {
      console.error("Error applying:", err);
    }
  }

  async function getOneIdea(id) {
    try {
      const res = await axios(`${API}/ideas/${id}/`);
      dispatch({
        type: "GET_ONE_IDEA",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ideasContext.Provider
      value={{
        ideas: state.ideas,
        oneIdea: state.oneIdea,
        my_ideas: state.my_ideas,

        getAllMyIdeas,
        getOneIdea,
        getAllIdeas,
        applyToTeam,
      }}>
      {children}
    </ideasContext.Provider>
  );
};

export default IdeaContextProvider;
