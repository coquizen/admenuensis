/** @format */

import React, { createContext, useCallback, useContext, useEffect, useState, } from 'react'
import useReactContextDevTool from 'hooks/useReactContextDevTool'
import * as api from 'services/data'

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
	const [ sections, setSections ] = useState(null)
	const [ menus, setMenusData ] = useState(null)
	const [ items, setAllItemsData ] = useState(null)
	const [ isDirty, setIsDirty ] = useState(false)

	useEffect(() => {
		api.fetchSections().then(({ data }) => setSections(data))
	},  [])

	useEffect(() => {
		if (sections) {
			sessionStorage.setItem('sections', JSON.stringify(sections))
		}
	},[sections])

	useEffect(() => {
		if (sections) {
			const menus = sections.filter((menu) => menu.type === 'Meal').sort((a, b) => a.list_order - b.list_order)
			setMenusData(menus)
		}
	}, [sections, setMenusData])

	const fetchSection = (id) => {
		return sections.find((section) => section.id === id)
	}


	const fetchItem = (id) => {
		const items = sections?.flatMap((section) => section.items)
		return items.find((item) => item.id === id)
	}

	const updateSection = (data) => {
		if (!data.id) {
			console.error("No ID specified")
		} else {
			const section = fetchSection(data.id)
			const sectionIndex = sections.indexOf(section)
			sections[sectionIndex] = {...data, isDirty: true}
			if (!isDirty) setIsDirty(true)
			setSections(...sections)
		}
	}

	const updateItem= (data) => {
		if (!data.id) {
			console.error("No ID specified")
		} else {
			const item = fetchItem(data.id)
			const parentSection = fetchSection(item.section_id)
			const	parentSectionIndex = sections.indexOf(parentSection)
			let items = parentSection.items
			const itemIndex = items.indexOf(item)
			items[itemIndex] = {...data, isDirty: true}
			parentSection.items = [...items]
			sections[parentSectionIndex] = parentSection
			setSections(...sections)
			if (!isDirty) setIsDirty(true)
		}
	}

	const addSection = (data) => {
		data.id = "draft-" + Date.now()
		if (data.section_id) {
			const parentSection = fetchSection(data.section_id)
			parentSection.subsections.push(data)
			const parentIndex = sections.indexOf(parentSection)
			sections[parentIndex] = parentSection
			sections.push(data)
			setSections(...sections)
		}
	}
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
			fetchSection,
			fetchItem,
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
				menus,
				fetchSection,
				fetchItem,
				updateSection,
				updateItem,
				addSection,
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
