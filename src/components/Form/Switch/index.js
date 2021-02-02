/** @format */

import React, { forwardRef, useState } from 'react'
import { useToggle } from 'hooks'

const Switch = forwardRef(({ name, label }, ref) => {
	// const [isChecked, setIsChecked] = useToggle()

	// const onChange = (newvalue) => setIsChecked(newvalue)

	// return (
	// 	<div className='custom-control custom-switch'>
	// 		<label className='custom-control-label' htmlFor={name}>
	// 			{label}
	// 		</label>
	// 		<input name={name} className='custom-control-input' type='checkbox' id={name} ref={ref} />
	// 	</div>
	// )
	return (
		<div className='custom-control custom-switch right'>
			<input type='checkbox' className='custom-control-input' id={name} name={name} ref={ref} />
			<label className='custom-control-label' htmlFor={name}>
				{label}
			</label>
		</div>
	)
})
export default Switch
