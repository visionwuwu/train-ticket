import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import Passenger from "./Passenger";
import "./index.scss";

function Passengers(props) {
  const {
    passengers,
    addAdult,
    addChild,
    removePassenger,
    updatePassenger,
    showGenderMenu,
    showTicketTypeMenu,
    showFollowAdultMenu,
  } = props;

  const nameMap = useMemo(() => {
    const ret = {};
    for (let passenger of passengers) {
      ret[passenger.id] = passenger.name;
    }
    return ret;
  }, [passengers]);

  return (
      <div className="passengers">
          <ul>
              {passengers.map((passenger) => {
          return (
              <Passenger
              key={passenger.id}
              {...passenger}
              followAdultName={nameMap[passenger.followAdult]}
              removePassenger={removePassenger}
              updatePassenger={updatePassenger}
              showGenderMenu={showGenderMenu}
              showTicketTypeMenu={showTicketTypeMenu}
              showFollowAdultMenu={showFollowAdultMenu}
            />
          );
        })}
          </ul>
          <div className="add">
              <span className="adult" onClick={() => addAdult()}>
                  添加成人
              </span>
              <span className="child" onClick={() => addChild()}>
                  添加儿童
              </span>
          </div>
      </div>
  );
}

Passengers.propTypes = {
  passengers: PropTypes.array.isRequired,
  addAdult: PropTypes.func.isRequired,
  addChild: PropTypes.func.isRequired,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
};

export default memo(Passengers);
