import React from 'react'
import { connect } from "react-redux"
import "./App.scss"
import Header from "../components/Header"

import { 
  Journey,
  DepartDate,
  HighSpeed,
  Submit
} from "./components"

function App() {
  return (
    <div>
      <Header />
      <Journey />
      <DepartDate />
      <HighSpeed />
      <Submit />
    </div>
  )
}

// 映射state到props
const mapStateToProps = (state) => ({
  from: state.getIn(["index", "from"]),
  to: state.getIn(["index", "to"]),
  isCitySelectorVisible: state.getIn(["index","isCitySelectorVisible" ]),
  currentSelectingLeftCity: state.getIn(["index","currentSelectingLeftCity" ]),
  cityData: state.getIn(["index","cityData" ]),
  isLoadingCityData: state.getIn(["index","isLoadingCityData" ]),
  isDateSelectorVisible: state.getIn(["index","isDateSelectorVisible" ]),
  departDate: state.getIn(["index","departDate" ]),
  highSpeed: state.getIn(["index","highSpeed" ]),
})

// 映射dispatch到props
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
