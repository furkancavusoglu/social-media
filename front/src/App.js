
import './App.css';
import Post from './components/post/Post';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/home/Home';
import User from './components/user/User';
import Navbar from './components/navbar/Navbar';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
