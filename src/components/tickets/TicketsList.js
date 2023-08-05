import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Button } from "reactstrap";
import { deleteServiceTicket, getServiceTickets } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);
  // const { id } = useParams();

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const deleteThisTicket = (id) => {
    deleteServiceTicket(id).then((response) => {
      console.warn("Service ticket deleted successfully!", response)
    })
    .catch((error) => {
      console.error("Error deleting service ticket:", error);
    });
  }

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateCompleted?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
              <br></br>
              <Button onClick={deleteThisTicket}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
