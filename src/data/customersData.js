const _apiUrl = "/customers";

const getCustomers = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export default getCustomers;
