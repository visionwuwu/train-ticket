import * as actionTypes from "./constants"
import { fromJS } from "immutable"
import { fetchCityData } from "../../api"
import { setCityDataCache } from "../../utils/city-data"

/* 设置始发地 */
export const setFrom = (data) => ({
  type: actionTypes.ACTION_SET_FROM,
  payload: fromJS(data)
})

/* 设置目的地 */
export const setTo = (data) => ({
  type: actionTypes.ACTION_SET_TO,
  payload: fromJS(data)
})

/* 始发与目的交换 */
export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    const { from, to } = getState().toJS().index;
    dispatch(setFrom(to))
    dispatch(setTo(from))
  }
}

/* 设置城市列表数据 */
const setCityData = (data) => ({
  type: actionTypes.ACTION_SET_CITY_DATA,
  payload: fromJS(data)
})

/* 获取城市列表数据 */
export const cityData = () => {
  return (dispatch) => {
    dispatch(setLoadingCityData(true))
    fetchCityData().then(res => res.json())
    .then(data => {
      const { cityList } = data;
      setCityDataCache(cityList)
      dispatch(setCityData(cityList))
      dispatch(setLoadingCityData(false))
    }).catch(error => {
      dispatch(setLoadingCityData(false))
      console.log(error)
    })
  }
}

/* 加载城市列表数据开关 */
export const setLoadingCityData = (data) => ({
  type: actionTypes.ACTION_SET_IS_LOADING_CITY_DATA,
  payload: data
})

/* 显示城市选择浮层 */
export const showCitySelector = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload: true
    })

    dispatch({
      type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload: data
    })
  }
}

/* 隐藏城市选择浮层 */
export const hideCitySelector = () => ({
  type: actionTypes.ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
  payload: false
})

/* 设置选中的城市数据 */
export const setSelectedCity = (data) => {
  return (dispatch, getState) => {
    const { currentSelectingLeftCity } = getState().toJS().index;
    if (currentSelectingLeftCity) {
      dispatch(setFrom(data))
    } else {
      dispatch(setTo(data))
    }
  }
}

/* 当前是否选中始发地 */
export const currentSelectingLeftCity = (data) => ({
  type: actionTypes.ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
  payload: fromJS(data)
})

/* 显示日期选择浮层 */
export const showDateSelector = () => ({
  type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: true
})

/* 隐藏日期选择浮层 */
export const hideDateSelector = () => ({
  type: actionTypes.ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
  payload: false
})

/* 设置日期 */
export const setDepartDate = (data) => ({
  type: actionTypes.ACTION_SET_DEPART_DATE,
  payload: fromJS(data)
})

/* 高铁切换 */
export const toggleHighSpeed = () => {
  return (dispatch, getState) => {
    const { highSpeed } = getState().toJS().index
    dispatch({
      type: actionTypes.ACTION_SET_HIGH_SPEED,
      payload: fromJS(!highSpeed)
    })
  }
}
