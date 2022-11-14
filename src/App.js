import './App.css';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home'
import Signup from './components/Sign/Signup';
import Signin from './components/Sign/Signin';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Routes,Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
      </Routes>
      <ToastContainer theme="dark"/>
    </div>
  );
}

export default App;
