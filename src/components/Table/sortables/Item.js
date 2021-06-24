import React, {forwardRef} from "react";
import styles from "./Item.module.scss";
import { useData } from 'context/DataProvider'
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";
import classNames from "classnames";

const Item = forwardRef(({ setDroppableRef, children, dataID, menuData, listeners, dragOverlay, attributes, style, ghost, ...props },ref) => {
    const {getSectionDataByID, getItemDataByID} = useData()
    let data = getSectionDataByID(dataID) || getItemDataByID(dataID)
    let hasChildren

    hasChildren = data.subsections?.length > 0 || data.items?.length > 0


    if (dragOverlay) {
       if (data.type === 'Category') {
           return (
           <li className={classNames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
               <div className={styles.Item} ref={ref} style={style}>
                   <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                    {children}
               </div>
           </li>
           )
       } else if (data.type === 'Plate') {
           return (
           <li className={classNames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
               <div className={styles.Item} ref={ref} style={style}>
                 <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
               </div>
           </li>
           )}
    }

    if (getSectionDataByID(dataID)) {
        return (
            <li className={classNames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                    {children}
                </div>
            </li>
        )
    } else if (getItemDataByID(dataID)) {
        return (
            <li className={classNames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef} style={{marginLeft: 0}} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                </div>
        </li>
        )
    }
    return null
})

export default Item