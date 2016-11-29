import React, { PropTypes } from 'react';
import UsersAutocomplete from './UsersAutocomplete';
import Dropdown from 'react-dropdown';

export default class CreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: this.props.states[0],
      description: ''
    };
  }

  changePerformer = (event, { suggestion }) => {
    this.setState((prevState, props) => ({
      performer_id: suggestion.id
    }));
  };

  setDesc = (e) => {
    e.persist();
    this.setState((prevState, props) => ({
      description: e.target.value
    }));
  };

  chooseState = (state) => {
    this.setState((prevState, props) => ({
      state: state.value
    }));
  };

  createTicket = ()=>{
    this.props.actions.createTicketClick(this.state);
  };

  render() {
    if(this.props.isShown) {
      let style, performer, state;

      style = {
        display: 'block',
      };

      if (this.state.perfomer){
        performer = this.state.performer.first_name +' ' + ticket.performer.last_name
      } else {
        performer = ''
      }

      return (
        <div>
          <div className="bs-component">
            <div className="modal" style={style}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button className="close" onClick={this.props.actions.closeCreateForm}>×</button>
                    <h4>New Ticket</h4>
                  </div>

                  <div className="modal-body">
                    <table>
                      <tbody>
                        <tr>
                          <td>Description: </td>
                          <td>
                            <input type="text" className="form-control" value={ this.state.description } onChange={this.setDesc}/>
                          </td>
                        </tr>

                        <tr>
                          <td> State: </td>
                          <td>
                            <Dropdown options={this.props.states} onChange={this.chooseState} value={this.state.state} placeholder="Select an option" />
                          </td>
                        </tr>

                        <tr>
                          <td>Performer: </td>
                          <td>
                            <UsersAutocomplete onUserSelectedClick={this.changePerformer} value={performer}/>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-primary" onClick={this.createTicket}>Create Ticket</button>
                    </div>
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
}
