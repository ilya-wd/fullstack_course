const supertest = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const listHelper = require('../utils/list_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  // let blogObject = new Blog(helper.initialBlogs[0]);
  // await blogObject.save();

  // blogObject = new Blog(helper.initialBlogs[1]);
  // await blogObject.save();

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  await User.deleteMany({});
  for (let user of helper.initialUsers) {
    let userObj = new User(user);
    await userObj.save();
  }
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });
});

describe('highest likes blog', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: 'aaaa',
      title: 'Go go go ',
      author: 'Edsger Wwew Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: 'bbbbb',
      title: 'GIn In In ',
      author: ' Wwew Bebe',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0,
    },
  ];

  test('returns blog with the highest number of likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[1]);
  });
});

describe('most blogs blog', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: 'aaaa',
      title: 'Go go go ',
      author: 'Edsger Wwew Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: 'bbbbb',
      title: 'GIn In In ',
      author: ' Wwew Bebe',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0,
    },
    {
      _id: 'ccccc',
      title: 'COCOCOCl',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('returns blog with the highest number of likes', () => {
    const result = listHelper.mostBlogs(blogList);
    expect(result).toBe('Edsger W. Dijkstra');
  });
});

describe('author with the most likes', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0,
    },
    {
      _id: 'aaaa',
      title: 'Go go go ',
      author: 'A A Anony',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0,
    },
    {
      _id: 'bbbbb',
      title: 'GIn In In ',
      author: ' Wwew Bebe',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 1,
      __v: 0,
    },
    {
      _id: 'ccccc',
      title: 'COCOCOCl',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0,
    },
  ];

  test('returns author with the highest number of likes', () => {
    const result = listHelper.mostLikes(blogList);
    expect(result).toBe('Edsger W. Dijkstra');
  });
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

/////////////////////222222222222///////////////////////////
/////////////////////222222222222///////////////////////////

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

describe('blog tests', () => {
  test('api works, blogs are returned', async () => {
    const res = await api.get('/api/blogs');
    expect(res.body).toHaveLength(helper.initialBlogs.length);
  });

  test('correct unique identifier. id instead of _id', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('a user can add a blog with POST', async () => {
    const blog = {
      title: 'AAA',
      author: 'OOO',
      url: 'XXX',
      likes: 888,
    };

    const loginUser = await api
      .post('/api/login')
      .send({ username: 'user_tester', password: 'bcrypthash' });

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginUser.body.token}`)
      .send(blog);

    const returnedBlogs = await helper.blogsInDb();
    expect(returnedBlogs).toHaveLength(helper.initialBlogs.length + 1);

    const blogContent = returnedBlogs.map((blog) => blog.title);
    expect(blogContent).toContain('AAA');
  });

  test('if a blog submitted without likes attribute, an attribute of 0 likes will be assigned automatically', async () => {
    const blog = {
      title: 'AAA',
      author: 'OOO',
      url: 'XXX',
    };

    const loginUser = await api
      .post('/api/login')
      .send({ username: 'user_tester', password: 'bcrypthash' });

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginUser.body.token}`)
      .send(blog);

    expect(response.body.likes).toEqual(0);
  });

  test('if a POST request to api/blogs is missing a url or a title, it will result in 400 bad request', async () => {
    const blog = {
      author: 'OOO',
      url: 'XXX',
    };

    const loginUser = await api
      .post('/api/login')
      .send({ username: 'user_tester', password: 'bcrypthash' });

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginUser.body.token}`)
      .send(blog)
      .expect(400);

    const returnedBlogs = await helper.blogsInDb();

    expect(returnedBlogs).toHaveLength(helper.initialBlogs.length);
  });

  test('updating a blog works', async () => {
    const initialBlogs = await helper.blogsInDb();
    const targetBlog = initialBlogs[0];
    const blogUpdated = { ...targetBlog, title: 'testing1212' };

    await api.put(`/api/blogs/${blogUpdated.id}`).send(blogUpdated).expect(200);

    const returnedBlogs = await helper.blogsInDb();

    expect(returnedBlogs).toHaveLength(initialBlogs.length);

    const blogContent = returnedBlogs.map((blog) => blog.title);
    expect(blogContent).toContain('testing1212');
  });

  test('a blog can be deleted', async () => {
    const initialBlogs = await helper.blogsInDb();
    const targetBlog = initialBlogs[0];

    // console.log('Initial blogs', initialBlogs);

    const loginUser = await api
      .post('/api/login')
      .send({ username: 'user_tester', password: 'bcrypthash' });

    await api
      .delete(`/api/blogs/${targetBlog.id}`)
      .set('Authorization', `bearer ${loginUser.body.token}`);

    const returnedBlogs = await helper.blogsInDb();

    // console.log('ReturnedBlogs', returnedBlogs);

    expect(returnedBlogs).toHaveLength(initialBlogs.length - 1);

    const blogContent = returnedBlogs.map((blog) => blog.title);

    expect(blogContent).not.toContain(targetBlog.title);
  }, 5000);

  test('adding a blog fails with 401 if no token is provided', async () => {
    const initialBlogs = await helper.blogsInDb();

    const blog = {
      title: 'no token blog',
      author: 'unknown author',
      url: 'www.com',
    };

    await api.post('/api/blogs').send(blog).expect(401);

    const returnedBlogs = await helper.blogsInDb();
    expect(returnedBlogs).toHaveLength(initialBlogs.length);
  });
});

describe('user tests', () => {
  test('user with a non-unique username is not added', async () => {
    const initialUsers = await helper.usersInDb();

    const nonUniqueUser = {
      username: 'user_tester',
      name: 'userUser',
      password: 'password',
    };

    const result = await api.post('/api/users').send(nonUniqueUser).expect(400);

    expect(result.body.error).toContain('username must be unique');

    const returnedUsers = await helper.usersInDb();
    expect(returnedUsers).toHaveLength(initialUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
