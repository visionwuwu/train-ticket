import React from 'react';
import PropTypes from 'prop-types';
import Day from '../Day';

function Week(props) {
    const { days, onSelect } = props;

    return (
        <tr className="date-table-days">
            {days.map((day, idx) => (
                <Day key={idx} day={day} onSelect={onSelect} />
            ))}
        </tr>
    );
}

Week.propTypes = {
    days: PropTypes.array,
    onSelect: PropTypes.func.isRequired,
};

export default Week;
