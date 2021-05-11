import {useDroppable} from "@dnd-kit/core";
import List from "./List";
import React from "react";
import {useData} from "../../context/DataProvider";


const DroppableContainer = ({ children, id, items, getStyle = () => ({}) }) => {
    const {getSectionDataByID} = useData()
    const { over, isOver, setNodeRef } = useDroppable({ id })
    const isOverContainer = isOver || (over ? items.includes(over.id) : false)

    const sectionData = getSectionDataByID(id)
    return (
        <>
        <h5>{sectionData.title}</h5>
        <List ref={setNodeRef} style={getStyle({ isOverContainer })}>{children}</List>
        </>

    )
}

export default DroppableContainer