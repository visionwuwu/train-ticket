import React, { useCallback, useEffect, Suspense, lazy } from "react";
import { connect } from "react-redux";
import Header from "../components/Header";
import Nav from "../components/Nav";
import Detail from "../components/Detail";
import Candidate from "./components/Candidate";
import URI from "urijs";
import dayjs from "dayjs";
import { h0 } from "../utils/times";
import { fetchTicketData } from "../api/ticket";
import useNav from "../common/hooks/useNav";
import TrainContext from "./contexts/train-context";
import "./App.scss";
import {
  setDepartDate,
  setArriverDate,
  setDepartStation,
  setArriverStation,
  setTrainNumber,
  setDepartTimeStr,
  setArriverTimeStr,
  setDurationStr,
  setTicketList,
  toggleScheduleVisible,
  setSearchParsed,
  prevDate,
  nextDate,
} from "./store/actionCreators";

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
    searchParsed,
  } = props;

  const {
    setDepartDateDispatch,
    setArriverDateDispatch,
    setDepartStationDispatch,
    setArriverStationDispatch,
    setTrainNumberDispatch,
    setDepartTimeStrDispatch,
    setArriverTimeStrDispatch,
    setDurationStrDispatch,
    setTicketListDispatch,
    toggleScheduleVisibleDispatch,
    setSearchParsedDispatch,
    prevDateDispatch,
    nextDateDispatch,
  } = props;

  const ticketListJS = ticketList.toJS() || [];

  const Schedule = lazy(() => import("./components/Schedule"));

  useEffect(() => {
    const queies = URI.parseQuery(window.location.search);
    const { dStation, aStation, trainNumber, date } = queies;

    setDepartStationDispatch(dStation);
    setArriverStationDispatch(aStation);
    setTrainNumberDispatch(trainNumber);
    setDepartDateDispatch(h0(dayjs(date).valueOf()));
    setSearchParsedDispatch(true);
  }, [
    setArriverStationDispatch,
    setDepartDateDispatch,
    setDepartStationDispatch,
    setSearchParsedDispatch,
    setTrainNumberDispatch,
  ]);

  useEffect(() => {
    if (!searchParsed) return;

    const url = new URI("/rest/ticket")
      .setSearch("date", dayjs(departDate).format("YYYY-MM-DD"))
      .setSearch("trainNumber", trainNumber)
      .toString();

    fetchTicketData(url).then((data) => {
      const { detail, candidates } = data;
      const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;

      setDepartTimeStrDispatch(departTimeStr);
      setArriverTimeStrDispatch(arriveTimeStr);
      setArriverDateDispatch(arriveDate);
      setDurationStrDispatch(durationStr);
      setTicketListDispatch(candidates);
    });
  }, [
    searchParsed,
    departDate,
    trainNumber,
    setDepartTimeStrDispatch,
    setArriverTimeStrDispatch,
    setArriverDateDispatch,
    setDurationStrDispatch,
    setTicketListDispatch,
  ]);

  const { isNextDisabled, isPrevDisabled, prevClick, nextClick } = useNav(
    departDate,
    prevDateDispatch,
    nextDateDispatch
  );

  useEffect(() => {
    document.title = trainNumber;
  }, [trainNumber]);

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  if (!searchParsed) return null;

  return (
      <div className="app">
          <div className="header-wrapper">
              <Header title={trainNumber} onBack={onBack} />
          </div>
          <div className="nav-wrapper">
              <Nav
          date={departDate}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
          prevClick={prevClick}
          nextClick={nextClick}
        />
          </div>
          <Detail
        departDate={departDate}
        arriverDate={arriverDate}
        departStation={departStation}
        arriverStation={arriverStation}
        trainNumber={trainNumber}
        departTimeStr={departTimeStr}
        arriverTimeStr={arriverTimeStr}
        durationStr={durationStr}
      >
              <span className="left"></span>
              <span
          className="schedule"
          onClick={() => toggleScheduleVisibleDispatch()}
        >
                  时刻列表
              </span>
              <span className="right"></span>
          </Detail>
          {isScheduleVisible && (
          <div
          className="mask"
          onClick={() => {
            toggleScheduleVisibleDispatch();
          }}
        >
              <Suspense fallback={<div>loading...</div>}>
                  <Schedule
              date={departDate}
              trainNumber={trainNumber}
              departStation={departStation}
              arriverStation={arriverStation}
            />
              </Suspense>
          </div>
      )}
          <TrainContext.Provider
        value={{
          trainNumber,
          departDate,
          departStation,
          arriverStation,
        }}
      >
              <Candidate ticketList={ticketListJS} />
          </TrainContext.Provider>
      </div>
  );
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
  searchParsed: state.getIn(["ticket", "searchParsed"]),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setDepartDateDispatch(departDate) {
      dispatch(setDepartDate(departDate));
    },
    setArriverDateDispatch(arriverDate) {
      dispatch(setArriverDate(arriverDate));
    },
    setDepartStationDispatch(departStation) {
      dispatch(setDepartStation(departStation));
    },
    setArriverStationDispatch(arriverStation) {
      dispatch(setArriverStation(arriverStation));
    },
    setTrainNumberDispatch(trainNumber) {
      dispatch(setTrainNumber(trainNumber));
    },
    setDepartTimeStrDispatch(departTimeStr) {
      dispatch(setDepartTimeStr(departTimeStr));
    },
    setArriverTimeStrDispatch(arriverTimeStr) {
      dispatch(setArriverTimeStr(arriverTimeStr));
    },
    setDurationStrDispatch(durationStr) {
      dispatch(setDurationStr(durationStr));
    },
    setTicketListDispatch(ticketList) {
      dispatch(setTicketList(ticketList));
    },
    toggleScheduleVisibleDispatch() {
      dispatch(toggleScheduleVisible());
    },
    setSearchParsedDispatch(searchParsed) {
      dispatch(setSearchParsed(searchParsed));
    },
    prevDateDispatch() {
      dispatch(prevDate());
    },
    nextDateDispatch() {
      dispatch(nextDate());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
