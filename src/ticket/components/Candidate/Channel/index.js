import React, { memo, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import URI from 'urijs';
import dayjs from 'dayjs';
import TrainContext from '../../../contexts/train-context';

function Channel(props) {
    const { name, desc, type } = props;

    const {
        trainNumber,
        departDate,
        departStation,
        arriverStation,
    } = useContext(TrainContext);

    const url = useMemo(() => {
        return new URI('order.html')
            .setSearch('type', type)
            .setSearch('aStation', arriverStation)
            .setSearch('dStation', departStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
            .toString();
    }, [type, trainNumber, departDate, departStation, arriverStation]);

    return (
        <div className="channel">
            <div className="middle">
                <div className="name">{name}</div>
                <div className="desc">{desc}</div>
            </div>
            <a href={url} className="buy-wrapper">
                <div className="buy">买票</div>
            </a>
        </div>
    );
}

Channel.propTypes = {
    name: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default memo(Channel);
