import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router";
import {Toaster} from "sonner";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename='/encuestas'>
            <App/>
            <Toaster richColors={true} position={"bottom-center"}/>
        </BrowserRouter>
    </StrictMode>,
)
