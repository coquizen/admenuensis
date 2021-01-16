import React, { useCallBack } from "react"
import { useForm } from "react-hook-form"
import { useModal } from "context/ModalProvider"
const datalists = ["A", "B", "C"]

const SectionForm = React.forwardRef((props, ref) => {
  const { register, handleSubmit } = useForm()
  const { onClose } = useModal()

  const close = e => {
    e.preventDefault()
    onClose()
  }

  const onSubmit = data => {
    alert(data)
  }

  return (
    <form ref={ref} onSubmit={() => handleSubmit(onSubmit)}>
      <div className="form-row">
        <label htmlFor="section-name" className="form-label">
          Name
        </label>
        <input
          name="section-name"
          ref={register}
          type="text"
          className="form-input"
          id="section-name"
          placeholder="Please enter section name e.g. Desserts"
        ></input>
      </div>
      <hr />
      <div className="form-row">
        <label htmlFor="section-description" className="form-label">
          Description
        </label>
        <textarea
          name="description"
          className="form-input"
          id="section-description"
          rows="3"
          ref={register}
        ></textarea>
      </div>
      <hr />
      <div className="form-row">
        <div>Other Settings</div>
        <div id="section-switches">
          <div className="form-switch form-check">
            <input
              name="isDisabled"
              className="form-check-input"
              type="checkbox"
              id="disable-section-checkbox"
              ref={register}
            />
            <label
              className="form-check-label"
              htmlFor="disable-section-checkbox"
            >
              Disable
            </label>
          </div>
          <div className="form-switch form-check">
            <input
              name="isVisible"
              className="form-check-input"
              type="checkbox"
              id="section-visibility-checkbox"
              ref={register}
            />
            <label
              className="form-check-label"
              htmlFor="section-visibility-checkbox"
            >
              Section is not visible directly on menu.
            </label>
          </div>
          <div className="form-switch form-check">
            <input
              name="isRestrict"
              className="form-check-input"
              type="checkbox"
              id="time-restrict-section-checkbox"
              ref={register}
            />
            <label
              className="form-check-label"
              htmlFor="time-restrict-section-checkbox"
            >
              Time Restrict Visibility
            </label>
          </div>
        </div>
      </div>
      <hr />
      <div className="mb-3 d-flex justify-content-between">
        <label htmlFor="select-parent-section" className="form-label">
          Parent Group
        </label>
        <select
          id="select-parent-section"
          name="parents"
          ref={register}
          className="form-select mb-3"
          placeholder="*choose*"
        >
          {datalists.map((i, k) => (
            <option key={i} value={i} />
          ))}
        </select>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={close}>
          Cancel
        </button>
        <button input="button" type="submit" className="btn btn-primary">
          Save changes
        </button>
      </div>
    </form>
  )
})
export default SectionForm
