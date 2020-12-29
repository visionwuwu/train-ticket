import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import "./index.scss";

function format(departDate) {
  let d = dayjs(departDate);
  return d.format("MM-DD") + d.locale("zh-cn").format("ddd");
}

function Detail(props) {
  const {
    departDate,
    arriverDate,
    departStation,
    arriverStation,
    departTimeStr,
    arriverTimeStr,
    trainNumber,
    durationStr,
  } = props;

  const departDateStr = useMemo(() => format(departDate), [departDate]);
  const arriverDateStr = useMemo(() => format(arriverDate), [arriverDate]);

  return (
      <div className="detail">
          <div className="content">
              <div className="left">
                  <p className="city">{departStation}</p>
                  <p className="time">{departTimeStr}</p>
                  <p className="date">{departDateStr}</p>
              </div>
              <div className="middle">
                  <p className="train-name">{trainNumber}</p>
                  <p className="train-mid">{props.children}</p>
                  <p className="train-time">耗时 {durationStr}</p>
              </div>
              <div className="right">
                  <p className="city">{arriverStation}</p>
                  <p className="time">{arriverTimeStr}</p>
                  <p className="date">{arriverDateStr}</p>
              </div>
          </div>
      </div>
  );
}

Detail.propTypes = {
  departDate: PropTypes.number.isRequired,
  arriverDate: PropTypes.number.isRequired,
  departStation: PropTypes.string.isRequired,
  arriverStation: PropTypes.string.isRequired,
  departTimeStr: PropTypes.string.isRequired,
  arriverTimeStr: PropTypes.string.isRequired,
  trainNumber: PropTypes.string.isRequired,
  durationStr: PropTypes.string.isRequired,
};

export default memo(Detail);
