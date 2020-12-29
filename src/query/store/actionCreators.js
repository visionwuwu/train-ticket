import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { ORDER_DEPART, ORDER_DURATION } from "./constants";
import { h0 } from "../../utils/times";

export const setFrom = (data) => {
  return {
    type: actionTypes.ACTION_SET_FROM,
    payload: fromJS(data),
  };
};
export const setTo = (data) => {
  return {
    type: actionTypes.ACTION_SET_TO,
    payload: fromJS(data),
  };
};
export const setDepartDate = (data) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_DATE,
    payload: fromJS(data),
  };
};
export const setHighSpeed = (data) => {
  return {
    type: actionTypes.ACTION_SET_HIGH_SPEED,
    payload: fromJS(data),
  };
};

export const toggleHighSpeed = () => {
  return (dispatch, getStatus) => {
    const { highSpeed } = getStatus().toJS().query;
    dispatch({
      type: actionTypes.ACTION_SET_HIGH_SPEED,
      payload: fromJS(!highSpeed),
    });
  };
};

export const setTrainList = (data) => {
  return {
    type: actionTypes.ACTION_SET_TRAIN_LIST,
    payload: fromJS(data),
  };
};
export const toggleOrderTypes = () => {
  return (dispatch, getStatus) => {
    const { orderTypes } = getStatus().toJS().query;
    let newOrderTypes =
      orderTypes === ORDER_DEPART ? ORDER_DURATION : ORDER_DEPART;
    dispatch({
      type: actionTypes.ACTION_SET_ORDER_TYPES,
      payload: fromJS(newOrderTypes),
    });
  };
};

export const toggleOnlyTickets = () => {
  return (dispatch, getStatus) => {
    const { onlyTickets } = getStatus().toJS().query;
    dispatch({
      type: actionTypes.ACTION_SET_ONLY_TICKETS,
      payload: fromJS(!onlyTickets),
    });
  };
};

export const toggleIsFiltersVisible = () => {
  return (dispatch, getStatus) => {
    const { isFiltersVisible } = getStatus().toJS().query;
    dispatch({
      type: actionTypes.ACTION_SET_IS_FILTERS_VISIBLE,
      payload: fromJS(!isFiltersVisible),
    });
  };
};

export const setTicketTypes = (data) => {
  return {
    type: actionTypes.ACTION_SET_TICKET_TYPES,
    payload: fromJS(data),
  };
};
export const setCheckedTicketTypes = (data) => {
  return {
    type: actionTypes.ACTION_SET_CHECKED_TICKET_TYPES,
    payload: fromJS(data),
  };
};
export const setTrainTypes = (data) => {
  return {
    type: actionTypes.ACTION_SET_TRAIN_TYPES,
    payload: fromJS(data),
  };
};
export const setCheckedTrainTypes = (data) => {
  return {
    type: actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES,
    payload: fromJS(data),
  };
};
export const setDepartStations = (data) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_STATIONS,
    payload: fromJS(data),
  };
};
export const setCheckedDepartStations = (data) => {
  return {
    type: actionTypes.ACTION_SET_CHECKED_DEPART_STATIONS,
    payload: fromJS(data),
  };
};
export const setArriverStations = (data) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_STATIONS,
    payload: fromJS(data),
  };
};
export const setCheckedArriverStations = (data) => {
  return {
    type: actionTypes.ACTION_SET_CHECKED_ARRIVER_STATIONS,
    payload: fromJS(data),
  };
};
export const setDepartTimeStart = (data) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_TIME_START,
    payload: fromJS(data),
  };
};
export const setDepartTimeEnd = (data) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_TIME_END,
    payload: fromJS(data),
  };
};
export const setArraiverTimeStart = (data) => {
  return {
    type: actionTypes.ACTION_SET_ARRAIVER_TIME_START,
    payload: fromJS(data),
  };
};
export const setArraiverTimeEnd = (data) => {
  return {
    type: actionTypes.ACTION_SET_ARRAIVER_TIME_END,
    payload: fromJS(data),
  };
};
export const setSearchParsed = (data) => {
  return {
    type: actionTypes.ACTION_SET_SEARCH_PARSE,
    payload: fromJS(data),
  };
};
export const prevDate = () => {
  return (dispatch, getStatus) => {
    const { departDate } = getStatus().toJS().query;
    dispatch({
      type: actionTypes.ACTION_SET_DEPART_DATE,
      payload: h0(departDate) - 86400 * 1000,
    });
  };
};
export const nextDate = () => {
  return (dispatch, getStatus) => {
    const { departDate } = getStatus().toJS().query;
    dispatch({
      type: actionTypes.ACTION_SET_DEPART_DATE,
      payload: h0(departDate) + 86400 * 1000,
    });
  };
};
