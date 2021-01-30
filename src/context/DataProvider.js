/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAsync } from 'react-async-hook'
import * as api from 'utils/api'

const DataContext = createContext()

// const dataReducer = (state, action) => {
//     switch (action.type) {
//         case 'SWAP_ORDER':
//      }
// }
const DataProvider = ({ children }) => {
	const [allSectionsData, setAllSectionsData] = useState(null)
	const [mappedSections, setMappedSections] = useState(null)
	const [parentingSections, setParentingSections] = useState(null)
	useEffect(() => {
		api.fetchSections().then((data) => setAllSectionsData(data))
	}, [])

	useEffect(() => {
		api.fetchMappedSections().then((data) => setMappedSections(data))
	}, [])

	useEffect(() => {
		if (allSectionsData !== null) {
			const parents = allSectionsData.filter((section) => section.section_parent_id !== undefined)
			setParentingSections(parents)
		}
	}, [allSectionsData])

	return (
		<DataContext.Provider value={{ allSectionsData, parentingSections, parentingSections, mappedSections, ...api }}>
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
