import { createContext, useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

// Move initial state to a separate constant
const INITIAL_FEEDBACK_STATE = [
  {
    id: 1,
    text: "This item 1 from the context",
    rating: 7,
  },
  {
    id: 2,
    text: "This item 2 from the context",
    rating: 3,
  },
  {
    id: 3,
    text: "This item 3 from the context",
    rating: 5,
  },
];

const INITIAL_EDIT_STATE = {
  item: {},
  edit: false,
};

export const FeedbackProvider = ({ children }) => {
  // Move useState inside component
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK_STATE);
  const [feedbackEdit, setFeedbackEdit] = useState(INITIAL_EDIT_STATE);

  const deleteFeedback = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(prevFeedback => prevFeedback.filter(item => item.id !== id));
    }
  }, []);

  const addFeedback = useCallback((newFeedback) => {
    setFeedback(prevFeedback => [{
      ...newFeedback,
      id: uuidv4()
    }, ...prevFeedback]);
  }, []);

  const editFeedback = useCallback((item) => {
    setFeedbackEdit({ item, edit: true });
  }, []);

  const updateFeedback = useCallback((id, updatedItem) => {
    setFeedback(prevFeedback =>
      prevFeedback.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
  }, []);

  const contextValue = useMemo(() => ({
    feedback,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  }), [
    feedback,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback
  ]);

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
