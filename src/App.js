import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./views/components/Layout";

import Home from "./views/home";
import Events from "./views/Event/events";
import AddEvent from "./views/Event/AddEvent";
import EnvironmentList from './views/Environment/EnvironmentList';
import AddEnvironment from './views/Environment/AddEnvironment';
import PlantList from './views/Plant/PlantList';
import AddPlant from './views/Plant/AddPlant';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />             {/* Home page */}
          <Route path="events" element={<Events />} /> {/* Events page */}
          <Route path="add-event" element={<AddEvent />} /> {/* Add Event page */}
          <Route path="Environment" >
            <Route index element={<EnvironmentList />} /> 
            <Route path="add" element={<AddEnvironment />} />
          </Route>
          <Route path="Plant" >
            <Route index element={<PlantList />} /> 
            <Route path="add" element={<AddPlant />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
