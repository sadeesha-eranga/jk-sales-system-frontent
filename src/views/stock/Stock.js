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

const fields = ['id','totalQty', 'remainingQty', 'unitPrice', 'action'];

const Stock = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Stock
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
          <CForm id="stockForm">

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
                <CLabel htmlFor="unitPrice">Unit price</CLabel>
              </CCol>
              <CCol xs="12" md="12">
                <CInput id="unitPrice" name="unitPrice" placeholder="Enter unit price" />
              </CCol>
            </CFormGroup>

            <CFormGroup row>
              <CCol md="12">
                <CLabel htmlFor="totalQty">Total Qty</CLabel>
              </CCol>
              <CCol xs="12" md="12">
                <CInput id="totalQty" name="totalQty" placeholder="Enter total qty" />
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
          Stocks
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

export default Stock
