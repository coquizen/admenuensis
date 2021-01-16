import React from "react"

const MenuItem = ({ value, price }) => {
  const onChange = () => {}
  return (
    <div className="node">
      <button type="button" className="btn disabled">
        <i className="fas fa-image fw"></i>
      </button>
      <input
        className="node-input"
        type="text"
        value={value}
        onChange={onChange}
      />
      <button type="button" className="price-button">
        {price ? price : "USD"}
      </button>
      <div className="btn-group btn-group-sm ms-auto" role="group">
        <button type="button" className="btn">
          <i className="fas fa-plus fw"></i>
        </button>
        <button type="button" className="btn invisible">
          <i className="fas fa-edit fw"></i>
        </button>
        <button type="button" className="btn invisible">
          <i className="fas fa-ellipsis-h fw"></i>
        </button>
      </div>
    </div>
  )
}

export default MenuItem
