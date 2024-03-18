import localforage from 'localforage';
import { matchSorter } from 'match-sorter';
import { toast } from 'react-toastify';
import sortBy from 'sort-by';

export const planList = [
  {
    id: 'p365',
    name: 'Platinum365',
    cost: 499,
    validity: 365,
    status: 'Active',
  },
  { id: 'g180', name: 'Gold180', cost: 299, validity: 180, status: 'Active' },
  { id: 's90', name: 'Silver90', cost: 199, validity: 90, status: 'Active' },
];

export const planListMap = {
  p365: 'Platinum365',
  g180: 'Gold180',
  s90: 'Silver90',
};

export async function createCustomer(arg) {
  try {
    let id = Math.random().toString(36).substring(2, 9);
    let customer = { ...arg, id, createdAt: Date.now() };
    await set(arg.assignMobileNo, customer);
    toast('Customer Created Successfully.');
    await delayTime();
    return customer;
  } catch (error) {
    toast('Error while Customer Create.');
    await delayTime();
    return;
  }
}

export async function getCustomer(id) {
  let customers = await localforage.getItem(id);
  return customers;
}

export async function updateCustomer(id, updates) {
  try {
    let customers = await localforage.getItem(updates.assignMobileNo);
    let customer = customers[0];
    if (!customer) throw new Error('No customer found for', id);
    Object.assign(customer, updates);
    await set(updates.assignMobileNo, customers);
    toast('Plan Successfully.');
    await delayTime();
    return customer;
  } catch (error) {
    toast('Error while Plan Update.');
    await delayTime();
    return;
  }
}

export function set(key, customers) {
  return localforage.setItem(key, customers);
}

export async function delayTime() {
  return new Promise((res) => {
    setTimeout(res, Math.random() * 500);
  });
}
