// TODO: implement axios here

// import axios from 'axios';
// const ADD_LEAD_INPUT = 'https://localhost:3001/addLeadInput';

// export const addLeadInput = axios.create({
//   baseURL: ADD_LEAD_INPUT,
//   headers: { 'Content-Type': 'application/json' },
// });

// export const postLeadInput = async leads => await addLeadInput.post(leads);

export const addLeadInput = async leads => {
  await fetch('http://localhost:3001/addLeadInput', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leads),
  });
};
