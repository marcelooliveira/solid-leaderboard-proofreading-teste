import type { Component } from 'solid-js';
import { Router, Route } from '@solidjs/router';
import Index from './routes/index';
import Player from './routes/player';

const App: Component = () => {
  return (
    <Router>
        <Route path="/" component={Index} />
        <Route path="/player" component={Player} />
    </Router>
  );
};

export default App;
