import React from "react";
import Header from "../components/header/Header";
import Home from "../components/home/Home";
import Services from "../components/services/Services";
import About from "../components/about/About";
import Features from "../components/features/feature";
import Extra from "../components/extra/Extra";
import Footer from "../components/footer/Footer";
import ScrollUp from "../components/scroll/Scrollup";

const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <About />
        <Extra />
        <Features />
        <Services />
        <About />
      </main>
      <Footer />
      {/* <ScrollUp /> */}
    </>
  );
};

export default HomePage;
