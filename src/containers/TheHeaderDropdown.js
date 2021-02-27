import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CButton
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Cookies from 'js-cookie';
import SimpleLineIcon from 'react-simple-line-icons';

const TheHeaderDropdown = () => {

  const handleLogoutClick = () => {
    Cookies.remove('accessToken', { path: '' });
    window.location = '/login'
  }

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CButton >
            <SimpleLineIcon name="power" color="red" style={{marginRight: "10px", fontWeight: "bold"}} />
          </CButton>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleLogoutClick}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
