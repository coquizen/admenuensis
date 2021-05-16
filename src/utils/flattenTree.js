/** @format */

const flattenTree = (tree) => {
	let newTree = {}
	tree.subsections &&
		tree.subsections
			.sort((a, b) => a.list_order < b.list_order)
			.forEach((subsection, index) => {
				if (subsection.type !== 'Category') return
				let items = []
				subsection.items &&
				subsection.items
					.sort((a, b) => a.list_order < b.list_order)
					.forEach((item) => {
						items.push(item.id)
					})
				newTree[subsection.id] = items
			})
	if (tree.items.length > 0) {
		let items = []
		tree.items
			.sort((a, b) => a.list_order > b.list_order)
			.forEach((item, index) => {
				if (item.type !== 'Plate') return
				items.push(item.id)
			})
		newTree[tree.id] = items
	}
	return newTree
}

export default flattenTree
