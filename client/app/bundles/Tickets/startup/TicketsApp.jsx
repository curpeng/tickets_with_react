import React from 'react';
import { Provider } from 'react-redux';
import ReactOnRails from 'react-on-rails';
import TicketsContainer from '../containers/ticketsContainer';

/*
 *  Export a function that returns a ReactComponent, depending on a store named TicketsContainer.
 *  This is used for the client rendering hook after the page html is rendered.
 *  React will see that the state is the same and not do anything.
 */

export default () => {
  // This is where we get the existing store.
  const store = ReactOnRails.getStore('TicketsStore');
  return (
    <Provider store={store}>
      <TicketsContainer />
    </Provider>
  );
};
