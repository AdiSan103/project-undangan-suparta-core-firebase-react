import React from "react";

const Comentar = ({ desc, title, date }) => {
  return (
    <div className="comentar-part py-2">
      <div className="border">
        <div className="d-flex">
          <span className="alexbrush display-1 ">"</span>
          <p className="playfairdisplay">{desc}</p>
        </div>
        <p className="fst-italic date">{date}</p>
        <p className="fst-italic name">@{title}</p>
      </div>
    </div>
  );
};
export default Comentar;
