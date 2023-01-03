const blog = require('../models/blog');
const lodash = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (blog, item) => {
    return blog.likes + item;
  };

  // const result =
  //   blogs.length === 0 ? 0 : blogs.reduce((init, blog) => blog.likes + init, 0);
  // console.log(result);

  return blogs.length === 0
    ? 0
    : blogs.reduce((init, blog) => blog.likes + init, 0);
};

const favoriteBlog = (blogs) => {
  const blogsArray = blogs.concat();

  const result = blogsArray.sort((a, b) => {
    return a.likes - b.likes;
  });

  return blogs.length === 0 ? 0 : result[result.length - 1];
};

const mostBlogs = (blogs) => {
  const res = lodash.countBy(blogs, 'author');
  // console.log(Object.keys(res).reduce((a, b) => (res[a] > res[b] ? a : b)));

  // const blogsGrouped = lodash.groupBy(blogs, 'author');

  return blogs.length === 0
    ? 0
    : Object.keys(res).reduce((a, b) => (res[a] > res[b] ? a : b));
};

const mostLikes = (blogs) => {
  // const res = lodash.countBy(blogs, 'author');
  // console.log(Object.keys(res).reduce((a, b) => (res[a] > res[b] ? a : b)));

  const blogsGrouped = lodash.groupBy(blogs, 'author');

  const authorLikes = lodash.map(blogsGrouped, (blog) => ({
    author: blog[0].author,
    likes: lodash.sumBy(blog, 'likes'),
  }));

  // console.log(blogsGrouped);
  const res = lodash.maxBy(authorLikes, 'likes');

  return blogs.length === 0 ? 0 : res.author;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
