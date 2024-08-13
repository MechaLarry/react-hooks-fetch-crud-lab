import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions when the app loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  // Function to add a new question to state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Function to delete a question from state
  function handleDeleteQuestion(deletedQuestionId) {
    const updatedQuestions = questions.filter(
      (question) => question.id !== deletedQuestionId
    );
    setQuestions(updatedQuestions);
  }

  // Function to update a question's correct answer
  function handleUpdateQuestion(updatedQuestion) {
    const updatedQuestions = questions.map((question) =>
      question.id === updatedQuestion.id ? updatedQuestion : question
    );
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
