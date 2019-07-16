import React from "react";

const Search = props => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        name="filterInputValue"
        placeholder="Search Notes"
        value={props.filterInputValue}
        onChange={props.handleInputChange}
      />
      <select
        id="select"
        name="filterSelectValue"
        value={props.filterSelectValue}
        onChange={props.handleInputChange}
      >
        <option name="title" value="title" defaultValue>
          Title
        </option>
        <option name="body" value="body">
          Body
        </option>
      </select>
    </div>
  );
};

export default Search;
