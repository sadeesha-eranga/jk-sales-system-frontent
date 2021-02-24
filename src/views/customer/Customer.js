import React  from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CDataTable,
  CForm,
  CFormGroup,
  CInput,
  CLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const fields = ['id','name', 'nic', 'email', 'actions'];

const Customer = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Customer
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm id="customerForm" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="name">Name</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="name" name="name" placeholder="Enter name" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="nic">NIC</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="nic" name="nic" placeholder="Enter NIC number" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="email">Email</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="email" name="email" type="email" placeholder="Enter email" />
                </CCol>
              </CFormGroup>

            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton id="btnSave" type="submit" size="sm" color="success"><CIcon name="cil-scrubber" /> Save</CButton> <CButton id="btnReset" type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardHeader>
          Customers
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={[]}
            fields={fields}
            itemsPerPage={5}
            pagination
            hover
            sorter
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={''}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Customer
