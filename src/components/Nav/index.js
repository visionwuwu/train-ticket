import React, { memo, useMemo } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import "./index.scss"

function Nav(props) {
  const {
    date,
    prevClick,
    nextClick,
    isPrevDisabled,
    isNextDisabled
  } = props

  const currentTimeStr = useMemo(() => {
    let d = dayjs(date)
    return d.format("M月D日") + d.locale("zh-cn").format("ddd")
  }, [date])

  return (
    <div className="nav">
      <div 
        className={classNames("nav-prev", { "nav-disabled": isPrevDisabled })}
        onClick={prevClick}
      >
        前一天
      </div>
      <div 
        className={classNames("nav-next", { "nav-disabled": isNextDisabled })}
        onClick={nextClick}
      >
        后一天
      </div>
      <span className="nav-date">
        {currentTimeStr}
      </span>
    </div>
  )
}

Nav.propTypes = {
  date: PropTypes.number.isRequired,
  prevClick: PropTypes.func.isRequired,
  nextClick: PropTypes.func.isRequired,
  isPrevDisabled: PropTypes.bool.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
}

export default memo(Nav)
