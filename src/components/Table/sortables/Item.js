import React, { forwardRef, memo, useEffect, useState } from "react";
import styles from "./Item.module.scss";
import MiniItemForm from "./MiniItemForm";
import MiniSectionForm from "./MiniSectionForm";

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