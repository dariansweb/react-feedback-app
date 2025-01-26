import { createContext, useState, useCallback, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  // Initialize state outside of component if it's static
  const initialFeedback = [
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

  const [feedback, setFeedback] = useState(initialFeedback);

  // Memoize functions to prevent unnecessary re-renders
  const deleteFeedback = useCallback((id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item.id !== id)
      );
    }
  }, []);

  const addFeedback = useCallback((newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback((prevFeedback) => [newFeedback, ...prevFeedback]);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      feedback,
      deleteFeedback,
      addFeedback,
    }),
    [feedback, deleteFeedback, addFeedback]
  );

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Optimize exports
export default FeedbackContext;
