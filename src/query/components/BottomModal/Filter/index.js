import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Filter(props) {
  const { name, value, checkedMap, dispatch } = props;

  const checked = useMemo(() => {
    return value in checkedMap;
  }, [value, checkedMap]);

  return (
      <li
      className={classNames({ checked })}
      onClick={() => dispatch({ type: "toggle", payload: value })}
    >
          {name}
      </li>
  );
}

Filter.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default memo(Filter);
