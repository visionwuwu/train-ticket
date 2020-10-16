import * as actionTypes from "./constants"
import { fromJS } from "immutable"

const defaultState = fromJS({
  from: "北京", // 始发站
  to: "上海", // 终到站
  isCitySelectorVisible: false, // 城市选择浮层开关
  currentSelectingLeftCity: false,
  cityData: null, // 城市浮层数据
  isLoadingCityData: false, // 城市浮层数据加载开关，节流使用
  isDateSelectorVisible: false, // 日期选择开关
  departDate: "", // 到达目的地日期
  highSpeed: false // 高铁选择开关
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SET_FROM:
      return state.set("from", action.payload)
    case actionTypes.ACTION_SET_TO:
      return state.set("to", action.payload)
    case actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE:
      return state.set("isCitySelectorVisible", action.payload)
    case actionTypes.ACTION_SET_IS_LOADING_CITY_DATA:
      return state.set("isLoadingCityData", action.payload)
    case actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY:
      return state.set("currentSelectingLeftCity", action.payload)
    case actionTypes.ACTION_SET_CITY_DATA:
      return state.set("cityData", action.payload)
    case actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE:
      return state.set("isDateSelectorVisible", action.payload)
    case actionTypes.ACTION_SET_DEPART_DATE:
      return state.set("departDate", action.payload)
    case actionTypes.ACTION_SET_HIGH_SPEED:
      return state.set("highSpeed", action.payload)
    default: 
      return state
  }
}