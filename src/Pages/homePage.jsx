import React from "react";
import Header from "../components/header/Header";
import Home from "../components/home/Home";
import Services from "../components/services/Services";
import About from "../components/about/About";
import Skills from "../components/skills/Skills";
import Extra from "../components/extra/Extra";
import ScrollUp from "../components/scroll/Scrollup";
const HomePage = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Home />
        <Services />
        <About />
        <Skills />
        <Extra />
      </main>
      {/* <ScrollUp /> */}
    </>
  );
};

export default HomePage;
