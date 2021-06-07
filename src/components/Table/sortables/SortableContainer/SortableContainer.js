import React, {forwardRef} from "react"
import {useDroppable} from '@dnd-kit/core'
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/sortables/SortableItem/SortableItemWrapper'
import styles from "components/Table/sortables/SortableContainer/SortableContainer.module.scss"
import MiniItemForm from "components/Table/sortables/MiniItemForm/MiniItemForm";
import MiniSectionForm from "components/Table/sortables/MiniSectionForm";


const Container = forwardRef(({children}, ref) => {
    return (
        <div className={styles.Container} ref={ref}>{children}</div>
    )
})

const SortableContainer = ({nodes, id, menuData, isSubSection}) => {


    const itemIDs = nodes?.map((node) => node.id)


    const {isOver, setNodeRef} = useDroppable({id})
    if (itemIDs === undefined) {
        return <></>
    }
    if (isOver) {
        console.log("is over", id)
    }

    return (
        <>
            {isSubSection
                ? <Container ref={setNodeRef}>
                    {nodes.map((subsection) => (
                        <SortableItemWrapper dataID={subsection.id}
                                             key={subsection.id}
                                             id={subsection.id}
                                             menuData={menuData}
                                             formType={'section'}>
                            <MiniSectionForm uuid={subsection.id}/>
                            {subsection.items &&
                            <SortableContainer isSubSection={false} nodes={subsection.items} id={subsection.id}
                                               menuData={menuData}/>}
                        </SortableItemWrapper>
                    ))}
                </Container>
                : <SortableContext id={menuData.id} items={itemIDs} strategy={verticalListSortingStrategy}>
                    <Container ref={setNodeRef}>
                        {nodes.map((item) => {
                            return <SortableItemWrapper dataID={item.id}
                                                        key={item.id}
                                                        id={item.id}
                                                        menuData={menuData}
                                                        formType={'item'}>
                                <MiniItemForm uuid={item.id}/>
                            </SortableItemWrapper>
                        })}
                    </Container>
                </SortableContext>
            }
        </>
    )
}

export default SortableContainer