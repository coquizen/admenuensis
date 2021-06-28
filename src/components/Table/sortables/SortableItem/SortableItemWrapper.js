import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import { useData } from  'context/DataProvider'
import Item from "../Item";

const SortableItemWrapper = ({ id, dataID, children, ...props }) => {
    const { getSectionDataByID, getItemDataByID} = useData()
    const data = getSectionDataByID(dataID) || getItemDataByID(dataID)
    let type
    switch (data.type) {
        case 'Category':
            type = 'section'
            break;
        case 'Plate':
            type = 'item'
            break
        default:
            type = undefined
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

    return (
        <Item dataID={dataID} style={style}
              ref={setDraggableNodeRef}
              setDroppableRef={setDroppableNodeRef}
              listeners={listeners}
              attributes={attributes}
              ghost={isDragging}
              {...props}
        >{children}</Item>
    )
}

export default SortableItemWrapper
