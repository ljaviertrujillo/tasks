import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import App from './App';
import ProjectContextProvider from './Provider/ProjectProvider';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProjectContextProvider>
      <App />
    </ProjectContextProvider>
  </React.StrictMode>,
)
