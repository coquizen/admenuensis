/** @format */

import React, { forwardRef } from 'react'

const SectionContainerList = forwardRef(({ children }, ref) => {
	return (
		<div ref={ref} className='tree'>
			{children}
		</div>
	)
})

export default SectionContainerList
