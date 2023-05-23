import { useEffect, useState, KeyboardEvent } from "react";
import "./Modal.scss";

interface Card {
  front: string;
  back: string;
}

const Modal = (props: any) => {
  const [quiz, setQuiz] = useState<Card[]>([]);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [card, setCard] = useState<Card>({ front: "", back: "" });
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "1":
        shuffleCard(3);
        break;
      case "2":
        shuffleCard(6);
        break;
      case "3":
        shuffleCard(9);
        break;
      case "4":
        removeCardAndLoadNext();
        break;
      case "Escape":
        props.requestClose();
        break;
      case " ":
        setIsAnswered(true);
        break;
    }
  };

  useEffect(() => {
    if (props.quizQuestions.length > 0) {
      setQuiz([...props.quizQuestions]);
    }
  }, [props.quizQuestions]);

  useEffect(() => {
    if (quiz.length > 0) {
      setCard(quiz[0]);
    }
  }, [quiz]);

  const loadNextCard = () => {
    setQuiz((prevQuiz) => prevQuiz.slice(1));
    console.log(quiz);
    if (quiz.length === 1) {
      // This is bad but it has to be done
      setIsQuizCompleted(true);
    }
    setIsAnswered(false);
  };

  const shuffleCard = (amountToShuffle: number) => {
    const cardToShift: Card = quiz[0];
    const updatedQuiz = [...quiz.slice()];
    const newIndex =
      amountToShuffle < updatedQuiz.length
        ? amountToShuffle
        : updatedQuiz.length;
    updatedQuiz.splice(newIndex, 0, cardToShift);
    setQuiz(updatedQuiz);
    loadNextCard();
  };

  const removeCardAndLoadNext = () => {
    const updatedQuiz = [...quiz.slice()];
    setQuiz(updatedQuiz);
    loadNextCard();
  };

  return (
    <div tabIndex={-1} onKeyDown={handleKeyDown} className="modal-bg">
      <div className="modal-fg">
        <div className="container-title">
          <h2 style={{ margin: "0" }}>{props.quizName}</h2>
          <button className="close-button" onClick={() => props.requestClose()}>
            X
          </button>
        </div>
        <div className="container">
          {!isQuizCompleted && quiz.length > 0 && (
            <>
              <h1>{card.front}</h1>
              <p
                style={isAnswered ? { display: "block" } : { display: "none" }}
              >
                {card.back}
              </p>
              <section className="controls">
                {!isAnswered && (
                  <>
                    <button onClick={() => setIsAnswered(true)}>
                      Show Answer
                    </button>
                    <br />
                  </>
                )}
                <div style={{ display: "flex", gap: "1rem" }}>
                  <button className="red" onClick={() => shuffleCard(3)}>
                    Again
                  </button>
                  <button className="orange" onClick={() => shuffleCard(6)}>
                    Hard
                  </button>
                  <button className="yellow" onClick={() => shuffleCard(12)}>
                    Okay
                  </button>
                  <button
                    className="green"
                    onClick={() => removeCardAndLoadNext()}
                  >
                    Known
                  </button>
                </div>
              </section>
              <input autoFocus style={{ opacity: 0, width: 0, height: 0 }} />
            </>
          )}
          {isQuizCompleted && (
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1 style={{ textAlign: "center" }}>
                You reached the end of the deck!
              </h1>
              <h3 style={{ textAlign: "center" }}>
                Practise makes perfect - keep going!
              </h3>
              <button onClick={() => props.requestClose()}>Finish Quiz</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
