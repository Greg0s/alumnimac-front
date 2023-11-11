import { notFound } from "next/navigation";
import { apiToken } from "./apiToken";

const axios = require("axios");

// Axios config
const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Authorization: `bearer ${apiToken}`,
    "Content-Type": "application/json",
  },
});

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
