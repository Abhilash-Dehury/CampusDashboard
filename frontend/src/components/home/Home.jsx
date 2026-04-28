
import Navbar from "../Navbar.jsx";
import Banner from "../Banner.jsx";
import StudySection from "../study/StudySection.jsx";

import Resources from "../Resources.jsx";
import Footer from "../Footer.jsx";


export default function Home() {



  return (
    <>
      <Navbar />

      {/* 1. Hero Banner */}
      <div className="pt-16">
        <Banner />
      </div>

      {/* 2. Study Section — NEW feature your teacher asked for */}
      <StudySection />


      {/* 4. Free Resources Carousel */}
      <Resources />

      <Footer />
    </>
  );
}
