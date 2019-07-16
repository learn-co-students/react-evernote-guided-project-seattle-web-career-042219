import React, { Component, Fragment } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

class NoteContainer extends Component {
  state = {
    notes: [],
    editANote: false,
    viewANote: false,
    chosenNote: null,
    filterInputValue: "",
    filterSelectValue: "title"
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/notes")
      .then(res => res.json())
      .then(res =>
        this.setState({ notes: res }, () =>
          console.log(this.state.notes.length)
        )
      )
      .catch(err => console.log(err));
  }

  handleViewNoteClick = noteId => {
    let newNotes = this.state.notes.slice();
    let finalNotes = newNotes.filter(note => note.id === noteId);
    this.setState({
      viewANote: true,
      editANote: false,
      chosenNote: finalNotes[0]
    });
  };

  handleEditNoteClick = () => {
    this.setState({ editANote: true });
  };

  handleEditFormChange = e => {
    this.setState({
      chosenNote: {
        ...this.state.chosenNote,
        [e.target.name]: e.target.value
      }
    });
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleEditSubmit = e => {
    e.preventDefault();
    //prettier-ignore
    fetch(`http://localhost:3000/api/v1/notes/${this.state.chosenNote.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: this.state.chosenNote.title,
        body: this.state.chosenNote.body
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res => this.handleEdit(res))
      .catch(err => console.log(err));
  };

  handleEdit = res => {
    let newArray = this.state.notes.slice();
    let index = null;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === res.id) index = i;
    }
    newArray[index] = res;
    this.setState({ notes: newArray });
  };

  handleNewSubmit = e => {
    e.preventDefault();
    //prettier-ignore
    fetch("http://localhost:3000/api/v1/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        title: "Lorem Ipsum",
        body: "Fluctuat nec mergitur",
        user_id: 1
      })
    })
      .then(res => res.json())
      .then(res =>
        this.setState(prevState => ({ notes: [...prevState.notes, res] }))
      )
      .catch(err => console.log(err));
  };

  handleDeleteSubmit = id => {
    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(
        this.setState(prevState => ({
          notes: prevState.notes.filter(note => note.id !== id)
        }))
      )
      .catch(err => console.log(err));
  };

  render() {
    let filteredResults = this.state.notes.slice();
    let finalAr;
    this.state.filterInputValue && this.state.filterSelectValue
      ? (finalAr = filteredResults.filter(note => {
          return note[this.state.filterSelectValue]
            .toLowerCase()
            .includes(this.state.filterInputValue.toLowerCase());
        }))
      : (finalAr = this.state.notes.slice());
    return (
      <Fragment>
        <Search
          handleInputChange={this.handleInputChange}
          filterInputValue={this.state.filterInputValue}
          filterSelectValue={this.state.filterSelectValue}
        />
        <div className="container">
          <Sidebar
            notes={finalAr}
            handleViewNoteClick={this.handleViewNoteClick}
            handleNewSubmit={this.handleNewSubmit}
            handleDeleteSubmit={this.handleDeleteSubmit}
          />
          <Content
            viewANote={this.state.viewANote}
            editANote={this.state.editANote}
            chosenNote={this.state.chosenNote}
            handleEditNoteClick={this.handleEditNoteClick}
            handleEditSubmit={this.handleEditSubmit}
            handleEditFormChange={this.handleEditFormChange}
            handleViewNoteClick={this.handleViewNoteClick}
          />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
