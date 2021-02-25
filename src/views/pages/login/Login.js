import React, {useState} from 'react';
import axios from '../../../utils/axios';
import Cookies from 'js-cookie';
import SwalUtils from '../../../utils/SwalUtils';

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleUsernameChange = (event) => {
    const username = event.target.value;
    setUsername(username);
  };

  const handlePasswordChange = (event) => {
    const password = event.target.value;
    setPassword(password);
  };

  const loginButtonClick = (e) => {
    e.preventDefault();
    if (username !== '' && password !== '') {
      SwalUtils.showLoadingSwal();
      axios.post('/branches/users/login', { username, password })
        .then(response => {
          const { accessToken, role } = response.data;
          Cookies.set('accessToken', accessToken, { path: '/' });
          Cookies.set('userRole', role, { path: '/' });
          window.location = '/dashboard';
        }).catch(error => {
        console.log(error)
        SwalUtils.showErrorSwal('Invalid credentials');
      })
    } else {
      SwalUtils.showErrorSwal('Please enter username and password!');
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm action="#">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" onChange={handleUsernameChange} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" onChange={handlePasswordChange} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={loginButtonClick} color="primary" className="px-4">Login</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
