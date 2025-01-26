import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AboutPage from "./pages/About";
import { FeedbackProvider } from "./context/FeedbackContext";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutIconLink from "./components/AboutIconLink";
 
// Separate route components for better organization
const About = () => <AboutPage />;

const HomePage = () => (
  <>
    <FeedbackForm />
    <FeedbackStats />
    <FeedbackList />
  </>
);

// Main layout component
const Layout = ({ children }) => (
  <>
    <Header />
    <div className="container">
      {children}
      <AboutIconLink />
    </div>
  </>
);

function App() {
  return (
    <FeedbackProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Layout>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
