import { useState } from 'react';
import Header from "./components/Header";
import FeedbackData from "./data/FeedbackData";
import FeedbackList from "./components/FeedbackList";

function App() {
  const [feedback, setFeedback] = useState(FeedbackData) ;
  return (
    <>
      <Header text="Feedback UI"/>
      <div className="container">
        <FeedbackList feedback={feedback} />
      </div>
    </>
  );
}

export default App;

Header.defaultProps = {
  text: "Feedback UI",
  bgColor: "rgba(0,0,0,0.4)",
  textColor: "#ff6a95",
}
