import { createRoot } from 'react-dom/client';
import { ColorModeScript } from "@chakra-ui/react"
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root')!);
root.render(
  <BrowserRouter>
    <ColorModeScript />
    <App cookies={undefined} />
  </BrowserRouter>
);
