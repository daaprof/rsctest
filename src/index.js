import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import ContextProvider from "./utils/ContextProvider"
import App from "./app/App"

import { Buffer } from 'buffer';
import './i18n';

window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>
)
