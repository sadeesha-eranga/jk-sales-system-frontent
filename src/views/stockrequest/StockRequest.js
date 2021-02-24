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
import { DocsLink } from '../../reusable';

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
            <CForm action="" method="post" encType="multipart/form-data" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="select">Product</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="select" id="select">
                    <option value="0">Select a product</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="select">From Branch</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="select" id="select">
                    <option value="0">Select a branch</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="text-input">Qty</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="text-input" name="text-input" placeholder="Enter qty" />
                  {/*<CFormText>This is a help text</CFormText>*/}
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
          Simple Table
          <DocsLink name="CModal"/>
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

export default StockRequest
