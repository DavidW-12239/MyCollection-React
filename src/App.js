import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import SubCollections from './pages/SubCollections'
import CollectionsSearch from './pages/CollectionSearch';

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/:userId/collection/:collectionId/subCollections" element={<SubCollections />} />
        <Route path="/:userId/collection/collections" element={<CollectionsSearch />} />
      </Routes>
    </Router>
  );
}

export default App;