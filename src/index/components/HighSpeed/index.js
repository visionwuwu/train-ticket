import React from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import "./index.scss"

function HighSpeed(props) {
  const {
    highSpeed,
    toggle
  } = props;

  return (
      <div className="high-speed">
          <div className="high-speed-label">只看高铁/动车</div>
          <div 
        className="high-speed-switch"
        onClick={() => toggle()}
      >
              <div className={classNames("high-speed-track", { checked: highSpeed })}>
                  <input type="hidden" name="highSpeed" value={highSpeed} />
                  <span 
            className={classNames("high-speed-handle", { checked: highSpeed })}
          ></span>
              </div>
          </div>
      </div>
  )
}

HighSpeed.propTypes = {
  highSpeed: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}

export default HighSpeed;
