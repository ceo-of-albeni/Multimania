import React, { useReducer } from "react";
import axios from "axios";

export const ideasContext = React.createContext();

const INIT_STATE = {
  ideas: [],
  oneIdea: [],
  my_ideas: [],
  requests: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_IDEAS":
      return { ...state, ideas: action.payload };
    case "GET_MY_IDEAS":
      return { ...state, my_ideas: action.payload };
    case "GET_ONE_IDEA":
      return { ...state, oneIdea: action.payload };
    case "GET_REQUESTS":
      return { ...state, requests: action.payload };
    default:
      return state;
  }
}

const IdeaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const API = "http://localhost:3001/api";

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
      const res = await axios.patch(
        `${API}/ideas/apply/to/team/${id}`,
        id,
        config
      );
      console.log(res.data);
      alert("Applied successful");
    } catch (err) {
      console.error("Error applying:", err);
    }
  }

  async function requestsToJoin(teamId) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access_token) {
        throw new Error("No tokens found in local storage");
      }
      console.log(tokens);

      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };

      const res = await axios.get(
        `${API}/ideas/get/requests/to/${teamId}`,
        config
      );

      dispatch({
        type: "GET_REQUESTS",
        payload: res.data,
      });
      console.log("cool");
    } catch (err) {
      console.log(err);
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

  // async function declineRequest(userId, teamId) {
  //   try {
  //     const tokens = JSON.parse(localStorage.getItem("tokens"));
  //     console.log(tokens);
  //     const Authorization = `Bearer ${tokens.access_token}`;
  //     const config = {
  //       headers: {
  //         Authorization,
  //       },
  //     };
  //     const res = await axios.patch(
  //       `${API}/ideas/decline/request/to/team/${userId}/${teamId}`,
  //       userId,
  //       teamId,
  //       config
  //     );
  //     console.log(res.data);
  //     alert("Declined");
  //   } catch (err) {
  //     console.error("Error applying:", err);
  //   }
  // }

  async function declineRequest(allId) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}/ideas/decline/request/to/team/${allId.userId}/${allId.teamId}`,
        allId,
        config
      );
      console.log(res.data);
      alert("Declined");
    } catch (err) {
      console.error("Error Declined:", err);
    }
  }

  async function approveRequest(allId) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}/ideas/approve/request/to/team/${allId.userId}/${allId.teamId}`,
        allId,
        config
      );
      console.log(res.data);
      alert("Approve");
    } catch (err) {
      console.error("Error applying:", err);
    }
  }

  async function uploadLink(idAndLink, link) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      console.log(tokens);
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}/ideas/insert/link/to/progress/${idAndLink.teamId}/${idAndLink.numberOfLink}`,
        link,
        config
      );
      console.log(res.data);
      alert("Upload");
    } catch (err) {
      console.error("Error uploading:", err);
    }
  }

  return (
    <ideasContext.Provider
      value={{
        ideas: state.ideas,
        oneIdea: state.oneIdea,
        my_ideas: state.my_ideas,
        requests: state.requests,

        getAllMyIdeas,
        getOneIdea,
        getAllIdeas,
        applyToTeam,
        requestsToJoin,
        declineRequest,
        approveRequest,
        uploadLink,
      }}>
      {children}
    </ideasContext.Provider>
  );
};

export default IdeaContextProvider;
