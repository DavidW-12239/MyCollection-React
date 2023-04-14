import { useState } from 'react';
import '../styles/AddCollectionForm.css';

function AddCollectionForm({ addCollection, onClose }) {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [websiteAddress, setWebsiteAddress] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isOwned, setIsOwned] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showDefaultWebsiteAddress, setShowDefaultWebsiteAddress] = useState(true);
  const [showDefaultDescription, setShowDefaultDescription] = useState(true);

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
      isPublic,
    });
  
    formData.append('collection', collectionData);
    formData.append('image', image);
    addCollection(formData);
    setTitle('');
    setWebsiteAddress('');
    setDescription('');
    setImage(null);
    setIsOwned(false);
    setIsPublic(false);
    setShowDefaultWebsiteAddress(true);
    setShowDefaultDescription(true);
  };

  const handleWebsiteAddressChange = (event) => {
    const websiteAddress = event.target.value;
    setWebsiteAddress(websiteAddress);
    setShowDefaultWebsiteAddress(websiteAddress === '');
  };

  const handleDescriptionChange = (event) => {
    const description = event.target.value;
    setDescription(description);
    setShowDefaultDescription(description === '');
  };

  return (
    <div className="card add-collection-form">
      <div className="card-body">
        <h5 className="card-title">Add Collection</h5>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="collection title" maxLength="25" size="25"/>
              {titleError && <div className="error-message">{titleError}</div>}
            </div>
            <div>
              <label htmlFor="websiteAddress">Website Address</label>
              <input type="text" id="websiteAddress" value={websiteAddress} maxLength="50" size="25"
              onChange={handleWebsiteAddressChange} placeholder="collection website address"/>  
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea id="description" value={description} maxLength="500"
              onChange={handleDescriptionChange} placeholder="collection description"/>
            </div>
            <div>
              <label htmlFor="isOwned">Owned</label>
              <input type="checkbox" id="isOwned" checked={isOwned} onChange={(e) => setIsOwned(e.target.checked)} />
            </div>
            <div>
              <label htmlFor="isPublic">Public</label>
              <input type="checkbox" id="isPublic" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input type="file" id="image" size="15" accept=".png, .jpg, .jpeg" onChange={(e) => setImage(e.target.files[0])}/>
            </div>
            <button type="submit">Add Collection</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </form>
      </div>
    </div>
  );
};
export default AddCollectionForm;
 