/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react'

import * as api from 'utils/api'

const DataContext = createContext()

const DataProvider = ({ children }) => {
	const [allSectionsData, setAllSectionsData] = useState(null)
	const [mappedSections, setMappedSections] = useState(null)
	const [allItemsData, setAllItemsData] = useState(null)
	const [isDirty, setIsDirty] = useState(true)
	useEffect(() => {
		if (isDirty) {
			api.fetchSections().then((data) => setAllSectionsData(data))
			api.fetchMappedSections().then((data) => setMappedSections(data))

			api.fetchItems().then((data) => setAllItemsData(data))
			setIsDirty(false)
		}
	}, [isDirty])
	const getSectionDataByID = (id) => allSectionsData && allSectionsData.find((section) => section.id === id)

	const getItemDataByID = (id) => allItemsData && allItemsData.find((item) => item.id === id)

	const rootSections =
		allSectionsData &&
		allSectionsData.filter((section) => section.section_parent_id === '00000000-0000-0000-0000-000000000000')

	var allData = {}
	allData['section'] = allSectionsData
	allData['item'] = allItemsData

	const reSortTable = (activeID, overID, isBefore) => {
		api.reSortTable(activeID, overID, isBefore).then(setIsDirty(true))
	}

	const updateSection = (data) => {
		api.updateSection(data).then(setIsDirty(true))
	}
	const updateItem = (data) => {
		api.updateItem(data).then(setIsDirty(true))
	}

	return (
		<DataContext.Provider
			value={{
				allSectionsData,
				rootSections,
				mappedSections,
				reSortTable,
				updateSection,
				getItemDataByID,
				getSectionDataByID,
				updateItem,
				allData,
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
