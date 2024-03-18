import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

describe('Layout component', () => {
  it('should render Layout component correctly', () => {
    render(<Layout />, { wrapper: BrowserRouter });
    expect(screen.queryByText('Home')).toBeInTheDocument();
  });
});
