import React, { memo } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import { ORDER_DEPART } from "../../store/constants"
import "./index.scss"

function Bottom(props) {
  const {
    orderTypes,
    highSpeed,
    onlyTickets,
    isFiltersVisible
  } = props;

  const {
    toggleOrderTypes,
    toggleOnlyTickets,
    toggleHighSpeed,
    toggleIsFiltersVisible
  } = props

  return (
    <div className="bottom-filters">
      <span 
        className="item"
        onClick={toggleOrderTypes}
      >
        <i className="icon">&#xf065;</i>
        {orderTypes === ORDER_DEPART ? "出发 早→晚" : "耗时 短→长"}
      </span>
      <span 
        className={classNames('item', { 'item-on': highSpeed })}
        onClick={ toggleHighSpeed }
      >
        <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
        只看高铁动车
      </span>
      <span
        className={classNames('item', { 'item-on': onlyTickets })}
        onClick={toggleOnlyTickets}
      >
        <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
        只看有票
      </span>
      <span
        className={classNames('item')}
        onClick={toggleIsFiltersVisible}
      >
        <i className="icon">{isFiltersVisible ? '\uf0f7' : '\uf446'}</i>
        综合筛选
      </span>
    </div>
  )
}

Bottom.propTypes = {
  orderTypes: PropTypes.number.isRequired,
  highSpeed: PropTypes.bool.isRequired,
  onlyTickets: PropTypes.bool.isRequired,
  isFiltersVisible: PropTypes.bool.isRequired,
  toggleOrderTypes: PropTypes.func.isRequired,
  toggleOnlyTickets: PropTypes.func.isRequired,
  toggleHighSpeed: PropTypes.func.isRequired,
  toggleIsFiltersVisible: PropTypes.func.isRequired
}

export default memo(Bottom)
