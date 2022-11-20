import { Fragment, useState } from 'react';


import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ItemSlider from "./components/ItemSlider";
import SideNav from "./components/SideNav";
import ProfileBar from "./components/ProfileBar";
import BookmarkPage from './components/BookmarkPage';

import "./App.css";

function App() {
  const [isActive, setIsActive] = useState(true);

  // async function fetchProfile() {
  //   try {
  //     const res = await fetch(
  //     );

  //     if (!res.ok) {
  //       throw new Error("Request Failed");
  //     }

  //     const data = await res.json();
  //   } catch (err) {
  //     console.log(err.message || "something went wrong!");
  //   }
  // }

  function onGeoClickHandler(){
    setIsActive(false);
  }

  function onBookmarkClickHandler() {
    setIsActive(true);
  }


  return (
    <Fragment>
      <div className="App">
        <SideNav onGeoClick = {onGeoClickHandler} onBookmarkClick = {onBookmarkClickHandler} isActive = {isActive} />
        {!isActive && <section className="main-body">
          <Header />
          <Dashboard />
          <ItemSlider />
        </section>}
        {isActive && <section className = "main-body">
          <BookmarkPage onGeoClick = {onGeoClickHandler}/>
          </section>}
        <section>
          <ProfileBar/>
        </section>
      </div>
    </Fragment>
  );
}

export default App;
