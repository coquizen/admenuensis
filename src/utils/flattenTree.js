/** @format */

const flattenTree = (tree) => {
	let newTree = {}
	let sectionsArray = []
	if (tree.subsections) {
		sectionsArray = tree.subsections.filter((section) => section.type === 'Category').sort((a, b) => a.list_order - b.list_order)
		var rootObj = {...tree, subsections: sectionsArray}
		tree.subsections
			.forEach((subsection, index) => {
				if (subsection.type !== 'Category') return
				let items = []
				subsection.items &&
				subsection.items
					.sort((a, b) => a.list_order - b.list_order)
					.forEach((item) => {
						items.push(item)
					})
				newTree[ subsection.id ] = items
			})
	}
		if (tree.items?.length > 0) {
			let items = []
			tree.items
				.sort((a, b) => a.list_order - b.list_order)
				.forEach((item, index) => {
					if (item.type !== 'Plate') return
					items.push(item.id)
				})
			newTree[ tree.id ] = items
		}
	return {newTree, sectionsArray}
}

const orderTree = (tree) => {
	let subSections = []
	if (tree.subsections) {
		subSections = tree.subsections?.filter((section) => section.type === 'Category').sort((a, b) => a.list_order - b.list_order)
		tree.subsections = subSections
	}
	let itemsArray = []
	if (tree.items) {
		itemsArray = tree.items?.filter((item) => item.type === 'Plate').sort((a, b) => a.list_order - b.list_order)
		tree.items = itemsArray
	}
	return tree
}
export {flattenTree, orderTree}
