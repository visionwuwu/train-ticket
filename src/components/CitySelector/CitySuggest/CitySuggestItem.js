import React, { memo } from "react";
import PropTypes from "prop-types";

function CitySUggestItem(props) {
  const { name, onSelect } = props;
  return (
      <div className="city-suggest-li" onClick={() => onSelect(name)}>
          {name}
      </div>
  );
}

CitySUggestItem.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default memo(CitySUggestItem);
