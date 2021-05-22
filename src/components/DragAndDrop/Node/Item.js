import React, { forwardRef, memo, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Item.module.scss";
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";



// export const Item = memo(forwardRef(({
//     dataID,
//     listeners,
//     attributes,
//     menuData,
//     fadeIn,
//     fadeOut,
//     sorting,
//     dragOverlay,
//     dragging,
//     style,
//     transition,
//     transform,
//     formType = null,
//     ...props
// }, ref) => {
//
//     if (formType === null) {
//         if (dataID in menuData) {
//             formType = 'section'
//         } else {
//             formType = 'item'
//         }
//     }
//     console.info('formType: ', formType)
//     console.log(dataID)
//     return (
//         <li
//             className={classnames(styles.Wrapper, fadeIn && styles.FadeIn, sorting && styles.Sorting)}
//             style={{
//                 transition,
//                 '--translate-x': transform ? `${Math.round(transform.x)}px` : undefined,
//                 '--translate-y': transform ? `${Math.round(transform.y)}px` : undefined,
//                 '--scale-x': transform?.scaleX ? `${transform.scaleX}` : undefined,
//                 '--scale-y': transform?.scaleY ? `${transform.scaleY}` : undefined
//             }}
//             ref={ref}
//         >
//             <div className={classnames(styles.Item, dragging && styles.Dragging, dragOverlay && styles.DragOverlay)} style={style} {...props} tabIndex={0}>
//                 {formType === 'item' ?
//                     <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
//                     : <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} />}
//             </div>
//         </li>
//     )
// }))

const Item = ({dataID, menuData, formType = null, listeners, attributes, ...props }) => {

        if (formType === null) {
        if (dataID in menuData) {
            formType = 'section'
        } else {
            formType = 'item'
        }
    }

    return (
        <div className={styles.Item}>
            {formType === 'section' ? <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props}/>
                                    : <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
            }
        </div>
    )
}
export default Item