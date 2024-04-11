import { useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const AuthPage = () => {
  const navigate = useNavigate();
  const [pageMode, setPageMode] = useState(false);

  const handlePageChange = () => {
    setPageMode(!pageMode);
  }


  const [loginID , setLoginID] = useState("");
  const [loginPass , setLoginPass] = useState("");

  const[registerID , setRegisterID] = useState("");
  const[registerName , setRegisterName] = useState("");
  const[registerPass , setRegisterPass] = useState("");


  const handleRegisterID = (e) => {
    setRegisterID(e.target.value)
  }

  const handleRegisterName = (e) => {
    setRegisterName(e.target.value)
  }

  const handleRegisterPass = (e) => {
    setRegisterPass(e.target.value)
  }

  const handleLoginID = (e) =>{
    setLoginID(e.target.value)
  }

  const handleLoginPass = (e) =>{
    setLoginPass(e.target.value)
  }


  const handleRegister = async () => {
    console.log(registerID , registerPass , registerName)
    try {
        
          console.log(loginID , loginPass)

          const response = await axios.post("http://127.0.0.1:8000/register",{
              registerID,
              registerName,
              registerPass,
          })

          console.log(response.status)

          if(response.status === 200){
                navigate("/dashboard")
          }

    }catch(error) {
        console.log("Error : " ,error);
    }
  }

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/login", {
        loginID,
        loginPass
      });
  
      if (response.status === 200) {
        navigate("/dashboard",{state:{loginID}});
      } else {
        alert("Invalid details!");
      }
    } catch (error) {

      console.log("Error: ", error);

    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="auth-root">
      <h2>CompareX</h2>
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : (
        <>
          {pageMode ? (
            <input onChange={handleRegisterName} type="text" placeholder="  Enter Your Name" />
          ) : (
            <input onChange={handleLoginID} type="text" placeholder="  Enter Your ID" />
          )}
          {pageMode ? (
            <input onChange={handleRegisterPass} type="text" placeholder="  Select Your Password" />
          ) : (
            <input type="text" onChange={handleLoginPass} placeholder="  Enter Your Password" />
          )}
          {pageMode ? (
            <input onChange={handleRegisterID} type="text" placeholder="  Your Leetcode ID" />
          ) : (
            <></>
          )}
          {pageMode ? (
            <button onClick={handleRegister}>Register</button>
          ) : (
            <button onClick={handleLogin}>Login</button>
          )}
          {pageMode ? (
            <button onClick={handlePageChange}>Already have an account, Just Login!</button>
          ) : (
            <button onClick={handlePageChange}>Don't have an account? Register</button>
          )}
        </>
      )}
    </div>
  );
  
};

export default AuthPage;
