import { notFound } from "next/navigation";
import { apiToken } from "./apiToken";

const axios = require("axios");

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

export async function signUp(_username, _email, _password) {
  const data = {
    username: _username,
    email: _email,
    password: _password,
  };
  console.log(axiosInstance);

  try {
    const response = await axios.post(baseUrl + "auth/local/register", data);

    if (response.status !== 200) {
      throw new Error(`Erreur ${response.status}`);
    }
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("Error while retrieving data: ", error);
    return null;
  }
}

// export async function signIn(username, email, password) {
//   try {
//     const response = await axiosInstance.get("/auth/local/register");

//     if (response.status !== 200) {
//       throw new Error(`Erreur ${response.status}`);
//     }

//     return response.data.data;
//   } catch (error) {
//     console.log("Error while retrieving data: ", error);
//     return null;
//   }
// }

// export function signOut() {
//   const router = useRouter();
//   localStorage.removeItem("jwt");
//   localStorage.removeItem("username");
//   router.push("/");
// }
