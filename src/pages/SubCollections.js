
import Card from "../utils/Card";
import UpperBanner from "../utils/UpperBanner";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import AddCollectionForm from '../utils/AddCollectionForm'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SubCollections() {
  const navigate = useNavigate();
  const { userId, collectionId } = useParams();
  const [subCollections, setSubCollections] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [user, setUser] = useState({});
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
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchUser();
      fetchCollections();
    } else {
      
    }
  }, [location]);

  const isLoggedIn = !!user.userName;

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    setUser({});
    navigate(`/`);
  };

  const handleLoginPage = () => {
    navigate(`/`);
  };

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

  return (
    <div className="container">
      <UpperBanner
        userName={user.userName}
        isLoggedIn={isLoggedIn}
        onSignOut={handleSignOut}
        onLogIn={handleLoginPage}
        onBack={() => navigate(-1)}
      />
      {localStorage.getItem('userId') && (
      <button onClick={() => setShowAddForm(!showAddForm)}>Add Collection</button>
      )}
      {showAddForm && 
      <AddCollectionForm addCollection={handleAddCollection}  onClose={handleCloseAddForm}/>}

      <div>
        {subCollections.map((collection) => (
          <Card 
            key={collection.collectionId}
            collection={collection}
            image={`${process.env.PUBLIC_URL}/images/${collection.image}`}
            onClick={() => handleSubCollections(collection.collectionId)}
            collections={subCollections}
            setCollections={setSubCollections}
          />
        ))}
      </div>
    </div>
  );
}

export default SubCollections;
