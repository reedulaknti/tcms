import { render, screen } from '@testing-library/react';
import AppRoutes, { NoMatch } from './Routes';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

describe('Routes component', () => {
  it('should render Routes component correctly', () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });
  });

  it('should render NoMatch component correctly', () => {
    render(<NoMatch />, { wrapper: BrowserRouter });
    expect(screen.queryByText('Nothing to see here!')).toBeInTheDocument();
  });

  it('landing on a bad page', () => {
    const badroute = '/some/bad/route';
    render(
      <MemoryRouter initialEntries={[badroute]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const text = screen.queryByText('Nothing to see here!');
    expect(text).toBeInTheDocument();
  });

  it('landing on a home page', () => {
    const route = '/';
    render(
      <MemoryRouter initialEntries={[route]}>
        <AppRoutes />
      </MemoryRouter>
    );
    const text = screen.getByRole('heading', { level: 1 });
    expect(text).toBeInTheDocument();
  });
});
