import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import Week from '../Week';

function Month(props) {
    const { startingTimeInMonth, onSelect } = props;

    let startDay = new Date(startingTimeInMonth);
    let currentDay = new Date(startingTimeInMonth);

    let days = [];

    // 计算当前日期当前月的所有天数的时间戳
    while (startDay.getMonth() === currentDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }

    // 计算当前月第一天是周几向前填充
    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6)
        .fill(null)
        .concat(days);

    // 获取当前月最后一天是周几向后填充
    let lastDay = new Date(days.slice(-1)).getDay();
    days = days.concat(new Array(lastDay ? 7 - lastDay : 0).fill(null));

    // 计算周
    const weeks = [];
    for (let row = 0; row < days.length / 7; row++) {
        weeks.push(days.slice(row * 7, (row + 1) * 7));
    }

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {dayjs(startingTimeInMonth).format('YYYY年MM月')}
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="date-table-weeks">
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th className="weekend">六</th>
                    <th className="weekend">七</th>
                </tr>
                {weeks.map((week, idx) => (
                    <Week key={idx} days={week} onSelect={onSelect} />
                ))}
            </tbody>
        </table>
    );
}

Month.propTypes = {
    startingTimeInMonth: PropTypes.number,
    onSelect: PropTypes.func.isRequired,
};

export default Month;
