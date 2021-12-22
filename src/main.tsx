import React from 'react'
import ReactDOM from 'react-dom'
import { worker } from './mocks/browser'
import App from './App'

async function prepare() {
    return worker.start()
}

prepare().then(() => {
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        document.getElementById('root'),
    )
})
