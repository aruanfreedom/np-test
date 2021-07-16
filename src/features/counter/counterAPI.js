// A mock function to mimic making an async request for data
export const fetchCount = (amount = 1) => {
  const fetch = new Promise((resolve) => setTimeout(() => resolve({ data: amount }), 500));
  return fetch;
};

export default fetchCount;
