import { useState } from 'react';
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackItem from "./components/FeedbackItem";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData) ;
  return (
    <>
      <Header />
      <div className="container">
        <FeedbackItem />
      </div>
    </>
  );
}

export default App;
