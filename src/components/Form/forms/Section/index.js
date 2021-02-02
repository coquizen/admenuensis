/** @format */

import React, { useEffect, useState } from 'react'
import { useData } from 'context/DataProvider'
import { Switch } from 'components/Form'
import { DropDownMenu } from 'components/Form'

const Section = ({ register, dataID = 0 }) => {
	const [data, setData] = useState(null)
	const { fetchSectionByID, parentingSections } = useData()

	useEffect(() => {
		if (dataID) {
			setData(null)
			return
		}
		fetchSectionByID(dataID).then((data) => setData(data))
	}, [dataID])

	return (
		<React.Fragment>
			<div className='custom-modal-body'>
				<div className='form-row'>
					<label htmlFor='section-name' className='custom-form-label'>
						Name
					</label>
					<input
						name='section-name'
						ref={(register, { required: true })}
						type='text'
						className='form-input'
						id='section-name'
						placeholder='Please enter section name e.g. Desserts'
						value={data && data.title}></input>
				</div>
				<hr />
				<div className='form-row'>
					<label htmlFor='section-description' className='custom-form-label'>
						Description
					</label>
					<input
						type='text'
						name='description'
						className='form-input'
						id='section-description'
						rows='3'
						ref={register}
						value={data && data.description}></input>
				</div>
				<hr />
				<div className='form-row'>
					<div>Other Settings</div>
					<div className='section-switches'>
						<Switch label='Disable' name='isDisabled' ref={register} />
						<Switch label='Visible' name='isVisible' ref={register} />
						<Switch label='Time Restricted' name='isRestricted' ref={register} />
					</div>
				</div>
				<hr />
				<div className='form-row'>
					<label htmlFor='select-parent-section' className='custom-form-label'>
						Parent Group
					</label>
					<DropDownMenu items={parentingSections} />
				</div>
			</div>
		</React.Fragment>
	)
}
export default Section
