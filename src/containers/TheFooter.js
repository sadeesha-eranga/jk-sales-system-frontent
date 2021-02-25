import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div className="mfs-auto">
        <span className="ml-1">&copy; 2021 CL/BSCSD/21/37 All rights reserved.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
