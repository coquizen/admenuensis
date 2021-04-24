/** @format */

export default (tree) => {
	let flattenedTree = []

	if (!tree.description) {
		tree.description = "Description..."
	}
	flattenedTree.push({ ...tree, depth: 0, index: -1 })
	tree.subsections &&
		tree.subsections
			.sort((a, b) => a.list_order < b.list_order)
			.forEach((subsection, index) => {
				if (!subsection.description) {
					subsection.description = "Description..."
				}
				flattenedTree.push({ ...subsection, depth: 1, index })
				subsection.items &&
					subsection.items
						.sort((a, b) => a.list_order < b.list_order)
						.forEach((item, index) => {
							if (!item.description) {
								item.description = "Description..."
							}
							flattenedTree.push({
								...item,
								depth: 2,
								type: 'item',
								index,
							})
						})
			})
	tree.items &&
		tree.items
			.sort((a, b) => a.list_order > b.list_order)
			.forEach((item, index) => {
				if (!item.description) {
					item.description = "Description..."
				}
				flattenedTree.push({ ...item, depth: 1, type: 'section', index })
			})
	return flattenedTree
}
