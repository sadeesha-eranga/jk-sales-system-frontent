import React  from 'react'
import './Order.css'
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

const orderTableFields = ['id', 'customer', 'paymentMethod', 'createdDateTime', 'actions'];
const itemTableFields = ['stockNumber','product', 'unitPrice', 'amount'];

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
                  <CLabel htmlFor="customer">Customer</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect custom name="customer" id="customer">
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
                    <CInputRadio custom id="cash" name="cash" value="CASH" />
                    <CLabel variant="custom-checkbox" htmlFor="cash">Cash</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio custom id="card" name="card" value="CARD" />
                    <CLabel variant="custom-checkbox" htmlFor="card">Card</CLabel>
                  </CFormGroup>
                </CCol>
              </CFormGroup>

              <hr/>

              <h5>Items</h5>
              <br/>

              <CFormGroup row>
                <CCol md="6">
                  <CLabel htmlFor="stock">Stock</CLabel>
                </CCol>
                <CCol md="6">
                  <CLabel htmlFor="qty">Qty</CLabel>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol xs="6" md="6">
                  <CSelect custom name="stock" id="stock">
                    <option value="0">Select Stock</option>
                    <option value="1">Option #1</option>
                    <option value="2">Option #2</option>
                    <option value="3">Option #3</option>
                  </CSelect>
                </CCol>
                <CCol xs="6" md="6">
                  <CInput id="qty" name="qty" placeholder="Enter Qty" />
                </CCol>
                <CCol md="12">
                  <CButton id="addItm" size="sm" color="success"><CIcon name="cil-check" /> Add item</CButton><br/>
                </CCol>
              </CFormGroup>

              <CDataTable
                items={[]}
                fields={itemTableFields}
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


              <CFormGroup row>
                <CCol md="1">
                  <CLabel htmlFor="text-input">Total</CLabel>
                </CCol>
                <CCol xs="7" md="7">
                  <CInput id="totalTxt" name="text-input" placeholder="Enter total" />
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
          Orders
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={[]}
            fields={orderTableFields}
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

export default Order
