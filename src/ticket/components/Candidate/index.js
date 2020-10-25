import React, { memo, useState, useCallback } from 'react'
import PropTypes from "prop-types"
import Seat from "./Seat"
import "./index.scss"

function Candidate(props) {
  const { ticketList } = props
  
  const [expendedIndex, setExpendedIndex] = useState(-1)

  const onToggle = useCallback((idx) => {
    setExpendedIndex(expendedIndex => expendedIndex === idx ? -1 : idx)
  }, [])

  return (
    <div className="candidate">
      <ul>
        {
          ticketList.map((seat, idx) => (
            <Seat 
              expended={expendedIndex === idx}
              idx={idx}
              key={seat.type}
              {...seat}
              onToggle={onToggle}
            />
          ))
        }
      </ul>
    </div>
  )
}

Candidate.propTypes = {
  ticketList: PropTypes.array.isRequired
}

export default memo(Candidate)

