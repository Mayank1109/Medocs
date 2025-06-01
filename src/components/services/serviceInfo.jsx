import React from "react";
import Community from "../../ui/community";
import Arrow2 from "../../ui/arrow2";
const ServiceInfo = () => {
  return (
    <div className="service__info grid">
      <div className="service__box">
        <div className="service__main"></div>
        <div className="service__sub">
          <h1> Manage</h1>
          <h2>all your medical documents in one place</h2>

          <div className="service__card__btn__grp">
            <button className="service__btn">
              LEARN MORE
              <Arrow2 />
            </button>
          </div>
        </div>
      </div>
      <div className="service__box">
        <div className="service__main"></div>
        <div className="service__sub">
          <h1> Insights</h1>
          <h2>To help you understand your records better</h2>
          <div className="service__card__btn__grp">
            <button className="service__btn">
              LEARN MORE <Arrow2 />
            </button>
          </div>
        </div>
      </div>
      <div className="service__box">
        <div className="service__main"></div>
        <div className="service__sub">
          <h1> Track</h1>
          <h2>Your vitals and improve your personal growth</h2>
          <div className="service__card__btn__grp">
            <button className="service__btn">
              LEARN MORE <Arrow2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
