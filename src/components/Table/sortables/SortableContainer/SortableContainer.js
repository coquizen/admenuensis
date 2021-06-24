import React, {forwardRef} from "react"
import {useSortable, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/sortables/SortableItem/SortableItemWrapper'
import styles from "components/Table/sortables/SortableContainer/SortableContainer.module.scss"
import classNames from "classnames";


const Container = forwardRef(({children, isSubSection}, ref) => {
    return (
        <ul className={classNames(styles.Container, isSubSection && styles.SubSection)} ref={ref}>
            {children}
        </ul>
    )
})


const ConditionalContainer = ({condition, wrapper, children}) => condition ? wrapper(children) : children;

const SortableContainer = ({nodes, id, menuData, isSubSection}) => {
    const itemIDs = nodes?.map((node) => node.id)
    const {setNodeRef, over, isOver} = useSortable({id})

    if (itemIDs === undefined) {
        return <></>
    }

    const isOverContainer = isOver || (over ? nodes.includes(over.id) : false)

    return (
        <>
            {isSubSection
                ?
                <>
                    {nodes.map((subsection) => (
                        <ConditionalContainer condition={subsection.items.length > 0} wrapper={children => <Container ref={setNodeRef} isSubSection={isSubSection}>{children}</Container> }>
                            <SortableItemWrapper dataID={subsection.id}
                                             key={subsection.id}
                                             id={subsection.id}
                                             menuData={menuData}
                                             >
                                {subsection.items &&
                                    <SortableContext id={subsection.id} items={subsection.items.map(({id}) => id) } strategy={verticalListSortingStrategy} >
                                        <SortableContainer isSubSection={false} nodes={subsection.items} id={subsection.id} />
                                    </SortableContext>}
                            </SortableItemWrapper>
                        </ConditionalContainer>
                    ))}
                </>
                :
                <Container ref={setNodeRef} isSubSection={isSubSection}>
                        {nodes.map((item) =>
                            <SortableItemWrapper dataID={item.id}
                                                 key={item.id}
                                                 id={item.id}
                                                 menuData={menuData}
                                                 />
                        )}
                </Container>

            }
            </>
   )
}

export default SortableContainer