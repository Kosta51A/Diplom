import axios from "axios";

const API_URL = "https://travel-advisor.p.rapidapi.com";
const API_KEY = "c729a94493msha9fbf19b553d62cp115169jsn3cb573612e35";

export const getPlacesDetails = async (type, { lat: bl_latitude, lng: bl_longitude }, { lat: tr_latitude, lng: tr_longitude }) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/list-in-boundary`, {
      params: {
        bl_latitude,
        tr_latitude,
        bl_longitude,
        tr_longitude,
        limit: 100,
        open_now: 'false',
      },
      headers: {
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        "x-rapidapi-key": API_KEY,
      },
    });

    return response?.data?.data;
  } catch (error) {
    console.log("getPlacesDetails error: ", error);
    throw error; 
  }
};
