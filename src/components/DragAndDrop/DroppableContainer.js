import {useDroppable} from "@dnd-kit/core";
import List from "./List";
import React from "react";
import {useData} from "../../context/DataProvider";


const DroppableContainer = ({ children, id, items, getStyle = () => ({}) }) => {
    const { over, isOver, setNodeRef } = useDroppable({ id })
    const isOverContainer = isOver || (over ? items.includes(over.id) : false)

    return (
        <List ref={setNodeRef} style={getStyle({ isOverContainer })}>{children}</List>
		)
}

export default DroppableContainer