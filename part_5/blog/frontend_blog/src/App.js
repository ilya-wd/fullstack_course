import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [notification, setNotification] = useState(null);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const notifyUser = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      console.log('USER', JSON.stringify(user));

      blogService.setToken(user.token);
      console.log('TOKEN', user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      notifyUser('Wrong credentials', 'error');
    }
  };

  const logout = async (event) => {
    event.preventDefault();

    try {
      window.localStorage.removeItem('loggedBlogappUser');

      setUser(null);
      setUsername('');
      setPassword('');
      blogService.setToken('');
    } catch (exception) {
      notifyUser('Wrong credentials', 'error');
    }
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();

      blogService.create(blogObject).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });
      notifyUser(
        `A new blog ${blogObject.title} by ${blogObject.author} added`,
        'success'
      );
    } catch (error) {
      notifyUser('Something went wrong', 'error');
    }
  };

  const likeBlog = async (blogObject) => {
    try {
      await blogService
        .update(blogObject.id, blogObject)
        .then((returnedBlog) => {
          setBlogs(
            blogs.map((blog) =>
              blog.id !== blogObject.id ? blog : returnedBlog
            )
          );
        });
      notifyUser(
        `A blog like for ${blogObject.title} has been registered`,
        'success'
      );
      // setBlogs(blogs.filter((n) => n.id !== id));
    } catch (error) {
      notifyUser('Could not like the blog', 'error');
    }
  };

  const deleteBlog = async (blogObject) => {
    if (
      window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        await blogService.deleteBlog(blogObject.id).then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== blogObject.id));
        });
        notifyUser(`A blog ${blogObject.title} has been deleted`, 'success');
        // setBlogs(blogs.filter((n) => n.id !== id));
      } catch (error) {
        notifyUser('Could not delete the blog', 'error');
      }
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id="username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  );

  const blogFormRef = useRef();

  return (
    <div>
      <h1>Blogs App</h1>
      <Notification notification={notification} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <div>
            <p>
              {user.name} logged-in
              <button type="submit" onClick={logout}>
                logout
              </button>
            </p>
          </div>

          <Togglable id="new-blog-btn" buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <h2>blogs</h2>
          {blogs
            .sort((b) => -b.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={likeBlog}
                canDelete={blog.user.name === user.name}
                deleteBlog={deleteBlog}
              />
            ))}
        </div>
      )}

      {user !== null}
    </div>
  );
};

export default App;
