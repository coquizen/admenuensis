import React, { forwardRef } from "react"
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableItemWrapper from 'components/Table/sortables/SortableItem/SortableItemWrapper'
import styles from "components/Table/sortables/SortableContainer/SortableContainer.module.scss"
import classNames from "classnames";


const Container = forwardRef(({ children, isSubSection, getStyle }, ref) => {
    return (
        <ul style={getStyle} className={classNames(styles.Container, isSubSection && styles.SubSection)} ref={ref}>
            {children}
        </ul>
    )
})

const defaultContainer = ({ isOverContainer }) => ({
    marginTop: 40,
    backgroundColor: isOverContainer ? 'rgb(235,235,235,1)' : 'rgba(246,246,246,1)',
})

// const ConditionalContainer = ({ condition, wrapper, children }) => condition ? wrapper(children) : children;

const SortableContainer = ({ nodes, id, menuData, isSubSection }) => {
    const itemIDs = nodes?.map((node) => node.id)
    const { setNodeRef, setDroppableNodeRef,over, isOver } = useSortable({ id })

    console.count("sortablecontainer: ")
    console.log("nodes: ", nodes)

    const isOverContainer = isOver || (over ? nodes.includes(over.id) : false)
    if (itemIDs === undefined) {
        return <Container ref={setDroppableNodeRef} isSubSection={false} getStyle={({isOverContainer})}><li style={{height: "1rem", opacity: 0}}>Placeholder</li></Container>
    }
    return (
        <>
            {isSubSection
                ?
                <>
                    {nodes.map((subsection) => (
                        <Container
                            key={subsection.id}
                            getStyle={defaultContainer({ isOverContainer })}
                            isSubSection={isSubSection}
                            isOver={isOver}
                            over={over}>
                            <SortableItemWrapper
                                dataID={subsection.id}
                                key={subsection.id}
                                id={subsection.id}
                                menuData={menuData}
                            >
                                {subsection?.items ?
                                    <SortableContext id={subsection.id} items={subsection.items.map(({ id }) => id)} strategy={verticalListSortingStrategy} >
                                        <SortableContainer isSubSection={false} nodes={subsection.items} id={subsection.id} />
                                    </SortableContext>
                                    : <SortableContext id={subsection.id} items={["blank-item"]} strategy={verticalListSortingStrategy}>
                                        <SortableContainer isSubSection={false} nodes={[{"id":"blank-item"}]} id={subsection.id} dropRef={setDroppableNodeRef} />
                                        </SortableContext>
                                }
                            </SortableItemWrapper>
                        </Container>
                    ))}
                </>
                :
                <>{nodes[0]?.id !== "blank-item" && nodes.map((item) =>
                            <Container ref={setNodeRef} isSubSection={isSubSection} isOver={isOver} over={over}>
                        <SortableItemWrapper dataID={item.id}
                            key={item.id}
                            id={item.id}
                            menuData={menuData}
                        /></Container>
                    )}
                    {nodes[0]?.id === "blank-item" && nodes.map((item) =>
                        <Container ref={setDroppableNodeRef} isSubsection={isSubSection} isOver={isOver} over={over}>
                        <SortableItemWrapper
                            dataID={item.id}
                            key={item.id}
                            id={item.id}
                            menuData={menuData}
                        /></Container>
                    )}
                </>

            }
        </>
    )
}

export default SortableContainer