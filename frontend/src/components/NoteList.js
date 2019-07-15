import React from "react";
import NoteItem from "./NoteItem";

const NoteList = props => {
  const notes = props.notes.map(note => {
    return (
      <NoteItem
        handleViewNoteClick={props.handleViewNoteClick}
        handleDeleteSubmit={props.handleDeleteSubmit}
        key={note.id}
        note={note}
      />
    );
  });
  return (
    <ul>
      {/* Render list of notes here... */}
      {notes}
    </ul>
  );
};

export default NoteList;
