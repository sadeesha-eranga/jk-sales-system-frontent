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
  CSelect
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const fields = ['id','status', 'branch', 'product', 'action'];

const StockRequest = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          StockRequest
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm id="stockRequestForm" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="product">Product</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="product" id="product">
                    <option value="0">Select a product</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="fromBranch">From Branch</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="fromBranch" id="fromBranch">
                    <option value="0">Select a branch</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="qty">Qty</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="qty" name="qty" placeholder="Enter qty" />
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
          Stock Requests
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

export default StockRequest
