import React, { useState, useEffect } from "react";
import { PORT } from '../config';
import UpdateCollectionForm from "../utils/UpdateCollectionForm";
import UpdateCollectionFile from "../utils/UpdateCollectionFile";
import '../styles/Card.css';

function Card({ collection, image, onClick, collections, setCollections }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateFile, setShowUpdateFile] = useState(false);
  const [showCustomConfirmDelete, setShowCustomConfirmDelete] = useState(false);
  const [subCollectionsCount, setSubCollectionsCount] = useState(0);

  useEffect(() => {
    fetch(`http://localhost:${PORT}/collection/${collection.collectionId}/subCollectionsCount`)
      .then((response) => response.json())
      .then((count) => {
        setSubCollectionsCount(count);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [collection.collectionId]);

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

  const handleCustomConfirmDelete = () => {
    setShowCustomConfirmDelete(true);
  };

  const handleCloseCustomConfirmDelete = () => {
    setShowCustomConfirmDelete(false);
  };

  const handleDeleteCollection = (collectionId) => {
    proceedToDelete(collectionId);
  };

  const proceedToDelete = (collectionId) => {
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
          <h5 className="card-title card-element" >{collection.title}</h5>
          <h5 className="card-text card-website card-element">{collection.websiteAddress}</h5>
          <p className="card-text card-description card-element">{collection.description}</p>
          <div className="card-element">
            <p className={collection.isOwned ? "owned" : "wanted"}>
              {collection.isOwned ? "Owned" : "Wanted"}
            </p>
          </div>
          <button className="btn btn-primary card-element" onClick={onClick}>
            Check/Add SubCollections
          </button>
          <button className="btn btn-primary card-element" onClick={handleShowUpdateFile}>
            Update Image
          </button>
          <button className="btn btn-primary card-element" onClick={handleShowUpdateForm}>
            Update Context
          </button>
          <button className="btn btn-danger card-element" onClick={handleCustomConfirmDelete}>
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
        {showCustomConfirmDelete && (
          <div className="custom-confirm-delete">
            <div className="custom-confirm-delete-content">
              <p>Are you sure you want to delete this collection?</p>
              {subCollectionsCount > 0 && (
                <p className="alert alert-warning" role="alert">
                  Warning: This collection has {subCollectionsCount} subcollection(s). Deleting this collection will also delete its subcollections.
                </p>
              )}
              <button
                className="btn btn-danger"
                onClick={() => {
                  handleDeleteCollection(collection.collectionId);
                  handleCloseCustomConfirmDelete();
                }}
              >
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={handleCloseCustomConfirmDelete}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Card;