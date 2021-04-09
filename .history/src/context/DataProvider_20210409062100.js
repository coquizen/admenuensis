/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react'
import useReactContextDevTool from 'hooks/useReactContextDevTool'
import * as api from 'services/data'

const DataContext = createContext()

const DataProvider = ({ children }) => {
	const [ allSectionsData, setAllSectionsData ] = useState(null)
	const [ menus, setMenusData ] = useState(null)
	const [ allItemsData, setAllItemsData ] = useState(null)
	const [ isDirty, setIsDirty ] = useState(true)
	useEffect(() => {
		if (isDirty) {
			api.fetchSections().then((data) => setAllSectionsData(data))
			api.fetchMenus().then(data => setMenusData(data))
			api.fetchItems().then((data) => setAllItemsData(data))
			setIsDirty(false)
		}
	}, [ isDirty ])
	const getSectionDataByID = (id) => allSectionsData && allSectionsData.find((section) => section.id === id)

	const getItemDataByID = (id) => allItemsData && allItemsData.find((item) => item.id === id)

	const rootSections =
		allSectionsData &&
		allSectionsData.filter((section) => section.section_id === undefined)

	var allData = {}
	allData[ 'section' ] = allSectionsData
	allData[ 'item' ] = allItemsData


	const updateSection = (data) => {
		api.updateSection(data).then(setIsDirty(true))
	}
	const updateItem = (data) => {
		api.updateItem(data).then(setIsDirty(true))
	}

	useReactContextDevTool({
		id: 'dataprovider',
		displayName: 'Data',
		values: {
			allSectionsData,
			rootSections,
			reSortTable,
			updateSection,
			getItemDataByID,
			getSectionDataByID,
			updateItem,
			allData,
			menus
		},
	})


	return (
		<DataContext.Provider
			value={{
				allSectionsData,
				rootSections,
				reSortTable,
				updateSection,
				getItemDataByID,
				getSectionDataByID,
				updateItem,
				allData,
				menus
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
