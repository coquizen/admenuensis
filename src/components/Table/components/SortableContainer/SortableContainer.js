import React, { forwardRef } from "react"
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/components/SortableItem/SortableItemWrapper'
import styles from "components/Table/components/SortableContainer/SortableContainer.module.scss"
import classNames from "classnames";


const Container = forwardRef(({ children, isSubSection, getStyle }, ref) => {
    return (
        <ul style={ getStyle } className={ classNames(styles.Container, isSubSection && styles.SubSection) } ref={ ref }>
            { children }
        </ul>
    )
})

const defaultContainer = ({ isOverContainer }) => ({
    marginTop: 40,
    backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

// const ConditionalContainer = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;

const SortableContainer = ({ items, itemIDs, isSubSection, menuData, nodeType, id }) => {
    const { setNodeRef, setDroppableNodeRef, over, isOver } = useSortable({ id })

    const isOverContainer = isOver || (over ? items.includes(over.id) : false)

    return (
        <>
            { nodeType === "section" ?
                <>
                    { items.map((subsection) => (
                        <Container
                            key={ subsection.id }
                            getStyle={ defaultContainer({ isOverContainer }) }
                            isSubSection={ isSubSection }
                            isOver={ isOver }
                            over={ over }>
                            <SortableItemWrapper
                                dataID={ subsection.id }
                                key={ subsection.id }
                                id={ subsection.id }
                                menuData={ menuData }
                            >
                                { subsection?.items ?
                                    <SortableContext id={ subsection.id } items={ itemIDs } strategy={ verticalListSortingStrategy } >
                                        <SortableContainer items={ subsection.items } id={ subsection.id } isSubSection={ false } />
                                    </SortableContext>
                                    : <SortableContext id={ subsection.id } items={ [ "draft" ] } strategy={ verticalListSortingStrategy }>
                                        <SortableContainer items={ [ { "id": "draft" } ] } id={ subsection.id } dropRef={ setDroppableNodeRef } />
                                    </SortableContext>
                                }
                            </SortableItemWrapper>
                        </Container>
                    )) }
                </>
                :
                <>{ items[ 0 ]?.id !== "draft" ? items.map((item) =>
                    <Container key={ item.id } ref={ setNodeRef } isSubSection={ isSubSection } isOver={ isOver } over={ over }>
                        <SortableItemWrapper dataID={ item.id }
                            key={ item.id }
                            id={ item.id }
                            menuData={ menuData }
                        />
                    </Container>
                ) : items.map((item) =>
                    <Container key={ item.id } ref={ setDroppableNodeRef } isOver={ isOver } over={ over }>
                        <SortableItemWrapper
                            dataID={ item.id }
                            key={ item.id }
                            id={ item.id }
                            menuData={ menuData }
                        />
                    </Container>
                ) }
                </>

            }
        </>
    )
}

export default SortableContainer