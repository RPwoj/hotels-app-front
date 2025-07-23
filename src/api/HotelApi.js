import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api";

export async function getHotels() {
    try {
      const res = await axios.get(baseUrl + "/hotels");
      return res.data.member;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

export async function getHotelInfo(hotelId) {
  try {
    const res = await axios.get(baseUrl + "/hotels/" + hotelId);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createHotel(data) {
  try {
    const res = await axios.post(baseUrl + "/hotels", data,
      {
        headers: {
          "Content-Type": "application/ld+json",
        }
      }
    );
    return res.data;
  } catch (err) {
    return err.response.data;
  }
}

export async function editHotel(data) {
  try {
    const res = await axios.patch(baseUrl + "/hotels/" + data.hotelId, data,
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        }
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function deleteHotel(id) {
  try {
    const res = await axios.delete(baseUrl + "/hotels/" + id);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAmenities() {
  try {
    const res = await axios.get(baseUrl + "/amenities");
    return res.data.member;
  } catch (err) {
    console.error(err);
    return null;
  }
}