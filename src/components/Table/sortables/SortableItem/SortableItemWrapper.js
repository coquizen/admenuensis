import React from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import Item from "../Item";

const SortableItemWrapper = ({ id, dataID, children, ...props }) => {

    const { setDraggableNodeRef, setDroppableNodeRef, transition, listeners, attributes, isDragging, transform } = useSortable({
        id
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
