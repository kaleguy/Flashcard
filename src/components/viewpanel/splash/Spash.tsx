import { useEffect, useState } from "react";
import Modal from "../../modal/Modal";

const Spash = (props: any) => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
  const [selectedSubdeck, setSelectedSubdeck] = useState<any>(null);

  useEffect(() => {
    if (isModalWindowOpen) {
      setSelectedSubdeck(props.subdeck[Object.keys(props.subdeck)[0]]);
    }
  }, [isModalWindowOpen, props.subdeck]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {isModalWindowOpen && selectedSubdeck && (
        <Modal
          requestClose={() => setIsModalWindowOpen(!isModalWindowOpen)}
          quizQuestions={selectedSubdeck}
          quizName={Object.keys(props.subdeck)[0]}
        />
      )}

      <h1>
        {props.subdeck === null
          ? "Import and select a deck to get started."
          : Object.keys(props.subdeck)[0]}
      </h1>
      <p>
        {
          props.subdeck === null
            ? ""
            : `This deck contains ${
                props.subdeck[Object.keys(props.subdeck)[0]].length
              } cards.` /* OMG SO BAD SPAGHETTI FIX THISSS */
        }
      </p>
      <button
        disabled={
          props.subdeck == undefined ||
          props.subdeck[Object.keys(props.subdeck)[0]].length == 0
        }
        onClick={() => setIsModalWindowOpen(true)}
      >
        Begin Practise
      </button>
    </div>
  );
};

export default Spash;
