import React, { forwardRef } from "react";
import styles from "./Item.module.scss";
import { useData } from 'context/DataProvider'
import { MiniItemForm, MiniSectionForm } from "components/Table/components";
import classnames from "classnames";


const Item = forwardRef(({
    setDroppableRef,
    children,
    dataID,
    menuData,
    listeners,
    dragOverlay,
    attributes,
    style,
    ghost,
    ...props
}, ref) => {
    const { fetchSection, fetchItem } = useData()

    let data

    if (dataID !== "draft") {
        data = fetchSection(dataID) || fetchItem(dataID)
    } else {
        data = {
            id: "draft",
            title: "",
            description: "",
            section_id: menuData?.id,
            type: "Category",
            active: true,
            visible: true,
            list_order: menuData?.subsections.length,
            subsections: [],
            items: []
        }
    }

    if (dragOverlay) {
        if (dataID === "draft") return
        return (
            <li className={classnames(styles.Wrapper, dragOverlay && styles.DragOverlay)}
                style={{ marginLeft: 0 }} {...props}>
                <div className={styles.Item} style={style}>
                    {data.type === 'Category' && <MiniSectionForm uuid={dataID} {...props} />}
                    {data.type === 'Plate' && <MiniItemForm uuid={dataID} {...props} />}
                </div>
            </li>
        )
    }

    if (dataID === "draft") {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef}
                style={{ marginLeft: 0 }} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                    {children}
                </div>
            </li>
        )
    }
    if (fetchSection(dataID)) {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef}
                style={{ marginLeft: 0 }} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <div className={"styles.InLine"}>
                        <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                    </div>
                    {children}
                </div>
            </li>
        )
    } else if (fetchItem(dataID)) {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.Ghost)} ref={setDroppableRef}
                style={{ marginLeft: 0 }} {...props}>
                <div className={styles.Item} ref={ref} style={style}>
                    <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} {...props} />
                </div>
            </li>
        )
    } else if (dataID === "draft") {
        return (
            <li className={classnames(styles.Wrapper, ghost && styles.DeadGhost)} ref={setDroppableRef} {...props}>
                <div className={styles.Item} style={style}>
                    <MiniItemForm uuid={dataID} {...props} />
                </div>
            </li>
        )
    }
    return null
})

export default Item