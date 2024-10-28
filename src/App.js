import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./views/components/Layout";

import Home from "./views/home";
import Events from "./views/Event/events";
import Gardens from "./views/gardens/gardens";
import Materials from "./views/gardens/material";
import Sponsors from "./views/Event/sponsor";
import AddEvent from "./views/Event/AddEvent";
import AddStore from './views/Store/AddStore';
import StoreList from './views/Store/StoreList';
import SeedList from './views/Seed/SeedList';
import AddSeed from './views/Seed/AddSeed';
import EnvironmentList from './views/Environment/EnvironmentList';
import AddEnvironment from './views/Environment/AddEnvironment';
import PlantList from './views/Plant/PlantList';
import AddPlant from './views/Plant/AddPlant';
import AddBlog from './views/Blog/AddBlog';
import BlogList from './views/Blog/BlogList'; 
import QuizList from './views/Quiz/QuizList';
import AddQuiz from './views/Quiz/AddQuiz';
import TutorialList from './views/Quiz/TutorialList';
import AddTutorial from './views/Quiz/AddTutorial';
import AddReview from './views/Review/AddReview';
import ReviewList from './views/Review/ReviewList';

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


          <Route path="store" >
            <Route index element={<StoreList />} /> 
            <Route path="add" element={<AddStore />} />
          </Route>
          <Route path="seed" >
            <Route index element={<SeedList />} /> 
            <Route path="add" element={<AddSeed />} />
          </Route>
          <Route path="blog" >
            <Route index element={<BlogList />} /> 
            <Route path="add" element={<AddBlog />} />
          </Route>
          <Route path="review" >
            <Route index element={<ReviewList />} /> 
            <Route path="add" element={<AddReview />} />
          </Route>

          <Route path="quiz" >
            <Route index element={<QuizList />} /> 
            <Route path="add" element={<AddQuiz />} />
          </Route>
          <Route path="tuto" >
            <Route index element={<TutorialList />} /> 
            <Route path="add" element={<AddTutorial />} />
          </Route>

            <Route path="gardens" element={<Gardens />} /> {/* Events page */}
            <Route path="sponsors" element={<Sponsors />} /> {/* Events page */}
            <Route path="materials" element={<Materials />} /> {/* Events page */}


        </Route>
      </Routes>
    </Router>
  );
}

export default App;
