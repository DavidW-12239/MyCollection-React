import React, { useState, useEffect } from 'react';

function UpdateCollectionFile({ collection, onUpdate, onClose }) {
    const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(collection.image);
  }, [collection]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('image', image);
    onUpdate(collection.collectionId, formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      <button type="submit">Update Image</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
}

export default UpdateCollectionFile;
