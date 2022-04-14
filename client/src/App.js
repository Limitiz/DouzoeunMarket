import './App.css';
import axios from "axios";
import { useEffect } from "react";
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const callApi = () =>{
    axios.get("http://localhost:8000").then(res => console.log(res.data));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <div>test</div>
      <Header />
      <Footer />
    </>
    
  );
}

export default App;
