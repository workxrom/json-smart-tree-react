import React, { useState, useCallback, useEffect } from "react";

import { DivLeveled, Text, Tree } from "./components";

const Forest = ({
  json,
  level = 0,
  collaps = [],
  path = "root",
  searchText = ""
}) => {
  const [expanded, setExpanded] = useState({});
  const [cuttedJson, setCuttedJson] = useState({});

  useEffect(() => {
    // Получение настроек раскрытых элементов
    const localStorageExpandedObject = JSON.parse(
      localStorage.getItem(`pathData.${path}`)
    );

    if (
      localStorageExpandedObject &&
      typeof localStorageExpandedObject !== "undefined" &&
      Object.keys(localStorageExpandedObject).length > 0
    ) {
      setExpanded(localStorageExpandedObject);
    } else {
      localStorage.setItem(`pathData.${path}`, JSON.stringify({}));
    }
  }, [path]);

  const onExpand = useCallback(
    index => () => {
      const expandedObject = {
        ...expanded,
        [index]: !expanded[index]
      };
      localStorage.setItem(`pathData.${path}`, JSON.stringify(expandedObject));
      setExpanded(expandedObject);
    },
    [expanded, path]
  );

  const onToggleCut = useCallback(
    cutPath => () => {
      // Переключение режима "схлопывания"
      localStorage[cutPath] = String(1 - Number(localStorage[cutPath]));

      setCuttedJson({
        ...cuttedJson,
        [cutPath]: localStorage[cutPath]
      });
    },
    [cuttedJson]
  );

  if (Object.keys(json).length === 0) {
    return (
      <DivLeveled level={level}>
        <Text type="text">{Array.isArray(json) ? "[ ]" : "{ }"}</Text>
      </DivLeveled>
    );
  }

  return (
    <div>
      {Object.keys(json).map((keyName, index) => (
        <Tree
          key={keyName}
          json={json}
          keyName={keyName}
          collaps={collaps}
          cuttedJson={cuttedJson}
          setCuttedJson={setCuttedJson}
          index={index}
          level={level}
          onToggleCut={onToggleCut}
          expanded={expanded}
          onExpand={onExpand}
          path={path}
          searchText={searchText}
        />
      ))}
    </div>
  );
};

export { Forest };
