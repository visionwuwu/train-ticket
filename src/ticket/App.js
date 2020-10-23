import React from 'react'
import { connect } from "react-redux"
import Header from "../components/Header"
import Nav from "../components/Nav"
import Detail from "./components/Detail"
import Schedule from "./components/Schedule"
import Candidate from "./components/Candidate"
import "./App.scss"
import {
  setDepartDate,
  setArriverDate,
  setDepartStation,
  setArriverStation,
  setTrainNumber,
  setDepartTimeStr,
  setArriverTimeStr,
  setDurationStr,
  setIsScheduleVisible,
  setTicketList,
  toggleScheduleVisible
} from "./store/actionCreators"

function App(props) {
  const {
    departDate,
    arriverDate,
    departStation,
    arriverStation,
    trainNumber,
    departTimeStr,
    arriverTimeStr,
    durationStr,
    isScheduleVisible,
    ticketList,
  } = props
  return (
    <div className="app">
      App
    </div>
  )
}

const mapStateToProps = (state) => ({
  departDate: state.getIn(["ticket", "departDate"]),
  arriverDate: state.getIn(["ticket", "arriverDate"]),
  departStation: state.getIn(["ticket", "departStation"]),
  arriverStation: state.getIn(["ticket", "arriverStation"]),
  trainNumber: state.getIn(["ticket", "trainNumber"]),
  departTimeStr: state.getIn(["ticket", "departTimeStr"]),
  arriverTimeStr: state.getIn(["ticket", "arriverTimeStr"]),
  durationStr: state.getIn(["ticket", "durationStr"]),
  isScheduleVisible: state.getIn(["ticket", "isScheduleVisible"]),
  ticketList: state.getIn(["ticket", "ticketList"]),
})

const mapDispatchToProps = (dispatch) => {
  return {
    setDepartDateDispatch(departDate) {
      dispatch(setDepartDate(departDate))
    },
    setArriverDateDispatch(arriverDate) {
      dispatch(setArriverDate(arriverDate))
    },
    setDepartStationDispatch(departStation) {
      dispatch(setDepartStation(departStation))
    },
    setArriverStationDispatch(arriverStation) {
      dispatch(setArriverStation(arriverStation))
    },
    setTrainNumberDispatch(trainNumber) {
      dispatch(setTrainNumber(trainNumber))
    },
    setDepartTimeStrDispatch(departTimeStr) {
      dispatch(setDepartTimeStr(departTimeStr))
    },
    setArriverTimeStrDispatch(arriverTimeStr) {
      dispatch(setArriverTimeStr(arriverTimeStr))
    },
    setDurationStrDispatch(durationStr) {
      dispatch(setDurationStr(durationStr))
    },
    setIsScheduleVisibleDispatch(isScheduleVisible) {
      dispatch(setIsScheduleVisible(isScheduleVisible))
    },
    setTicketListDispatch(ticketList) {
      dispatch(setTicketList(ticketList))
    },
    toggleScheduleVisibleDispatch() {
      dispatch(toggleScheduleVisible())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
