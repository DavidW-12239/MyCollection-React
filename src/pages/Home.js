
import Card from "../utils/Card";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCollectionForm from '../utils/AddCollectionForm'
import UpdateCollectionForm from "../utils/UpdateCollectionForm";
import UpdateCollectionFile from "../utils/UpdateCollectionFile";

function Home() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateFile, setShowUpdateFile] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);

  const fetchUser = () => {
    fetch(`http://localhost:${PORT}/user/${userId}/profile`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const fetchCollections = () => {
    fetch(`http://localhost:${PORT}/collection/${userId}/mainCollections`)
      .then((response) => response.json())
      .then((data) => {
        setCollections(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchCollections();
  },[]);

  const handleAddCollection = (formData) => {
    const requestOptions = {
      method: 'POST',
      body: formData
    };
  
    fetch(`http://localhost:${PORT}/collection/${userId}/addMainCollection`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setCollections((prevCollections) => [...prevCollections, data]);
        setShowAddForm(false);
        fetchCollections();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleCloseAddForm = () =>{
    setShowAddForm(false);
  }

  const handleSubCollections = (collectionId) => {
    navigate(`/${userId}/collection/${collectionId}/subCollections`);
  };

  const handleShowUpdateForm = (collection) => {
    setSelectedCollection(collection);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
  };

  const handleShowUpdateFile = (collection) => {
    setSelectedCollection(collection);
    setShowUpdateFile(true);
  };

  const handleCloseUpdateFile = () => {
    setShowUpdateFile(false);
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

  const handleDeleteMainCollection  = (collectionId) => {
    fetch(`http://localhost:${PORT}/collection/${userId}/${collectionId}/deleteMainCollection`, {
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
    <div className="container">
      <h1>Welcome, {user.userName}</h1>

      <button onClick={() => setShowAddForm(!showAddForm)}>Add Collection</button>
      {showAddForm && 
      <AddCollectionForm 
        addCollection={handleAddCollection} 
        onClose={handleCloseAddForm}
      />}

      {showUpdateForm && selectedCollection && (
        <UpdateCollectionForm
          collection={selectedCollection}
          onUpdate={handleUpdateCollectionContext}
          onClose={handleCloseUpdateForm}
        />
      )}

      {showUpdateFile && selectedCollection && (
        <UpdateCollectionFile
          collection={selectedCollection}
          onUpdate={handleUpdateCollectionImage}
          onClose={handleCloseUpdateFile}
        />
      )}

      <div>
        {collections.map((collection) => (
          <Card
            key={collection.collectionId}
            collection={collection}
            image={`${process.env.PUBLIC_URL}/images/${collection.image}`}
            onClick={() => handleSubCollections(collection.collectionId)}
            onShowUpdateFile={() => handleShowUpdateFile(collection)}
            onShowUpdateForm={() => handleShowUpdateForm(collection)}
            onDelete={() => handleDeleteMainCollection(collection.collectionId)}
        />
        ))}
      </div>
    </div>
  );
}

export default Home;
