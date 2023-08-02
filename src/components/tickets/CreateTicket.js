import { useState, useEffect } from "react";
import { Form } from "reactstrap";
import Button from "reactstrap";
import { getServiceTickets, createServiceTicket } from "../../data/serviceTicketsData";

const initialState = {
  id: '',
  customerId: '',
  employeeId: '',
  description: '',
  emergency: false,
  dateCompleted: null,
};

export default function CreateTicket({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [createTicket, setCreateTicket] = useState([]);

  useEffect(() => {
    createServiceTicket().then(setCreateTicket);
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
      const payload = { ...formInput };
      createTicket(payload).then();
    }


  return (
    <Form onSubmit={handleSubmit}>
    <h2 className="text-white mt-5">Create Service Ticket</h2>

    <div className="mb-3">
      <label htmlFor="title" className="form-label">
        Service Ticket Id
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        placeholder="Enter a title"
        name="title"
        value={formInput.id}
        onChange={handleChange}
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="customerId" className="form-label">
        Customer Id
      </label>
      <input
        type="text"
        className="form-control"
        id="customerId"
        placeholder="Enter Customer Id"
        name="customerId"
        value={formInput.customerId}
        onChange={handleChange}
        required
      />
    </div>
  
    {/* PRICE INPUT  */}
    <div className="mb-3">
      <label htmlFor="price" className="form-label">
        Book Price
      </label>
      <input
        type="text"
        className="form-control"
        id="price"
        placeholder="Enter price"
        name="price"
        value={formInput.price}
        onChange={handleChange}
        required
      />
    </div>
  
   
    {/* DESCRIPTION TEXTAREA  */}
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
      <label className="form-check-label">On Sale?</label>
      <input
        className="form-check-input"
        type="checkbox"
        id="sale"
        name="sale"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
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

// BookForm.propTypes = {
//   obj: PropTypes.shape({
//     description: PropTypes.string,
//     image: PropTypes.string,
//     price: PropTypes.string,
//     sale: PropTypes.bool,
//     title: PropTypes.string,
//     author_id: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }),
// };

// BookForm.defaultProps = {
//   obj: initialState,
// };
