import React from "react";
import '../styles/Card.css';

function Card(props) {
  return (
    <div className="card">
      <img className="card-img-top" src={props.image} alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.context}</p>
        <button className="btn btn-primary" onClick={props.onClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
}

export default Card;
