import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import '../css/PostList.css';

const PostList = ({ setSelectedPost }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 3000);
  };

  let content;

  if (postStatus === 'loading') {
    content = <div className="loading">Loading...</div>;
  } else if (postStatus === 'succeeded') {
    content = (
      <div className="postList">
        {posts.map((post) => (
          <div key={post.id} className="postItem">
            <div className="postContent">
              <span className="postTitle">{post.title}</span>
              <div className="buttonGroup">
                <button onClick={() => setSelectedPost(post)} className="editButton">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="deleteButton">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>  
    );
  } else if (postStatus === 'failed') {
    content = <div className="error">{error}</div>;
  }

  return (
    <div className='postListContainer'>
      <h1 className="title">Posts</h1>
      {content}
      {showConfirmation && <div className="confirmationMessage">The post deleted has been successfully delete!</div>}
    </div>
  );
};

  PostList.propTypes = {
    setSelectedPost: PropTypes.func.isRequired,
};

export default PostList;