/** @format */

import React, { createContext, useCallback, useContext, useEffect, useState, } from 'react'
import useReactContextDevTool from 'hooks/useReactContextDevTool'
import * as api from 'services/data'

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
	const [ sections, setAllSectionsData ] = useState(null)
	const [ menus, setMenusData ] = useState(null)
	const [ items, setAllItemsData ] = useState(null)
	const [ isDirty, setIsDirty ] = useState(false)

	useEffect(() => {
		api.fetchSections().then(({ data }) => setAllSectionsData(data))
		api.fetchMenus().then(({ data }) => {
			for (let i = 0; i < data.length; i++) {
				if (data[ i ].subsections) {
					data[ i ].subsections.sort((a, b) => a.list_order - b.list_order)
				}
				if (data[ i ].items) {
					data[ i ].items.sort((a, b) => a.list_order - b.list_order)
				}
			}
			data.sort((a, b) => a.list_order - b.list_order)
			setMenusData(data)
		})
		api.fetchItems().then(({ data }) => setAllItemsData(data))
	}, [])

	const draft_createSection = (data) => {
		if (data.type === "Meal") {
			data.isDirty = true
			data.section_id = null
			data.list_order = menus.length
			setMenusData((menus) => {
				menus.push(data)
				return menus
			})
			setAllSectionsData((sections) => {
				sections.push(data)
				return sections
			})
		}
	}

	const draft_createItem = useCallback((data, menuID) => {
		console.log("Data parameter: ", data)
		if (data.type === "Plate") {
			data = { ...data, isDirty: true, title: "Draft" }
			setAllItemsData((items) => {
				items.push(data)
				return items
			})
			// setAllSectionsData((sections) => {
			// 	let parentSection = sections.find((section) => section.id === data.section_id)
			// 	const parentIndex = sections.indexOf(parentSection)
			// 	console.log(parentIndex)
			// 	console.dir(sections[parentIndex])
			// 	parentSection.items.push(data)
			// 	sections[parentIndex] = parentSection
			// 	return sections
			// })
			setMenusData(() => {
				const menu = menus.find((menu) => menu.id === menuID)
				console.dir("Menu :: ", menu)
				const menuIndex = menus.indexOf(menu)
				let parentSection = sections.find((section) => section.id === data.section_id)
				const parentIndex = sections.indexOf(parentSection)
				menus[ menuIndex ].subsections[ parentIndex ].items.push(data)
				return menus
			})
		}
	}, [ sections, menus ])

	const createSection = useCallback((data) => {
		return api.createSection(data).then((data) => setIsDirty(true))
	}, [])

	const getSectionDataByID = useCallback((id) => {
		return sections?.find((section) => section.id === id)
	}, [ sections ])

	const getItemDataByID = useCallback((id) => {
		return items?.find((item) => item.id === id)
	}, [ items ])

	const updateSection = useCallback((data) => {
		api.updateSection(data).then(() => setIsDirty(true))
	}, [])

	const updateItem = useCallback((data) => {
		api.updateItem(data).then(() => setIsDirty(true))
	}, [])

	const deleteSection = useCallback((id) => {
		api.deleteSection(id).then(() => setIsDirty(true))
	}, [])

	const deleteItem = useCallback((id) => {
		api.deleteItem(id)
	}, [])

	const getMealByParentID = useCallback((id) => {
		const section = sections.first((section) => section.id === id)
		return sections.first((meal) => meal.id === section.id)
	}, [ sections ])

	const meals = () => sections?.filter((section) => section.type === "Meal")

	useReactContextDevTool({
		id: 'DataProvider',
		displayName: 'Data',
		values: {
			sections,
			updateSection,
			getItemDataByID,
			getSectionDataByID,
			updateItem,
			deleteItem,
			deleteSection,
			menus,
		},
	})


	return (
		<DataContext.Provider
			value={{
				isDirty,
				sections,
				meals,
				menus,
				items,
				createSection,
				updateSection,
				getItemDataByID,
				getSectionDataByID,
				updateItem,
				getMealByParentID,
				draft_createSection,
				draft_createItem
			} }>
			{ children }
		</DataContext.Provider>
	)
}

const useData = () => {
	try {
		return useContext(DataContext)
	} catch (e) {
		console.log(e)
	}
}

export default DataProvider
export { useData }
