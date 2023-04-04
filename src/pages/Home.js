import Card from "../utils/Card";
import UpperBanner from "../utils/UpperBanner";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import AddCollectionForm from '../utils/AddCollectionForm'
import '../styles/Home.css'

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
    }
  }, []);

  const isLoggedIn = !!user.userName;

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
        onBack={() => navigate(-1)}
      />

      <div className="home">
        {collections.map((collection) => (
          <Card
            key={collection.collectionId} 
            collection={collection}
            parentCollectionIsPublic={collection.isPublic}
            image={`${process.env.PUBLIC_URL}/collectionImages/${collection.image}`}
            subCollectionPage={() => handleSubCollections(collection.collectionId)}
            collections={collections}
            setCollections={setCollections}
          />
        ))}
        <div className="add-collection-button-container">
          {showAddForm ? (
            <AddCollectionForm
              addCollection={handleAddCollection}
              onClose={handleCloseAddForm}
            />
          ) : (
            localStorage.getItem("userId") && (
              <div className="add-collection-button" onClick={() => setShowAddForm(true)}>
                <span className="add-collection-button-text">Add</span>
                <span className="add-collection-button-text">Collection</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
