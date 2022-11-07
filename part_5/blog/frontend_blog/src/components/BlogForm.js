import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleBlogChange = (event) => {
    setNewBlog(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    createBlog({
      title: newBlog,
      // id: blogs.length + 1,
      author: newAuthor,
      url: newUrl,
    });

    setNewBlog('');
    setNewAuthor('');
    setNewUrl('');
  };

  return (
    <div>
      <form onSubmit={addBlog}>
        <p>
          title:
          <input id="inputTitle" value={newBlog} onChange={handleBlogChange} />
        </p>
        <p>
          author:
          <input
            id="inputAuthor"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </p>
        <p>
          url:
          <input id="inputUrl" value={newUrl} onChange={handleUrlChange} />
        </p>
        <button id="createBlog" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
