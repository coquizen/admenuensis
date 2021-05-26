import React, { forwardRef } from "react"
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/sortables/SortableItem/SortableItemWrapper'
import styles from "components/Table/sortables/SortableContainer/SortableContainer.module.scss"
import MiniItemForm from "components/Table/sortables/MiniItemForm/MiniItemForm";
import MiniSectionForm from "components/Table/sortables/MiniSectionForm";


const Container = forwardRef(({children}, ref) => {
    return (
        <div className={styles.Container} ref={ref}>{children}</div>
    )
})

const SortableContainer = ({items, id, menuData, isSubSection = false}) => {
    const itemIDs = items.map((item) => item.id)

    const {isOver, setNodeRef} = useDroppable({id})

    if (isOver) {
        console.log("is over", id)
    }

    return (
        <>
            {isSubSection
             ? <Container ref={setNodeRef}>
                 <SortableItemWrapper
                     dataID={id}
                     id={id}
                     menuData={menuData}
                     formType={'item'}>
                        <MiniSectionForm uuid={id} />
                         <SortableContext items={itemIDs} strategy={verticalListSortingStrategy}>
                             <div className={styles.Items}>
                                 {items.map((item) =>
                                                <SortableItemWrapper dataID={item.id}
                                                                           key={item.id}
                                                                           id={item.id}
                                                                           formType={'item'}>
                                     <MiniItemForm uuid={item.id} />
                                 </SortableItemWrapper>
                                 )}
                             </div>
                         </SortableContext>
                     </SortableItemWrapper>
                 </Container>
             : <Container ref={setNodeRef}>
                 <SortableContext items={itemIDs} strategy={verticalListSortingStrategy}>
                         {items.map((item) => {
                             return <SortableItemWrapper dataID={item.id}
                                                         key={item.id}
                                                         id={item.id}
                                                         menuData={menuData}
                                                         formType={'item'}>
                                 <MiniItemForm uuid={item.id} />
                             </SortableItemWrapper>
                         })}
                     </SortableContext>
                 </Container>
                }
        </>
    )
}

export default SortableContainer