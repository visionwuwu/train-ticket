import React from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import { h0 } from "../../../utils/times"

function Day(props) {
  const { day, onSelect } = props

  if (!day) {
    return <td className="null"></td>
  }

  let classes = [],
      now = h0();

  if(day < now) {
    classes.push("disabled")
  }

  if ([6, 0].includes(new Date(day).getDay())) {
    classes.push('weekend')
  }

  const dateString = now === day ? '今天' : new Date(day).getDate()

  return (
      <td className={classNames(classes)} onClick={() => onSelect(day)}>
          {dateString}
      </td>
  )
}

Day.propTypes = {
  day: PropTypes.number,
  onSelect: PropTypes.func.isRequired
}

export default Day;
