import React, { Component } from "react";

class NoteEditor extends Component {
  render() {
    return (
      <form className="note-editor">
        <input
          type="text"
          name="title"
          value={this.props.chosenNote.title}
          onChange={this.props.handleEditFormChange}
        />
        <textarea
          name="body"
          value={this.props.chosenNote.body}
          onChange={this.props.handleEditFormChange}
        />
        <div className="button-row">
          <input
            className="button"
            type="submit"
            value="Save"
            onClick={this.props.handleEditSubmit}
          />
          <button
            type="button"
            onClick={() =>
              this.props.handleViewNoteClick(this.props.chosenNote.id)
            }
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
