import React, {useEffect, useState} from "react";
import csi from "../../../helpers/csi";
import DbItem from "./components/dbItem";
import {Button} from "../../../ui";

const GlobalDbApplication: React.FC = () => {
  const [keys, setKeys] = useState<{
    [ key: string ]: any
  }>({});

  useEffect(() => {
    csi.getJson("/app/global_db/db", data => {
      if (!data.db) {
        return;
      }

      setKeys(data.db);
    });
  }, []);

  return (
    <div className={"flex flex-col gap-2 relative min-h-full pt-2"}>
      <div className={"flex flex-col w-full pl-2 pr-2 pb-20 h-full overflow-y-auto gap-2"}>
        {
          Object.keys(keys).map((key: any, ind: number) => (
            <DbItem
              setItemData={(k, item) => {
                setKeys({
                  ...keys,
                  [k]: JSON.parse(item)
                });
              }}
              key={key}
              item={{
                key,
                content: JSON.stringify(keys[key], null, 2)
              }}
            />
          ))
        }
        <Button onClick={() => {
          setKeys({
            ...keys,
            // eslint-disable-next-line no-magic-numbers
            [`untitled_${ Math.floor(Math.random() * 1000) }`]: {}
          });
        }}
        >{"Create Database Key"}</Button>
      </div>
      <footer className={"w-full flex bg-container-bg border-t-[1px] border-t-container-border p-2 gap-2 absolute bottom-0 left-0"}>
        <Button onClick={() => {
          csi.postJson("/app/global_db/db", keys, () => {});
        }}
        >
          {"Save"}
        </Button>
        <Button onClick={() => {
          csi.getJson("/app/global_db/db", data => {
            if (!data.db) {
              return;
            }

            setKeys(data.db);
          });
        }}
        >
          {"Reload"}
        </Button>
      </footer>
    </div>
  );
};

export default GlobalDbApplication;
