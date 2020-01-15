import React, { useState } from "react";

import { Tabs } from "./components";

const styles = {
  input: {
    fontSize: "1.2rem",
    border: 0,
    borderBottom: "1px solid black",
    marginRight: "1rem"
  },
  btn: {
    color: "white",
    padding: "0.2rem 0.5rem",
    cursor: "pointer",
    fontSize: "1rem",
    borderRadius: "0.3rem",
    background: "rgb(110,110,110)"
  }
};

const CollapsSettings = ({ collaps, setCollaps }) => {
  const [test, setTest] = useState("");
  const [replaceTo, setReplaceTo] = useState("");

  const onChangeTest = e => {
    setTest(e.target.value);
    setReplaceTo(e.target.value);
  };
  const onChangeReplaceTo = e => {
    setReplaceTo(e.target.value);
  };
  const onClickAddCollaps = () => {
    const trimTest = test.trim();
    const trimReplaceTo = replaceTo.trim();
    const minLength = 3;
    if (trimTest.length > minLength && trimReplaceTo.length > minLength) {
      setCollaps([...collaps, { test, replaceTo }]);
      setTest("");
      setReplaceTo("");
    }
  };
  const onDelete = index => () => {
    let changedCollaps = [...collaps];
    changedCollaps.splice(index, 1);
    setCollaps(changedCollaps);
  };
  const onEnter = e => {
    // On Enter
    if (e.keyCode === 13) {
      onClickAddCollaps();
    }
  };

  return (
    <Tabs label="Collaps settings">
      <div style={{ fontSize: "1.5rem" }}>
        Параметры схлопывания chain в json:
        {collaps.map(({ test, replaceTo }, index) => (
          <div key={`${test}_${index}`}>
            <span style={{ color: "black" }}>{test}</span> /{" "}
            <span style={{ color: "gray" }}>{replaceTo}</span>
            <button
              onClick={onDelete(index)}
              style={{
                ...styles.btn,
                marginLeft: "1rem"
              }}
            >
              Удалить
            </button>
          </div>
        ))}
        <input
          style={styles.input}
          value={test}
          placeholder="test value"
          onChange={onChangeTest}
          onKeyDown={onEnter}
        />
        {"/"}
        <input
          style={styles.input}
          placeholder="replaceTo value"
          value={replaceTo}
          onChange={onChangeReplaceTo}
          onKeyDown={onEnter}
        />
        <button style={{ ...styles.btn }} onClick={onClickAddCollaps}>
          Добавить
        </button>
      </div>
    </Tabs>
  );
};

export { CollapsSettings };
