import HotelsList from "../components/HotelsList.js";

function Home() {
  return (
    <>
      <header className="App-header">
        <h1>Home page</h1>
      </header>
      <section>
        <div className="container">
          <HotelsList />
        </div>
      </section>
    </>
  );
}

export default Home;
