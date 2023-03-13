
import Card from "../utils/Card";
import { PORT } from '../config';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Home() {
  const [user, setUser] = useState({});
  const [collections, setCollections] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

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

  const handleClick = (collectionId) => {
    navigate(`/${userId}/collection/${collectionId}/subCollections`);
  };
  
  return (
    <div className="container">
      <h1>Welcome, {user.userName}</h1>
      <div>
        {collections.map((collection) => (
          <Card key={collection.collectionId}
          title={collection.title}
          website={collection.websiteAddress}
          image={`${process.env.PUBLIC_URL}/images/${collection.imagePath}`}
          context={collection.description}
          buttonText="Click me"
          onClick={() => handleClick(collection.collectionId)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
