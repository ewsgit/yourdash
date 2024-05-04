/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import TextInput from "@yourdash/chiplet/components/textInput/TextInput";
import React, { useState } from "react";
import csi from "@yourdash/csi/csi";
import { ILocationSearchResult } from "../../../../../shared/locationSearchResult";
import HeroSearchResultCard from "./components/HeroSearchResultCard/HeroSearchResultCard";
import SearchResultCard from "./components/SearchResultCard/SearchResultCard";
import styles from "./LocationSearchBar.module.scss";
import { useNavigate } from "react-router-dom";

const LocationSearchBar: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<ILocationSearchResult[]>([]);
  const [hasRecievedResonse, setHasRecievedResponse] = useState<boolean>(false);

  return (
    <>
      <div className={styles.component}>
        <div className={styles.componentLabel}>Searching for</div>
        <TextInput
          accessibleName={"Search Weather Location"}
          className={styles.searchBar}
          inputClassName={styles.inputElement}
          placeholder={"Search Weather Locations"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (searchResults[0]) navigate(`/app/a/weather/${searchResults[0].value}`);
            }
          }}
          onChange={(value: string) => {
            setSearchQuery(value);

            csi.syncGetJson(
              `/app/weather/geolocation/${value.replaceAll(" ", "+")}`,
              (response) => {
                setSearchResults(response);
                setHasRecievedResponse(true);
              },
              () => {
                setSearchResults([]);
                setHasRecievedResponse(true);
              },
            );
          }}
        />
        {
          hasRecievedResonse && searchResults.length !== 0 ? (
            <section className={styles.results}>
              {searchResults.map((result, index) => {
                if (index === 0)
                  return (
                    <HeroSearchResultCard
                      key={result.value}
                      props={result}
                    />
                  );

                return (
                  <SearchResultCard
                    key={result.value}
                    props={result}
                  />
                );
              })}
            </section>
          ) : (
            searchQuery !== "" && (
              <section className={styles.results}>
                <div className={"col-span-4 text-3xl text-center font-semibold pt-4 pb-4"}>
                  Invalid location &quot;{searchQuery}&quot;
                </div>
              </section>
            )
          )
          // Invalid location
        }
      </div>
    </>
  );
};

export default LocationSearchBar;
