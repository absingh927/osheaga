import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { createAppStore } from './store';
import { Provider } from 'react-redux';

const store = createAppStore();

ReactDOM.render(
  <Provider store={store}>
   <App />
  </Provider>,
  document.getElementById('osheaga-trip-root') as HTMLElement
);