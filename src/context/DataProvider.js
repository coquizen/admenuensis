/** @format */

import React, {createContext, useCallback, useContext, useState, useEffect,} from 'react'
import useReactContextDevTool from 'hooks/useReactContextDevTool'
import * as api from 'services/data'

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
	const [sections, setAllSectionsData] = useState(null)
	// const [menus, setMenusData] = useState(api.fetchMenus())
	const [allItemsData, setAllItemsData] = useState(null)
	const [isDirty, setIsDirty] = useState(true)

	useEffect(() => {
		api.fetchSections().then(({data}) => setAllSectionsData(data))
	}, [])

	// useEffect(() => {
	// 	api.fetchItems().then((data) => setAllItemsData(data))
	// }, [])

	const getSectionDataByID = useCallback((id) => {
		return sections.find((section) => section.id === id)
	}, [sections])

	const getItemDataByID = useCallback((id) => {
		return allItemsData.find((item) => item.id === id)
	}, [allItemsData])

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
		},
	})


	return (
		<DataContext.Provider
			value={{
				sections,
				updateSection,
				getItemDataByID,
				getSectionDataByID,
				updateItem,
			}}>
			{children}
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
