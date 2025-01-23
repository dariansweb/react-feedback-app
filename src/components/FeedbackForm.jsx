import { useState } from "react";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

const FeedbackForm = ( {handleAdd} ) => {
  const [rating, setRating] = useState(10);
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");

  const handleTextChange = ({ target: { value } }) => { // 👈  get the value
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
      
  // prettier-ignore
    } else if (value.trim().length < 10) { // 👈 check for less than 10
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      setText("");
      setRating(10);
    }
    const newFeedback = {
      text,
      rating,
    };
    handleAdd(newFeedback);
    setText('');
    setRating(10);
    setBtnDisabled(true);
  };

  return (
    <Card>
      <form onSubmit={ handleSubmit } >
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating) } />
        <div className="input-group">
          <input
            type="text"
            placeholder="Write a review"
            onChange={handleTextChange}
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
