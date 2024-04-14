import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "./Header/HeaderMegaMenu";
import AuthPage from './Route/AuthPage';
import Home from './Route/Home';

const App: React.FC = () => {
  return (
    <Router>
      <MantineProvider>
        <HeaderMegaMenu />
        <Routes>
          <Route path="/signUp" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </MantineProvider>
    </Router>
  );
}

export default App;