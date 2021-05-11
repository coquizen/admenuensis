import React, { forwardRef, memo, useLayoutEffect } from "react";
import classnames from "classnames";
import styles from "./Item.module.scss";
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";
import { useData } from "context/DataProvider"

export const Item = memo(forwardRef(({
    dataID,
    dragOverlay,
    dragging,
    disabled,
    fadeIn,
    fadeOut,
    height,
    listeners,
    attributes,
    style,
    transition,
    transform,
    sorting,
    index,
    wrapperStyle,
    ...props
}, ref) => {

    const { getTypeByID, getItemDataByID, getSectionDataByID } = useData()
    const type = getTypeByID(dataID)
    const data = type === 'item' ? getItemDataByID(dataID) : getSectionDataByID(dataID)
    useLayoutEffect(() => {
        if (!dragOverlay) {
            return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
            document.body.style.cursor = ''
        }
    }, [ dragOverlay ])

    console.info('sortable : ', data)
    return (
        <div
            className={classnames(styles.Wrapper,
                                  fadeIn && styles.FadeIn,
                                  sorting && styles.Sorting,
                                  dragOverlay && styles.DragOverlay)}
            style={{
                ...wrapperStyle,
                transition,
                '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
                '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
                '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
                '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
                '--index': index
            }}
            ref={ref}
            >
            <div className={classnames(
                styles.Item,
                dragging && styles.Dragging,
                dragOverlay && styles.DragOverlay,
                )}
                 style={style}
                 data-cypress='draggable-item'
                {...props}>
            {type === 'item' ?
             <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
            : <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} />}
            </div>
        </div>
    )
}))

export default Item