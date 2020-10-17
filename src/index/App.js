import React, { useCallback, useMemo } from 'react'
import { connect } from "react-redux"
import "./App.scss"
import {
  exchangeFromTo,
  showCitySelector,
  hideCitySelector,
  cityData,
  setSelectedCity,
} from "./store/actionCreators"
import Header from "../components/Header"
import CitySelector from "../components/CitySelector"
import { 
  Journey,
  DepartDate,
  HighSpeed,
  Submit
} from "./components"


function App(props) {
  const {
    from,
    to,
    isCitySelectorVisible,
    isLoadingCityData,
    cityData
  } = props;

  const {
    cityDataDispatch,
    exchangeFromToDispatch,
    showCitySelectorDispatch,
    hideCitySelectorDispatch,
    setSelectedCityDispatch,
  } = props;
  
  /* immutable对象转化为js对象 */
  const cityDataJS = cityData && cityData.toJS()

  const onBack = useCallback(() => {
    window.history.back()
  }, [])
  
  /* 使用useMemo缓存当前的dispatch函数防止父组件渲染导致子组件渲染 */
  const journeyCbs = useMemo(() => {
    return {
      exchangeFromTo: exchangeFromToDispatch,
      showCitySelector: showCitySelectorDispatch
    }
  }, [])

  const citySelectorCbs = useMemo(() => {
    return {
      fetchCityData: cityDataDispatch,
      hideCitySelector: hideCitySelectorDispatch,
      onSelect: setSelectedCityDispatch
    }
  }, [])

  return (
    <div>
      <div className="header-wrapper">
        <Header 
          title="火车票"
          onBack={ onBack }
        />
      </div>
      <form className="form">
        <Journey 
          from={ from }
          to={ to }
          {...journeyCbs}
        />
        <DepartDate
        />
        <HighSpeed />
        <Submit />
      </form>
      <CitySelector
        show={isCitySelectorVisible}
        loading={isLoadingCityData}
        cityData={cityDataJS}
        {...citySelectorCbs}
      />
    </div>
  )
}

// 映射state到props
const mapStateToProps = (state) => ({
  from: state.getIn(["index", "from"]),
  to: state.getIn(["index", "to"]),
  isCitySelectorVisible: state.getIn(["index","isCitySelectorVisible"]),
  currentSelectingLeftCity: state.getIn(["index","currentSelectingLeftCity"]),
  cityData: state.getIn(["index","cityData"]),
  isLoadingCityData: state.getIn(["index","isLoadingCityData"]),
  isDateSelectorVisible: state.getIn(["index","isDateSelectorVisible"]),
  departDate: state.getIn(["index","departDate"]),
  highSpeed: state.getIn(["index","highSpeed"]),
})

// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
  return {
    exchangeFromToDispatch() {
      dispatch(exchangeFromTo())
    },
    showCitySelectorDispatch(status) {
      dispatch(showCitySelector(status))
    },
    hideCitySelectorDispatch(status) {
      dispatch(hideCitySelector(status))
    },
    cityDataDispatch() {
      dispatch(cityData())
    },
    setSelectedCityDispatch(city){
      dispatch(setSelectedCity(city))
      dispatch(hideCitySelector(false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
