const buildTree = (data) => {
    let treeItems = []

    if (data.subsections) {
        const subsections = data.subsections.filter((subsection) => subsection.type === 'Category')
        subsections.forEach((subsection) => {
            let children = subsection.items ? subsection.items.map((item) => trimObj(item, 'item')) : []
            treeItems.push({
                               id:    subsection.id,
                               title: subsection.title,
                isRoot: false,
                               children,
                           })
        })
    } else if (data.items) {
        let { items } = data
        items = items.filter((item) => item.type === 'Plate')
        let children = items ? data.items.map((item) => trimObj(item, 'item')) : []
        treeItems.push({
            id: data.id,
            title: data.title,
            isRoot: true,
            children
        })
    }
    return treeItems
}

const trimObj = (obj, type) => {
    return {
        id:        obj.id,
        title:     obj.title,
        type:      type,
        listOrder: obj.listOrder,
    }
}

export default buildTree

const flatten = (items, parentID = null, title = null, depth = 0) => {
    return items.reduce((acc, item, index) => {
        return [
            ...acc,
            {...item, id: parentID, depth, index},
            ...flatten(item.children, item.id, item.title, depth + 1, )
        ]
    }, [])
}

const flattenTree = (items) => {
    return flatten(items)
}