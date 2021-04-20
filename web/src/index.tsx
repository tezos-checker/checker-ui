import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ConnectedNetwork } from './_old_/state/connected.context'
import theme from './theme/theme'
import { store } from './config/store'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ConnectedNetwork>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ConnectedNetwork>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
