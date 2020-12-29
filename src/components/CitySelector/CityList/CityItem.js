import React, { memo } from 'react'
import PropTypes from "prop-types"

function CityItem(props) {
  const {
    title,
    cities = [],
    onSelect
  } = props;

  return (
      <ul className="city-ul">
          <li className="city-li" key={title} data-cate={title}>{title}</li>
          {
        cities.map(item => (
            <li 
          className="city-li" 
          key={item.name} 
          onClick={() => onSelect(item.name)}
        >
                { item.name }
            </li>))
      }
      </ul>
  )
}

CityItem.propTypes = {
  title: PropTypes.string.isRequired,
  cities: PropTypes.array,
  onSelect: PropTypes.func.isRequired
}

export default memo(CityItem)