import { useEffect, useState } from "react";
import "./Modal.scss";

interface Card {
	front: string;
	back: string;
}

const Modal = (props: any) => {
	const [quiz, setQuiz] = useState<any>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isAnswered, setIsAnswered] = useState<boolean>(false);
	const [card, setCard] = useState<Card>({ front: "", back: "" });
	const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

	useEffect(() => {
		console.log("props.quizQuestions:", props.quizQuestions);
		if (props.quizQuestions && props.quizQuestions.length > 0) {
			setQuiz([...props.quizQuestions]);
		}
	}, []);

	useEffect(() => {
		if (currentIndex < quiz.length && quiz.length > 0) {
			setCard(quiz[currentIndex]);
		} else if (currentIndex >= props.quizQuestions.length) {
			setIsQuizCompleted(true);
		}
	}, [quiz, currentIndex]);

	const loadNextCard = () => {
		setCurrentIndex((prev) => prev + 1);
		setIsAnswered(false);

		console.log(quiz);
	};

	// const shuffleCard = (amountToShuffle: number) => {
	//   let newIndex: number = currentIndex + amountToShuffle;
	//   if (newIndex > quiz.length - 1) {
	//     newIndex = quiz.length - 1;
	//   }
	//   setQuiz(quiz.splice(newIndex, 0, quiz[currentIndex]));
	//   loadNextCard();
	//   return;
	// };

	const shuffleCard = (amountToShuffle: number) => {
		let newIndex: number = currentIndex + amountToShuffle;
		if (newIndex > quiz.length - 1) {
			newIndex = quiz.length - 1;
		}

		const cardToShift: Card = quiz[currentIndex];
		const updatedQuiz = [
			...quiz.slice(0, currentIndex),
			...quiz.slice(currentIndex + 1),
		];
		updatedQuiz.splice(newIndex, 0, cardToShift);

		setQuiz(updatedQuiz);
		setIsAnswered(false);
	};

	// const shuffleCard = (amountToShuffle: number) => {
	//   let newIndex: number = currentIndex + amountToShuffle;
	//   if (newIndex >= quiz.length) {
	//     newIndex = quiz.length;
	//   }
	//   const cardToShift: Card = quiz[currentIndex];
	//   const updatedQuiz = [
	//     ...quiz.slice(0, currentIndex),
	//     ...quiz.slice(currentIndex + 1),
	//   ];
	//   updatedQuiz.splice(newIndex, 0, cardToShift);
	//   setQuiz(updatedQuiz);
	//   loadNextCard();
	//   console.log(quiz);
	//   return;
	// };

	const removeCardAndLoadNext = () => {
		// Used for easy cards
		const updatedQuiz = [...quiz];
		updatedQuiz.splice(currentIndex, 1);
		setQuiz(updatedQuiz);
		loadNextCard();
	};

	return (
		<div className="modal-bg">
			<div className="modal-fg">
				<div className="container-title">
					<h2 style={{ margin: "0" }}>{props.quizName}</h2>
					<button className="close-button" onClick={() => props.requestClose()}>
						X
					</button>
				</div>
				{!isQuizCompleted && (
					<div className="container">
						<h1>{card.front}</h1>
						<p style={isAnswered ? { display: "block" } : { display: "none" }}>
							{card.back}
						</p>
						<section className="controls">
							{!isAnswered && (
								<button onClick={() => setIsAnswered(true)}>Show Answer</button>
							)}
							<button onClick={() => shuffleCard(3)}>Again</button>
							<button onClick={() => shuffleCard(6)}>Hard</button>
							<button onClick={() => shuffleCard(12)}>Okay</button>
							<button onClick={() => removeCardAndLoadNext()}>Known</button>
						</section>
					</div>
				)}
			</div>
		</div>
	);
};

export default Modal;
