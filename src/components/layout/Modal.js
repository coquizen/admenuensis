import React, { useRef, useEffect, useState } from "react"
import Portal from "./Portal"

const Modal = ({ open, onClose, title = "Edit", children }) => {
  const [active, setActive] = useState(false)
  const backdropRef = useRef(null)

  useEffect(() => {
    const { current } = backdropRef

    const transitionEnd = () => setActive(open)
    // if the event keypress is <esc>
    const keyHandler = e => [27].indexOf(e.which) >= 0 && onClose()

    const clickHandler = e => e.target === current && onClose()

    if (current) {
      current.addEventListener("transitionend", transitionEnd)
      current.addEventListener("click", clickHandler)
      window.addEventListener("keyup", keyHandler)
    }

    if (open) {
      window.setTimeout(() => {
        document.activeElement.blur()
        setActive(open)
        document.querySelector("#___gatsby").setAttribute("inert", "true")
      }, 10)
    }

    return () => {
      if (current) {
        current.removeEventListener("transitionend", transitionEnd)
        current.removeEventListener("click", clickHandler)
      }
      document.querySelector("#___gatsby").removeAttribute("inert")
      window.removeEventListener("keyup", keyHandler)
    }
  }, [open, onClose])

  return (
    <React.Fragment>
      {(open || active) && (
        <Portal className="modal-portal">
          <div
            ref={backdropRef}
            className={`overlay ${active && open && "active"}`}
          >
            <div className="modal-wrapper">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">{title}</h5>
                    <button
                      aria-label="Close Modal"
                      type="button"
                      className="btn-close"
                      onClick={onClose}
                    ></button>
                  </div>
                  <div className="modal-body">{children}</div>
                </div>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </React.Fragment>
  )
}
export default Modal
