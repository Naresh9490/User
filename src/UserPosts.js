import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.css";
const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', comment: '' });

  useEffect(() => {
 
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []); 

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const addPost = () => {
    const { title, comment } = newPost;
    if (title && comment) {
      const newPostData = { title, comment, id: Date.now() };
      setPosts([...posts, newPostData]);
      setNewPost({ title: '', comment: '' });
    }
  };

  const editPost = (postId, newTitle, newComment) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, title: newTitle, body: newComment };
      }
      return post;
    });

    setPosts(updatedPosts);
  };

  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className='col-lg-12 col-md-12 col-sm-12 col-12'>
       <h1 className="bg-primary text-white">User Posts</h1>
      <button onClick={toggleExpand} className='btn btn-warning'>
        {expanded ? 'Collapse Posts' : 'Expand Posts'}
      </button>
      <br></br>
      <form>
     
        <input
          name="comment"
          value={newPost.comment}
          onChange={handleInputChange}
          placeholder="Comment"
        />
        <br></br>
        <button type="button" onClick={addPost} className='btn btn-success'>
          Add Post
        </button>
        <br></br>
      </form>
      {expanded && (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <button className='btn btn-primary'
                onClick={() => {
                  const newTitle = prompt('Edit Title:', post.title);
                  const newComment = prompt('Edit Comment:', post.body);
                  editPost(post.id, newTitle, newComment);
                }}
              >
                Edit Post
              </button>
              <button onClick={() => deletePost(post.id)} className='btn btn-danger'>Delete Post</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;