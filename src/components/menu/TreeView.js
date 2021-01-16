import React from "react"
import NodeBranchHeader from "./SectionHeader"

const TreeView = () => {
  return (
    <div className="side-view">
      <div className="__header">Overview</div>
      <div className="__body">
        <div className="tree">
          <div className="branch">
            <NodeBranchHeader title="Lunch" />
            <NodeBranchHeader title="Sandwiches" />
            <NodeBranchHeader title="Soups" />
          </div>
          <div className="branch">
            <NodeBranchHeader title="Dinner" />
            <NodeBranchHeader title="Appetizer" />
            <NodeBranchHeader title="Main Course" />
            <NodeBranchHeader title="Dessert" />
          </div>
          <div className="branch">
            <NodeBranchHeader title="Breakfast" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeView
