
import Card from "../utils/Card";
import UpperBanner from "../utils/UpperBanner";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Home.css'

function CollectionsSearch(props) {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [collections, setCollections] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const title = searchParams.get('title');

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
    const queryParam = `?title=${encodeURIComponent(title)}`;
    const url = `http://localhost:${PORT}/collection/${userId}/collections${queryParam}`;
    fetch(url)
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
  }, [title]);

  const isLoggedIn = !!user.userName;

  const handleSignOut = () => {
    localStorage.removeItem('userId');
    setUser({});
    navigate(`/`);
  };

  const handleLoginPage = () => {
    navigate(`/`);
  };

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
        title={title}
      />
      <div className="result">
        There are {collections.length} results for {title}
      </div>
      <div className="home">
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

export default CollectionsSearch;
