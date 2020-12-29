import React, { memo } from "react";
import PropTypes from "prop-types";
import switchSvg from "../../svgs/switch.svg";
import "./index.scss";

function Journey(props) {
  const { from, to, exchangeFromTo, showCitySelector } = props;

  return (
      <div className="journey">
          <div className="journey-station" onClick={() => showCitySelector(true)}>
              <input
          className="journey-input journey-from"
          type="text"
          name="from"
          value={from}
          readOnly
        />
          </div>
          <div className="journey-switch" onClick={() => exchangeFromTo()}>
              <img src={switchSvg} width="70" height="40" alt="switch" />
          </div>
          <div className="journey-station" onClick={() => showCitySelector(false)}>
              <input
          className="journey-input journey-to"
          type="text"
          name="to"
          readOnly
          value={to}
        />
          </div>
      </div>
  );
}

Journey.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  exchangeFromTo: PropTypes.func.isRequired,
  showCitySelector: PropTypes.func.isRequired,
};

export default memo(Journey);
