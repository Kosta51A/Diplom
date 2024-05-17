import axios from "axios";

const API_URL = "https://travel-advisor.p.rapidapi.com";
const API_KEY = "effca7c8b5msh8ee93c1f7b98722p1b5d1ajsn88f56fdea3b9";

export const getPlacesDetails = async (type, { lat: bl_latitude, lng: bl_longitude }, { lat: tr_latitude, lng: tr_longitude }) => {
  try {
    const response = await axios.get(`${API_URL}/${type}/list-in-boundary`, {
      params: {
        bl_latitude,
        tr_latitude,
        bl_longitude,
        tr_longitude,
        limit: 30,
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
