import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SubCollections from './pages/SubCollections'
import UserContext from "./utils/UserContext";

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home/:userId" element={<Home />} />
        <Route path="/:userId/collection/:collectionId/subCollections" element={<SubCollections />} />
      </Routes>
    </Router>
  );
}

export default App;