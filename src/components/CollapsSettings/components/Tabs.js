import React, { useState, useCallback } from "react";

const styles = {
  tabs: {
    overflow: "hidden"
  },
  tabLabel: {
    cursor: "pointer",
    fontSize: "1.2rem",
    padding: "0.2rem 0.3rem",
    background: "rgb(110,110,110)",
    color: "white",
    borderRadius: "0.3rem"
  },
  tabContent: {
    maxHeight: 0,
    padding: "0 1rem",
    color: "black",
    background: "white",
    transition: "all .35s"
  },
  tabContentOpen: {
    maxHeight: "100vh",
    padding: "1rem"
  }
};

const Tabs = ({ label, children }) => {
  const [opened, setOpened] = useState(false);

  const onClickTab = useCallback(() => setOpened(!opened), [opened]);

  return (
    <div style={styles.tabs}>
      <div style={styles.tabLabel} onClick={onClickTab}>
        {label}
      </div>
      <div
        style={{
          ...styles.tabContent,
          ...(opened ? styles.tabContentOpen : {})
        }}
      >
        {children}
      </div>
    </div>
  );
};

export { Tabs };
