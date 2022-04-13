import './App.css';
import axios from "axios";
import { useEffect } from "react";

function App() {
  const callApi = async () =>{
    axios.get("http://localhost:8000").then(res => console.log(res.data.name));
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <div>test</div>
  );
}

export default App;
