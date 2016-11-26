import React, { PropTypes } from 'react';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'read',
      changedTicket: null
    };

    this.editTicket = this.editTicket.bind(this);
    this.saveTicket = this.saveTicket.bind(this);
    this.changeTicketDesc = this.changeTicketDesc.bind(this);
    this.getTicket = this.getTicket.bind(this);
  }

  editTicket () {
    this.setState((prevState, props) => ({
      type: 'edit',
      changedTicket: this.getTicket(props.ticketsData.chosenTicketId)
    }));
  }

  saveTicket () {
    this.setState((prevState, props) => ({
      type: 'read',
    }));
    this.props.actions.updateTicketClick(this.state.changedTicket);
  }

  changeTicketDesc (e) {
    e.persist();
    this.setState((prevState, props) => ({
      changedTicket: Object.assign({}, prevState.changedTicket, {
        description: e.target.value
      })
    }));
  }

  getTicket (id) {
    return this.props.ticketsData.tickets.find(function(el){return el.id === id});
  }

  render() {
    const ticketsData = this.props.ticketsData;
    var ticket = this.getTicket(ticketsData.chosenTicketId);
    if (ticket){
      let style = {
        display: 'block',
      };

      var changeFormTypeButton;
      var description;

      if (this.state.type == 'read') {
        changeFormTypeButton = <button type="button" className="btn btn-primary" onClick={this.editTicket}>Edit</button>
        description = ticket.description
      } else{
        changeFormTypeButton = <button type="button" className="btn btn-primary" onClick={this.saveTicket}>Save</button>
        description = <input type="text" value={ this.state.changedTicket.description } onChange={this.changeTicketDesc} />
      }

      return (
        <div className= "bs-component">
          <div className="modal" style={style}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button className="close" onClick={this.props.actions.closeModalClick}>×</button>
                  <h4>Ticket #{ticket.id}</h4>
                </div>

                <div className="modal-body">
                  <table>
                    <tbody>
                      <tr>
                        <td>Description: </td>
                        <td> {description} </td>
                      </tr>

                      <tr>
                        <td>State: </td>
                        <td> { ticket.state } </td>
                      </tr>

                      <tr>
                        <td>Onwer: </td>
                        <td> { ticket.owner.first_name } { ticket.owner.last_name} </td>
                      </tr>

                      <tr>
                        <td>Performer: </td>
                        <td> { ticket.performer.first_name } { ticket.performer.last_name } </td>
                      </tr>

                      <tr>
                        <td>Created at: </td>
                        <td> { new Date(ticket.created_at).toString() } </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="modal-footer">
                    { changeFormTypeButton }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return(<div></div>)
    }
  }
};
