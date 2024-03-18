import React, { useEffect } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navList = [
  {
    id: '0',
    pathname: '',
    label: 'Home',
  },
  {
    id: '1',
    pathname: 'plan',
    label: 'Choose Plan',
  },
  {
    id: '2',
    pathname: 'customer',
    label: 'Customer',
  },
];

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {}, [localStorage.currentUser]);
  return (
    <>
      {localStorage.currentUser != '' ? (
        <div className="container">
          <ul className="nav">
            {navList.map((path) => {
              return (
                <li key={path.id}>
                  <Link
                    to={path.pathname}
                    className={
                      path.pathname === pathname.split('/')[1] ? ' active' : ''
                    }
                  >
                    {path.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <main>
            <Outlet />
          </main>
          <ToastContainer />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
