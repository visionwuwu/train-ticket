import React, { memo } from 'react'
import PropTypes from "prop-types"
import ListItem from "./ListItem"
import "./index.scss"

function List(props) {
  const { 
    trainList
   } = props
  return (
      <ul className="list">
          {
       trainList.map(item => (
           <ListItem 
          key={item.trainNumber}
          {...item}
         />
       ))
     }
      </ul>
  )
}

List.propTypes = {
  trainList: PropTypes.array.isRequired
}

export default memo(List);
