import { useState } from 'react';
import{ useDispatch } from 'react-redux';
import { createPost } from '../redux/postsSlice';
import '../css/CreatePostForm.css';

const CreatePostForm = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost({ title, body }));
        setTitle('');
        setBody('');
    };

    return(
        <form onSubmit={handleSubmit} className="createPostForm">
            <h2 className='title'>Create New Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inputField"
            />
            <textarea
              placeholder="Body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="inputField"
            ></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
};

export default CreatePostForm;
