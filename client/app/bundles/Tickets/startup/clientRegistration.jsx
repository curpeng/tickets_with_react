import ReactOnRails from 'react-on-rails';

import Tickets from '../components/Tickets';
import TicketsApp from './TicketsApp';

import TicketsStore from '../stores/TicketsStore';

ReactOnRails.setOptions({
  traceTurbolinks: true,
});

ReactOnRails.register({
  Tickets,
  TicketsApp
});

ReactOnRails.registerStore({
  TicketsStore,
});
