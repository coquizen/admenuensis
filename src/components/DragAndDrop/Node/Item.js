import React, { forwardRef, memo, useEffect, useState } from "react";
import classnames from "classnames";
import styles from "./Item.module.scss";
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";
import { useData } from 'context/DataProvider'
import * as api from 'services/data'

export const Item = memo(forwardRef(({
    dataID,
    listeners,
    attributes,
    ...props
}, ref) => {
    const { sections, items } = useData()
    const data = sections.find((section) => section.id === dataID) || items.find((item) => item.id === dataID)

    return (
        <div
            {...props}
            ref={ref}
            >


            {data.price !== undefined ?
             <MiniItemForm uuid={dataID} listeners={listeners} attributes={attributes} />
            : <MiniSectionForm uuid={dataID} listeners={listeners} attributes={attributes} />}
        </div>
    )
}))

export default Item