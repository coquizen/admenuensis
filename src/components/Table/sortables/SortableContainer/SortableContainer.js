import React, { forwardRef } from "react"
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/sortables/SortableItemWrapper'
import styles from "components/Table/sortables/SortableContainer/SortableContainer.module.scss"
import Item from 'components/Table/sortables/Item'


const Container = forwardRef(({children}, ref) => {
    return (
        <div className={styles.Container} ref={ref}>{children}</div>
    )
})

const SortableContainer = ({items, id, menuData, areRootItems = false}) => {
    const itemIDs = items.map((item) => item.id)

    const {isOver, setNodeRef} = useDroppable({id})

    if (isOver) {
        console.log("is over", id)
    }
    return (
        <>
            {areRootItems
             ? <SortableContext items={itemIDs} strategy={verticalListSortingStrategy}>
                 {items.map((item) =>
                                <SortableItemWrapper dataID={item.id} key={item.id} id={item.id} menuData={menuData}
                                                     formType={'item'}>
                                    <Item menuData={menuData} formType={'item'} dataID={item.id} id={item.id}/>
                                </SortableItemWrapper>)}
             </SortableContext>
             : <SortableItemWrapper id={id} formType={'section'} dataID={id}>
                 <Container ref={setNodeRef}>
                     <SortableContext items={itemIDs} strategy={verticalListSortingStrategy}>
                         {items.map((item) => {
                             let child = <Item menuData={menuData} formType={'item'} dataID={item.id} id={item.id}/>
                             if (item.subsections) return <SortableContainer key={item.id} id={item.id}
                                                                             items={item.subsections}
                                                                             menuData={menuData}/>
                             return (
                                 <SortableItemWrapper dataID={item.id} key={item.id} id={item.id} menuData={menuData}
                                                      formType={'item'}>{child}</SortableItemWrapper>
                             )
                         })}
                     </SortableContext>
                 </Container>
             </SortableItemWrapper>}
        </>
    )
}

export default SortableContainer