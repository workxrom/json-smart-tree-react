import React, { useState, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";

import * as serviceWorker from "./serviceWorker";
import { Forest, CollapsSettings, Search } from "./components";

const Example = () => {
  const [collaps, setCollaps] = useState([
    { test: "value.content.value", replaceTo: "value.content.value" }
  ]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Инициализация фильтров при первой загрузке
    const collapsData = localStorage.getItem("collapsData");
    if (collapsData) {
      try {
        setCollaps(JSON.parse(collapsData));
      } catch (error) {
        console.error("error", error.message);
      }
    } else {
      localStorage.setItem("collapsData", JSON.stringify(collaps));
    }

    const searchTextData = localStorage.getItem("searchText");
    if (searchTextData) {
      setSearchText(searchTextData);
    }
  }, []); //  eslint-disable-line

  useEffect(() => {
    // Сохранение фильтров в стору на каждое изменение
    localStorage.setItem("collapsData", JSON.stringify(collaps));
  }, [collaps]);

  const onSearch = useCallback(text => {
    console.log(`onSearch`, text);
  }, []);

  const json = {
    name: "@d11t/frontend",
    id: "0",
    createdDate: "2020-01-08T14:51:36.281+0000",
    createdBy: "olga",
    threads: [],
    dealId: "00000000-0000-0000-0000-000000000000",
    content: {
      uuid: "888e4ea5-5308-4d83-bdaf-4ac31fbfe34b",
      type: "BLOCK",
      state: "EDITED",
      assignees: ["olga"],
      versions: [],
      dataPath: null,
      value: {
        partiesAndTerms: {
          uuid: "c1fcd51e-8394-44be-858f-f853a44c0594",
          type: "BLOCK",
          state: "EDITED",
          assignees: ["olga"],
          versions: [],
          dataPath: null,
          value: {
            content: {
              uuid: "5fe434b9-47e8-4bb6-8b05-d5f0279b9d89",
              type: "BLOCK",
              state: "EDITED",
              assignees: ["olga"],
              versions: [],
              dataPath: null,
              value: {
                parties: {
                  uuid: "f5ac25b7-3951-45fb-a82a-a639813f08f1",
                  type: "BLOCK",
                  state: "EDITED",
                  assignees: ["olga"],
                  versions: [],
                  dataPath: null,
                  value: {
                    content: {
                      uuid: "d1602197-bab2-4a2f-ba2d-f54fbcc56795",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      dataPath: null,
                      value: {
                        groupOfCompanies: {
                          uuid: "17264886-a1c2-4007-b954-fcb90580411d",
                          type: "FIELD",
                          state: "EDITED",
                          lockOwner: null,
                          versions: [],
                          dataPath: null,
                          value: null
                        },
                        creditors: {
                          uuid: "0193243c-ebc8-4f69-bc1f-65790e803d87",
                          type: "FIELD",
                          state: "EDITED",
                          lockOwner: null,
                          versions: [],
                          order: [],
                          dataPath: null,
                          value: []
                        },
                        requiredPersons: {
                          uuid: "c33cfdd7-d0e2-4f60-a150-4e5c672df1e8",
                          type: "FIELD",
                          state: "EDITED",
                          lockOwner: null,
                          versions: [],
                          order: [],
                          dataPath: null,
                          value: []
                        }
                      }
                    },
                    before: {
                      uuid: "6dab1fbc-8d80-466d-9f45-106521fca9fd",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      order: [],
                      dataPath: null,
                      value: []
                    },
                    after: {
                      uuid: "231a7dce-aca1-48dd-9412-c02be4ebce87",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      order: [],
                      dataPath: null,
                      value: []
                    }
                  }
                },
                terms: {
                  uuid: "3a978d38-442e-4790-918e-347235544a10",
                  type: "BLOCK",
                  state: "EDITED",
                  assignees: ["olga"],
                  versions: [],
                  dataPath: null,
                  value: {
                    content: {
                      uuid: "da36802b-2371-405f-bc90-aa207d199a12",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      order: [],
                      dataPath: null,
                      value: []
                    },
                    before: {
                      uuid: "8a8de030-017d-450f-b310-96c4b25cc118",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      order: [],
                      dataPath: null,
                      value: []
                    },
                    after: {
                      uuid: "a81f23b8-895a-417f-a099-afc03bef6a51",
                      type: "BLOCK",
                      state: "EDITED",
                      assignees: ["olga"],
                      versions: [],
                      order: [],
                      dataPath: null,
                      value: []
                    }
                  }
                }
              }
            },
            before: {
              uuid: "6bab4073-dd61-43b2-b8e8-702644849607",
              type: "BLOCK",
              state: "EDITED",
              assignees: ["olga"],
              versions: [],
              order: [],
              dataPath: null,
              value: []
            },
            after: {
              uuid: "e44a03f0-cce6-4c50-9486-e0a788b09e9c",
              type: "BLOCK",
              state: "EDITED",
              assignees: ["olga"],
              versions: [],
              order: [],
              dataPath: null,
              value: []
            }
          }
        }
      }
    },
    version: "0.1.0",
    license: "UNLICENSED",
    private: true,
    workspaces: ["packages/*"],
    scripts: {
      dev:
        'concurrently -n dev,storybook "yarn workspace @d11t/ui run dev" "yarn workspace @d11t/ui run storybook"',
      clean: "yarn workspaces run clean",
      build: "yarn workspaces run build",
      prettier: 'prettier --write "**/*"',
      eslint: "eslint --ext .js,.tsx ./packages --color",
      stylelint: "stylelint ./packages/**/*.{tsx,css} --color",
      lint: 'concurrently -n eslint,stylelint "yarn eslint" "yarn stylelint"'
    },
    husky: {
      hooks: {
        "pre-commit": "lint-staged"
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <CollapsSettings collaps={collaps} setCollaps={setCollaps} />
        <Search
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={onSearch}
        />
        <Forest json={json} collaps={collaps} searchText={searchText} />
      </header>
    </div>
  );
};

ReactDOM.render(<Example />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
