
import Card from "../utils/Card";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import AddCollectionForm from '../utils/AddCollectionForm'
import UpdateCollectionForm from "../utils/UpdateCollectionForm";
import UpdateCollectionFile from "../utils/UpdateCollectionFile";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SubCollections() {
  const navigate = useNavigate();
  const { userId, collectionId } = useParams();
  const [subCollections, setSubCollections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState({});
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showUpdateFile, setShowUpdateFile] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const query = useQuery();
  const parentCollectionId = query.get('parentCollectionId');
  const location = useLocation();

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
    const endpoint = parentCollectionId
      ? `http://localhost:${PORT}/collection/${collectionId}/subCollections?parentCollectionId=${parentCollectionId}`
      : `http://localhost:${PORT}/collection/${collectionId}/subCollections`;
  
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        setSubCollections(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchUser();
    fetchCollections();
  }, [location]);

  const handleAddCollection = (formData) => {
    const requestOptions = {
      method: 'POST',
      body: formData
    };
  
    fetch(`http://localhost:${PORT}/collection/${collectionId}/addSubCollection`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setSubCollections((prevCollections) => [...prevCollections, data]);
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
    navigate(`/${userId}/collection/${collectionId}/subCollections?parentCollectionId=${collectionId}`);
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
        setSubCollections((prevCollections) =>
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
        setSubCollections((prevCollections) =>
        prevCollections.map((collection) =>
          collection.collectionId === collectionId ? updatedCollection : collection
        )
      );
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleDeleteSubCollection  = (collectionId) => {
    fetch(`http://localhost:${PORT}/collection/${collectionId}/deleteSubCollection`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setSubCollections(subCollections.filter(collection => collection.collectionId !== collectionId))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      {<h1>Welcome, {user.userName}</h1>}
      <button onClick={() => setShowAddForm(!showAddForm)}>Add Collection</button>
      {showAddForm && 
      <AddCollectionForm addCollection={handleAddCollection}  onClose={handleCloseAddForm}/>}

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
        {subCollections.map((collection) => (
          <Card 
            key={collection.collectionId}
            collection={collection}
            image={`${process.env.PUBLIC_URL}/images/${collection.image}`}
            onClick={() => handleSubCollections(collection.collectionId)}
            onShowUpdateFile={() => handleShowUpdateFile(collection)}
            onShowUpdateForm={() => handleShowUpdateForm(collection)}
            onDelete={() => handleDeleteSubCollection(collection.collectionId)}
          />
        ))}
      </div>
    </div>
  );
}

export default SubCollections;
