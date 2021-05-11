import React, { forwardRef, memo, useLayoutEffect } from "react";
import classnames from "classnames";
import styles from "./Item.module.scss";
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";

export const Item = memo(forwardRef(({
    dataID,
    dragOverlay,
    dragging,
    disabled,
    fadeIn,
    fadeOut,
    listeners,
    attributes,
    style,
    transition,
    transform,
    sorting,
    index,
    children,
    type,
    ...props
}, ref) => {

    useLayoutEffect(() => {
        if (!dragOverlay) {
            return
        }

        document.body.style.cursor = 'grabbing'

        return () => {
            document.body.style.cursor = ''
        }
    }, [ dragOverlay ])

    return (
        <div
            className={classnames(styles.Wrapper, fadeIn && styles.fadeIn, dragOverlay && styles.dragOverlay)}
            style={{
                transition,
                '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
                '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
                '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
                '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined,
                '--index': index
            }}
            ref={ref}
            data-cypress='draggable-item'>
            {type === 'Plate' ?
             <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
            : <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} />}
        </div>
    )
}))

export default Item