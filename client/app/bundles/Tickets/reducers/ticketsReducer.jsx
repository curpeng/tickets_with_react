import * as actionTypes from '../constants/ticketsConstants';

const initialState = {
  tickets: [],
  chosenTicketId: -1
};

export default function TicketsReducer(state = initialState, action) {
  const { type, ticketId } = action;
  switch (type) {
    case actionTypes.DELETE_TICKET:
      return state;

    case actionTypes.SHOW_TICKET:
      return Object.assign({}, state, {
        chosenTicketId: ticketId
      });

    case actionTypes.CLOSE_TICKET:
      return Object.assign({}, state, {
        chosenTicketId: -1
      });

    case actionTypes.UPDATE_TICKET:
      return action.data;

    case actionTypes.RESOLVED_UPDATE_TICKET:
      var ticket = state.tickets.find(function(el){return el.id === action.data.id});
      ticket = Object.assign({}, ticket, action.data);
      var newTickets = state.tickets;
      for(var i=0 ; i< newTickets.length; i++)
        {
          if(newTickets[i].id == ticket.id)
            newTickets[i] = ticket
        }

      return Object.assign({}, state, {
        tickets: newTickets
      });

    case actionTypes.RESOLVED_DELETE_TICKET:
      newTickets = state.tickets.filter(function(el){return el.id != action.ticketId});
      return Object.assign({}, state, {
        tickets: newTickets
      });

    default:
      return state;
  }
}
