import React from 'react'
import { connect } from "react-redux"
import "./App.scss"
import Nav from "../components/Nav"
import {
  List,
  Bottom
} from "./components"

function App() {
  return (
    <div>
      <Nav />
      <List />
      <Bottom />
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
