import { useEffect } from "react"

const useReactContextDevTool = ({ id, displayName, values }) => {
  useEffect(() => {
    if (window._REACT_CONTEXT_DEVTOOL) {
      window._REACT_CONTEXT_DEVTOOL({ id, displayName, values })
    }
  }, [id, displayName, values])
}

export default useReactContextDevTool
