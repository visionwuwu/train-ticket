import * as actionTypes from "./constants"
import { fromJS } from "immutable"

export const setDepartDate = (departDate) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_DATE,
    data: fromJS(departDate)
  }
}
export const setArriverDate = (arriverDate) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_DATE,
    data: fromJS(arriverDate)
  }
}
export const setDepartStation = (departStation) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_STATION,
    data: fromJS(departStation)
  }
}
export const setArriverStation = (arriverStation) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_STATION,
    data: fromJS(arriverStation)
  }
}
export const setTrainNumber = (trainNumber) => {
  return {
    type: actionTypes.ACTION_SET_TRAIN_NUMBER,
    data: fromJS(trainNumber)
  }
}
export const setDepartTimeStr = (departTimeStr) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_TIME_STR,
    data: fromJS(departTimeStr)
  }
}
export const setArriverTimeStr = (arriverTimeStr) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_TIME_STR,
    data: fromJS(arriverTimeStr)
  }
}
export const setDurationStr = (durationStr) => {
  return {
    type: actionTypes.ACTION_SET_DURATION_STR,
    data: fromJS(durationStr)
  }
}
export const setIsScheduleVisible = (isScheduleVisible) => {
  return {
    type: actionTypes.ACTION_SET_IS_SCHEDULE_VISIBLE,
    data: fromJS(isScheduleVisible)
  }
}
export const toggleScheduleVisible = () => {
  return (dispatch, getState) => {
    const isScheduleVisible = getState().getIn("ticket", "isScheduleVisible")
    dispatch(setIsScheduleVisible(!isScheduleVisible))
  }
}
export const setTicketList = (ticketList) => {
  return {
    type: actionTypes.ACTION_SET_TICKET_LIST,
    data: fromJS(ticketList)
  }
}