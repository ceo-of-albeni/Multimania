import React, { useState, useReducer } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const authContext = React.createContext();

const INIT_STATE = {
  users: [],
  oneUser: [],
  otherUser: [],
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload };
    case "GET_ONE_USER":
      return { ...state, oneUser: action.payload };
    case "GET_OTHER_USER":
      return { ...state, otherUser: action.payload };
    default:
      return state;
  }
}

const API = "http://localhost:3001/api/";

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(false);

  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const navigate = useNavigate();

  async function handleRegister(newObj) {
    try {
      const res = await axios.post(`${API}auth/register`, newObj);
      console.log("User created:", res.data);
    } catch (err) {
      setError(true);
      console.error("Error creating user:", err);
    }
  }

  async function handleLogin(newObj, email, closeModal) {
    try {
      const res = await axios.post(`${API}auth/login`, newObj);
      localStorage.setItem("tokens", JSON.stringify(res.data));
      localStorage.setItem("email", email);
      closeModal();
      navigate("/");
      // window.location.reload();
    } catch (err) {
      alert("Incorrect email or password!");
      console.log(err);
      setError(err);
    }
  }

  async function getAllUsers() {
    try {
      const res = await axios.get(`${API}getAllUsers`);
      dispatch({
        type: "GET_USERS",
        payload: res.data,
      });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  async function updateProfilePicture(newImage) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access_token) {
        throw new Error("No access token found");
      }
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(`${API}user/change/pfp`, newImage, config);
      console.log(res.data);
      alert("Profile picture update successful");
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile picture:", err);
    }
  }

  async function updateProfileInfo(editedInfo) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access_token) {
        throw new Error("No access token found");
      }
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}user/edit/profile`,
        editedInfo,
        config
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  }

  async function updateProfileTheme(theme) {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      if (!tokens || !tokens.access_token) {
        throw new Error("No access token found");
      }
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios.patch(
        `${API}user/edit/profile/${theme}`,
        theme,
        config
      );
      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.error("Error updating profile theme:", err);
    }
  }

  async function getOneUser() {
    try {
      const tokens = JSON.parse(localStorage.getItem("tokens"));
      const Authorization = `Bearer ${tokens.access_token}`;
      const config = {
        headers: {
          Authorization,
        },
      };
      const res = await axios(`${API}user/get/profile`, config);
      dispatch({
        type: "GET_ONE_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneUserById(id) {
    try {
      const res = await axios(`${API}user/${id}`);
      dispatch({
        type: "GET_OTHER_USER",
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  function handleLogout() {
    localStorage.removeItem("tokens");
    localStorage.removeItem("email");
    setCurrentUser(false);
    navigate("/");
  }

  async function handleConfirm(formData) {
    try {
      const res = await axios.post(`${API}auth/confirmEmail`, formData);
      console.log(res);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  async function sendCodeAgain(formData) {
    try {
      const res = await axios.patch(`${API}auth/sendCodeAgain`, formData);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err);
    }
  }

  return (
    <authContext.Provider
      value={{
        currentUser,
        error,
        handleRegister,
        handleLogin,
        handleLogout,
        getAllUsers,
        getOneUser,
        handleConfirm,
        sendCodeAgain,
        updateProfileInfo,
        updateProfilePicture,
        updateProfileTheme,
        getOneUserById,

        users: state.users,
        oneUser: state.oneUser,
        otherUser: state.otherUser,
        setError,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
