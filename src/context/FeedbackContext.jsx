import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK_STATE);
  const [feedbackEdit, setFeedbackEdit] = useState(INITIAL_EDIT_STATE);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    const response = await fetch("/feedback?+_sort=id&_order=desc");
    const data = await response.json();
    setFeedback(data);
    setIsLoading(false);
  };

  const deleteFeedback = useCallback(async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback((prevFeedback) =>
        prevFeedback.filter((item) => item.id !== id)
      );
    }
  }, []);

  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const editFeedback = useCallback((item) => {
    setFeedbackEdit({ item, edit: true });
  }, []);

  const updateFeedback = useCallback(async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });

    const data = await response.json();

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      feedback,
      feedbackEdit,
      isLoading,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
    }),
    [
      feedback,
      feedbackEdit,
      deleteFeedback,
      addFeedback,
      editFeedback,
      updateFeedback,
    ]
  );

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
