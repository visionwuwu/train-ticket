import React, { useCallback } from 'react'
import { connect } from "react-redux"
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
  setPassengers,
  setSearchParsed,
  setMenu,
  setIsMenuVisible
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
    departDateDispatch,
    arriverDateDispatch,
    departStationDispatch,
    arriverStationDispatch,
    trainNumberDispatch,
    seatTypeDispatch,
    departTimeStrDispatch,
    arriverTimeStrDispatch,
    durationStrDispatch,
    priceDispatch,
    passengersDispatch,
    searchParsedDispatch,
    menuDispatch,
    isMenuVisibleDispatch,
  } = props

  const onBack = useCallback(() => {
    window.history.back()
  }, [])

  return (
    <div className="app">
      <Header 
        title="订单填写"
        onBack={onBack}
      />
      <Detail 
        departDate={departDate}
        arriverDate={arriverDate}
        departTimeStr={departTimeStr}
        arriverTimeStr={arriverTimeStr}
        durationStr={durationStr}
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
    departDateDispatch(departDate){
      dispatch(setDepartDate(departDate))
    },
    arriverDateDispatch(arriverDate){
      dispatch(setArriverDate(arriverDate))
    },
    departStationDispatch(departStation){
      dispatch(setDepartStation(departStation))
    },
    arriverStationDispatch(arriverStation){
      dispatch(setArriverStation(arriverStation))
    },
    trainNumberDispatch(trainNumber){
      dispatch(setTrainNumber(trainNumber))
    },
    seatTypeDispatch(seatType){
      dispatch(setSeatType(seatType))
    },
    departTimeStrDispatch(departTimeStr){
      dispatch(setDepartTimeStr(departTimeStr))
    },
    arriverTimeStrDispatch(arriverTimeStr){
      dispatch(setArriverTimeStr(arriverTimeStr))
    },
    durationStrDispatch(durationStr){
      dispatch(setDurationStr(durationStr))
    },
    priceDispatch(price){
      dispatch(setPrice(price))
    },
    passengersDispatch(passengers){
      dispatch(setPassengers(passengers))
    },
    searchParsedDispatch(searchParsed){
      dispatch(setSearchParsed(searchParsed))
    },
    menuDispatch(menu){
      dispatch(setMenu(menu))
    },
    isMenuVisibleDispatch(isMenuVisible){
      dispatch(setIsMenuVisible(isMenuVisible))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
