import "@fontsource/poppins";
import "./App.css";
import Navbar from "./NavBar/Navbar";
import Home from "./Home/Home";
import Music from "./Music/Music";
import News from "./News/News";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <Music />
      <News />
    </>
  );
}

export default App;
