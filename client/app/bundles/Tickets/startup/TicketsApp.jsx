import React from 'react';
import ReactOnRails from 'react-on-rails';

import Tickets from '../components/Tickets';

// _railsContext is the Rails context, providing contextual information for rendering
const TicketsApp = (props, _railsContext) => (
  <Tickets {...props} />
);

// This is how react_on_rails can see the HelloWorldApp in the browser.
ReactOnRails.register({ TicketsApp });
