import { useState } from 'react';
import PropTypes from 'prop-types';
// import blogService from '../services/blogs';

const Blog = ({ blog, likeBlog, canDelete, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const userLikes = async (event) => {
    event.preventDefault();
    likeBlog({
      user: blog.user,
      likes: blog.likes + 1,
      url: blog.url,
      title: blog.title,
      author: blog.author,
      id: blog.id,
    });
  };

  const userDeletes = async (event) => {
    event.preventDefault();
    deleteBlog(blog);
  };

  return (
    <div style={blogStyle} className="blog">
      <div style={hideWhenVisible}>
        {blog.title}
        <button onClick={toggleVisibility}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url} <br />
        likes: {blog.likes}
        <button onClick={userLikes}>like</button>
        <br />
        {blog.author} <br />
        {canDelete && <button onClick={userDeletes}>remove</button>}
      </div>
    </div>
  );
};

Blog.propTypes = {
  canDelete: PropTypes.bool.isRequired,
  userDeletes: PropTypes.func.isRequired,
  userLikes: PropTypes.func.isRequired,
};

export default Blog;
