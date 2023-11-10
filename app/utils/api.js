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

// fetch call that is working too
// export async function getExperiences() {
//   const url = process.env.API_URL + "experiences";

//   try {
//     const res = await fetch(url, {
//       headers: { Authorization: "Bearer " + apiToken },
//     });

//     if (!res.ok) {
//       throw new Error(`Erreur ${res.status}`);
//     }
//     return await res.json();
//   } catch (error) {
//     console.log("Erreur lors de la récupération des données : ", error);
//     return null;
//   }
// }
