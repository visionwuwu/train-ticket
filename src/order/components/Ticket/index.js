import React, { memo } from "react";
import PropTypes from "prop-types";
import "./index.scss";

function Ticket(props) {
  const { price, seatType } = props;
  return (
      <div className="ticket">
          <p>
              <span className="ticket-type">{seatType}</span>
              <span className="ticket-price">{price}</span>
          </p>
          <div className="label">坐席</div>
      </div>
  );
}

Ticket.propTypes = {
  price: PropTypes.number,
  seatType: PropTypes.string,
};

export default memo(Ticket);
