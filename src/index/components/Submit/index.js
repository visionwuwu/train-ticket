import React, { memo } from 'react'
import "./index.scss"

function Submit() {
  return (
      <div className="submit">
          <button type="submit" className="submit-button">
              {' '}
              搜索{' '}
          </button>
      </div>
  )
}

export default memo(Submit);
