import axios from "axios";
import { CLARIFAI_API_KEY, IMGUR_KEY } from "@env";

const getKey = (key) => {
  const keyArray = key.split(',')
  const randomIndex = Math.floor(Math.random() * keyArray.length)
  return keyArray[randomIndex];
}

export const CLARIFAI = axios.create({
  baseURL:
    "https://api.clarifai.com/v2/models/aaa03c23b3724a16a56b629203edc62c/outputs",
  headers: {
    "Content-Type": "application/json",
    Authorization: getKey(CLARIFAI_API_KEY),
  },
});

export const API = axios.create({
  baseURL: "https://happy-amos.herokuapp.com/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export const IMGUR = axios.create({
  baseURL: "https://api.imgur.com/3/upload",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    redirect: "follow",
    Authorization: getKey(IMGUR_KEY),
  },
});
