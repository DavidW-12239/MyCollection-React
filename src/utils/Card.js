import React, { useState } from "react";
import { PORT } from '../config';
import UpdateCollectionForm from "../utils/UpdateCollectionForm";
import UpdateCollectionFile from "../utils/UpdateCollectionFile";
import '../styles/Card.css';

function Card({ collection, image, onClick, collections, setCollections }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateFile, setShowUpdateFile] = useState(false);
  
  const handleShowUpdateForm = () => {
    setShowUpdateForm((prevShowUpdateForm) => !prevShowUpdateForm);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleUpdateCollectionContext = (collectionId, formData) => {
    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    fetch(`http://localhost:${PORT}/collection/${collectionId}/updateCollectionContext`, requestOptions)
      .then((response) => response.json())
      .then((updatedCollection) => {
        setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.collectionId === collectionId ? updatedCollection : collection
        )
      );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleShowUpdateFile = () => {
    setShowUpdateFile((prevShowUpdateFile) => !prevShowUpdateFile);
  };

  const handleCloseUpdateFile = () => {
    setShowUpdateFile(false);
  };

  const handleUpdateCollectionImage = (collectionId, formData) => {
    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    fetch(`http://localhost:${PORT}/collection/${collectionId}/updateCollectionImage`, requestOptions)
      .then((response) => response.json())
      .then((updatedCollection) => {
        setCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.collectionId === collectionId ? updatedCollection : collection
        )
      );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteCollection  = (collectionId) => {
    fetch(`http://localhost:${PORT}/collection/${collectionId}/deleteCollection`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setCollections(collections.filter(collection => collection.collectionId !== collectionId))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="card-wrapper">
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
          <button className="btn btn-primary" onClick={handleShowUpdateFile}>
            Update Image
          </button>
          <button className="btn btn-primary" onClick={handleShowUpdateForm}>
            Update Context
          </button>
          <button className="btn btn-danger" onClick={() => handleDeleteCollection(collection.collectionId)}>
            Delete Collection
          </button>
        </div>
        {showUpdateFile && (
          <div className="update-form-container">
            <UpdateCollectionFile
              collection={collection}
              onUpdate={handleUpdateCollectionImage}
              onClose={handleCloseUpdateFile}
            />
          </div>
        )}
        {showUpdateForm && (
          <div className="update-form-container">
            <UpdateCollectionForm
              collection={collection}
              onUpdate={handleUpdateCollectionContext}
              onClose={handleCloseUpdateForm}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
