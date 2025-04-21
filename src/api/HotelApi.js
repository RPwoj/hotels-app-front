import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";


export async function getHotels() {
    try {
      const res = await axios.get(baseUrl + "/hotels");
      return res.data.member;
    } catch (err) {
      console.error(err);
      return null; // or handle it however you want
    }
  }