import axios from "axios";

import ENV from "./config";
const API_HOST = ENV.api_host;

/** All axios calls in one place *********************************************/

/**
 * Checks whether a user is already logged in using the session cookie and sets
 * the state accordignly if so.
 *
 * @param {function} setID
 */
export const checkSession = (setID) => {
  axios
    .get(`${API_HOST}/users/check-session`)
    .then((res) => {
      if (res.status === 200 && res.data.id) {
        console.log("User logged in!");
        setID(res.data.id);
      }
    })
    .catch((err) => {
      console.log("User not logged in");
      setID(null);
    });
};

/**
 * Attempts a login with the given username and password and sets the app ID
 * if successful or the info text if unsuccessful.
 *
 * @param {string} username
 * @param {string} password
 * @param {function} setID
 * @param {function} setInfoText
 */
export const handleLogin = (username, password, setID, setInfoText) => {
  const loginInfo = { username: username, password: password };
  axios
    .post(`${API_HOST}/users/login`, loginInfo)
    .then((res) => {
      setID(res.data.id);
    })
    .catch((err) => {
      setInfoText("Invalid credentials");
    });
};

/**
 * Creates a user with the given username and password and sets the info text
 * based on the response.
 *
 * @param {string} username
 * @param {string} password
 * @param {function} setInfoText
 */
export const handleSignup = (username, password, setInfoText) => {
  const signupInfo = { username: username, password: password };
  axios
    .post(`${API_HOST}/users`, signupInfo)
    .then((res) => {
      setInfoText("User created!");
    })
    .catch((err) => {
      setInfoText("Use different username.");
    });
};

/**
 * Gets all the images in the repository and sets them in the app state.
 *
 * @param {function} setRepositoryImages
 */
export const getRepositoryImages = (setRepositoryImages) => {
  axios
    .get(`${API_HOST}/images`)
    .then((images) => setRepositoryImages(images.data));
};

/**
 * Uploads an image in the given form data and updates the images.
 *
 * @param {FormData} formData
 * @param {function} setRepositoryImages
 */
export const uploadImage = (formData, setRepositoryImages) => {
  axios.post(`${API_HOST}/images`, formData).then((res) => {
    getRepositoryImages(setRepositoryImages);
  });
};
