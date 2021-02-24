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
  CInput, CInputRadio,
  CLabel, CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

const fields = ['id','name', 'nic', 'email', 'action'];

const Order = () => {
  return (
    <>
      <CCard>
        <CCardHeader>
          Order
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm action="" method="post" encType="multipart/form-data" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="select">Customer</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="select" id="select">
                    <option value="0">Select a customer</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Payment Method</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio1" name="inline-radios" value="CASH" />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio1">Cash</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="inline-radio2" name="inline-radios" value="CARD" />
                    <CLabel variant="custom-checkbox" htmlFor="inline-radio2">Card</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <hr/>

              <h5>Items</h5>
              <br/>

              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="text-input">Stock</CLabel>
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor="text-input">Qty</CLabel>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="6" md="6">
                  <CSelect custom name="select" id="select">
                    <option value="0">Select Stock</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
                <CCol xs="6" md="6">
                  <CInput id="text-input" name="text-input" placeholder="Enter Qty" />
                </CCol>
                <CCol md="12">
                  <CButton size="sm" color="warning"><CIcon name="cil-check" /> Add item</CButton><br/>
                </CCol>
              </CFormGroup>

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


              <CFormGroup row>
                <CCol md="1">
                  <CLabel htmlFor="text-input">Total</CLabel>
                </CCol>
                <CCol xs="7" md="7">
                  <CInput id="text-input" name="text-input" placeholder="Enter total" />
                </CCol>
              </CFormGroup>

            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Save</CButton> <CButton type="reset" size="sm" color="danger"><CIcon name="cil-ban" /> Reset</CButton>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardHeader>
          Orders
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

export default Order
