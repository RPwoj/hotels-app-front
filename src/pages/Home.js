import HotelsList from "../components/HotelsList.js";
import FormHotel from "../components/FormHotel.js";

function Home() {
  return (
    <>
      <header className="App-header">
        <h1>Home page</h1>
      </header>

      <FormHotel formType="create"/>
      <section>
        <div className="container">
          <HotelsList />
        </div>
      </section>
    </>
  );
}

export default Home;
