import React, { memo } from "react";
import Channel from "../Channel";
import PropTypes from "prop-types";

function Seat(props) {
  const {
    idx,
    channels,
    priceMsg,
    ticketsLeft,
    type,
    expended,
    onToggle,
  } = props;

  return (
      <li>
          <div className="bar" onClick={() => onToggle(idx)}>
              <span className="seat">{type}</span>
              <span className="price">
                  <i>￥</i>
                  {priceMsg}
              </span>
              <span className="btn">{expended ? "收起" : "预定"}</span>
              <span className="num">{ticketsLeft}</span>
          </div>
          <div
        className="channels"
        style={{
          height: expended ? channels.length * 55 + "px" : 0,
        }}
      >
              {channels.map((item) => (
                  <Channel key={item.name} {...item} type={type} />
        ))}
          </div>
      </li>
  );
}

Seat.propTypes = {
  idx: PropTypes.number.isRequired,
  channels: PropTypes.array.isRequired,
  priceMsg: PropTypes.string.isRequired,
  ticketsLeft: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  expended: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default memo(Seat);
