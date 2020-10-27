import React, { useCallback, useEffect, useMemo } from 'react'
import { connect } from "react-redux"
import URI from "urijs"
import dayjs from "dayjs"
import { h0 } from "../utils/times"
import { fetchOrderData } from "../api/order"
import Header from "../components/Header"
import Detail from "../components/Detail"
import Ticket from "./components/Ticket"
import Passengers from "./components/Passengers"
import Menu from "./components/Menu"
import Choose from "./components/Choose"
import Account from "./components/Account"
import "./App.scss"
import {
  setDepartDate,
  setArriverDate,
  setDepartStation,
  setArriverStation,
  setTrainNumber,
  setSeatType,
  setDepartTimeStr,
  setArriverTimeStr,
  setDurationStr,
  setPrice,
  setSearchParsed,
  setIsMenuVisible,
  hideMenu,
  removePassenger,
  updatePassenger,
  addAdult,
  addChild,
  showGenderMenu,
  showFollowAdultMenu,
  showTicketTypeMenu
} from "./store/actionCreators"

function App(props) {
  const {
    departDate,
    arriverDate,
    departStation,
    arriverStation,
    trainNumber,
    seatType,
    departTimeStr,
    arriverTimeStr,
    durationStr,
    price,
    passengers,
    searchParsed,
    menu,
    isMenuVisible,
  } = props

  const {
    setDepartDateDispatch,
    setArriverDateDispatch,
    setDepartStationDispatch,
    setArriverStationDispatch,
    setTrainNumberDispatch,
    setSeatTypeDispatch,
    setDepartTimeStrDispatch,
    setArriverTimeStrDispatch,
    setDurationStrDispatch,
    setPriceDispatch,
    setSearchParsedDispatch,
    setHideMenuDispatch,
    setRemovePassengerDispatch,
    setUpdatePassengerDispatch,
    setAddAdultDispatch,
    setAddChildDispatch,
    setShowGenderMenuDispatch,
    setShowFollowAdultMenuDispatch,
    setShowTicketTypeMenuDispatch,
  } = props

  const passengersJS = passengers.toJS() || []
  const menuJS = menu.toJS() || {}

  // 解析url
  useEffect(() => {
    const queies = URI.parseQuery(window.location.search)

    const {
      type,
      aStation,
      dStation,
      date,
      trainNumber
    } = queies

    setSeatTypeDispatch(type)
    setTrainNumberDispatch(trainNumber)
    setArriverStationDispatch(aStation)
    setDepartStationDispatch(dStation)
    setDepartDateDispatch(h0(dayjs(date).valueOf()))
    setSearchParsedDispatch(true)

  }, [
    setSeatTypeDispatch,
    setTrainNumberDispatch,
    setArriverStationDispatch,
    setDepartStationDispatch,
    setDepartDateDispatch,
    setSearchParsedDispatch,
  ])

  useEffect(() => {
    if (!searchParsed) return;

    const url = new URI('/rest/order')
      .setSearch("type", seatType)
      .setSearch("trainNumber", trainNumber)
      .setSearch("aStation", arriverStation)
      .setSearch("dStation", departStation)
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))

      fetchOrderData(url).then(data => {
        const {
          departTimeStr,
          arriveTimeStr,
          arriveDate,
          durationStr,
          price,
        } = data;

        setArriverDateDispatch(arriveDate)
        setDepartTimeStrDispatch(departTimeStr)
        setArriverTimeStrDispatch(arriveTimeStr)
        setDurationStrDispatch(durationStr)
        setPriceDispatch(price)
      })
  }, [
    searchParsed,
    seatType,
    trainNumber,
    arriverStation,
    departStation,
    departDate,
    setArriverDateDispatch,
    setDepartTimeStrDispatch,
    setArriverTimeStrDispatch,
    setDurationStrDispatch,
    setPriceDispatch,
  ])

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  const passengersCbs = useMemo(() => {
    return {
      removePassenger: setRemovePassengerDispatch,
      updatePassenger: setUpdatePassengerDispatch,
      addAdult: setAddAdultDispatch,
      addChild: setAddChildDispatch,
      showGenderMenu: setShowGenderMenuDispatch,
      showFollowAdultMenu: setShowFollowAdultMenuDispatch,
      showTicketTypeMenu: setShowTicketTypeMenuDispatch,
    }
  }, [
    setRemovePassengerDispatch,
    setUpdatePassengerDispatch,
    setAddAdultDispatch,
    setAddChildDispatch,
    setShowGenderMenuDispatch,
    setShowFollowAdultMenuDispatch,
    setShowTicketTypeMenuDispatch,
  ])

  const menuCbs = useMemo(() => {
    return {
      hideMenu: setHideMenuDispatch
    }
  }, [setHideMenuDispatch])

  if (!searchParsed) return null

  return (
    <div className="app-content">
      <Header 
        title="订单填写"
        onBack={onBack}
      />
      <Detail 
        trainNumber={trainNumber}
        departDate={departDate}
        arriverDate={arriverDate}
        departTimeStr={departTimeStr}
        arriverTimeStr={arriverTimeStr}
        durationStr={durationStr}
        departStation={departStation}
        arriverStation={arriverStation}
        >
          <span
            style={{ display: 'block' }}
            className="train-icon"
          ></span>
      </Detail>
      <Ticket 
        seatType={seatType}
        price={price}
      />
      <Passengers 
        passengers={passengersJS}
        {...passengersCbs}
      />
      {
        passengersJS.length > 0 &&
        <Choose 
          passengers={passengersJS}
          updatePassenger={passengersCbs.updatePassenger}
        />
      }
      <Account 
        price={price}
        length={passengersJS.length}
      />
      <Menu
        show={isMenuVisible}
        {...menuJS}
        {...menuCbs}
      />
    </div>
  )
}

const mapStateToProps = (state) => ({
  departDate: state.getIn(["order", "departDate"]),
  arriverDate: state.getIn(["order", "arriverDate"]),
  departStation: state.getIn(["order", "departStation"]),
  arriverStation: state.getIn(["order", "arriverStation"]),
  trainNumber: state.getIn(["order", "trainNumber"]),
  seatType: state.getIn(["order", "seatType"]),
  departTimeStr: state.getIn(["order", "departTimeStr"]),
  arriverTimeStr: state.getIn(["order", "arriverTimeStr"]),
  durationStr: state.getIn(["order", "durationStr"]),
  price: state.getIn(["order", "price"]),
  passengers: state.getIn(["order", "passengers"]),
  searchParsed: state.getIn(["order", "searchParsed"]),
  menu: state.getIn(["order", "menu"]),
  isMenuVisible: state.getIn(["order", "isMenuVisible"]),
})

const mapDispatchToProps = (dispatch) => {
  return {
    setDepartDateDispatch(departDate){
      dispatch(setDepartDate(departDate))
    },
    setArriverDateDispatch(arriverDate){
      dispatch(setArriverDate(arriverDate))
    },
    setDepartStationDispatch(departStation){
      dispatch(setDepartStation(departStation))
    },
    setArriverStationDispatch(arriverStation){
      dispatch(setArriverStation(arriverStation))
    },
    setTrainNumberDispatch(trainNumber){
      dispatch(setTrainNumber(trainNumber))
    },
    setSeatTypeDispatch(seatType){
      dispatch(setSeatType(seatType))
    },
    setDepartTimeStrDispatch(departTimeStr){
      dispatch(setDepartTimeStr(departTimeStr))
    },
    setArriverTimeStrDispatch(arriverTimeStr){
      dispatch(setArriverTimeStr(arriverTimeStr))
    },
    setDurationStrDispatch(durationStr){
      dispatch(setDurationStr(durationStr))
    },
    setPriceDispatch(price){
      dispatch(setPrice(price))
    },
    setSearchParsedDispatch(searchParsed){
      dispatch(setSearchParsed(searchParsed))
    },
    setIsMenuVisibleDispatch(isMenuVisible){
      dispatch(setIsMenuVisible(isMenuVisible))
    },
    setHideMenuDispatch() {
      dispatch(hideMenu())
    },
    setRemovePassengerDispatch(id) {
      dispatch(removePassenger(id))
    },
    setUpdatePassengerDispatch(id, data, removeChildArr) {
      dispatch(updatePassenger(id, data, removeChildArr))
    },
    setAddAdultDispatch() {
      dispatch(addAdult())
    },
    setAddChildDispatch() {
      dispatch(addChild())
    },
    setShowGenderMenuDispatch(id) {
      dispatch(showGenderMenu(id))
    },
    setShowFollowAdultMenuDispatch(id, followAdult) {
      dispatch(showFollowAdultMenu(id, followAdult))
    },
    setShowTicketTypeMenuDispatch(id) {
      dispatch(showTicketTypeMenu(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
