import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './AppFunction';

test('renders learn react link', () => {
  render(<App name="test"/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
