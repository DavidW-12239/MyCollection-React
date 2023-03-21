
import Card from "../utils/Card";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddCollectionForm from '../utils/AddCollectionForm'

function Home() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

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
  
  return (
    <div className="container">
      <h1>Welcome, {user.userName}</h1>
      <button onClick={() => setShowAddForm(!showAddForm)}>Add Collection</button>
      {showAddForm && 
      <AddCollectionForm addCollection={handleAddCollection} onClose={handleCloseAddForm}/>}

      <div>
        {collections.map((collection) => (
          <Card
            key={collection.collectionId}
            collection={collection}
            image={`${process.env.PUBLIC_URL}/images/${collection.image}`}
            onClick={() => handleSubCollections(collection.collectionId)}
            collections={collections}
            setCollections={setCollections}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
