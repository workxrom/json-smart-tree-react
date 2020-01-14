import React, { useState } from "react";

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
    setCollaps([...collaps, { test, replaceTo }]);
    setTest("");
    setReplaceTo("");
  };

  const inputStyle = {
    fontSize: "1.5rem"
  };

  return (
    <div style={{ fontSize: "2rem" }}>
      Collaps items
      {collaps.map(({ test, replaceTo }) => (
        <div>
          <span style={{ color: "blue" }}>{test}</span> /{" "}
          <span style={{ color: "black" }}>{replaceTo}</span>
        </div>
      ))}
      <div>
        <input style={inputStyle} value={test} onChange={onChangeTest} />
        <input
          style={inputStyle}
          value={replaceTo}
          onChange={onChangeReplaceTo}
        />
      </div>
      <button onClick={onClickAddCollaps}>Добавить фильтр</button>
    </div>
  );
};

export { CollapsSettings };
