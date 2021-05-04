import axios from "axios";

import ENV from "./config";
const API_HOST = ENV.api_host;

/** All axios calls in one place *********************************************/
axios.defaults.withCredentials = true;

/**
 * Checks whether a user is already logged in using the session cookie and sets
 * the state accordignly if so.
 *
 * @param {function} setID - Function to update the ID of the app state.
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
 * @param {string} username - Username used to login.
 * @param {string} password - Password used to login.
 * @param {function} setID - Function to update the ID of the app state.
 * @param {function} setInfoText - Function used to set the informational text
 * of the login page.
 */
export const handleLogin = (username, password, setID, setInfoText) => {
  const loginInfo = { username: username, password: password };
  axios
    .post(`${API_HOST}/users/login`, loginInfo)
    .then((res) => setID(res.data.id))
    .catch((err) => {
      setInfoText("Invalid credentials");
    });
};

/**
 * Logs out the current user and clears their personal images.
 *
 * @param {function} setID  - Function to update the ID of the app state.
 * @param {function} setPersonalImages - Function used to set the user's own
 * images array in the app state.
 */
export const handleLogout = (setID, setPersonalImages) => {
  axios.get(`${API_HOST}/users/logout`).then((res) => {
    setID(null);
    setPersonalImages([]);
  });
};

/**
 * Creates a user with the given username and password and sets the info text
 * based on the response.
 *
 * @param {string} username - Username used to sign up.
 * @param {string} password - Password used to sign up.
 * @param {function} setInfoText - Function used to set the informational text
 * of the login page.
 */
export const handleSignup = (username, password, setInfoText) => {
  const signupInfo = { username: username, password: password };
  axios
    .post(`${API_HOST}/users`, signupInfo)
    .then((res) => setInfoText("User created!"))
    .catch((err) => setInfoText("Use different username."));
};

/**
 * Gets all the images in the repository and sets them in the app state.
 *
 * @param {function} setGalleryImages - Function used to set the gallery images
 * array in the app state.
 */
export const getGalleryImages = (setGalleryImages) => {
  axios
    .get(`${API_HOST}/images`)
    .then((images) => setGalleryImages(images.data));
};

/**
 * Gets the user's images in the repository and sets them in the app state.
 *
 * @param {string} id - Current user's ID
 * @param {function} setPersonalImages - Function used to set the user's own
 * images array in the app state.
 */
export const getPersonalImages = (id, setPersonalImages) => {
  axios
    .get(`${API_HOST}/images/${id}`)
    .then((images) => setPersonalImages(images.data));
};

/**
 * Uploads an image in the given form data and updates the images.
 *
 * @param {FormData} formData - Form data contaning the image and corresponding
 * information used for the request.
 * @param {function} setGalleryImages - Function used to set the gallery images
 * array in the app state.
 */
export const uploadImage = (
  id,
  formData,
  setGalleryImages,
  setPersonalImages
) => {
  axios.post(`${API_HOST}/images`, formData).then((res) => {
    getGalleryImages(setGalleryImages);
    getPersonalImages(id, setPersonalImages);
  });
};
