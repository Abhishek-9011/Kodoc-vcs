import React from 'react'
import {useDocStore} from '@/store/useDocStore'
const Preview = () => {
    const data = useDocStore((state)=>state.data)
  return (
    <div>
      {data}
    </div>
  )
}

export default Preview
