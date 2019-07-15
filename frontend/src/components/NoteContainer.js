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
    this.getCall();
  }

  getCall = () => {
    console.log("getCall fires");
    fetch("http://localhost:3000/api/v1/notes")
      .then(res => res.json())
      // .then(res => {
      //   console.log(res);
      //   return res;
      // })
      .then(res =>
        this.setState({ notes: res }, () =>
          console.log(this.state.notes.length)
        )
      )
      .catch(err => console.log(err));
  };

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

  handleFilterInputChange = e => {
    console.log("handleFilterChange fires");
    this.setState({ filterInputValue: e.target.value });
  };

  handleFilterSelectChange = e => {
    console.log("handleFilterSelectChange fires");
    this.setState({ filterSelectValue: e.target.value });
  };

  // filter = () => {
  //   console.log("this.state.filterInputValue=", this.state.filterInputValue);
  //   console.log("this.state.filterSelectValue=", this.state.filterSelectValue);
  //   let filteredResults = this.state.notes.slice();
  //   let finalAr = filteredResults.filter(note =>
  //     note[this.state.filterSelectValue]
  //       .toLowerCase()
  //       .includes(this.state.filterInputValue.toLowerCase())
  //   );
  // };

  handleEditSubmit = e => {
    e.preventDefault();
    //prettier-ignore
    fetch(
      `http://localhost:3000/api/v1/notes/${this.state.chosenNote.id}`,{
        "method": "PATCH",
        "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
        body: JSON.stringify({
          title: this.state.chosenNote.title,
          body: this.state.chosenNote.body
        })
      })
        .then(res => res.json())
        .then(this.getCall())
        .catch(err => console.log(err))
  };

  handleNewSubmit = e => {
    console.log("handleNewSubmit fires");
    e.preventDefault();
    //prettier-ignore
    fetch(
        'http://localhost:3000/api/v1/notes',{
          "method": "POST",
          "headers": {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
          body: JSON.stringify({
            title: "Lorem Ipsum",
            body: "Fluctuat nec mergitur",
            user_id:1
          })
        })
          .then(res => res.json())
          .then(res=> {
            console.log(res)
            return res
          })
          .then(this.getCall())
          // .then(this.setState: notes: newNotes)
          .catch(err => console.log(err))
  };

  handleDeleteSubmit = id => {
    console.log("handleDeleteSubmit fires");
    fetch(`http://localhost:3000/api/v1/notes/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(res => console.log(res))
      .then(this.deleteFilter(id))
      .catch(err => console.log(err));
  };

  deleteFilter = id => {
    let filteredResults = this.state.notes.slice();
    let finalAr = filteredResults.filter(note => note.id !== id);
    this.setState({ notes: finalAr });
  };

  render() {
    console.log("render fires");
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
          handleFilterInputChange={this.handleFilterInputChange}
          handleFilterSelectChange={this.handleFilterSelectChange}
          filterInputValue={this.state.filterInputValue}
          filterSelectValue={this.state.filterSelectValue}
        />
        <div className="container">
          <Sidebar
            // notes={this.state.notes}
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
