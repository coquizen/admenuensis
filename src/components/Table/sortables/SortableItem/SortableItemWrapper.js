import React, { useLayoutEffect, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { useSortable } from '@dnd-kit/sortable'
import MiniSectionForm from "components/Table/sortables/MiniSectionForm";

const SortableItemWrapper = ({ id, dataID, menuData, formType, children, ...props }) => {
    console.log('item', dataID)
    const { setNodeRef, transform, transition, listeners, attributes, isDragging, isSorting,
    } = useSortable({
        id, data: {
            type: formType,
        }
    })

    // const style = {
    //     transform: CSS.Transform.toString(transform),
    //     transition,
    //     flex: 1,
    //     position: "relative"
    // }
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const injectPropsIntoChildren = () => (
        React.Children.map(children, (child => React.cloneElement(child, {listeners: listeners, attributes: attributes, ...props}))
        ))


    return (
        <div ref={setNodeRef} style={style}>
            {formType === 'section' ? <><MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} menuData={menuData}/>{children}</> : injectPropsIntoChildren() }
        </div>
    )
}

export default SortableItemWrapper

const useMountStatus = () => {
    const [ isMounted, setIsMounted ] = useState(false)

    useLayoutEffect(() => {
        const clearTimeout = setTimeout(() => setIsMounted(true), 500)
        return () => clearTimeout()
    }, [])

    return isMounted
}
