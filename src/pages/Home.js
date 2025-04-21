import { getHotels } from "../api/HotelApi.js";
import { useState, useEffect } from 'react';

console.log(getHotels());

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Home page</h1>
      </header>
    </div>
  );
}

export default Home;
