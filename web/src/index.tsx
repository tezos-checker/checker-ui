import { ChakraProvider } from '@chakra-ui/react'
import { store } from '@config'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import checkerTheme from './theme/theme'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={checkerTheme}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
