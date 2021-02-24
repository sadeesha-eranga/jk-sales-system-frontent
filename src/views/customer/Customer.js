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
  CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const fields = ['id','name', 'nic', 'email', 'action'];

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
            <CForm action="" method="post" encType="multipart/form-data" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Name</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="text-input" name="text-input" placeholder="Enter name" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">NIC</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="text-input" name="text-input" placeholder="Enter NIC number" />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="text-input" name="text-input" placeholder="Enter email" />
                </CCol>
              </CFormGroup>

            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>
          <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
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
