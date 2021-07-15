import {rectSwappingStrategy, SortableContext} from "@dnd-kit/sortable";
import SortableContainer from "../SortableContainer";
import React from "react";

export const SortableList = ({menuData}) => {
    if (menuData.subsections?.length > 0) {
        const sectionIDs = menuData.subsections.map(({id}) => id)
        return (
            <SortableContext id='root' items={sectionIDs} strategy={rectSwappingStrategy}>
                <SortableContainer menuData={menuData} id={menuData.id} itemsID={sectionIDs}
                                   items={menuData.subsections} isSubSection={true}/>
            </SortableContext>
        )
    } else if (menuData.items?.length > 0) {
        let filteredItems = menuData.items.filter((item) => item.type === "Plate")

        filteredItems.sort((a, b) => a.list_order - b.list_order)

        const filteredItemIDs = filteredItems.map(({id}) => id)

        if (filteredItems.length > 0) {
            return (
                <SortableContext id='root' items={filteredItemIDs} strategy={rectSwappingStrategy}>
                    <SortableContainer menuData={menuData} id={menuData.id} items={menuData.items}
                                       isSubSection={false}/>
                </SortableContext>
            )
        }
    }
    return null
}