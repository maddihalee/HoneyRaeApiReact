const _apiUrl = "/employees";

const getEmployees = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export default getEmployees;
