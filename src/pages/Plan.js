import React, { useEffect, useState } from 'react';
import Title from '../components/Title';
import Button from '../components/Button';
import { getCustomer, planList, updateCustomer } from '../data/customerApi';

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

export default function Plan() {
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.currentUser) {
        const res = await getCustomer(localStorage.currentUser);
        if (res) setState({ ...res[0] });
      }
    };
    fetchData();
    document.title = 'Plan';
  }, []);

  const handleSave = async () => {
    if (localStorage.currentUser) {
      await updateCustomer(state.id, state);
    }
  };

  return (
    <>
      <Title label="Plan" />
      <form name="customerForm">
        <ul className="plan_container">
          {planList.map((plan) => {
            return (
              <li
                key={plan.id}
                className="plan_item"
                style={{
                  borderColor:
                    state.plan === plan.id ? '#07bc0c' : 'var(--borderColor)',
                }}
                onClick={() => setState({ ...state, plan: plan.id })}
              >
                <p>{plan.name}</p>
                <p>Rs. {plan.cost}</p>
                <p>Validity {plan.validity} day(s)</p>
              </li>
            );
          })}
        </ul>
        <div className="actions">
          <Button name="save" label="Save" onClick={handleSave} />
        </div>
      </form>
    </>
  );
}
