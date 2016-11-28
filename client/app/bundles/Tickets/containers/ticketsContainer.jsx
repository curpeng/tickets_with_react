import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../components/Modal';
import Tickets from '../components/Tickets';

import * as ticketsActions from '../actions/ticketsActions';

const TicketsContainer = ({ actions, ticketsData }) => {
  return (
    <div>
      <Modal data={ticketsData.modal} actions={actions} tickets= {ticketsData.tickets} />
      <Tickets {...{actions, ticketsData}} />
    </div>
  );
};

TicketsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  ticketsData: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ticketsData: state.ticketsData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      onTicketClick: (id) => { dispatch(ticketsActions.showTicket(id)) },
      onTicketDeleteClick: (id, e) => {
        e.stopPropagation();
        dispatch(ticketsActions.deleteTicket(id, dispatch))
      },
      closeModalClick: () => { dispatch(ticketsActions.closeTicket()) },
      updateTicketClick: (ticket) => { dispatch(ticketsActions.updateTicket(ticket, dispatch)) },
      onEditClick: () => { dispatch(ticketsActions.editTicket()) }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);
