import React from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import Header from "../Header"
import Month from "./Month" 
import "./index.scss"

function DateSelector(props) {
  const {
    show,
    onBack,
    onSelect
  } = props;

  let now = new Date()
  now.setHours(0)
  now.setMinutes(0)
  now.setSeconds(0)
  now.setMilliseconds(0)
  now.setDate(1)
  
  // 当前月
  let monthSequence = [now.getTime()];
  
  // 下个月
  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime())

  // 下下个月
  now.setMonth(now.getMonth() + 1)
  monthSequence.push(now.getTime())
 
    
  return (
    <div className={ classNames("date-selector", { hidden: !show }) }>
      <Header 
        title="日期选择"
        onBack={onBack}
      />
      <div className="date-selector-tables">
        {
          monthSequence.map(month => (
            <Month
              key={month}
              startingTimeInMonth={month}
              onSelect={onSelect}
            />
          ))
        }
      </div>
    </div>
  )
}

DateSelector.propTypes = {
  show: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default DateSelector
