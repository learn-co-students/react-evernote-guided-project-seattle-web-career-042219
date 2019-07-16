import React, { Component } from "react";
import NoteList from "./NoteList";

class Sidebar extends Component {
  render() {
    return (
      <div className="master-detail-element sidebar">
        <NoteList
          notes={this.props.notes}
          handleViewNoteClick={this.props.handleViewNoteClick}
          handleEditNoteClick={this.props.handleEditNoteClick}
          handleDeleteSubmit={this.props.handleDeleteSubmit}
        />
        <button onClick={this.props.handleNewSubmit}>New</button>
      </div>
    );
  }
}

export default Sidebar;
