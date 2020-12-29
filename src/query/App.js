import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import URI from "urijs"
import { h0 } from "../utils/times"
import { fetchQueryData } from "../api/query"
import dayjs from "dayjs"
import "./App.scss"
import Nav from "../components/Nav"
import Header from "../components/Header"
import useNav from "../common/hooks/useNav"
import BottomModal from "./components/BottomModal"

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
  setTicketTypes,
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
    isFiltersVisible,
    ticketTypes,
    trainTypes,
    departStations,
    arriverStations,
  } = props;


  const {
    setFromDispatch,
    setToDispatch,
    setHighSpeedDispatch,
    setDepartDateDispatch,
    setSearchParsedDispatch,
    setTrainListDispatch,
    setTicketTypesDispatch,
    setTrainTypesDispatch,
    setDepartStationsDispatch,
    setArriverStationsDispatch,
    prevDateDispatch,
    nextDateDispatch,
    toggleOrderTypesDispatch,
    toggleHighSpeedDispatch,
    toggleOnlyTicketsDispatch,
    toggleIsFiltersVisibleDispatch,
    setCheckedTicketTypesDispatch,
    setCheckedTrainTypesDispatch,
    setCheckedDepartStationsDispatch,
    setCheckedArriverStationsDispatch,
    setDepartTimeStartDispatch,
    setDepartTimeEndDispatch,
    setArraiverTimeStartDispatch,
    setArraiverTimeEndDispatch,
  } = props

  const trainListJS = trainList.toJS() || []
  const ticketTypesJS = ticketTypes.toJS() || []
  const trainTypesJS = trainTypes.toJS() || []
  const departStationsJS = departStations.toJS() || []
  const arriverStationsJS = arriverStations.toJS() || []
  const checkedTicketTypesJS = checkedTicketTypes.toJS() || {}
  const checkedTrainTypesJS = checkedTrainTypes.toJS() || {}
  const checkedDepartStationsJS = checkedDepartStations.toJS() || {}
  const checkedArriverStationsJS = checkedArriverStations.toJS() || {}

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
  }, [
    setFromDispatch,
    setToDispatch,
    setDepartDateDispatch,
    setHighSpeedDispatch,
    setSearchParsedDispatch,
  ])

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
      .setSearch("checkedTicketTypes", Object.keys(checkedTicketTypesJS).join())
      .setSearch("checkedTrainTypes", Object.keys(checkedTrainTypesJS).join())
      .setSearch("checkedDepartStations", Object.keys(checkedDepartStationsJS).join())
      .setSearch("checkedArriverStations", Object.keys(checkedArriverStationsJS).join())
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
        setTicketTypesDispatch(ticketType)
        setTrainTypesDispatch(trainType)
        setDepartStationsDispatch(depStation)
        setArriverStationsDispatch(arrStation)
      })
    // eslint-disable-next-line
  }, [from, to, departDate, highSpeed, orderTypes, onlyTickets, checkedTicketTypes, checkedTrainTypes, checkedDepartStations, checkedArriverStations, departTimeStart, departTimeEnd, arraiverTimeStart, arraiverTimeEnd, searchParsed])

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
  }, [toggleHighSpeedDispatch, toggleIsFiltersVisibleDispatch, toggleOnlyTicketsDispatch, toggleOrderTypesDispatch])

  /* bottom-modal回调缓存 */
  const bottomModalCbs = useMemo(() => {
    return {
      toggleIsFiltersVisible: toggleIsFiltersVisibleDispatch,
      setCheckedTicketTypes: setCheckedTicketTypesDispatch,
      setCheckedTrainTypes: setCheckedTrainTypesDispatch,
      setCheckedDepartStations: setCheckedDepartStationsDispatch,
      setCheckedArriverStations: setCheckedArriverStationsDispatch,
      setDepartTimeStart: setDepartTimeStartDispatch,
      setDepartTimeEnd: setDepartTimeEndDispatch,
      setArraiverTimeStart: setArraiverTimeStartDispatch,
      setArraiverTimeEnd: setArraiverTimeEndDispatch,
    }
  }, [
    toggleIsFiltersVisibleDispatch,
    setCheckedTicketTypesDispatch,
    setCheckedTrainTypesDispatch,
    setCheckedDepartStationsDispatch,
    setCheckedArriverStationsDispatch,
    setDepartTimeStartDispatch,
    setDepartTimeEndDispatch,
    setArraiverTimeStartDispatch,
    setArraiverTimeEndDispatch,
  ])

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
        checkedTicketTypes={checkedTicketTypesJS}
        checkedTrainTypes={checkedTrainTypesJS}
        checkedDepartStations={checkedDepartStationsJS}
        checkedArriverStations={checkedArriverStationsJS}
        departTimeStart={departTimeStart}
        departTimeEnd={departTimeEnd}
        arraiverTimeStart={arraiverTimeStart}
        arraiverTimeEnd={arraiverTimeEnd}
      />
          { isFiltersVisible &&
          <BottomModal
          show={isFiltersVisible}
          ticketTypes={ticketTypesJS}
          trainTypes={trainTypesJS}
          departStations={departStationsJS}
          arriverStations={arriverStationsJS}
          checkedTicketTypes={checkedTicketTypesJS}
          checkedTrainTypes={checkedTrainTypesJS}
          checkedDepartStations={checkedDepartStationsJS}
          checkedArriverStations={checkedArriverStationsJS}
          departTimeStart={departTimeStart}
          departTimeEnd={departTimeEnd}
          arraiverTimeStart={arraiverTimeStart}
          arraiverTimeEnd={arraiverTimeEnd}
          {...bottomModalCbs}
        />
      }
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
  ticketTypes: state.getIn(["query", "ticketTypes"]),
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
    setTicketTypesDispatch(ticketTyps) {
      dispatch(setTicketTypes(ticketTyps))
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
