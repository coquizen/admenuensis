import { useContext } from "react"
import { ModalContext } from "context/ModalProvider"

const useModal = () => {
  try {
    return useContext(ModalContext)
  } catch (e) {
    console.log(e)
  }
}

export default useModal
