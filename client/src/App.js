import './App.css';
import axios from "axios";
import { useEffect } from "react";
import Footer from './components/Footer';

function App() {
  const callApi = async () =>{
    axios.get("http://localhost:8000").then(res => console.log(res.data.name));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <>
      <div>test</div>
      <Footer />
    </>
    
  );
}

export default App;
