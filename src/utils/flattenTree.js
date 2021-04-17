/** @format */

export default (tree) => {
	let flattenedTree = []
	flattenedTree.push({ ...tree, depth: 0, index: -1 })
	tree.subsections &&
		tree.subsections
			.sort((a, b) => a.list_order < b.list_order)
			.forEach((subsection, index) => {
				flattenedTree.push({ ...subsection, depth: 1, index })

				subsection.items &&
					subsection.items
						.sort((a, b) => a.list_order < b.list_order)
						.forEach((item, index) => {
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
				flattenedTree.push({ ...item, depth: 1, type: 'section', index })
			})
	return flattenedTree
}
