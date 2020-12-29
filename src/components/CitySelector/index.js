import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import PropTypes from "prop-types"
import classNames from "classnames"
import CitySearch from "./CitySearch"
import CityList from "./CityList"
import CitySuggest from "./CitySuggest"
import "./index.scss"

function CitySelector(props) {
  const {
    show,
    loading,
    cityData,
    fetchCityData,
    hideCitySelector,
    onSelect
  } = props;

  const [searchKey, setSearchKey] = useState("")
  const key = useMemo(() => searchKey.trim(), [searchKey])

  /* 获取城市列表数据 */
  useEffect(() => {
    if(!show || loading || cityData.length > 0) return;
    fetchCityData();
  }, [show, loading, cityData, fetchCityData])
  
  /* 城市搜索的返回事件回调 */
  const onBack = useCallback(() => {
    hideCitySelector(false)
  }, [hideCitySelector])

  /* 搜索城市 */
  const searchCity = useCallback((value) => {
    setSearchKey(value);
  }, [])
  
  /* 滚动到指定Alpha索引位置 */
  const toAlpha = useCallback((alpha) => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
  },[])
  
  /* 渲染城市列表 */
  const renderCityList = () => {
    if (loading) {
      return <div>loading...</div>;
    }
    if (cityData && cityData.length > 0) {
      return <CityList 
        cityList={cityData}
        onSelect={onSelect}
        toAlpha={toAlpha}
      />
    }
    return <div>error</div>
  }
  
  /* 返回jsx */
  return (
      <div className={ classNames("city-selector", { hidden: !show }) }>
          <CitySearch 
        searchKey={key}
        setSearchKey={setSearchKey}
        onBack= {onBack}
        onChange={searchCity}
      />
          {
        Boolean(key) && 
        <CitySuggest
          searchKey={key}
          onSelect={onSelect}
        />
      }
          { renderCityList() }
      </div>
  )
}

CitySelector.propTypes = {
  show: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  cityData: PropTypes.array,
  fetchCityData: PropTypes.func.isRequired
}

export default memo(CitySelector)
