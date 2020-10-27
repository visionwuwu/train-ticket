import React, { memo } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"

function MenuItem(props) {
  const {
    title,
    value,
    active,
    onPress,
  } = props
  return (
    <li className={classNames({active})} onClick={() => onPress(value)}>
      {title}
    </li>
  )
}

MenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  active: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default memo(MenuItem)
