import { createRoot } from 'react-dom/client'
import { worker } from './mocks/browser'
import App from './App'

async function prepare() {
    return worker.start()
}

prepare().then(() => {
    createRoot(document.getElementById('root')!).render(<App />)
})
