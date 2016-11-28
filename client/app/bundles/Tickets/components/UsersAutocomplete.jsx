import React, { PropTypes } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

export default class UsersAutocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      suggestions: []
    };
  };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  loadSuggestions = (value) => {
    return axios.get('/users/search?q=' + value)
      .then(json => this.state.suggestions = json.data)
  };

  getSuggestionValue = (user) => {
    return user.first_name + " " +  user.last_name;
  };

  renderSuggestion = (user) => {
    return (
      <span>{user.first_name} {user.last_name}</span>
    );
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.loadSuggestions(value);
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type a user's name",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        onSuggestionSelected = {this.props.onUserSelectedClick}
        inputProps={inputProps}
      />
    );
  }
};

