import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Tickets from '../components/Tickets';
import Modal from '../components/Modal';

import * as ticketsActions from '../actions/ticketsActions';

const TicketsContainer = ({ actions, ticketsData, railsContext }) => {
  return (
    <div>
      <Modal {...{actions, ticketsData}} />
      <Tickets {...{actions, ticketsData, railsContext}} />
    </div>
  );
};

TicketsContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  ticketsData: PropTypes.object.isRequired,
  railsContext: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    ticketsData: state.ticketsData,
    railsContext: state.railsContext,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      onTicketClick: (id) => { dispatch(ticketsActions.showTicket(id)) },
      closeModalClick: () => { dispatch(ticketsActions.closeTicket()) },
      updateTicketClick: (ticket) => { dispatch(ticketsActions.updateTicket(ticket, dispatch)) }
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TicketsContainer);
