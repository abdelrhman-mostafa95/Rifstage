import "@fontsource/poppins";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Home/Home";
import Music from "./Music/Music";
import News from "./News/News";
import Videos from "./Videos/Videos";
import DevicesSection from "./Rules/Rules";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Music />
      <News />
      <Videos />
      <DevicesSection />
    </>
  );
}

export default App;
