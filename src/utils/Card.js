import React, { useState, useEffect, useRef } from "react";
import { PORT } from '../config';
import UpdateCollectionForm from "../utils/UpdateCollectionForm";
import '../styles/Card.css';

function Card({ collection, parentCollectionIsPublic, image, subCollectionPage, collections, setCollections }) {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCustomConfirmDelete, setShowCustomConfirmDelete] = useState(false);
  const [showCustomConfirmChangePublic, setShowCustomConfirmChangePublic] = useState(false);
  const [subCollectionsCount, setSubCollectionsCount] = useState(0);
  const [showOperationsMenu, setShowOperationsMenu] = useState(false);
  const operationsMenuRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (operationsMenuRef.current && !operationsMenuRef.current.contains(event.target)) {
        setShowOperationsMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleUpdateImage = (collectionId) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".png, .jpg, .jpeg";
    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        handleUpdateCollectionImage(collectionId, formData);
      }
    };
    input.click();
  }

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

  const handleUpdateIsOwned = (collectionId) => {
    const isOwned = !collection.isOwned;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isOwned: isOwned
      })
    };
    fetch(`http://localhost:${PORT}/collection/${collectionId}/updateCollectionIsOwned?isOwned=${isOwned}`, requestOptions)
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
  }

  const handleUpdateIsPublic = (collectionId) => {
    const isPublic = !collection.isPublic;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isPublic: isPublic
      })
    };
    fetch(`http://localhost:${PORT}/collection/${collectionId}/updateCollectionIsPublic?isPublic=${isPublic}`, requestOptions)
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
  }

  const handleCustomConfirmChangePublic = () => {
    setShowCustomConfirmChangePublic(true);
  };

  const handleCloseCustomConfirmChangePublic = () => {
    setShowCustomConfirmChangePublic(false);
  };

  const parentIsPublic = !collection.parentCollectionId || (collection.parentCollectionId && parentCollectionIsPublic);

  const publicIconBtnClasses = ["public-icon-btn", "btn-with-tooltip"];
  if (!parentIsPublic) {
    publicIconBtnClasses.push("disabled");
  }

  const buttonsWithTooltip = document.querySelectorAll(".btn-with-tooltip");

  buttonsWithTooltip.forEach((button) => {
    let timer;

    button.addEventListener("mouseenter", () => {
      timer = setTimeout(() => {
        button.classList.add("show-tooltip");
      }, 700);
    });

    button.addEventListener("mouseleave", () => {
      clearTimeout(timer);
      button.classList.remove("show-tooltip");
    });
  });

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

  const handleClickOperationsMenu = () => {
    setShowOperationsMenu((prevShowOperationsMenu) => !prevShowOperationsMenu);
  };

  const websiteRegex = /^(https?:\/\/)?[\w.-]+\.\S+$/i;

  const urlWithProtocol = collection.websiteAddress.match(/^(http:\/\/|https:\/\/)/i)
  ? collection.websiteAddress
  : 'http://' + collection.websiteAddress;

  const uploadImage = `${process.env.PUBLIC_URL}/icons/file.svg`;
  const ownedIcon = `${process.env.PUBLIC_URL}/icons/owned.svg`;
  const wantedIcon = `${process.env.PUBLIC_URL}/icons/wanted.svg`;
  const publicIcon = `${process.env.PUBLIC_URL}/icons/public.svg`;
  const privateIcon = `${process.env.PUBLIC_URL}/icons/private.svg`;

  return (
    <div className="card-wrapper">
      <div className="card">
        <div className="image-container">
          <img className="card-img-top" src={image} alt={collection.title} />
          <button className="uploadImage-icon-btn btn-with-tooltip" onClick={() => handleUpdateImage(collection.collectionId)}>
            <img className="uploadImage-icon" src={uploadImage} alt="Owned Icon" />
            <span class="tooltip-text">upload image</span>
          </button>
          <button className="ownership-icon-btn btn-with-tooltip" onClick={() => handleUpdateIsOwned(collection.collectionId)}>
            {collection.isOwned ? (
              <>
                <span class="tooltip-text">I have this collection</span>
                <img className="ownership-icon" src={ownedIcon} alt="Owned Icon" />
              </>
            ) : (
              <>
                <span class="tooltip-text">I want this collection</span>
                <img className="ownership-icon" src={wantedIcon} alt="Wanted Icon" />
              </>
            )}
          </button>
          <button
            className={publicIconBtnClasses.join(" ")}
            onClick={parentIsPublic ? handleCustomConfirmChangePublic : null}
          >
            {collection.isPublic ? (
              <>
                <span className="tooltip-text">
                  Change to private
                </span>
                <img className="public-icon" src={publicIcon} alt="Public Icon" />
              </>
            ) : (
              <>
                <span className="tooltip-text">
                  {parentIsPublic
                    ? "Change to public"
                    : "Subcollection cannot change to public when the parent collection is private."}
                </span>
                <img className="public-icon" src={privateIcon} alt="Private Icon" />
              </>
            )}
          </button>
        </div>
        <div className="card-body">
          <h5 className="card-title card-element" >{collection.title}</h5>
          <h5 className={`card-text card-website card-element ${!collection.websiteAddress ? 'default-text' : ''}`}>
            {!collection.websiteAddress ? (
              'Collection Website Address'
            ) : websiteRegex.test(collection.websiteAddress) ? (
              <a href={urlWithProtocol} target="_blank" rel="noreferrer">
                {collection.websiteAddress}
              </a>
            ) : (
              collection.websiteAddress
            )}
          </h5>
          <p className={`card-text card-description card-element ${!collection.description ? 'default-text' : ''}`}>
            {!collection.description ? 'Collection Description' : collection.description}
          </p>
          <div className="operations-container" >
            <button className="btn btn-primary operation-btn" onClick={handleClickOperationsMenu}>
              Operations
            </button>
              {showOperationsMenu && (
                <div ref={operationsMenuRef} className="operations-menu">
                  <button className="btn btn-primary operation-item" onClick={subCollectionPage}>
                    Check/Add SubCollections
                  </button>
                  <button className="btn btn-primary operation-item" onClick={handleShowUpdateForm}>
                    Edit Content
                  </button>
                  <button className="btn btn-danger operation-item" onClick={handleCustomConfirmDelete}>
                    Delete Collection
                  </button>
                </div>
              )}
          </div>
        </div>
        {showUpdateForm && (
          <div className="update-form-container">
            <UpdateCollectionForm
              collection={collection}
              onUpdate={handleUpdateCollectionContext}
              onClose={handleCloseUpdateForm}
            />
          </div>
        )}
        {showCustomConfirmChangePublic && (
          <div className="custom-confirm-change">
            <div className="custom-confirm-change-content">
              <p>Are you sure you want to change the collection to {collection.isPublic ? "private" : "public"}? <br/>
                All subcollections of this collection will follow the change unless adjusted individually.</p>
              <button
                className="btn btn-danger"
                onClick={() => {
                  console.log(parentIsPublic);
                  handleUpdateIsPublic(collection.collectionId);
                  handleCloseCustomConfirmChangePublic();
                }}
              >
                Confirm
              </button>
              <button className="btn btn-secondary" onClick={handleCloseCustomConfirmChangePublic}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {showCustomConfirmDelete && (
          <div className="custom-confirm-change">
            <div className="custom-confirm-change-content">
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