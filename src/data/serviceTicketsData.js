const _apiUrl = "/servicetickets";

const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

const serviceTicketDetails = (id) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch(reject)
});

const createServiceTicket = (payload) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch(reject)
});

const deleteServiceTicket = (id) => new Promise((resolve, reject) => {
  fetch(`${_apiUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then((response) => response.json())
  .then((data) => resolve(data))
  .catch(reject);
})

//export a function here that gets a ticket by id

export { getServiceTickets, serviceTicketDetails, createServiceTicket, deleteServiceTicket }
