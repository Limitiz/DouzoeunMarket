import './App.css';
import axios from "axios";
import { useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';

function App() {
  const callApi = () =>{
    axios.get("http://localhost:8000/main").then(res => console.log(res.data));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <Header />
      <br/>
      <MainPage />
      <Footer />
    </>
  );
}

export default App;
