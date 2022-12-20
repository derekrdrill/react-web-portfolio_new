// TODO: implement axios here

// import axios from 'axios';
// const ADD_LEAD_INPUT = 'https://localhost:3001/addLeadInput';

// export const addLeadInput = axios.create({
//   baseURL: ADD_LEAD_INPUT,
//   headers: { 'Content-Type': 'application/json' },
// });

// export const postLeadInput = async leads => await addLeadInput.post(leads);

export const addLeadInput = async leads => {
  await fetch(`${process.env.REACT_APP_BACKEND_URL}/addLeadInput`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leads),
  });
};
