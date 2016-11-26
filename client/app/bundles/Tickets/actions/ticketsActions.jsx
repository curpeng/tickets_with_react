import axios from 'axios';
import * as actionTypes from '../constants/ticketsConstants';

export function showTicket(ticketId) {
  return {
    type: actionTypes.SHOW_TICKET,
    ticketId: ticketId
  };
}

export function closeTicket() {
  return {
    type: actionTypes.CLOSE_TICKET,
  };
}

export function updateTicket(ticket, dispatch) {
  return axios.put('/tickets/' + ticket.id + '.json', { ticket: ticket})
    .then(json => dispatch(resolvedUpdateTicket(json.data, dispatch)))
}

export function resolvedUpdateTicket(data, dispatch) {
  dispatch(closeTicket());
  return {
    type: actionTypes.RESOLVED_UPDATE_TICKET,
    data: data
  }
}

