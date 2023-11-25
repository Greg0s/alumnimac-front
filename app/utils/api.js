import { notFound } from "next/navigation";
import { apiToken } from "./apiToken";

const axios = require("axios");

axios.defaults.withCredentials = true;

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

// Axios config
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `bearer ${apiToken}`,
    "Content-Type": "application/json",
  },
});

// Experiences

export async function getExperiences() {
  try {
    const response = await axiosInstance.get("/experiences");

    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`);
    }

    return response.data.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

export async function getExperience(id) {
  try {
    const response = await axiosInstance.get("/experiences/" + id);

    if (response.status !== 200) {
      notFound();
    }

    return response.data.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

// Auth

export async function signUp(
  _firstName,
  _lastName,
  _graduationYear,
  _email,
  _password
) {
  const data = {
    first_name: _firstName,
    last_name: _lastName,
    graduation_year: _graduationYear,
    username: _email,
    email: _email,
    password: _password,
  };

  try {
    const response = await axios.post(baseUrl + "auth/local/register", data);

    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`);
    }
    console.log(response.data.data);
    return response.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

export async function signIn(_email, _password) {
  const data = {
    identifier: _email,
    password: _password,
  };

  try {
    const response = await axios.post(baseUrl + "auth/local", data);

    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

export async function refreshToken() {
  const data = {
    refreshToken: localStorage.getItem("token"),
  };

  const options = {
    "Access-Control-Allow-Credentials": true,
    withCredentials: true,
  };

  try {
    const response = await axios.post(baseUrl + "token/refresh", data, options);

    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}
