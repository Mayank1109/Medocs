import React from "react";
import Community from "../../ui/community";
const ServiceInfo = () => {
  return (
    <div className="service__info grid">
      <div className="service__box">
        <Community />
        <h1> Manage</h1>
        <h2>all your medical documents in one place</h2>

        <div className="service__card__btn__grp">
          <button className="service__btn">LEARN MORE</button>
        </div>
      </div>
      <div className="service__box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M11.75 3.5a.75.75 0 0 1 .75.75v15.5a.75.75 0 0 1-1.5 0V4.25a.75.75 0 0 1 .75-.75zm6.5 3.625a.75.75 0 0 1 .75.75V19.75a.75.75 0 0 1-1.5 0V7.875a.75.75 0 0 1 .75-.75zM5.25 11a.75.75 0 0 1 .75.75v8a.75.75 0 0 1-1.5 0v-8a.75.75 0 0 1 .75-.75z"
            fill="#fffff"
          />
        </svg>
        <h1> Insights</h1>
        <h2>To help you understand your records better</h2>
        <div className="service__card__btn__grp">
          <button className="service__btn">LEARN MORE</button>
        </div>
      </div>
      <div className="service__box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fffff"
            d="M12 16q1.7 0 3.775-.675T22 12.95v-.375q0-1.275-1.025-2.05t-2.25-.425q-.425.125-.862.3t-1.163.45q-1.525.65-2.575.9T12 12q-1.125 0-2.175-.262t-2.65-.913q-.6-.25-1.037-.412t-.838-.288q-1.225-.4-2.262.375T2 12.575v.325q3.275 1.5 5.75 2.3T12 16m0 6q3.45 0 6.063-1.888t3.537-4.837q-3.275 1.4-5.5 2.063T12 18q-1.9 0-4.337-.712T2.35 15.25q.85 3.075 3.425 4.913T12 22m0-12q-1.65 0-2.825-1.175T8 6q0-1.65 1.175-2.825T12 2q1.65 0 2.825 1.175T16 6q0 1.65-1.175 2.825T12 10"
          />
        </svg>
        <h1> Track</h1>
        <h2>Your vitals and improve your personal growth</h2>
        <div className="service__card__btn__grp">
          <button className="service__btn">LEARN MORE</button>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
