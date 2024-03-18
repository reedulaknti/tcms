import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from '../data/customerApi';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import validator from 'validator';

const initialState = {
  id: '',
  name: '',
  dob: '',
  email: '',
  aadharNo: '',
  regDate: Date.now(),
  assignMobileNo: '',
  plan: '',
  createdAt: '',
};

export default function Register() {
  const navigate = useNavigate();
  const [state, setState] = useState({ ...initialState });
  let { id } = useParams();

  const getTitle = () => {
    return 'Register';
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const res = await getCustomer(id);
        if (res) setState({ ...res });
      }
    };
    fetchData();
    document.title = getTitle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.currentTarget;
    setState({ ...state, [name]: value });
  };

  const handleDelete = () => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const res = await deleteCustomer(state.id);
            if (res) navigate('/customers');
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleSave = async () => {
    if (state.name.trim() === '') {
      toast('Please enter name');
      return;
    }
    if (!state.aadharNo.match('[0-9]{10}')) {
      toast('Please provide valid aadhar number');
      return;
    }
    if (!state.assignMobileNo.match('[0-9]{10}')) {
      toast('Please provide valid phone number');
      return;
    }
    if (!validator.isEmail(state.email)) {
      toast('Please provide valid email');
      return;
    }
    let res = {};
    if (id) {
      res = await updateCustomer(state.id, state);
    } else {
      res = await createCustomer(state);
    }
    if (res.id) navigate('/customers');
  };

  return (
    <>
      <Title label={getTitle()} />
      <form name="customerForm">
        <Input
          name="name"
          label="Name"
          placeholder="Please enter name"
          onChange={handleChange}
          value={state.name}
        />
        <Input
          type="date"
          name="dob"
          label="Date of Birth"
          onChange={handleChange}
          value={state.dob}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Please enter email"
          onChange={handleChange}
          value={state.email}
        />
        <Input
          name="aadharNo"
          label="Aadhar No"
          placeholder="Please enter aadhar no"
          onChange={handleChange}
          value={state.aadharNo}
        />
        <Input
          name="regDate"
          label="Registration Date"
          onChange={handleChange}
          disabled
          value={moment(state.regDate).format('DD/MM/YYYY')}
        />
        <Input
          name="assignMobileNo"
          label="Mobile No"
          placeholder="Please enter mobile no"
          onChange={handleChange}
          value={state.assignMobileNo}
        />
        <div className="actions">
          <Button name="save" label="Save" onClick={handleSave} />
          {id ? (
            <Button name="delete" label="Delete" onClick={handleDelete} />
          ) : null}
        </div>
      </form>
    </>
  );
}
