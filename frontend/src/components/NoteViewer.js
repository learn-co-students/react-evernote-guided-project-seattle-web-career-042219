import React, { Fragment } from "react";

const NoteViewer = props => {
  return (
    <Fragment>
      <h2>{props.chosenNote.title}</h2>
      <p>{props.chosenNote.body}</p>
      <button onClick={props.handleEditNoteClick}>Edit</button>
    </Fragment>
  );
};

export default NoteViewer;
