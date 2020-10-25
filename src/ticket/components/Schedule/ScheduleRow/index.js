import React, { memo } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"

function ScheduleRow(props) {
  const {
    idx,
    station,
    departTime,
    arriveTime,
    stay,

    isStartStation,
    isEndStation,
    beforeDepartStaion,
    afterArriverStation,
    isDepartStation,
    isArriverStation
  } = props

  return (
    <li>
      <div 
        className={
          classNames("icon", {
            "icon-red": isArriverStation || isDepartStation
          })
        }
      >
        {
          isDepartStation ? "出" : 
          isArriverStation ? "到" :
          idx.toString().padStart(2, "0")
        }
      </div>
      <div 
        className={
          classNames("row", {
            grey: beforeDepartStaion || afterArriverStation
          })
        }
      >
        <span 
          className={
            classNames("station", {red: isDepartStation || isArriverStation})
          }
        >
          { station }
        </span>
        <span
          className={
            classNames("arrtime", {
              red: isArriverStation
            })
          }
        >
          {
            isStartStation ? "始发站" : arriveTime
          }
        </span>
        <span 
          className={
            classNames("deptime", {
              red: isDepartStation
            })
          }
        >
          { isEndStation ? "终到站" : departTime }
        </span>
        <span 
          className="stoptime"
        >
          { isStartStation || isEndStation ? "-" : stay + "分" }
        </span>
      </div>
    </li>
  )
}

ScheduleRow.propTypes = {
  idx: PropTypes.number.isRequired,
  station: PropTypes.string.isRequired,
  departTime: PropTypes.string,
  arriveTime: PropTypes.string,
  stay: PropTypes.number,
  isStartStation: PropTypes.bool.isRequired,
  isEndStation: PropTypes.bool.isRequired,
  beforeDepartStaion: PropTypes.bool,
  afterArriverStation: PropTypes.bool,
  isDepartStation: PropTypes.bool,
  isArriverStation: PropTypes.bool,
}

export default memo(ScheduleRow)

