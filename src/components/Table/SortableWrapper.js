import React, { useState, useLayoutEffect, forwardRef, memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import Menu from './Menus'
import classnames from "classnames";
import styles from "./SortableWrapper.module.scss";

const SortableWrapper = ({
    id, index, getIndex, style, children, ...props
}) => {
    const { setNodeRef, isDragging, isSorting, over, overIndex, transform, transition } = useSortable({ id })

    const mounted = useMountStatus()
    const mountedWhileDragging = isDragging && !mounted
    const unmounting = !isDragging && !mounted

    return (
        <Wrapper dataID={id} ref={setNodeRef} dragging={isDragging} style={style({ isDragging, isSorting, overIndex: over ? getIndex(over.id) : overIndex })} sorting={isSorting} index={index} fadeIn={mountedWhileDragging} fadeOut={unmounting} transition={transition} transform={transform}>{children}</Wrapper>
    )
}

export default SortableWrapper

const useMountStatus = () => {
    const [ isMounted, setIsMounted ] = useState(false)

    useLayoutEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 500)
        return () => clearTimeout()
    }, [])

    return isMounted
}

const Wrapper = memo(forwardRef(({ dragOverlay, dragging, disabled, fadeIn, fadeOut, listeners, attributes, style, transition, transform, sorting, index, children, ...props }, ref) => {
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
        <li
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
            {children}
        </li>
    )
}))
