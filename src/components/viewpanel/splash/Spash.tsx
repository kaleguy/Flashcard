import React, { useEffect, useState } from "react";

const Spash = (props: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
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
      <button>Begin Practise</button>
    </div>
  );
};

export default Spash;
