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
    // console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createHotel(data) {
  // console.log('-----create-----');
  // console.log(data);
  // console.log('-----create-----');

  try {
    const res = await axios.post(baseUrl + "/hotels", data,
      {
        headers: {
          "Content-Type": "application/ld+json",
        }
      }
    );
    // console.log(res);
    return res.data;
  } catch (err) {
    // console.error(err.response.data.detail);
    return err.response.data;
  }
}

export async function editHotel(data) {
  // console.log('-----edit-----');
  // console.log(data);
  // console.log('-----edit-----');

  try {
    const res = await axios.patch(baseUrl + "/hotels/" + data.hotelId, data,
      {
        headers: {
          "Content-Type": "application/merge-patch+json",
        }
      }
    );
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function deleteHotel(id) {
  // console.log('-----delete-----');
  console.log(id);
  // console.log('-----delete-----');

  try {
    const res = await axios.delete(baseUrl + "/hotels/" + id);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getAmenities() {
  try {
    const res = await axios.get(baseUrl + "/amenities");
    console.log(res.data);
    return res.data.member;
  } catch (err) {
    console.error(err);
    return null;
  }
}