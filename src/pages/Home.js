import { useState, useEffect } from 'react';
import HotelsList from "../components/HotelsList.js";
import FormHotel from "../components/FormHotel.js";
import Container from 'react-bootstrap/Container';
import { getHotels } from "../api/HotelApi.js";

function Home() {
  const [data, setData] = useState([]);

  async function refreshData() {
      const hotels = await getHotels();
      setData(hotels);
  }

  useEffect(() => {
      refreshData();
  }, []);

  return (
    <section>
      <Container>
        <FormHotel formType="create" refreshFn={refreshData}/>
        <HotelsList data={data} refreshFn={refreshData}/>
      </Container>
    </section>
  );
}

export default Home;
