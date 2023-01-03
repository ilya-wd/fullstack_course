const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { userExtractor } = require('../utils/middleware');

const Blog = require('../models/blog');
const User = require('../models/user');

//blogsRouter.get('/api/blogs'...) -> then just app.use(blogsRouter) in app.js
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  });

  if (blog) response.json(blog);
  else response.status(404);
});

//blogsRouter.post('/api/blogs'...) -> then just app.use(blogsRouter) in app.js
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;

  const user = request.user;

  if (!user) {
    response
      .status(401)
      .json({ error: "Can't post a blog without authentication" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  if (!blog.title || !blog.url) {
    response
      .status(400)
      .json({ error: "Can't post a blog without an author or url" });

    // next();
  }

  user.blogs = user.blogs.concat(blog._id);
  await user.save();

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    // next(exception);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user;

  const blog = await Blog.findById(request.params.id);

  if (!user) {
    return response.status(401).json({
      error: 'No token',
    });
  }

  // await Blog.findByIdAndRemove(request.params.id);
  if (blog.user._id.toString() === user.id.toString()) {
    await blog.remove();
    user.blogs = user.blogs.filter(
      (x) => x.id.toString() !== request.params.id.toString()
    );
    await user.save();
    response.json(blog).status(204).end();
  } else {
    return response.status(401).json({
      error: "You can't delete this blog; most likely it doesn't belong to you",
    });
  }
});

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  console.log('PUTTING');
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    // user: request.body.user,
  };
  console.log('FOUND BLOG', await Blog.findById(request.params.id));

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', { username: 1, name: 1 });

  response.json(updatedBlog);
});

module.exports = blogsRouter;
