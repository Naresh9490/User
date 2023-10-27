import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useParams } from "react-router-dom";
import UserPosts from "./UserPosts";
import UserAlbums from "./UserAlbums";

function UserDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({});
  const [photo, setPhoto] = useState(0);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => console.error("Error While  fetching data:", error));

    fetch(`https://jsonplaceholder.typicode.com/photos/${id}`)
      .then((response) => response.json())
      .then((photoData) => {
        setPhoto(photoData);
      })
      .catch((error) => console.error("Error While  fetching data:", error));
  }, [id]);

  return (
    <>
      <div className="container">
        <br></br>
        <div className="row">
          <div className="col-lg-7 col-md-7 col-sm-12 col-12">
            <h3 className="bg-primary text-white p-2">User Profile</h3>

            <div className="user-profile">
              <table className="table table-bordered w-100">
                <tbody>
                  <tr>
                    <th>Name:</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Username:</th>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Address:</th>
                    <td>
                      {user.address
                        ? `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`
                        : "Address not available"}
                    </td>
                  </tr>
                  <tr>
                    <th>Phone:</th>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <th>Website:</th>
                    <td>{user.website}</td>
                  </tr>
                  <tr>
                    <th>Company:</th>
                    <td>
                      {user.company
                        ? user.company.name
                        : "Company not available"}
                    </td>
                  </tr>
                  <tr>
                    <th>Company Catchphrase:</th>
                    <td>
                      {user.company
                        ? user.company.catchPhrase
                        : "Catchphrase not available"}
                    </td>
                  </tr>
                  <tr>
                    <th>Company Business:</th>
                    <td>
                      {user.company
                        ? user.company.bs
                        : "Business not available"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-5 col-md-5 col-sm-12 col-12">
            <img src={photo.url} alt={photo.title} className="img-thumbnail" />
          </div>
        </div>
        <br></br>
      </div>
      <div className="container">
        <div className="row">
          <UserPosts />
          
         
        </div>
        <br></br>
        <div className="row">
        <UserAlbums userId={id} />
        </div>
        <br></br>
        <button onClick={() => navigate(-1)} className="btn btn-primary">
          Go Back
        </button>
      </div>
    </>
  );
}

export default UserDetails;
