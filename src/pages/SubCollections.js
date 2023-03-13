
import Card from "../utils/Card";
import { PORT } from '../config';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


function Home() {
  //const [user, setUser] = useState({});
  const [subCollections, setSubCollections] = useState([]);
  const { userId, collectionId } = useParams();
  const [user, setUser] = useState({});

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
    fetch(`http://localhost:${PORT}/collection/${collectionId}/subCollections`)
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
  }, []);

  function handleClick() {
    console.log("Button clicked!");
  }
  return (
    <div className="container">
      {<h1>Welcome, 123</h1>}
      <div>
        {subCollections.map((collection) => (
          <Card key={collection.collectionId}
          title={collection.title}
          website={collection.websiteAddress}
          image={`${process.env.PUBLIC_URL}/images/${collection.imagePath}`}
          context={collection.description}
          buttonText="Click me"
          onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
