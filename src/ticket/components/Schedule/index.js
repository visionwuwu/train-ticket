import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import { fetchScheduleData } from '../../../api/ticket';
import ScheduleRow from './ScheduleRow';
import './index.scss';

function Schedule(props) {
    const { date, trainNumber, departStation, arriverStation } = props;

    const [scheduleList, setScheduleList] = useState([]);

    useEffect(() => {
        const url = new URI('/rest/schedule')
            .setSearch('date', dayjs(date).format('YYYY-MM-DD'))
            .setSearch('trainNumber', trainNumber)
            .setSearch('departStation', departStation)
            .setSearch('arriverStation', arriverStation)
            .toString();

        fetchScheduleData(url).then((data) => {
            let departRow;
            let arriverRow;
            let temp = {
                beforeDepartStation: false,
                afterArriverStation: false,
                isDepartStation: false,
                isArriverStation: false,
                isStartStation: false,
                isEndStation: false,
            };

            for (let i = 0; i < data.length; i++) {
                if (!departRow) {
                    if (data[i].station === departStation) {
                        departRow = Object.assign(
                            data[i],
                            { ...temp },
                            { isDepartStation: true }
                        );
                    } else {
                        Object.assign(
                            data[i],
                            { ...temp },
                            { beforeDepartStation: true }
                        );
                    }
                } else if (!arriverRow) {
                    if (data[i].station === arriverStation) {
                        arriverRow = Object.assign(
                            data[i],
                            { ...temp },
                            { isArriverStation: true }
                        );
                    }
                } else {
                    Object.assign(
                        data[i],
                        { ...temp },
                        { afterArriverStation: true }
                    );
                }

                Object.assign(data[i], {
                    isStartStation: i === 0,
                    isEndStation: i === data.length - 1,
                });
            }
            setScheduleList(data);
        });
    }, [date, trainNumber, departStation, arriverStation]);

    if (!scheduleList.length) return null;

    return (
        <div className="schedule">
            <div className="dialog">
                <h1>时刻列表</h1>
                <div className="head">
                    <span className="station">车站</span>
                    <span className="arrtime">到达</span>
                    <span className="deptime">发车</span>
                    <span className="stoptime">停留时间</span>
                </div>
                <ul>
                    {scheduleList.map((item, idx) => (
                        <ScheduleRow
                            idx={idx + 1}
                            key={item.station}
                            {...item}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}

Schedule.propTypes = {
    date: PropTypes.number.isRequired,
    trainNumber: PropTypes.string.isRequired,
    departStation: PropTypes.string.isRequired,
    arriverStation: PropTypes.string.isRequired,
};

export default memo(Schedule);
