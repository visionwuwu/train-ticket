import * as actionTypes from './constants';
import { fromJS } from 'immutable';

const defaultState = fromJS({
    departDate: Date.now(),
    arriverDate: Date.now(),
    departStation: '',
    arriverStation: '',
    trainNumber: '',
    departTimeStr: '',
    arriverTimeStr: '',
    durationStr: '',
    isScheduleVisible: false,
    ticketList: [],
    searchParsed: false,
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.ACTION_SET_DEPART_DATE:
            return state.set('departDate', action.payload);
        case actionTypes.ACTION_SET_ARRIVER_DATE:
            return state.set('arriverDate', action.payload);
        case actionTypes.ACTION_SET_DEPART_STATION:
            return state.set('departStation', action.payload);
        case actionTypes.ACTION_SET_ARRIVER_STATION:
            return state.set('arriverStation', action.payload);
        case actionTypes.ACTION_SET_TRAIN_NUMBER:
            return state.set('trainNumber', action.payload);
        case actionTypes.ACTION_SET_DEPART_TIME_STR:
            return state.set('departTimeStr', action.payload);
        case actionTypes.ACTION_SET_ARRIVER_TIME_STR:
            return state.set('arriverTimeStr', action.payload);
        case actionTypes.ACTION_SET_DURATION_STR:
            return state.set('durationStr', action.payload);
        case actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE:
            return state.set('isScheduleVisible', action.payload);
        case actionTypes.ACTION_SET_TICKET_LIST:
            return state.set('ticketList', action.payload);
        case actionTypes.ACTION_SET_SEARCH_PARSED:
            return state.set('searchParsed', action.payload);
        default:
            return state;
    }
};
