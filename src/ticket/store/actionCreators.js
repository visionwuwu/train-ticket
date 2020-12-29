import * as actionTypes from './constants';
import { fromJS } from 'immutable';
import { h0 } from '../../utils/times';

export const setDepartDate = (departDate) => {
    return {
        type: actionTypes.ACTION_SET_DEPART_DATE,
        payload: fromJS(departDate),
    };
};
export const setArriverDate = (arriverDate) => {
    return {
        type: actionTypes.ACTION_SET_ARRIVER_DATE,
        payload: fromJS(arriverDate),
    };
};
export const setDepartStation = (departStation) => {
    return {
        type: actionTypes.ACTION_SET_DEPART_STATION,
        payload: fromJS(departStation),
    };
};
export const setArriverStation = (arriverStation) => {
    return {
        type: actionTypes.ACTION_SET_ARRIVER_STATION,
        payload: fromJS(arriverStation),
    };
};
export const setTrainNumber = (trainNumber) => {
    return {
        type: actionTypes.ACTION_SET_TRAIN_NUMBER,
        payload: fromJS(trainNumber),
    };
};
export const setDepartTimeStr = (departTimeStr) => {
    return {
        type: actionTypes.ACTION_SET_DEPART_TIME_STR,
        payload: fromJS(departTimeStr),
    };
};
export const setArriverTimeStr = (arriverTimeStr) => {
    return {
        type: actionTypes.ACTION_SET_ARRIVER_TIME_STR,
        payload: fromJS(arriverTimeStr),
    };
};
export const setDurationStr = (durationStr) => {
    return {
        type: actionTypes.ACTION_SET_DURATION_STR,
        payload: fromJS(durationStr),
    };
};
export const setIsScheduleVisible = (isScheduleVisible) => {
    return {
        type: actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE,
        payload: fromJS(isScheduleVisible),
    };
};
export const toggleScheduleVisible = () => {
    return (dispatch, getState) => {
        const { isScheduleVisible } = getState().toJS().ticket;
        dispatch(setIsScheduleVisible(!isScheduleVisible));
    };
};
export const setTicketList = (ticketList) => {
    return {
        type: actionTypes.ACTION_SET_TICKET_LIST,
        payload: fromJS(ticketList),
    };
};

export const setSearchParsed = (searchParsed) => {
    return {
        type: actionTypes.ACTION_SET_SEARCH_PARSED,
        payload: fromJS(searchParsed),
    };
};

export const prevDate = () => {
    return (dispatch, getState) => {
        const { departDate } = getState().toJS().ticket;
        dispatch({
            type: actionTypes.ACTION_SET_DEPART_DATE,
            payload: fromJS(h0(departDate) - 86400 * 1000),
        });
    };
};

export const nextDate = () => {
    return (dispatch, getState) => {
        const { departDate } = getState().toJS().ticket;
        dispatch({
            type: actionTypes.ACTION_SET_DEPART_DATE,
            payload: fromJS(h0(departDate) + 86400 * 1000),
        });
    };
};
