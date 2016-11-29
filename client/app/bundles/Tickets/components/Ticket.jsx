import React, { PropTypes } from 'react';

const Ticket = (props) => {
  return (
    <tr onClick={props.onTicketClick}>
      <td> { props.ticket.description } </td>
      <td> { props.ticket.state }</td>
      <td> { props.ticket.owner.first_name } {props.ticket.owner.last_name}</td>
      <td> { props.ticket.performer.first_name } {props.ticket.performer.last_name}</td>
      <td> { new Date(props.ticket.created_at).toString() } </td>
      <td>
        <button type="button" className="btn btn-danger" onClick={props.onDeleteClick}>Delete</button>
      </td>
    </tr>
  )
};

export default Ticket;
