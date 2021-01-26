/** @format */

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAsync } from 'react-async-hook'
import { fetchSectionByID } from 'utils/api'

const DataContext = createContext()

// const dataReducer = (state, action) => {
//     switch (action.type) {
//         case 'SWAP_ORDER':
//      }
// }
const DataProvider = ({ children }) => {
	// const menuSectionData = useAsync(fetchSections)
	const sectionByIDData = (id) => fetchSectionByID(id)
	// const updateIndex = ({ parent_id, current_Index, new_index }) => {

	//     const oldIndexMap = mappedSections[parent_id].map((subSection, index) => ({[index]: subSection.}) )
	//     if (new_index === 0) {

	//     }

	//

	return <DataContext.Provider value={{ sectionByIDData }}>{children}</DataContext.Provider>
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
