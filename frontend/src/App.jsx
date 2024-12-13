import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import 'preline/dist/preline.js';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Define the default route */}
        <Route path="/" element={<Root />} />

        {/* Define other routes */}
        {/* <Route path="/routing-info" element={<RoutingInfo />} />
        <Route path="/games" element={<Games />} /> */}
      </Routes>
    </Router>
  );
}

