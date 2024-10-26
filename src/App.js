import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./views/components/Layout";

import Home from "./views/home";
import Events from "./views/Event/events";
import AddEvent from "./views/Event/AddEvent";
import QuizList from './views/Quiz/QuizList';
import AddQuiz from './views/Quiz/AddQuiz';
import TutorialList from './views/Quiz/TutorialList';
import AddTutorial from './views/Quiz/AddTutorial';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />             {/* Home page */}
          <Route path="events" element={<Events />} /> {/* Events page */}
          <Route path="add-event" element={<AddEvent />} /> {/* Add Event page */}

          <Route path="quiz" >
            <Route index element={<QuizList />} /> 
            <Route path="add" element={<AddQuiz />} />
          </Route>
          <Route path="tuto" >
            <Route index element={<TutorialList />} /> 
            <Route path="add" element={<AddTutorial />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
