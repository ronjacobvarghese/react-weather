import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import ItemSlider from "./components/ItemSlider";
import SideNav from "./components/SideNav";
import ProfileBar from "./components/ProfileBar";
import "./App.css";

function App() {

  async function fetchProfile() {
    try{
      const res = await fetch(
        'https://react-weather-7c7ac-default-rtdb.firebaseio.com/accounts.json'
      );

      if(!res.ok){
        throw new Error('Request Failed');
      }

      const data = await res.json();
    }catch(err){
      console.log(err.message || "something went wrong!");
    }
  }
  return (
    <div className="App">
      <SideNav />
      <section className="main-body">
        <Header />
        <Dashboard />
        <ItemSlider />
      </section>
      <section>
        <ProfileBar/>
      </section>
    </div>
  );
}

export default App;
