import { Route, Routes } from "react-router-dom";
import Login from "./app/authorization/login";
import NavBar from './app/navigation.jsx';
import './App.css';
function AppContent() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="AppWrapper">
      <AppContent />
    </div>
  );
}

export default App;