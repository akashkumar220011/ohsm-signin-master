
import './App.css';
import PropertySetup from './components/Property_setup';

import SignIn from './components/SignIn';
import SignUp from './components/Signup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './components/Routes/Private';
// import axios from 'axios';




function App() {

  return (
  
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/' element={<SignIn />} />

          <Route path="/user" element={<PrivateRoute />} />
          <Route path='/user/property-setup' element={<PropertySetup />} />
            
        </Routes>
      </Router>
    </div>


  );
}

export default App;

