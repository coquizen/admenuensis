import React from "react"
import Clock from "react-live-clock"

const Header = () => {
  return (
    <div className="page__header">
      <div id="clock" className="fs-3">
        <Clock format={"HH:mm:ss"} ticking={true} timezone={"US/Eastern"} />
      </div>
    </div>
  )
}

export default Header
