import React, {useLayoutEffect, useState} from 'react'
import {CSS} from '@dnd-kit/utilities'
import {useSortable} from '@dnd-kit/sortable'
import Item from "./Node/Item";

const SortableItemWrapper = ({id, dataID, formType, children, ...props }) => {

    const { setNodeRef, transform, transition, listeners, attributes,
    } = useSortable({
                                  id: dataID
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }

    return (
        <Item formType={formType}
              dataID={dataID}
              ref={setNodeRef}
              style={style}
              listeners={listeners}
              attributes={attributes}
              {...props}
        >
            {children}
        </Item>
    )
}

export default SortableItemWrapper
