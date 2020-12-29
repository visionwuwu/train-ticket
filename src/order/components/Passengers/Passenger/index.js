import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

function Passenger(props) {
  const {
    id,
    name,
    licenceNo,
    gender,
    birthday,
    followAdult,
    ticketType,
    followAdultName,

    removePassenger,
    updatePassenger,
    showGenderMenu,
    showTicketTypeMenu,
    showFollowAdultMenu,
  } = props;

  const isAdult = useMemo(() => {
    return ticketType === "adult";
  }, [ticketType]);

  return (
      <li className="passenger">
          <i className="delete" onClick={() => removePassenger(id)}>
              —
          </i>
          <ol className="items">
              <li className="item">
                  <label className="label name">姓名</label>
                  <input
            type="text"
            className="input name"
            placeholder="请输入姓名"
            value={name}
            onChange={(e) => {
              updatePassenger(id, { name: e.target.value });
            }}
          />
                  <label className="ticket-type" onClick={() => showTicketTypeMenu(id)}>
                      {isAdult ? "成人票" : "儿童票"}
                  </label>
              </li>
              {isAdult && (
              <li className="item">
                  <label className="label licenceNo">身份证</label>
                  <input
              type="text"
              className="input licenceNo"
              placeholder="证件号码"
              value={licenceNo}
              onChange={(e) => {
                updatePassenger(id, { licenceNo: e.target.value });
              }}
            />
              </li>
        )}
              {!isAdult && (
              <li className="item arrow">
                  <label className="label gender">性别</label>
                  <input
              type="text"
              className="input gender"
              placeholder="性别"
              value={gender === "male" ? "男" : gender === "female" ? "女" : ""}
              onClick={() => showGenderMenu(id)}
              readOnly
            />
              </li>
        )}
              {!isAdult && (
              <li className="item">
                  <label className="label birthday">出生日期</label>
                  <input
              type="text"
              className="input birthday"
              placeholder="如 19951015"
              value={birthday}
              onChange={(e) => {
                updatePassenger(id, { birthday: e.target.value });
              }}
            />
              </li>
        )}
              {!isAdult && (
              <li className="item arrow">
                  <label className="label followAdult">同行成人</label>
                  <input
              type="text"
              className="input followAdult"
              placeholder="请选择"
              value={followAdultName}
              onClick={() => showFollowAdultMenu(id, followAdult)}
              readOnly
            />
              </li>
        )}
          </ol>
      </li>
  );
}

Passenger.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  licenceNo: PropTypes.string,
  gender: PropTypes.string,
  birthday: PropTypes.string,
  followAdult: PropTypes.number,
  followAdultName: PropTypes.string,
  ticketType: PropTypes.string.isRequired,
  removePassenger: PropTypes.func.isRequired,
  updatePassenger: PropTypes.func.isRequired,
  showGenderMenu: PropTypes.func.isRequired,
  showTicketTypeMenu: PropTypes.func.isRequired,
  showFollowAdultMenu: PropTypes.func.isRequired,
};

export default memo(Passenger);
