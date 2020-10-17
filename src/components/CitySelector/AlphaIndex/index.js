import React, { memo } from 'react'
import PropTypes from "prop-types"

function AlphaIndex(props) {
  const {
    alpha,
    onClick
  } = props;
  return (
    <div className="city-index-item" onClick={()=> onClick(alpha)}>
      {alpha}
    </div>
  )
}

AlphaIndex.propTypes = {
  alpha: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default memo(AlphaIndex)
