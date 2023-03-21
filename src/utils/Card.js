import React from "react";
import '../styles/Card.css';

function Card({ collection, image, onClick, onShowUpdateFile, onShowUpdateForm, onDelete }) {
  return (
    <div className="card">
      <img className="card-img-top" src={image} alt={collection.title} />
      <div className="card-body">
        <h5 className="card-title">{collection.title}</h5>
        <h5 className="card-title">{collection.websiteAddress}</h5>
        <p className="card-text">{collection.description}</p>
        <p className={collection.isOwned ? "owned" : "wanted"}>
          {collection.isOwned ? "Owned" : "Wanted"}
        </p>
        <button className="btn btn-primary" onClick={onClick}>
          Check/Add SubCollections
        </button>
        <button className="btn btn-primary" onClick={() => onShowUpdateFile()}>
          Update Image
        </button>
        <button className="btn btn-primary" onClick={() => onShowUpdateForm()}>
          Update Context
        </button>
        <button className="btn btn-danger" onClick={() => onDelete()}>
          Delete Collection
        </button>
      </div>
    </div>
  );
}

export default Card;
