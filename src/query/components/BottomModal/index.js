import React, { memo, useState, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Option from './Option';
import Slider from './Slider';
import { isEmptyObj } from '../../../utils';
import './index.scss';

function checkReducer(state, action) {
    const { type, payload } = action;
    let newState = {};
    switch (type) {
        case 'toggle':
            newState = { ...state };
            if (payload in newState) {
                delete newState[payload];
            } else {
                newState[payload] = payload;
            }
            return newState;
        case 'reset':
            return newState;
        default:
            return state;
    }
}

function BottomModal(props) {
    const {
        show,
        ticketTypes,
        trainTypes,
        departStations,
        arriverStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriverStations,
        departTimeStart,
        departTimeEnd,
        arraiverTimeStart,
        arraiverTimeEnd,
    } = props;

    const {
        toggleIsFiltersVisible,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriverStations,
        setDepartTimeStart,
        setDepartTimeEnd,
        setArraiverTimeStart,
        setArraiverTimeEnd,
    } = props;

    const [
        localCheckedTicketTypes,
        localCheckedTicketTypesDispatch,
    ] = useReducer(checkReducer, checkedTicketTypes, (checkedTicketTypes) => ({
        ...checkedTicketTypes,
    }));
    const [localCheckedTrainTypes, localCheckedTrainTypesDispatch] = useReducer(
        checkReducer,
        checkedTrainTypes,
        (checkedTrainTypes) => ({
            ...checkedTrainTypes,
        })
    );
    const [
        localCheckedDepartStations,
        localCheckedDepartStationsDispatch,
    ] = useReducer(
        checkReducer,
        checkedDepartStations,
        (checkedDepartStations) => ({ ...checkedDepartStations })
    );
    const [
        localCheckedArriverStations,
        localCheckedArriverStationsDispatch,
    ] = useReducer(
        checkReducer,
        checkedArriverStations,
        (checkedArriverStations) => ({ ...checkedArriverStations })
    );

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(
        departTimeStart
    );
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArraiverTimeStart, setLocalArraiverTimeStart] = useState(
        arraiverTimeStart
    );
    const [localArraiverTimeEnd, setLocalArraiverTimeEnd] = useState(
        arraiverTimeEnd
    );

    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            dispatch: localCheckedTicketTypesDispatch,
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            dispatch: localCheckedTrainTypesDispatch,
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            dispatch: localCheckedDepartStationsDispatch,
        },
        {
            title: '到达车站',
            options: arriverStations,
            checkedMap: localCheckedArriverStations,
            dispatch: localCheckedArriverStationsDispatch,
        },
    ];

    const onSure = () => {
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedTrainTypes(localCheckedTrainTypes);

        setCheckedDepartStations(localCheckedDepartStations);
        setCheckedArriverStations(localCheckedArriverStations);

        setDepartTimeStart(localDepartTimeStart);
        setDepartTimeEnd(localDepartTimeEnd);

        setArraiverTimeStart(localArraiverTimeStart);
        setArraiverTimeEnd(localArraiverTimeEnd);

        toggleIsFiltersVisible();
    };

    const isRestDisabled = useMemo(() => {
        return (
            isEmptyObj(localCheckedTicketTypes) &&
            isEmptyObj(localCheckedTrainTypes) &&
            isEmptyObj(localCheckedDepartStations) &&
            isEmptyObj(localCheckedArriverStations) &&
            localDepartTimeStart === 0 &&
            localDepartTimeEnd === 24 &&
            localArraiverTimeStart === 0 &&
            localArraiverTimeEnd === 24
        );
    }, [
        localCheckedTicketTypes,
        localCheckedTrainTypes,
        localCheckedDepartStations,
        localCheckedArriverStations,
        localDepartTimeStart,
        localDepartTimeEnd,
        localArraiverTimeStart,
        localArraiverTimeEnd,
    ]);

    const onReset = () => {
        if (isRestDisabled) return;

        localCheckedTicketTypesDispatch({ type: 'reset' });
        localCheckedTrainTypesDispatch({ type: 'reset' });
        localCheckedDepartStationsDispatch({ type: 'reset' });
        localCheckedArriverStationsDispatch({ type: 'reset' });
        setLocalDepartTimeStart(0);
        setLocalDepartTimeEnd(24);
        setLocalArraiverTimeStart(0);
        setLocalArraiverTimeEnd(24);
    };

    return (
        <div className={classNames('bottom-modal', { hidden: !show })}>
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    {/* 顶部title区域 */}
                    <div className="title">
                        <span
                            className={classNames({
                                disabled: isRestDisabled,
                            })}
                            onClick={onReset}
                        >
                            重置
                        </span>
                        <span onClick={onSure}>确定</span>
                    </div>
                    <div className="options">
                        {optionGroup.map((option) => (
                            <Option key={option.title} {...option} />
                        ))}
                    </div>
                    <Slider
                        title="始发时间"
                        currentStartHours={localDepartTimeStart}
                        currentEndHours={localDepartTimeEnd}
                        onStartChanged={setLocalDepartTimeStart}
                        onEndChanged={setLocalDepartTimeEnd}
                    />
                    <Slider
                        title="到达时间"
                        currentStartHours={localArraiverTimeStart}
                        currentEndHours={localArraiverTimeEnd}
                        onStartChanged={setLocalArraiverTimeStart}
                        onEndChanged={setLocalArraiverTimeEnd}
                    />
                </div>
            </div>
        </div>
    );
}

BottomModal.propTypes = {
    show: PropTypes.bool.isRequired,
    ticketTypes: PropTypes.array.isRequired,
    trainTypes: PropTypes.array.isRequired,
    departStations: PropTypes.array.isRequired,
    arriverStations: PropTypes.array.isRequired,
    checkedTicketTypes: PropTypes.object.isRequired,
    checkedTrainTypes: PropTypes.object.isRequired,
    checkedDepartStations: PropTypes.object.isRequired,
    checkedArriverStations: PropTypes.object.isRequired,
    departTimeStart: PropTypes.number.isRequired,
    departTimeEnd: PropTypes.number.isRequired,
    arraiverTimeStart: PropTypes.number.isRequired,
    arraiverTimeEnd: PropTypes.number.isRequired,
    toggleIsFiltersVisible: PropTypes.func.isRequired,
    setCheckedTicketTypes: PropTypes.func.isRequired,
    setCheckedTrainTypes: PropTypes.func.isRequired,
    setCheckedDepartStations: PropTypes.func.isRequired,
    setCheckedArriverStations: PropTypes.func.isRequired,
    setDepartTimeStart: PropTypes.func.isRequired,
    setDepartTimeEnd: PropTypes.func.isRequired,
    setArraiverTimeStart: PropTypes.func.isRequired,
    setArraiverTimeEnd: PropTypes.func.isRequired,
};

export default memo(BottomModal);
