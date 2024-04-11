import { useLocation  , useNavigate} from "react-router-dom";
import "./dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    
  const location = useLocation();
  const navigate = useNavigate();

  const [ID, SetID] = useState("");
  const [newUser, setNewUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const data = location.state;

    async function getdata() {
      const response = await axios.post(`http://127.0.0.1:8000/dashboard`, {
        data,
      });

      console.log(response.status);

      SetID(data);

      setFriends(response.data);

      console.log(response.data);

    }

    getdata();
    
  }, []);

  const handleUserChange = (e) => {
    setNewUser(e.target.value);
  };

  const handleAddFriend = async () => {
    console.log(newUser);
    console.log(ID);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/dashboard/add`, {
        ID: ID?.loginID,
        newUser,
      });

      // const data = response.data
      console.log(newUser);
    } catch (error) {
      console.log("Error :", error);
    }
  };

  const getData = async (username) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/${username}`);

      if (response.status < 200 || response.status >= 300) {
        alert("Wrong UserName");
        console.log("Response is not OK:", response.status);
      } else {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.log("Error :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnclick = async (ele) => {
    try {
      const response = await getData(ele);
      if (response) {
        console.log(response);
        navigate("/result", { state: response });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`loading-animation ${loading ? "active" : ""}`}>
        <div className="loader"></div>
      </div>
      <div className="dashboard-root">
        <div className="dashboard-nav">compareX</div>
        <div className="dashboard-content">
          <div className="add-friend">
            <input
              onChange={handleUserChange}
              type="text"
              placeholder="Your Friend ID"
            ></input>
            <button onClick={handleAddFriend}>Add</button>
          </div>
          <div className="ranks">
            <h3>{ID?.loginID}</h3>
            {friends?.map((ele) => (
              <button onClick={() => handleOnclick(ele)}>{ele}</button>
            ))}
          </div>
        </div>
        <div className="dashboard-footer"></div>
      </div>
    </>
  );
};

export default Dashboard;
