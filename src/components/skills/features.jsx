import React from "react";

const Features = ({ item }) => {
  return (
    <div className="features__card" key={item.id}>
      <h2>{item.num}</h2>
      <h3 className="features__title">{item.sub}</h3>
      <p>{item.desc}</p>
    </div>
  );
};

export default Features;
