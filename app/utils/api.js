import { notFound } from "next/navigation";
import { apiToken } from "./apiToken";
import { calcDuration } from "./functions";

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

const axiosInstancePublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Experiences

export async function getExperiences() {
  try {
    const response = await axiosInstancePublic.get(
      "/experiences?populate=author"
    );

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
    const response = await axiosInstancePublic.get(
      "/experiences/" + id + "?populate=author"
    );

    if (response.status !== 200) {
      notFound();
    }

    return response.data.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

export async function addExperience(experience) {
  const data = setExperienceData(experience);
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.post(baseUrl + "experiences", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erreur ${response.status}`);
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while retrieving data: ", error);
      return null;
    }
  } else throw new Error(`User not connected`);
}

export async function updateExperience(id, experience) {
  const data = setExperienceData(experience);
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.put(baseUrl + "experiences/" + id, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erreur ${response.status}`);
      }
      return response;
    } catch (error) {
      console.log("Error while retrieving data: ", error);
      return null;
    }
  } else throw new Error(`User not connected`);
}

function setExperienceData(experience) {
  const userId = localStorage.getItem("userId");

  let endDate = null;
  let _duration = null;
  if (!experience.ongoing) {
    endDate = experience.endDate;
    _duration = calcDuration(experience.startDate, experience.endDate);
  }

  let _compensation = 0;
  if (experience.paid) _compensation = experience.compensation;

  const data = {
    data: {
      position: experience.position,
      type: experience.type,
      company: experience.company,
      start_date: experience.startDate,
      ongoing: experience.ongoing,
      end_date: endDate,
      work_mode: experience.workMode,
      country: experience.country,
      city: experience.city,
      address: experience.address,
      paid: experience.paid,
      compensation: _compensation,
      domain: experience.domain,
      not_recommended: experience.not_recommended,
      description: experience.description,
      author: parseInt(userId),
      duration: _duration,
    },
  };

  return data;
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

export async function getMe() {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const response = await axios.get(baseUrl + "users/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Erreur ${response.status}`);
      }
      console.log(response);
      return response;
    } catch (error) {
      console.log("Error while retrieving data: ", error);
      return null;
    }
  } else throw new Error(`User not connected`);
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
