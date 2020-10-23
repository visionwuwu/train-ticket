import React, { memo, useMemo, useState, useRef, useEffect } from 'react'
import PropTypes from "prop-types"
import useWinSize from "../../../hooks/useWinSize"
import "./index.scss"

function Slider(props) {
  const {
    title,
    currentStartHours,
    currentEndHours,
    onStartChanged,
    onEndChanged
  } = props;
  
  const [start, setStart] = useState(() => currentStartHours / 24 * 100)
  const [end, setEnd] = useState(() => currentEndHours / 24 * 100)

  const prevCurrentStartHours = useRef(currentStartHours)
  const prevCurrentEndHours = useRef(currentEndHours)

  if (prevCurrentStartHours.current !== currentStartHours) {
    setStart(currentStartHours / 24 * 100)
    prevCurrentStartHours.current = currentStartHours
  }

  if (prevCurrentEndHours.current !== currentEndHours) {
    setEnd(currentEndHours / 24 * 100)
    prevCurrentEndHours.current = currentEndHours
  }
  
  const startHandleRef = useRef()
  const endHandleRef = useRef()
  
  const lastStartX = useRef()
  const lastEndX = useRef()

  const rangeRef = useRef()
  const rangeWidth = useRef()

  const winSize = useWinSize()

  const onStartTouchBegin = (e) => {
    const touch = e.targetTouches[0]
    lastStartX.current = touch.pageX
  }
  const onStartTouchMove = (e) => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastStartX.current
    lastStartX.current = touch.pageX

    setStart(start => start + (distance / rangeWidth.current) * 100)
  }
  const onEndTouchBegin = (e) => {
    const touch = e.targetTouches[0]
    lastEndX.current = touch.pageX
  }
  const onEndTouchMove = (e) => {
    const touch = e.targetTouches[0]
    const distance = touch.pageX - lastEndX.current
    lastEndX.current = touch.pageX

    setEnd(end => end + (distance / rangeWidth.current) * 100)
  }

  const startPercent = useMemo(() => {
    if (start > 100) {
      return 100
    }
    if (start < 0) {
      return 0
    }
    return start
  }, [start])
  const endPercent = useMemo(() => {
    if (end > 100) {
      return 100
    }
    if (end < 0) {
      return 0
    }
    return end
  }, [end])

  const startHours = useMemo(() => {
    return Math.round((startPercent * 24) / 100)
  }, [startPercent])

  const endHours = useMemo(() => {
    return Math.round((endPercent * 24) / 100)
  }, [endPercent])

  const startText = useMemo(() => {
    return startHours.toString().padStart(2, "0") + ":00"
  }, [startHours])

  const endText = useMemo(() => {
    return endHours.toString().padStart(2, "0") + ":00"
  }, [endHours])

  useEffect(() => {
    rangeWidth.current = parseFloat(
      window.getComputedStyle(rangeRef.current).width
    ) / 100 * winSize.width
  }, [winSize.width])

  useEffect(() => {
    startHandleRef.current.addEventListener("touchstart", onStartTouchBegin, false)
    startHandleRef.current.addEventListener("touchmove", onStartTouchMove, false)
    endHandleRef.current.addEventListener("touchstart", onEndTouchBegin, false)
    endHandleRef.current.addEventListener("touchmove", onEndTouchMove, false)
    return () => {
      startHandleRef.current.removeEventListener("touchstart", onStartTouchBegin, false)
      startHandleRef.current.removeEventListener("touchmove", onStartTouchMove, false)
      startHandleRef.current.removeEventListener("touchstart", onEndTouchBegin, false)
      startHandleRef.current.removeEventListener("touchmove", onEndTouchMove, false)
    }
  }, [])

  useEffect(() => {
    onStartChanged(startHours)
  }, [startHours])

  useEffect(() => {
    onEndChanged(endHours)
  }, [endHours])

  return (
    <div className="option">
      <h3>{title}</h3>
      <div className="range-slider">
        <div className="slider" ref={rangeRef}>
          <div 
            className="slider-range"
            style={{
              left: startPercent + "%",
              width: endPercent - startPercent + "%"
            }}
          ></div>
          <i 
            ref={startHandleRef}
            className="slider-handle"
            style={{
              left: startPercent + "%"
            }}
          >
            <span>{startText}</span>
          </i>
          <i 
            ref={endHandleRef}
            className="slider-handle"
            style={{
              left: endPercent + "%"
            }}
          >
            <span>{endText}</span>
          </i>
        </div>
      </div>
    </div>
  )
}

Slider.propTypes = {
  title: PropTypes.string.isRequired,
  currentStartHours: PropTypes.number.isRequired,
  currentEndHours: PropTypes.number.isRequired,
  onStartChanged: PropTypes.func.isRequired,
  onEndChanged: PropTypes.func.isRequired,
}

export default memo(Slider)
