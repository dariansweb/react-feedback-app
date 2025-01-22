import { useState } from "react";

function FeedbackItem() {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("This is an inital feedback item");

  const handleClick = () => {
    setRating((prev) => {
        return prev + 1
    })
    setText("This is an updated feedback item #2");
  };

  return (
    <div className="card">
      <div className="num-display"> {rating} </div>
      <div className="text-display"> {text} </div>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default FeedbackItem;
