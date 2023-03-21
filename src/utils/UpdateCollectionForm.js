import React, { useState, useEffect } from 'react';

function UpdateCollectionForm({ collection, onUpdate, onClose }) {
  const [title, setTitle] = useState('');
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    setTitle(collection.title);
    setWebsiteAddress(collection.websiteAddress);
    setDescription(collection.description);
    setIsOwned(collection.isOwned);
  }, [collection]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    const collectionData = JSON.stringify({
      title,
      websiteAddress,
      description,
      isOwned,
    });

    formData.append('collection', collectionData);
    onUpdate(collection.collectionId, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="websiteAddress">Website Address</label>
        <input type="text" id="websiteAddress" value={websiteAddress} onChange={(e) => setWebsiteAddress(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="isOwned">Owned</label>
        <input type="checkbox" id="isOwned" checked={isOwned} onChange={(e) => setIsOwned(e.target.checked)} />
      </div>
      <button type="submit">Update Collection</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default UpdateCollectionForm;
