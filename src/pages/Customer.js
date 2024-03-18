import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { getCustomer, planListMap } from '../data/customerApi';
import Title from '../components/Title';
import moment from 'moment';

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

export default function Customer() {
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.currentUser) {
        const res = await getCustomer(localStorage.currentUser);
        if (res) setState({ ...res[0] });
      }
    };
    fetchData();
    document.title = 'Customer';
  }, []);

  return (
    <>
      <Title label="Customer" />
      <form name="customerForm">
        <Input name="name" label="Name" disabled value={state.name} />
        <Input
          type="date"
          name="dob"
          label="Date of Birth"
          disabled
          value={state.dob}
        />
        <Input name="email" label="Email" disabled value={state.email} />
        <Input
          type="number"
          name="aadharNo"
          label="Aadhar No"
          disabled
          value={state.aadharNo}
        />
        <Input
          name="regDate"
          label="Registration Date"
          disabled
          value={moment(state.regDate).format('DD/MM/YYYY')}
        />
        <Input
          name="assignMobileNo"
          label="Mobile No"
          disabled
          value={state.assignMobileNo}
        />
        <Input
          name="plan"
          label="Plan"
          disabled
          value={planListMap[state.plan]}
        />
      </form>
    </>
  );
}
