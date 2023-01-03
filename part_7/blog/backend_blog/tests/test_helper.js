const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: { _id: '63137fb563417fc5fc908ea2' },
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f0',
    title: 'Go GoGO To The Second Place',
    author: 'Turing Winston Blue',
    url: 'http://www.stanford-hell.edu/',
    likes: 10,
    user: { _id: '63137fb563417fc5fc908ea2' },
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f1',
    title: 'Tik Tak Toe Ting',
    author: 'Pharaoh',
    url: 'http://www.oxbridge.tv/',
    likes: 22,
    user: { _id: '63137fb563417fc5fc908ea2' },
    __v: 0,
  },
];

const initialUsers = [
  {
    _id: '63137fb563417fc5fc908ea2',
    username: 'user_tester',
    name: 'tester',
    passwordHash:
      '$2y$11$tkkZISfh1dx1LkfMFoPFUOLWtMfgXWU.SvIioQ2x0/qsJUBsE1OaS',
    blogs: [
      { _id: '5a422aa71b54a676234d17f8' },
      { _id: '5a422aa71b54a676234d17f0' },
      { _id: '5a422aa71b54a676234d17f1' },
    ],
    __v: 0,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((blog) => blog.toJSON());
};

const nonExistingId = async () => {
  const blog = new Note({
    title: 'willremovethissoon',
    author: 'to be removed',
    url: 'www.remove.re',
    likes: 1,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId,
  usersInDb,
  initialUsers,
};
