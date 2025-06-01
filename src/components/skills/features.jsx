import React from "react";
import itemImage from "../../assets/service3.jpg";
const Features = ({ item }) => {
  return (
    <div className="features__card" key={item.id}>
      <h2 className="item__img">{item.num}</h2>
      {/* <img src={itemImage} /> */}
      <h3 className="features__title">{item.sub}</h3>
      <p>{item.desc}</p>
    </div>
  );
};

export default Features;
