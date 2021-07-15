import { rectSwappingStrategy, SortableContext } from "@dnd-kit/sortable";
import SortableContainer from "../SortableContainer";
import React from "react";

export const SortableList = ({ menuData }) => {
    if (!menuData) return null

    let IDs
    let nodes
    let nodeType
    if (menuData.subsections?.length > 0) {
        IDs = menuData.subsections.map(({ id }) => id)
        nodes = menuData.subsections
        nodeType = "section"
    } else if (menuData.items?.length > 0) {
        IDs = menuData.items.map(({ id }) => id)
        nodes = menuData.items
        nodeType = "items"
    }
    if (!nodes) {
        return null
    }

    return (
        <SortableContext id='root' items={ IDs } strategy={ rectSwappingStrategy }>
            <SortableContainer id={ menuData.id } menuData={ menuData } itemIDs={ IDs } items={ nodes } nodeType={ nodeType } isSubSection={ nodeType === "section" } />
        </SortableContext>
    )
}