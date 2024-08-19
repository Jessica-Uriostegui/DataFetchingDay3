import { useState } from 'react';
import PostList from './PostList';
import UpdatePostForm from './UpdatePostForm';

const PostManager = () => {
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div>
            <h1>Manage Posts</h1>
            <PostList setSelectedPost={setSelectedPost} />
            {selectedPost && <UpdatePostForm post={selectedPost} />}
        </div>
    );
};

export default PostManager;