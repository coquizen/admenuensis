import React from "react"

const NodeBranchHeader = ({ title }) => {
  const onChange = e => {
    console.log(e.target.value)
  }
  return (
    <div className="node-header">
      <button className="btn">
        <i className="fas fa-grip-vertical fw"></i>
      </button>
      <input
        type="text"
        className="node-input"
        value={title ? title : ""}
        onChange={onChange}
      />
    </div>
  )
}

export default NodeBranchHeader
