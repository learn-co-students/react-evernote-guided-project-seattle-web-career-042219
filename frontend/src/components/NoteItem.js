import React from "react";

const NoteList = props => (
  <li onClick={() => props.handleViewNoteClick(props.note.id)}>
    <h2>{props.note.title}</h2>
    <p>{props.note.body.slice(0, 25).concat("...")}</p>
    <button
      type="button"
      onClick={() => props.handleDeleteSubmit(props.note.id)}
    >
      Delete
    </button>
  </li>
);

export default NoteList;
