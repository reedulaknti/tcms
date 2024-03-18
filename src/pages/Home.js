import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Input from '../components/Input';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import localforage from 'localforage';

const initialState = {
  id: '',
  name: 'Guest',
  dob: '',
  email: '',
  aadharNo: '',
  regDate: Date.now(),
  assignMobileNo: '',
  plan: '',
  createdAt: '',
};

export default function Home() {
  const [state, setState] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogin = async () => {
    let customers = await localforage.getItem(
      state.assignMobileNo || localStorage.currentUser
    );
    console.log(customers);
    if (customers) {
      localStorage.currentUser = customers[0].assignMobileNo;
      setState({ ...customers[0] });
    }
  };

  const loginForm = (
    <>
      <Input
        name="assignMobileNo"
        label="Mobile No"
        placeholder="Please Mobile No"
        onChange={handleChange}
        value={state.assignMobileNo}
      />
      <Button name="login" label="Login" onClick={handleLogin} />
      New Customer? Register{' '}
      <Link to={'/register/'} className="link" title="here">
        here
      </Link>
    </>
  );

  const welcomePage = (
    <>
      <Link to={'/plan/'} className="link" title="Plan">
        Choose Plan
      </Link>
      <br />
      <Link to={'/customer/'} className="link" title="Customer">
        Customer
      </Link>
      <div
        className="link"
        onClick={() => {
          localStorage.currentUser = '';
          setState({ ...initialState });
          window.location.reload();
        }}
      >
        Logout
      </div>
    </>
  );
  return (
    <>
      <Title label="Telecom Customer Management System" />
      <form name="customerForm">
        <label style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
          Welcome {state.name},
        </label>
        {state.id ? welcomePage : loginForm}
      </form>
    </>
  );
}
