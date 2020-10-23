import React, { memo } from 'react'
import PropTypes from "prop-types"
import Filter from "../Filter"

function Option(props) {
  const { 
    title, 
    options,
    checkedMap,
    dispatch
  } = props
  return (
    <div className="option">
      <h3>{title}</h3>
      <ul>
        {
          options.map(item => (
            <Filter
              key={item.name}
              {...item}
              checkedMap={checkedMap}
              dispatch={dispatch}
            />
          ))
        }
      </ul>
    </div>
  )
}

Option.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  checkedMap: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default memo(Option)
