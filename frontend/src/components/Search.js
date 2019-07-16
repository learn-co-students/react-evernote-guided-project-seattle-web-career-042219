import React from "react";

const Search = props => {
  return (
    <div className="filter">
      <input
        id="search-bar"
        type="text"
        placeholder="Search Notes"
        value={props.filterInputValue}
        onChange={props.handleFilterInputChange}
      />
      <select
        id="select"
        value={props.filterSelectValue}
        onChange={props.handleFilterSelectChange}
      >
        {/* <option name="created_at" value="dateCreated">
          Date Created
        </option>
        <option name="updated_at" value="dateEdited">
          Date Edited
        </option> */}
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
