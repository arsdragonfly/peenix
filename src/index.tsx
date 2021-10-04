import * as ReactDOM from 'react-dom';

(async () => {
  const ReduxRoot = (await import('./ReduxRoot')).ReduxRoot
  const rootEl = document.getElementById('root')
  ReactDOM.render(<ReduxRoot />, rootEl)
})().then(() => {}, () => {})

// comment in for PWA with service worker in production mode
// registerServiceWorker();
