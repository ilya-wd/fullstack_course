/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-render-in-setup */
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from './Blog.js';

describe('<Blog />', () => {
  const blog = {
    title: 'Blog testing 5c',
    author: 'Authorian',
    url: 'test.fi.org.co',
    likes: 22,
    user: 'user tester',
  };

  test('renders author and blog title of a blog | blog url is not rendered', () => {
    render(<Blog blog={blog} />);
    expect(screen.queryByText('Blog testing 5c')).toBeDefined();
    expect(screen.queryByText('Authorian')).toBeDefined();
    expect(screen.queryByText('test.fi.org.co')).toBeNull();
    const likes = screen.queryByText('likes');
    expect(likes).toBeNull();
  });

  test('after show buttong is clicked, url is shown', async () => {
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const showButton = screen.getByText('show');
    await user.click(showButton);

    expect(screen.queryByText('22 likes')).toBeDefined();
    expect(screen.queryByText('test.fi.org.co')).toBeDefined();
  });

  test('if like button is pressed twice, the event handler is called twice', async () => {
    const likeEvent = jest.fn();
    render(<Blog blog={blog} likeBlog={likeEvent} />);
    const user = userEvent.setup();
    const showButton = screen.getByText('show');
    await user.click(showButton);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeEvent.mock.calls).toHaveLength(2);
  });

  test('if delete button is pressed, the deletion of a blog is attempted', async () => {
    const deleteEvent = jest.fn();
    render(<Blog blog={blog} deleteBlog={deleteEvent} canDelete={true} />);
    const user = userEvent.setup();
    const showButton = screen.getByText('show');
    await user.click(showButton);

    const deleteButton = screen.getByText('remove');
    await user.click(deleteButton);

    expect(deleteEvent.mock.calls).toHaveLength(1);
  });
});
