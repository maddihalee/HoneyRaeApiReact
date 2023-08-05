import { useState, useEffect } from "react";
import { Form } from "reactstrap";
import PropTypes from "prop-types"
import Button from "reactstrap";
import { createServiceTicket } from "../../data/serviceTicketsData";
import getCustomers from "../../data/customersData";
import getEmployees from "../../data/employeeData"

const initialState = {
  customerId: '',
  employeeId: '',
  description: '',
  emergency: false,
};

export default function CreateTicket({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [ticketData, setTicketData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    createServiceTicket(formInput).then(setTicketData);
  }, []);

  useEffect(() => {
    // Fetch employees and customers data from the backend here
    getEmployees().then((data) => setEmployees(data));
    getCustomers().then(setCustomers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      const payload = { ...formInput }
      createServiceTicket(payload).then((response) => {
        console.warn("Service ticket created successfully!", response)
      })
      .catch((error) => {
        console.error("Error creating service ticket:", error);
      });
    }


  return (
    <Form onSubmit={handleSubmit}>
    <h2 className="text-white mt-5">Create Service Ticket</h2>

    <div className="mb-3">
    <label htmlFor="employeeId" className="form-label">
      Employees
    </label>
    <select
      className="form-select"
      id="employeeId"
      aria-label="Employee"
      name="employeeId"
      onChange={handleChange}
      value={formInput.employeeId}
      required
    >
      <option value="">Select an Employee</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.name}
        </option>
      ))}
    </select>
  </div>

  <div className="mb-3">
    <label htmlFor="employee_id" className="form-label">
      Customer
    </label>
    <select
      className="form-select"
      id="customerId"
      aria-label="Customer"
      name="customerId"
      onChange={handleChange}
      value={formInput.customerId}
      required
    >
      <option value="">Select a Customer</option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name}
        </option>
      ))}
    </select>
  </div>
  
    <div className="mb-3">
      <label htmlFor="description" className="form-label">
        Description
      </label>
      <textarea
        className="form-control"
        id="description"
        placeholder="Description"
        style={{ height: '100px' }}
        name="description"
        value={formInput.description}
        onChange={handleChange}
        required
      />
    </div>
  
    {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
    <div className="mb-3">
      <label className="form-check-label">Emergency?</label>
      <input
        className="form-check-input"
        type="checkbox"
        id="emergency"
        name="emergency"
        checked={formInput.emergency}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            emergency: e.target.checked,
          }));
        }}
      />
    </div>
  
    {/* SUBMIT BUTTON  */}
    <button type="submit" className="btn btn-primary">
      Create Service Ticket
    </button>
  </Form>
  );
}

CreateTicket.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.string,
    customerId: PropTypes.string,
    employeeId: PropTypes.string,
    description: PropTypes.string,
    emergency: PropTypes.bool,
    dateCompleted: PropTypes.string,
  }),
};

CreateTicket.defaultProps = {
  obj: initialState,
};
