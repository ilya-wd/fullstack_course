/* eslint-disable no-undef */
describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const testUser = {
      name: 'Tester',
      username: 'tester_1',
      password: 'testing',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', testUser);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('tester_1');
      cy.get('#password').type('testing');
      cy.get('#login-button').click();
      cy.contains('Tester logged-in');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('Username');
      cy.get('#password').type('typing');
      cy.get('#login-button').click();
      cy.contains('Wrong credentials');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester_1', password: 'testing' });
    });

    it('A blog can be created', function () {
      cy.contains('login').click();
      cy.get('#username').type('tester_1');
      cy.get('#password').type('testing');
      cy.get('#login-button').click();

      cy.contains('new blog').click();
      // cy.get('#new-blog-btn').click();
      cy.get('#inputTitle').type('Testing rapping blogs');
      cy.get('#inputAuthor').type('hill');
      cy.get('#inputUrl').type('google.it');
      cy.get('#createBlog').click();
      cy.contains('Testing rapping blogs');
    });

    beforeEach(function () {
      cy.createBlog({
        title: 'Testing deletion',
        author: 'Deleted author',
        url: 'delete.it',
        likes: 9,
      });
    });

    it('A blog can be liked', function () {
      cy.contains('login').click();
      cy.get('#username').type('tester_1');
      cy.get('#password').type('testing');
      cy.get('#login-button').click();

      cy.contains('show').click();
      cy.contains('like').click();
      cy.contains('likes: 10');
    });

    it('A blog can be deleted', function () {
      cy.contains('login').click();
      cy.get('#username').type('tester_1');
      cy.get('#password').type('testing');
      cy.get('#login-button').click();

      cy.contains('show').click();
      cy.contains('remove').click();
      cy.get('Testing deletion').should('not.exist');
    });
  });

  describe('Blogs are ordered according to likes with the blog with the most likes being the first', function () {
    it('in descending order', function () {
      cy.login({ username: 'tester_1', password: 'testing' });
      cy.contains('login').click();
      cy.get('#username').type('tester_1');
      cy.get('#password').type('testing');
      cy.get('#login-button').click();

      cy.createBlog({
        title: '3 Likes',
        author: 'author',
        url: 'url',
        likes: 3,
      });
      cy.createBlog({
        title: '2 Likes',
        author: 'author',
        url: 'url',
        likes: 2,
      });
      cy.createBlog({
        title: '1 Like',
        author: 'author',
        url: 'url',
        likes: 1,
      });
      cy.get('.blog').eq(0).should('contain', '3 Likes');
      cy.get('.blog').eq(1).should('contain', '2 Likes');
      cy.get('.blog').eq(2).should('contain', '1 Like');
    });
  });
});
