import React, { memo, useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import CitySuggestItem from "./CitySuggestItem";
import { findSuggestBySearchKey } from "../../../api/index";
import { throttle } from "../../../utils";

function CitySuggest(props) {
  const { searchKey, onSelect } = props;

  const [result, setResult] = useState([]);

  /* 节流函数 */
  const fetchSearchResult = useCallback(
    throttle(
      1000,
      function (value) {
        findSuggestBySearchKey(value)
          .then((res) => res.json())
          .then((data) => {
            const { searchKey: sKey, result: sResult } = data;
            if (sKey === value) {
              setResult(sResult);
            }
          });
      },
      { trailing: true }
    ),
    []
  );

  useEffect(() => {
    fetchSearchResult(searchKey);
  }, [fetchSearchResult, searchKey]);

  const fallCallback = useMemo(() => {
    if (!result.length) {
      return [
        {
          display: searchKey,
        },
      ];
    }
    return result;
  }, [result, searchKey]);

  return (
      <div className="city-suggest">
          <ul className="city-suggest-ul">
              {fallCallback.map((item) => (
                  <CitySuggestItem
            key={item.display}
            name={item.display}
            onSelect={onSelect}
          />
        ))}
          </ul>
      </div>
  );
}

PropTypes.propTypes = {
  searchKey: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(CitySuggest);
