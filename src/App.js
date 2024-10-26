import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./views/components/Layout";

import Home from "./views/home";
import Events from "./views/Event/events";
import Gardens from "./views/Garden/gardens";
import AddEvent from "./views/Event/AddEvent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />             {/* Home page */}
          <Route path="events" element={<Events />} /> {/* Events page */}
          <Route path="add-event" element={<AddEvent />} /> {/* Add Event page */}

            <Route path="gardens" element={<Gardens />} /> {/* Events page */}

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
