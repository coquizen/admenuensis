/** @format */

import React from 'react'
import DropDownMenu from 'components/Form'
import Switch from 'components/Form/Switch'
import Spinner from 'components/Spinner'
import styles from '../Form.module.scss'
import { useData } from 'context/DataProvider'
import classnames from "classnames";

const Section = ({ data, reset, register }) => {
	const { sections, meals } = useData()

	reset({
		id: data?.id === undefined ? 'draft' : data.id,
		title: data?.title === undefined ? '' : data.title,
		description: data?.description === undefined ? '' : data.description,
		active: data?.active === undefined ? true : data.active,
		visible: data?.visible === undefined ? true : data.visible,
		section_id: data?.section_id === undefined ? "" : data.section_id,
	})

	return (
		<>
		{(sections !== null) ?
			<React.Fragment>
				<input {...register("id")} type='hidden' />
				<div className={styles.Container}>
					<label htmlFor="title" className={styles.Label}>
						Name
						</label>
					<input
						{...register("title", { required: true, minLength: 1 })}
						type="text"
						className={styles.Input}
						id="title"
						placeholder="Please enter section name e.g. Desserts" />
				</div>
				<div className={styles.Container}>
					<label htmlFor='description' className={styles.Label}>
						Description
					</label>
					<textarea
						className={styles.Input}
						rows="3"
						{...register("description")} />
				</div>
				{data?.type !== "Meal" && <div className={styles.Container}>
					<DropDownMenu list={meals} register={register} label="section_id" title="Meals" />
				</div>}
				<div className={styles.Container}>
					<div className={styles.Label}>Other Settings</div>
				<div className={styles.SwitchGroup}>
						<div className={styles.SwitchLabel}>Active?</div>
						<Switch title="Active" name="active" register={register} />
				</div>

					<div className={styles.SwitchGroup}>
						<div className={styles.SwitchLabel}>Visible?</div>
						<Switch title="Visible" name="visible" register={register} />
					</div>	</div>
			</React.Fragment>
			: <Spinner />}
		</>
	)
}

export default Section


