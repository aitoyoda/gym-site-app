import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { HeaderMegaMenu } from "./Header/HeaderMegaMenu";
import Home from './Route/Home';
import Auth from './Route/Auth';

const App: React.FC = () => {
  return (
    <Router>
      <MantineProvider>
        <HeaderMegaMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<Auth />} />
          <Route path="/LogIn" element={<Auth />} />
        </Routes>
      </MantineProvider>
    </Router>
  );
}

export default App;