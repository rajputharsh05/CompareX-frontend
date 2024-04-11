import { useEffect, useState } from 'react'
import './App.css'
import axios from "axios"
import { useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");

  const getData = async (username) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/${username}`);

      if (response.status < 200 || response.status >= 300) {
        alert("Wrong UserName")
        console.log('Response is not OK:', response.status);
      } else {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.log("Error :", error);
    } finally {
      setLoading(false);
    }
  }

  const handleClick = async () => {
    try {
      const response = await getData(userID);
      if (response) {
        console.log(response)
        navigate("/result", { state: response });
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCompareXbtn = () => {
    navigate("/auth")
  }

  const handlechange = (e) => {
    setUserID(e.target.value)
    console.log(userID)
  }

  return (
    <>
      <div className={`loading-animation ${loading ? 'active' : ''}`}>
        <div className="loader"></div>
      </div>
      <div className={loading ? 'hidden' : ''}>
        <h1>Your Leetcode ID here</h1>
        <input onChange={handlechange} type='text'></input>
        <button className='abc' onClick={handleClick} style={{ margin: "10px" }}>Fetch</button>
        <button className='def' onClick={handleCompareXbtn}>Join CompareX !</button>
      </div>
    </>
  )
}

export default App
