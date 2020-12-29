import React, { useMemo } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { h0 } from "../../../utils/times";
import "./index.scss";

// 组件的输入，与输出，想明白这点就行哈哈哈
// 输入显示当前组件的bool值show，当前日期的月份的第一天零时零分零秒的时间戳
// 输入onSelect方法，获取当前选择日期的时间戳

/**
 * 日期选择组件
 * 当前月
 * 下个月
 * 下下个月
 * Month组件
 * Week组件
 * day组件
 */

function DepartDate(props) {
  const { date, onClick } = props;

  let timeStr = useMemo(() => {
    return dayjs(date).format("YYYY-MM-DD");
  }, [date]);
  let day = useMemo(() => {
    return dayjs(date).day();
  }, [date]);
  let week_arry = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  let week = week_arry[day];
  let isToday = h0() === date;

  return (
      <div className="depart-date" onClick={() => onClick(true)}>
          <input type="hidden" name="date" value={timeStr} />
          {timeStr}{" "}
          <span className="depart-week">
              {week} {isToday ? "(今天)" : ""}
          </span>
      </div>
  );
}

DepartDate.propTypes = {
  date: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DepartDate;
