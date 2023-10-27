import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import "./App.css";
function UserList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error While  fetching data :", error);
      });
  }, []);

  return (
    <>
      <br></br>
      <div className="col-lg-4">
        <h1 className="bg-primary text-white">User List</h1>
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>S.NO</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <div className="user-info">
                    <Link to={`/detailview/${user.id}`}>
                      <span className="Username" >{user.name}</span>
                    </Link>
                    <span className="popup bg-primary text-white">
                      Username: {user.username}
                      <br></br> Mail Id: {user.email}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserList;
