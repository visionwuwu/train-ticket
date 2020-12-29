import React, { memo } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import "./index.scss"

function Choose(props) {
  const {
    passengers,
    updatePassenger
  } = props

  function createSeat(seatType) {
    return (
        <div>
            {passengers.map(passenger => {
                return (
                    <p
                        key={passenger.id}
                        className={classNames('seat', {
                            active: passenger.seatType === seatType,
                        })}
                        data-text={seatType}
                        onClick={() =>
                            updatePassenger(passenger.id, {
                              seatType: seatType,
                            })
                        }
                    >
                        &#xe02d;
                    </p>
                );
            })}
        </div>
    );
  }

  return (
      <div className="choose">
          <div className="tip">在线选座</div>
          <div className="container">
              <div className="seats">
                  <div>窗</div>
                  {createSeat("A")}
                  {createSeat("B")}
                  {createSeat("C")}
                  <div>过道</div>
                  {createSeat("D")}
                  {createSeat("E")}
                  <div>窗</div>
              </div>
          </div>
      </div>
  )
}

Choose.propTypes = {
  passengers: PropTypes.array.isRequired,
  updatePassenger: PropTypes.func.isRequired,
}

export default memo(Choose)
