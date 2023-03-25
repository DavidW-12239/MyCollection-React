import { useState } from 'react';

function AddCollectionForm({ addCollection, onClose }) {
  const [title, setTitle] = useState('');
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isOwned, setIsOwned] = useState(false);
  const [titleError, setTitleError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (title.trim() === '') {
      setTitleError('Title cannot be empty');
      return;
    }
  
    const collectionData = JSON.stringify({
      title,
      websiteAddress,
      description,
      isOwned,
    });
  
    formData.append('collection', collectionData);
    formData.append('image', image);
    addCollection(formData);
    setTitle('');
    setWebsiteAddress('');
    setDescription('');
    setImage(null);
    setIsOwned(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        {titleError && <div className="error-message">{titleError}</div>}
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
      <div>
        <label htmlFor="image">Image</label>
        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])}/>
      </div>
      <button type="submit">Add Collection</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};
export default AddCollectionForm;
