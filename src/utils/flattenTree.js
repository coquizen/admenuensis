/** @format */

export default (tree) => {
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
						.forEach((item, index) => {
							items.push(item)
						})
				newTree[subsection.id]= items
			})
	if (tree.items.length > 0) {
		let items = []
		tree.items
			.sort((a, b) => a.list_order > b.list_order)
			.forEach((item, index) => {
				if (item.type !== 'Plate') return
				items.push(item)
			})
		newTree[tree.id] = items
	}
	return newTree
}
