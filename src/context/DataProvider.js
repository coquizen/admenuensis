/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react'
import useReactContextDevTool from 'hooks/useReactContextDevTool'
import * as api from 'services/data'

const DataContext = createContext(null)

const DataProvider = ({ children }) => {
	const [allSectionsData, setAllSectionsData] = useState(null)
	// const [menus, setMenusData] = useState(api.fetchMenus())
	const [allItemsData, setAllItemsData] = useState(null)
	const [isDirty, setIsDirty] = useState(true)

	// useEffect(() => {
	// 		api.fetchSections().then((data) => setAllSectionsData(data))
	// }, [])
	//
	// useEffect(() => {
	// 		api.fetchItems().then((data) => setAllItemsData(data))
	// }, [])
	//
	// useEffect(()=> {
	// 	api.fetchMenus().then((data) => setMenusData(data))
	// }, [])
	const getSectionDataByID = (id) => {
		if (allSectionsData) return allSectionsData.find((section) => section.id === id)
	}
	const getItemDataByID = (id) => allItemsData && allItemsData.find((item) => item.id === id)

	const updateSection = (data) => {
		api.updateSection(data).then(() => setIsDirty(true))
	}
	const updateItem = (data) => {
		api.updateItem(data).then(() => setIsDirty(true))
	}

	const deleteSection = (id) => {
		api.deleteSection(id).then(() => setIsDirty(true))
	}

	const deleteItem = (id) => {
		api.deleteItem(id).then(() => setIsDirty(true))
	}

	const getTypeByID = (id) => {
		if (!isDirty) {
			return getSectionDataByID(id) ? 'section' : 'item'
		}
	}
	useReactContextDevTool({
		id: 'dataprovider',
		displayName: 'Data',
		values: {
			allSectionsData,
			updateSection,
			getItemDataByID,
			getSectionDataByID,
			updateItem,
			deleteItem,
			deleteSection,
			getTypeByID,

		},
	})


	return (
		<DataContext.Provider
			value={{
				allSectionsData,
				updateSection,
				getItemDataByID,
				getSectionDataByID,
				updateItem,
				getTypeByID,
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
