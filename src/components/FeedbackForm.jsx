import { useState, useContext, useEffect, useCallback } from "react";
import FeedbackContext from "../context/FeedbackContext";
import Card from "./shared/Card";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";

const MINIMUM_TEXT_LENGTH = 10;
const DEFAULT_RATING = 10;

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    rating: 2,
    text: "",
    btnDisabled: true,
    message: "",
  });

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  // Handle edit mode
  useEffect(() => {
    if (feedbackEdit.edit) {
      setFormData((prev) => ({
        ...prev,
        text: feedbackEdit.item.text,
        rating: feedbackEdit.item.rating,
        btnDisabled: false,
      }));
    }
  }, [feedbackEdit]);

  const validateText = useCallback((text) => {
    if (!text) {
      return {
        isValid: false,
        message: null,
        btnDisabled: true,
      };
    }

    const isValidLength = text.trim().length >= MINIMUM_TEXT_LENGTH;
    return {
      isValid: isValidLength,
      message: isValidLength
        ? null
        : `Text must be at least ${MINIMUM_TEXT_LENGTH} characters`,
      btnDisabled: !isValidLength,
    };
  }, []);

  const handleTextChange = useCallback(
    ({ target: { value } }) => {
      const validation = validateText(value);
      setFormData((prev) => ({
        ...prev,
        text: value,
        message: validation.message,
        btnDisabled: validation.btnDisabled,
      }));
    },
    [validateText]
  );

  const resetForm = useCallback(() => {
    setFormData({
      text: "",
      rating: DEFAULT_RATING,
      btnDisabled: true,
      message: "",
    });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const { text, rating } = formData;

      if (text.trim().length < MINIMUM_TEXT_LENGTH) return;

      const newFeedback = { text, rating };

      if (feedbackEdit.edit) {
        updateFeedback(feedbackEdit.item.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }

      resetForm();
    },
    [formData, feedbackEdit, updateFeedback, addFeedback, resetForm]
  );

  const { text, rating, btnDisabled, message } = formData;

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect
          select={(rating) => setFormData((prev) => ({ ...prev, rating }))}
          selected={rating}
        />
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
        {message && <div className="message">{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
