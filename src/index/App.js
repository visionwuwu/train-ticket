import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { h0 } from "../utils/times";
import Header from "../components/Header";
import CitySelector from "../components/CitySelector";
import DateSelector from "../components/DateSelector";
import "./App.scss";
import { Journey, DepartDate, HighSpeed, Submit } from "./components";
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  cityData,
  setSelectedCity,
  showDateSelector,
  setDepartDate,
  hideDateSelector,
  toggleHighSpeed,
} from "./store/actionCreators";

function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData,
    isDateSelectorVisible,
    departDate,
    highSpeed,
  } = props;

  const {
    cityDataDispatch,
    exchangeFromToDispatch,
    showCitySelectorDispatch,
    hideCitySelectorDispatch,
    setSelectedCityDispatch,
    showDateSelectorDispatch,
    hideDateSelectorDispatch,
    setDepartDateDispatch,
    toggleHighSpeedDispatch,
  } = props;

  /* immutable对象转化为js对象 */
  const cityDataJS = cityData && cityData.toJS();

  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  /* 使用useMemo缓存当前的dispatch函数防止父组件渲染导致子组件渲染 */
  const journeyCbs = useMemo(() => {
    return {
      exchangeFromTo: exchangeFromToDispatch,
      showCitySelector: showCitySelectorDispatch,
    };
  }, [exchangeFromToDispatch, showCitySelectorDispatch]);

  /* 城市选择浮层回调缓存 */
  const citySelectorCbs = useMemo(() => {
    return {
      fetchCityData: cityDataDispatch,
      hideCitySelector: hideCitySelectorDispatch,
      onSelect: setSelectedCityDispatch,
    };
  }, [cityDataDispatch, hideCitySelectorDispatch, setSelectedCityDispatch]);

  /* 到达日期选择回调缓存  */
  const departDateCbs = useMemo(() => {
    return {
      onClick: showDateSelectorDispatch,
    };
  }, [showDateSelectorDispatch]);

  /* 日期选择浮层回调缓存 */
  const dateSelectorCbs = useMemo(() => {
    return {
      onBack: hideDateSelectorDispatch,
      onSelect: setDepartDateDispatch,
    };
  }, [hideDateSelectorDispatch, setDepartDateDispatch]);

  /* 只选高铁回调缓存 */
  const highSpeedCbs = useMemo(() => {
    return {
      toggle: toggleHighSpeedDispatch,
    };
  }, [toggleHighSpeedDispatch]);

  return (
      <div>
          <div className="header-wrapper">
              <Header title="火车票" onBack={onBack} />
          </div>
          <form className="form" action="./query.html">
              <Journey from={from} to={to} {...journeyCbs} />
              <DepartDate date={departDate} {...departDateCbs} />
              <HighSpeed highSpeed={highSpeed} {...highSpeedCbs} />
              <Submit />
          </form>
          <CitySelector
        show={isCitySelectorVisible}
        loading={isLoadingCityData}
        cityData={cityDataJS}
        {...citySelectorCbs}
      />
          <DateSelector show={isDateSelectorVisible} {...dateSelectorCbs} />
      </div>
  );
}

// 映射state到props
const mapStateToProps = (state) => ({
  from: state.getIn(["index", "from"]),
  to: state.getIn(["index", "to"]),
  isCitySelectorVisible: state.getIn(["index", "isCitySelectorVisible"]),
  currentSelectingLeftCity: state.getIn(["index", "currentSelectingLeftCity"]),
  cityData: state.getIn(["index", "cityData"]),
  isLoadingCityData: state.getIn(["index", "isLoadingCityData"]),
  isDateSelectorVisible: state.getIn(["index", "isDateSelectorVisible"]),
  departDate: state.getIn(["index", "departDate"]),
  highSpeed: state.getIn(["index", "highSpeed"]),
});

// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
  return {
    exchangeFromToDispatch() {
      dispatch(exchangeFromTo());
    },
    showCitySelectorDispatch(status) {
      dispatch(showCitySelector(status));
    },
    hideCitySelectorDispatch(status) {
      dispatch(hideCitySelector(status));
    },
    cityDataDispatch() {
      dispatch(cityData());
    },
    setSelectedCityDispatch(city) {
      dispatch(setSelectedCity(city));
      dispatch(hideCitySelector(false));
    },
    showDateSelectorDispatch(status) {
      dispatch(showDateSelector(status));
    },
    hideDateSelectorDispatch(status) {
      dispatch(hideDateSelector(status));
    },
    setDepartDateDispatch(timeStamp) {
      if (!timeStamp || timeStamp < h0()) return;
      dispatch(setDepartDate(timeStamp));
      dispatch(hideDateSelector(false));
    },
    toggleHighSpeedDispatch(status) {
      dispatch(toggleHighSpeed(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
