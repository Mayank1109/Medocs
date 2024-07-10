import React from "react";

const Info = () => {
  return (
    <div className="about__info grid">
      <div className="about__box">
        <button className="about__button">Stability</button>
        {/* <h3 className="about__title">Manage candidates easily</h3> */}
        <p className="about__subtitle">
          Secure, fast and reliable servers to keep you connected 24/7, no more
          crashes.
        </p>
      </div>
      <div className="about__box">
        <button className="about__button">Easy Onboarding</button>

        {/* <h3 className="about__title">User-friendly Hiring software</h3> */}
        <p className="about__subtitle">Simple 3 Step process to get started</p>
      </div>
      <div className="about__box">
        <button className="about__button">What is Medocs ?</button>

        {/* <h3 className="about__title">Make the perfect hire</h3> */}
        <p className="about__subtitle">
          Medocs is a healthcare platform that focus more on making a meaningful
          difference in people's lives.
        </p>
      </div>
    </div>
  );
};

export default Info;
