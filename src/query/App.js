import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import URI from "urijs"
import { h0 } from "../utils/times"
import { fetchQueryData } from "../api/query"
import dayjs from "dayjs"
import "./App.scss"
import Nav from "../components/Nav"
import Header from "../components/Header"
import useNav from "./hooks/useNav"
import {
  List,
  Bottom
} from "./components"
import {
  setFrom,
  setTo,
  setDepartDate,
  setHighSpeed,
  toggleHighSpeed,
  setTrainList,
  toggleOrderTypes,
  toggleOnlyTickets,
  toggleIsFiltersVisible,
  setTicketTyps,
  setCheckedTicketTypes,
  setTrainTypes,
  setCheckedTrainTypes,
  setDepartStations,
  setCheckedDepartStations,
  setArriverStations,
  setCheckedArriverStations,
  setDepartTimeStart,
  setDepartTimeEnd,
  setArraiverTimeStart,
  setArraiverTimeEnd,
  setSearchParsed,
  prevDate,
  nextDate,
} from "./store/actionCreators"

function App(props) {
  const {
    from,
    to,
    departDate,
    highSpeed,
    orderTypes,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriverStations,
    departTimeStart,
    departTimeEnd,
    arraiverTimeStart,
    arraiverTimeEnd,
    searchParsed,
    trainList,
    isFiltersVisible
  } = props;

  const {
    setFromDispatch,
    setToDispatch,
    setHighSpeedDispatch,
    setDepartDateDispatch,
    setSearchParsedDispatch,
    setTrainListDispatch,
    setTicketTypsDispatch,
    setTrainTypesDispatch,
    setDepartStationsDispatch,
    setArriverStationsDispatch,
    prevDateDispatch,
    nextDateDispatch,
    toggleOrderTypesDispatch,
    toggleHighSpeedDispatch,
    toggleOnlyTicketsDispatch,
    toggleIsFiltersVisibleDispatch,
  } = props

  const trainListJS = trainList.toJS() || []

  // 解析url参数
  useEffect(() => {
    const queies = URI.parseQuery(window.location.search)
    const {
      from,
      to,
      date,
      highSpeed
    } = queies;
    setFromDispatch(from)
    setToDispatch(to)
    setDepartDateDispatch(h0(dayjs(date).valueOf()))
    setHighSpeedDispatch(highSpeed === "true")

    setSearchParsedDispatch(true)
  }, [])

  // 获取车次列表
  useEffect(() => {
    if (!searchParsed) return;

    const url = new URI("/rest/query")
      .setSearch("from", from)
      .setSearch("to", to)
      .setSearch("date", departDate)
      .setSearch("highSpeed", highSpeed)
      .setSearch("orderTypes", orderTypes)
      .setSearch("onlyTickets", onlyTickets)
      .setSearch("checkedTicketTypes", Object.keys(checkedTicketTypes).join())
      .setSearch("checkedTrainTypes", Object.keys(checkedTrainTypes).join())
      .setSearch("checkedDepartStations", Object.keys(checkedDepartStations).join())
      .setSearch("checkedArriverStations", Object.keys(checkedArriverStations).join())
      .setSearch("departTimeStart", departTimeStart)
      .setSearch("departTimeEnd", departTimeEnd)
      .setSearch("arraiverTimeStart", arraiverTimeStart)
      .setSearch("arraiverTimeEnd", arraiverTimeEnd)
      toString()
    
    fetchQueryData(url)
      .then(data => {
        const {
          dataMap: {
            directTrainInfo: {
              trains,
              filter: {
                ticketType,
                trainType,
                depStation,
                arrStation
              }
            }
          }
        } = data

        setTrainListDispatch(trains)
        setTicketTypsDispatch(ticketType)
        setTrainTypesDispatch(trainType)
        setDepartStationsDispatch(depStation)
        setArriverStationsDispatch(arrStation)
      })
  }, [
    from,
    to,
    departDate,
    highSpeed,
    orderTypes,
    onlyTickets,
    checkedTicketTypes,
    checkedTrainTypes,
    checkedDepartStations,
    checkedArriverStations,
    departTimeStart,
    departTimeEnd,
    arraiverTimeStart,
    arraiverTimeEnd,
  ])
  
  /* Header返回回调 */
  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  
  /* useNav自定义hooks */
  const {
    isPrevDisabled,
    isNextDisabled,
    prevClick,
    nextClick
  } = useNav(departDate, prevDateDispatch, nextDateDispatch)

  /* bottom回调函数缓存 */
  const bottomCbs = useMemo(() => {
    return {
      toggleOrderTypes: toggleOrderTypesDispatch,
      toggleHighSpeed: toggleHighSpeedDispatch,
      toggleOnlyTickets: toggleOnlyTicketsDispatch,
      toggleIsFiltersVisible: toggleIsFiltersVisibleDispatch
    }
  }, [])

  if (!searchParsed) {
    return null
  }

  return (
    <div>
      <div className="header-wrapper">
        <Header 
          title={`${from} ⇀ ${to}`}
          onBack={onBack}
        />
      </div>
      <Nav 
        date={departDate}
        isPrevDisabled={isPrevDisabled}
        isNextDisabled={isNextDisabled}
        prevClick={prevClick}
        nextClick={nextClick}
      />
      <List 
        trainList={trainListJS}
      />
      <Bottom 
        orderTypes={orderTypes}
        highSpeed={highSpeed}
        onlyTickets={onlyTickets}
        isFiltersVisible={isFiltersVisible}
        {...bottomCbs}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  from: state.getIn(["query", "from"]),
  to: state.getIn(["query", "to"]),
  departDate: state.getIn(["query", "departDate"]),
  highSpeed: state.getIn(["query", "highSpeed"]),
  trainList: state.getIn(["query", "trainList"]),
  orderTypes: state.getIn(["query", "orderTypes"]),
  onlyTickets: state.getIn(["query", "onlyTickets"]),
  isFiltersVisible: state.getIn(["query", "isFiltersVisible"]),
  ticketTyps: state.getIn(["query", "ticketTyps"]),
  checkedTicketTypes: state.getIn(["query", "checkedTicketTypes"]),
  trainTypes: state.getIn(["query", "trainTypes"]),
  checkedTrainTypes: state.getIn(["query", "checkedTrainTypes"]),
  departStations: state.getIn(["query", "departStations"]),
  checkedDepartStations: state.getIn(["query", "checkedDepartStations"]),
  arriverStations: state.getIn(["query", "arriverStations"]),
  checkedArriverStations: state.getIn(["query", "checkedArriverStations"]),
  departTimeStart: state.getIn(["query", "departTimeStart"]),
  departTimeEnd: state.getIn(["query", "departTimeEnd"]),
  arraiverTimeStart: state.getIn(["query", "arraiverTimeStart"]),
  arraiverTimeEnd: state.getIn(["query", "arraiverTimeEnd"]),
  searchParsed: state.getIn(["query", "searchParsed"]),
})

const mapDispatchToProps = (dispatch) => {
  return {
    setFromDispatch(from) {
      dispatch(setFrom(from))
    },
    setToDispatch(to) {
      dispatch(setTo(to))
    },
    setDepartDateDispatch(departDate) {
      dispatch(setDepartDate(departDate))
    },
    setHighSpeedDispatch(highSpeed) {
      dispatch(setHighSpeed(highSpeed))
    },
    toggleHighSpeedDispatch(highSpeed) {
      dispatch(toggleHighSpeed(highSpeed))
    },
    setTrainListDispatch(trainList) {
      dispatch(setTrainList(trainList))
    },
    toggleOrderTypesDispatch(orderTypes) {
      dispatch(toggleOrderTypes(orderTypes))
    },
    toggleOnlyTicketsDispatch(onlyTickets) {
      dispatch(toggleOnlyTickets(onlyTickets))
    },
    toggleIsFiltersVisibleDispatch(isFiltersVisible) {
      dispatch(toggleIsFiltersVisible(isFiltersVisible))
    },
    setTicketTypsDispatch(ticketTyps) {
      dispatch(setTicketTyps(ticketTyps))
    },
    setCheckedTicketTypesDispatch(checkedTicketTypes) {
      dispatch(setCheckedTicketTypes(checkedTicketTypes))
    },
    setTrainTypesDispatch(trainTypes) {
      dispatch(setTrainTypes(trainTypes))
    },
    setCheckedTrainTypesDispatch(checkedTrainTypes) {
      dispatch(setCheckedTrainTypes(checkedTrainTypes))
    },
    setDepartStationsDispatch(departStations) {
      dispatch(setDepartStations(departStations))
    },
    setCheckedDepartStationsDispatch(checkedDepartStations) {
      dispatch(setCheckedDepartStations(checkedDepartStations))
    },
    setArriverStationsDispatch(arriverStations) {
      dispatch(setArriverStations(arriverStations))
    },
    setCheckedArriverStationsDispatch(checkedArriverStations) {
      dispatch(setCheckedArriverStations(checkedArriverStations))
    },
    setDepartTimeStartDispatch(departTimeStart) {
      dispatch(setDepartTimeStart(departTimeStart))
    },
    setDepartTimeEndDispatch(departTimeEnd) {
      dispatch(setDepartTimeEnd(departTimeEnd))
    },
    setArraiverTimeStartDispatch(arraiverTimeStart) {
      dispatch(setArraiverTimeStart(arraiverTimeStart))
    },
    setArraiverTimeEndDispatch(arraiverTimeEnd) {
      dispatch(setArraiverTimeEnd(arraiverTimeEnd))
    },
    setSearchParsedDispatch(searchParsed) {
      dispatch(setSearchParsed(searchParsed))
    },
    prevDateDispatch() {
      dispatch(prevDate())
    },
    nextDateDispatch() {
      dispatch(nextDate())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
