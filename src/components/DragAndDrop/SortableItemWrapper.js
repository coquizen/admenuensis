import React, {useLayoutEffect, useState} from 'react'
import {useSortable} from '@dnd-kit/sortable'
import Item from "./Node/Item";

const SortableItemWrapper = ({
    dataID, index, getIndex, style, children, type, ...props
}) => {
    const { setNodeRef, isDragging, isSorting, over, overIndex, transform, transition, wrapperStyle, listeners, attributes } = useSortable({ id: dataID })

    const mounted = useMountStatus()
    const mountedWhileDragging = isDragging && !mounted
    const unmounting = !isDragging && !mounted

    return (
        <Item type={type}
              dataID={dataID}
              ref={setNodeRef}
              listeners={listeners}
              attributes={attributes}
              dragging={isDragging}
              style={style({ isDragging, isSorting, overIndex: over ? getIndex(over.id) : overIndex })}
              sorting={isSorting}
              index={index}
              fadeIn={mountedWhileDragging}
              fadeOut={unmounting}
              transition={transition}
              wrapperStyle={wrapperStyle}
              transform={transform}
        >
            {children}
        </Item>
    )
}

export default SortableItemWrapper

const useMountStatus = () => {
    const [ isMounted, setIsMounted ] = useState(false)

    useLayoutEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500)
        return () => clearTimeout()
    }, [])

    return isMounted
}

