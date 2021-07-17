import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useData } from 'context/DataProvider'
import Item from "../Item/Item";

const SortableItemWrapper = ({ id, dataID, children, ...props }) => {
    const { fetchSection, fetchItem } = useData()
    let data, type
    if (dataID !== "draft") {
        data = fetchSection(dataID) || fetchItem(dataID)
        switch (data?.type) {
            case 'Category':
                type = 'section'
                break;
            case 'Plate':
                type = 'item'
                break
            default:
                type = undefined
        }
    } else if (dataID === "draft") {
        type = "section"
    }

    const { setDraggableNodeRef, setDroppableNodeRef, transition, listeners, attributes, isDragging, transform } = useSortable({
        id,
        data: {
            type,
        }
    })

    const style = {
        transform: CSS.Translate.toString(transform),
        transition
    }

    return (<>
        { dataID !== "blank-item" ? <Item dataID={ dataID } style={ style }
            ref={ setDraggableNodeRef }
            setDroppableRef={ setDroppableNodeRef }
            listeners={ listeners }
            attributes={ attributes }
            ghost={ isDragging }
            { ...props }
        >{ children }</Item> : <Item dataID={ dataID } style={ style } ref={ setDroppableNodeRef } { ...props } /> }</>
    )
}

export default SortableItemWrapper
