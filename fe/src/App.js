import { useRef } from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <NavBar
        onScroll={handleScroll}
        homeRef={homeRef}
        aboutRef={aboutRef}
        contactRef={contactRef}
      />
      <HomePage homeRef={homeRef} aboutRef={aboutRef} contactRef={contactRef} />
    </div>
  );
}

export default App;
