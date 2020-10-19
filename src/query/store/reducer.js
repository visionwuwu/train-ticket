import * as actionTypes from "./constants"
import { fromJS } from "immutable"
import { h0 } from "../../utils/times"
import { ORDER_DEPART } from "./constants"

const defaultState = fromJS({
  from: null, // 出发地
  to: null, // 目的地
  departDate: h0(Date.now()), // 始发时间
  highSpeed: false, // 只看高铁、动车
  trainList: [], // 车次列表
  orderTypes: ORDER_DEPART, // 排序类型 早 ⇀ 晚 | 短 ⇀ 长
  onlyTickets: false, // 只看有票
  isFiltersVisible: false, // 综合筛选浮层显示
  ticketTyps: [], // 坐席
  checkedTicketTypes: {},
  trainTypes: [], // 车次
  checkedTrainTypes: {},
  departStations: [], // 始发站
  checkedDepartStations: {},
  arriverStations: [], // 终点站
  checkedArriverStations: {},
  departTimeStart: 0, // 始发开始
  departTimeEnd: 24, // 始发结束
  arraiverTimeStart: 0, // 终点开始
  arraiverTimeEnd: 24, // 终点结束
  searchParse: false, // url查询参数解析完成与否
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.ACTION_SET_FROM:
      return state.set("from", action.payload);
    case actionTypes.ACTION_SET_TO:
      return state.set("to", action.payload);
    case actionTypes.ACTION_SET_DEPART_DATE:
      return state.set("departDate", action.payload);
    case actionTypes.ACTION_SET_HIGH_SPEED:
      return state.set("highSpeed", action.payload);
    case actionTypes.ACTION_SET_TRAIN_LIST:
      return state.set("trainList", action.payload);
    case actionTypes.ACTION_SET_ORDER_TYPES:
      return state.set("orderTypes", action.payload);
    case actionTypes.ACTION_SET_ONLY_TICKETS:
      return state.set("onlyTickets", action.payload);
    case actionTypes.ACTION_SET_IS_FILTERS_VISIBLE:
      return state.set("isFiltersVisible", action.payload);
    case actionTypes.ACTION_SET_TICKET_TYPS:
      return state.set("ticketTyps", action.payload);
    case actionTypes.ACTION_SET_CHECKED_TICKET_TYPES:
      return state.set("checkedTicketTypes", action.payload);
    case actionTypes.ACTION_SET_TRAIN_TYPES:
      return state.set("trainTypes", action.payload);
    case actionTypes.ACTION_SET_CHECKED_TRAIN_TYPES:
      return state.set("checkedTrainTypes", action.payload);
    case actionTypes.ACTION_SET_DEPART_STATIONS:
      return state.set("departStations", action.payload);
    case actionTypes.ACTION_SET_CHECKED_DEPART_STATIONS:
      return state.set("checkedDepartStations", action.payload);
    case actionTypes.ACTION_SET_ARRIVER_STATIONS:
      return state.set("arriverStations", action.payload);
    case actionTypes.ACTION_SET_CHECKED_ARRIVER_STATIONS:
      return state.set("checkedArriverStations", action.payload);
    case actionTypes.ACTION_SET_DEPART_TIME_START:
      return state.set("departTimeStart", action.payload);
    case actionTypes.ACTION_SET_DEPART_TIME_END:
      return state.set("departTimeEnd", action.payload);
    case actionTypes.ACTION_SET_ARRAIVER_TIME_START:
      return state.set("arraiverTimeStart", action.payload);
    case actionTypes.ACTION_SET_ARRAIVER_TIME_END:
      return state.set("arraiverTimeEnd", action.payload);
    case actionTypes.ACTION_SET_SEARCH_PARSE:
      return state.set("searchParse", action.payload);
    default: 
      return state
  }
}