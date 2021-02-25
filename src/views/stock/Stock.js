import React, { useEffect, useState } from 'react'
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
import axios from '../../utils/axios';

const fields = ['id', 'product', 'totalQty', 'remainingQty', 'unitPrice', 'action'];

const Stock = () => {

  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
      axios.get('/products')
        .then(res => {
          console.log(res.data.products);
          setProducts(res.data.products);
        }).catch(err => {
          console.log(err);
        });

    axios.get('/stocks')
        .then(res => {
          console.log('stocks', res.data.stocks);
          setStocks(res.data.stocks);
        }).catch(err => {
          console.log(err);
        });

  }, []);

  const handleDeleteClick = (e) => {
    const stockId = e.target.value;
    console.log('Stock deleted ID:', stockId);
  }

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
                    {products.map(product => <option value={product.id}>{product.name}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="unitPrice">Unit price</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="unitPrice" name="unitPrice" placeholder="Enter unit price"/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="totalQty">Total Qty</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput id="totalQty" name="totalQty" placeholder="Enter total qty"/>
                </CCol>

              </CFormGroup>
            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton className="rightMargin" id="btnSave" type="submit" size="sm" color="success"><CIcon name="cil-scrubber"/> Save</CButton>
          <CButton id="btnReset" type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardHeader>
          Stocks
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={stocks.map(stock => ({...stock, product: stock.product.name}))}
            fields={fields}
            itemsPerPage={5}
            pagination
            hover
            sorter
            scopedSlots={
              {
                'action': (item) => (<td>
                  <CButton
                    key={item.id}
                    color='danger'
                    size='sm'
                    className="m-2"
                    value={item.id}
                    onClick={(e) => handleDeleteClick(e)}
                  >
                    Delete
                  </CButton>
                </td>)
              }
            }
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Stock
