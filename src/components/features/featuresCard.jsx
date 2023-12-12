import React from "react";

const FeaturesCard = ({ item }) => {
  return (
    <div className="features__card" key={item.id}>
      <div>
        <h2 className="card_head">{item.num}</h2>
        <h3 className="features__title">{item.sub}</h3>
      </div>
      <div>
        <p>
          {item.desc}
          <span style={{ color: "var(--title-color-dark)" }}>{item.extra}</span>
        </p>
      </div>
    </div>
  );
};

export default FeaturesCard;
