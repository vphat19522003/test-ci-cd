import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import GlobalCssPriority from './GlobalCssPriority';
import store from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalCssPriority>
        <App />
      </GlobalCssPriority>
    </Provider>
  </StrictMode>
);
