import React, { useCallback } from "react";

const styles = {
  wrapper: {
    width: "100%"
  },
  inputStyle: {
    display: "flex",
    margin: "0.5rem 0",
    position: "relative",
    boxSizing: "borderBox",
    fontSize: "1.5rem",
    width: "100%",
    border: 0,
    borderBottom: "1px solid black",
    outline: "none"
  }
};

const Search = ({ searchText, setSearchText, onSearch }) => {
  const onChange = useCallback(
    e => {
      const inputText = e.target.value;
      const trimSearchText = inputText.trim();
      const regExp = /^[\w\d]+(\.[\w\d]+)*\.?$/i;

      console.log(`test ${regExp.test(trimSearchText)}`);
      if (regExp.test(trimSearchText)) {
        localStorage.setItem("searchText", trimSearchText);
        setSearchText(trimSearchText);
      }
    },
    [setSearchText]
  );

  const onEnter = useCallback(
    e => {
      if (e.keyCode === 13) {
        onSearch(searchText);
      }
    },
    [onSearch, searchText]
  );

  return (
    <div style={styles.wrapper}>
      <input
        style={styles.inputStyle}
        value={searchText}
        onChange={onChange}
        onKeyDown={onEnter}
      />
    </div>
  );
};

export { Search };
