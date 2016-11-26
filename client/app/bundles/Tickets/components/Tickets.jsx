import React, { PropTypes } from 'react';
import Ticket from '../components/Ticket';

export default class Tickets extends React.Component {
  static propTypes = {
    ticketsData: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { tickets: this.props.ticketsData.tickets, sort_type: 1, onTicketClick: props.actions.onTicketClick};
    this.sortStrings = this.sortStrings.bind(this);
    this.sortDates = this.sortDates.bind(this);
  }

  sortStrings(field, context) {
    return function(e) {
      e.preventDefault();
      context.setState((prevState, props) => ({
        sort_type: prevState.sort_type * -1,
        tickets: prevState.tickets.sort(context.compareStrings(prevState.sort_type * -1, field))
      }));
    }
  }

  compareStrings(sort_type, field) {
    return function(a, b) {
      const getEl = function(el){
        const fields = field.split('.');
        if (fields.length > 1){
          return el[fields[0]][fields[1]]
        }
        else {
          return el[fields[0]]
        }
      };

      if (getEl(a) < getEl(b)) {
        return -1 * sort_type;
      } else{
        return sort_type;
      }
    }
  }

  sortDates(e) {
    e.preventDefault();
    this.setState((prevState, props) => ({
      sort_type: prevState.sort_type * -1,
      tickets: prevState.tickets.sort(this.compareDates(prevState.sort_type * -1))
    }));
  }

  compareDates(sort_type) {
    return function(a, b) {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);

      if (dateA < dateB){
        return -1 * sort_type;
      } else{
        return sort_type;
      }
    }
  }

  render() {
    return (
      <div className="tickets-block">
        <table className="table table-striped">
          <thead>
          <tr>
            <td onClick={this.sortStrings('description', this)}>Description</td>
            <td onClick={this.sortStrings('state', this)}>State</td>
            <td onClick={this.sortStrings('owner.first_name', this)}> Owner</td>
            <td onClick={this.sortStrings('performer.first_name', this)}> Performer</td>
            <td onClick={this.sortDates}>Created at</td>
          </tr>
          </thead>
          <tbody>
          { this.state.tickets.map((ticket) => <Ticket key={ticket.id} ticket={ticket} onClick={() => this.state.onTicketClick(ticket.id)}/>) }
          </tbody>
        </table>
      </div>
    );
  }
}
