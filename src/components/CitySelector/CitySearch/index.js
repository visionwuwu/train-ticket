import React, { memo } from 'react'
import classNames from "classnames"
import PropTypes from "prop-types"

function CitySearch(props) {
  const {
    searchKey,
    setSearchKey,
    onBack,
    onChange
  } = props;

  return (
    <div className="city-search">
      <div className="search-back" onClick={ () => onBack() }>
        <svg width="42" height="42">
          <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
          />
        </svg>
      </div>
      <div className="search-input-wrapper">
        <input 
          className="search-input"
          type="text"
          value={ searchKey }
          placeholder="城市、车站的中文或拼音"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <i 
        className={classNames("search-clean", { hidden: searchKey.length === 0 })}
        onClick={ () => setSearchKey("") }
      >
        &#xf063;
      </i>
    </div>
  )
}

CitySearch.propTypes = {
  searchKey: PropTypes.string.isRequired,
  setSearchKey: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default memo(CitySearch)
