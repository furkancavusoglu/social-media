import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home/Home';
import User from './components/user/User';
import Navbar from './components/navbar/Navbar';
import Auth from './components/auth/Auth';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<User />}>
            <Route path=":userId" element={<User />} />
          </Route>
          <Route path="/auth"
            element={localStorage.getItem("currentUser") != null ? <Navigate to="/" /> : <Auth />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
