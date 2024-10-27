import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./views/components/Layout";

import Home from "./views/home";
import Events from "./views/Event/events";
import AddEvent from "./views/Event/AddEvent";
import AddStore from './views/Store/AddStore';
import StoreList from './views/Store/StoreList';
import SeedList from './views/Seed/SeedList';
import AddSeed from './views/Seed/AddSeed';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />             {/* Home page */}
          <Route path="events" element={<Events />} /> {/* Events page */}
          <Route path="add-event" element={<AddEvent />} /> {/* Add Event page */}


          <Route path="store" >
            <Route index element={<StoreList />} /> 
            <Route path="add" element={<AddStore />} />
          </Route>
          <Route path="seed" >
            <Route index element={<SeedList />} /> 
            <Route path="add" element={<AddSeed />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
