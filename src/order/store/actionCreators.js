import * as actionTypes from "./constants"
import { fromJS } from "immutable"

export const setDepartDate = (departDate) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_DATE,
    payload: fromJS(departDate)
  }
}
export const setArriverDate = (arriverDate) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_DATE,
    payload: fromJS(arriverDate)
  }
}
export const setDepartStation = (departStation) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_STATION,
    payload: fromJS(departStation)
  }
}
export const setArriverStation = (arriverStation) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_STATION,
    payload: fromJS(arriverStation)
  }
}
export const setTrainNumber = (trainNumber) => {
  return {
    type: actionTypes.ACTION_SET_TRAIN_NUMBER,
    payload: fromJS(trainNumber)
  }
}
export const setSeatType = (seatType) => {
  return {
    type: actionTypes.ACTION_SET_SEAT_TYPE,
    payload: fromJS(seatType)
  }
}
export const setDepartTimeStr = (departTimeStr) => {
  return {
    type: actionTypes.ACTION_SET_DEPART_TIME_STR,
    payload: fromJS(departTimeStr)
  }
}
export const setArriverTimeStr = (arriverTimeStr) => {
  return {
    type: actionTypes.ACTION_SET_ARRIVER_TIME_STR,
    payload: fromJS(arriverTimeStr)
  }
}
export const setDurationStr = (durationStr) => {
  return {
    type: actionTypes.ACTION_SET_DURATION_STR,
    payload: fromJS(durationStr)
  }
}
export const setPrice = (price) => {
  return {
    type: actionTypes.ACTION_SET_PRICE,
    payload: fromJS(price)
  }
}
export const setPassengers = (passengers) => {
  return {
    type: actionTypes.ACTION_SET_PASSENGERS,
    payload: fromJS(passengers)
  }
}
export const setSearchParsed = (searchParsed) => {
  return {
    type: actionTypes.ACTION_SET_SEARCH_PARSED,
    payload: fromJS(searchParsed)
  }
}
export const setMenu = (menu) => {
  return {
    type: actionTypes.ACTION_SET_MENU,
    payload: fromJS(menu)
  }
}
export const setIsMenuVisible = (isMenuVisible) => {
  return {
    type: actionTypes.ACTION_SET_IS_MENU_VISIBLE,
    payload: fromJS(isMenuVisible)
  }
}
export const showMenu = (menu) => {
  return (dispatch) => {
    dispatch(setIsMenuVisible(true))
    dispatch(setMenu(menu))
  }
}
export const hideMenu = () => {
  return setIsMenuVisible(false)
}
let passgenerId = 0;
export const addAdult = () => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order
    
    for (let passenger of passengers) {
      let keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) return;
      }
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passgenerId,
        name: "",
        licenceNo: "",
        ticketType: "adult",
        seatType: "Z"
      }
    ]))
  }
}
export const addChild = () => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order
    let adultPassenger = null;
    for (let passenger of passengers) {
      let keys = Object.keys(passenger)
      for (let key of keys) {
        if (!passenger[key]) return;
      }
      if (passenger.ticketType === "adult") {
        adultPassenger = passenger.id
      }
    }

    if (!adultPassenger) {
      return window.alert("添加儿童必须，先添加一个成人乘客！！！")
    }

    dispatch(setPassengers([
      ...passengers,
      {
        id: ++passgenerId,
        name: "",
        gender: "",
        birthday: "",
        followAdult: adultPassenger,
        ticketType: "child",
        seatType: "Z"
      }
    ]))
  }
}
export const removePassenger = (id) => {
  return(dispatch, getState) => {
    const { passengers } = getState().toJS().order
    dispatch(setPassengers(
      passengers.filter(passenger => {
        return passenger.id !== id && passenger.followAdult !== id
      })
    ))
  }
}
export const updatePassenger = (id, data, removeFiledArr = []) => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order
    let newPassengers = passengers.map(passenger => {
      if (passenger.id === id) {
        passenger = Object.assign({}, passenger, data)
        for (let key of removeFiledArr) {
          delete passenger[key]
        }
      }
      return passenger
    })
    dispatch(setPassengers(newPassengers))
  }
}
export const showGenderMenu = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order

    let passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) return;

    dispatch(showMenu({
      onPress(gender) {
        dispatch(updatePassenger(id, { gender }))
        dispatch(hideMenu())
      },
      options: [
        {
          title: "男",
          value: "male",
          active: passenger.gender === "male"
        },
        {
          title: "女",
          value: "female",
          active: passenger.gender === "female"
        }
      ]
    }))
  }
}
export const showFollowAdultMenu = (id, followAdult) => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order

    let passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) return;

    dispatch(showMenu({
      onPress(followAdult) {
        dispatch(updatePassenger(id, { followAdult }))
        dispatch(hideMenu())
      },
      options: passengers.filter(item => item.ticketType === "adult")
      .map(v => {
        return {
          title: v.name,
          value: v.id,
          active: v.followAdult === followAdult
        }
      })
    }))
  }
}
export const showTicketTypeMenu = (id) => {
  return (dispatch, getState) => {
    const { passengers } = getState().toJS().order

    let passenger = passengers.find(passenger => passenger.id === id)

    if (!passenger) return;

    dispatch(showMenu({
      onPress(ticketType) {
        if (ticketType === "adult") {
          dispatch(updatePassenger(id, { ticketType, licenceNo: "" }, [
            "gender", "birthday", "followAdult"
          ]))
        } else {
          let adultPassenger = passengers.find(passenger => passenger.id !== id && passenger.ticketType === "adult")
          if (!adultPassenger) {
            window.alert("必须存在一个成人乘客！！！")
            dispatch(hideMenu())
            return;
          }
          dispatch(updatePassenger(id, { 
            ticketType, 
            gender: "",
            birthday: "",
            followAdult: adultPassenger.id
          }, [ "licenceNo"]))
        }
        dispatch(hideMenu())
      },
      options: [
        {
          title: "成人票",
          value: "adult",
          active: passenger.ticketType === "adult"
        },
        {
          title: "儿童票",
          value: "child",
          active: passenger.ticketType === "child"
        }
      ]
    }))
  }
}