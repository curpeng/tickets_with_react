import * as actionTypes from '../constants/ticketsConstants';

const initialState = {
  tickets: [],
  modal: {
    chosenTicketId: -1,
    type: 'read'
  },
  showCreateForm: false
};

export default function TicketsReducer(state = initialState, action) {
  const { type, ticketId } = action;
  switch (type) {
    case actionTypes.DELETE_TICKET:
      return state;

    case actionTypes.SHOW_TICKET:
      modalState = Object.assign({}, state.modal, {
        chosenTicketId: ticketId,
        type: 'read'
      });
      return Object.assign({}, state, {
         modal: modalState
      });

    case actionTypes.CLOSE_TICKET:
      modalState = Object.assign({}, state.modal, {
        chosenTicketId: -1
      });
      return Object.assign({}, state, {
        modal: modalState
      });

    case actionTypes.CREATE_TICKET:
      return action.data;

    case actionTypes.RESOLVED_CREATE_TICKET:
      return Object.assign({}, state, {
        tickets: state.tickets.concat(action.data)
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

    case actionTypes.EDIT_TICKET:
      let modalState = Object.assign({}, state.modal, {
        type: 'edit',
      });
      return Object.assign({}, state, {
        modal: modalState
      });

    case actionTypes.SHOW_CREATE_FORM:
      return Object.assign({}, state, {
        showCreateForm: true
      });

    case actionTypes.CLOSE_CREATE_FORM:
      return Object.assign({}, state, {
        showCreateForm: false
      });

    case actionTypes.ADD_TICKET_FROM_SOCKETS:
      let newTickets;
      if (state.tickets.find(x => x.id === action.ticket.id) !== undefined ){
        newTickets = state.tickets;
      } else {
        newTickets = state.tickets.concat(action.ticket)
      }

      return Object.assign({}, state, {
        tickets: newTickets
      });

    default:
      return state;
  }
}
