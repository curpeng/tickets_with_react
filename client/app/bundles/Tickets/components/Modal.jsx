import React, { PropTypes } from 'react';
import UsersAutocomplete from './UsersAutocomplete';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.changedTicket = null;
    this.saveTicket = this.saveTicket.bind(this);
    this.changeTicketDesc = this.changeTicketDesc.bind(this);
    this.getTicket = this.getTicket.bind(this);
    this.editTicket = this.editTicket.bind(this);
    this.changePerformer = this.changePerformer.bind(this);
  }

  editTicket () {
    this.setState((prevState, props) => ({
      changedTicket: this.getTicket(props.data.chosenTicketId)
    }));
    this.props.actions.onEditClick();
  }

  changePerformer (event, { suggestion }) {
    this.setState((prevState, props) => ({
      changedTicket: Object.assign({}, prevState.changedTicket, {
        performer: suggestion,
        performer_id: suggestion.id
      })
    }));
  }

  saveTicket () {
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
    return this.props.tickets.find(function(el){return el.id === id});
  }

  render() {
    const data = this.props.data;
    var ticket = this.getTicket(data.chosenTicketId);
    if (ticket){
      let style = {
        display: 'block',
      };

      var actionButtonCallback, actionButtonText, description, performer;

      if (data.type == 'read') {
        actionButtonCallback = this.editTicket;
        actionButtonText = 'Edit';
        description = ticket.description;
        performer = ticket.performer.first_name + " " + ticket.performer.last_name
      } else{
        actionButtonCallback = this.saveTicket;
        actionButtonText = 'Save';
        description = <input type="text" value={ this.state.changedTicket.description } onChange={this.changeTicketDesc} />
        performer = <UsersAutocomplete onUserSelectedClick={this.changePerformer} value={ticket.performer.first_name +' '+ticket.performer.last_name}/>
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
                        <td>
                          { performer }
                        </td>

                      </tr>

                      <tr>
                        <td>Created at: </td>
                        <td> { new Date(ticket.created_at).toString() } </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={actionButtonCallback}>{actionButtonText}</button>
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
