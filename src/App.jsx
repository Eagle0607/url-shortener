import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";

import UrlShortenerForm from "./components/UrlShortenerForm";
import UrlStatsTable from "./components/UrlStatsTable";
import RedirectHandler from "./components/RedirectHandler";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            URL Shortener
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/stats">
            Statistics
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<UrlShortenerForm />} />
          <Route path="/stats" element={<UrlStatsTable />} />
          <Route path="/short/:code" element={<RedirectHandler />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
