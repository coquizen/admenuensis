import React, {forwardRef} from "react";
import styles from "./Item.module.scss";
import { useData } from 'context/DataProvider'
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";
import classnames from "classnames";


const Item = forwardRef(({ setDroppableRef, children, dataID, menuData, listeners, dragOverlay, attributes, style, ghost, ...props },ref) => {
    const {getSectionDataByID, getItemDataByID} = useData()
    let data = getSectionDataByID(dataID) || getItemDataByID(dataID)

    const hasChildren = data.items?.length > 0


    if (dragOverlay) {
        return (
            <li className={classnames(styles.Wrapper, dragOverlay && styles.DragOverlay)} style={{marginLeft: 0}} {...props}>
                <div className={styles.Item} style={style}>
                    {data.type === 'Category' && <MiniSectionForm uuid={dataID} {...props} />}
                    {data.type === 'Plate' && <MiniItemForm uuid={dataID} {...props} />}
                </div>
            </li>
        )
    }
    if (getSectionDataByID(dataID)) {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                    {children}
                </div>
            </li>
        )
    } else if (getItemDataByID(dataID)) {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                </div>
        </li>
        )
    }
    return null
})

export default Item