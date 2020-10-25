import * as actionTypes from "./constants"
import { fromJS } from "immutable"

const defaultState = fromJS({
  departDate: Date.now(),
  arriverDate: Date.now(),
  departStation: "",
  arriverStation: "",
  trainNumber: "",
  seatType: "",
  departTimeStr: "",
  arriverTimeStr: "",
  durationStr: "",
  price: 0,
  passengers: [],
  searchParsed: false,
  menu: [],
  isMenuVisible: false
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SET_DEPART_DATE:
      return state.set("departDate", action.payload)
    case actionTypes.ACTION_SET_ARRIVER_DATE:
      return state.set("arriverDate", action.payload)
    case actionTypes.ACTION_SET_DEPART_STATION:
      return state.set("departStation", action.payload)
    case actionTypes.ACTION_SET_ARRIVER_STATION:
      return state.set("arriverStation", action.payload)
    case actionTypes.ACTION_SET_TRAIN_NUMBER:
      return state.set("trainNumber", action.payload)
    case actionTypes.ACTION_SET_SEAT_TYPE:
      return state.set("seatType", action.payload)
    case actionTypes.ACTION_SET_DEPART_TIME_STR:
      return state.set("departTimeStr", action.payload)
    case actionTypes.ACTION_SET_ARRIVER_TIME_STR:
      return state.set("arriverTimeStr", action.payload)
    case actionTypes.ACTION_SET_DURATION_STR:
      return state.set("durationStr", action.payload)
    case actionTypes.ACTION_SET_PRICE:
      return state.set("price", action.payload)
    case actionTypes.ACTION_SET_PASSENGERS:
      return state.set("passengers", action.payload)
    case actionTypes.ACTION_SET_SEARCH_PARSED:
      return state.set("searchParsed", action.payload)
    case actionTypes.ACTION_SET_MENU:
      return state.set("menu", action.payload)
    case actionTypes.ACTION_SET_IS_MENU_VISIBLE:
      return state.set("isMenuVisible", action.payload)
    default: 
      return state
  }
}