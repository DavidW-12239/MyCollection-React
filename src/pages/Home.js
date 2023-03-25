import Card from "../utils/Card";
import UpperBanner from "../utils/UpperBanner";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
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
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      fetchUser();
      fetchCollections();
    } else {
      
    }
  },[]);

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
