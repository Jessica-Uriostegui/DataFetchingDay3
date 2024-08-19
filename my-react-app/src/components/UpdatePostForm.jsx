import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../redux/postsSlice';
import PropTypes from 'prop-types';
import '../css/UpdatePostForm.css';

const UpdatePostForm = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted!');
        dispatch(updatePost({ id: post.id, title, body }));
    };

   return (
    <form onSubmit={handleSubmit}>
      <h2>Update Post</h2>
       <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>
      <button type="submit">Update Post</button>
    </form>
    );
};

UpdatePostForm.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,  
};

export default UpdatePostForm;