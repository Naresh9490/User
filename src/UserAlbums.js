import React, { useState, useEffect } from "react";

function UserAlbums({ userId }) {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((albumList) => {
        setAlbums(albumList);
      })
      .catch((error) => console.error("Error While fetching data:", error));
  }, [userId]);
  const fetchPhotosForAlbum = (albumId) => {
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`)
      .then((response) => response.json())
      .then((photoList) => {
        setPhotos(photoList);
      })
      .catch((error) => console.error("Error While fetching data:", error));
  };

  return (
    <>
      <div className="col-lg-12 col-md-12 col-sm-12 col-12">
        <h3 className="bg-primary text-white p-2">User Albums</h3>
        <table className="table table-primary table-hover">
          <thead>
            <tr>
              <th>Album Title</th>
            </tr>
          </thead>
          <tbody>
            {albums.map((album) => (
              <tr key={album.id}>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (selectedAlbum && selectedAlbum.id === album.id) {
                      setSelectedAlbum(null);
                    } else {
                      setSelectedAlbum(album);
                      fetchPhotosForAlbum(album.id);
                    }
                  }}
                >
                  {album.title}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedAlbum && (
        <div>
          <h3>Albums</h3>
          <div className="row">
            {photos.map((photo) => (
              <div key={photo.id} className="col-lg-3 col-md-6 col-sm-6">
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default UserAlbums;
