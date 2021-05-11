import { useState } from 'react'

const usePositionAndDimension = () => {
    const [activeRef, setActiveRef] = useState()
    return ({
        setActiveRef,
        activeRef
    })
}
export default usePositionAndDimension