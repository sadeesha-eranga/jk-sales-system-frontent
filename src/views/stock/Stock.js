import React, { useEffect, useState } from 'react'
import {
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
import SwalUtils from '../../utils/SwalUtils';
import Cookies from 'js-cookie';

const fields = ['id', 'product', 'totalQty', 'remainingQty', 'unitPrice', 'action'];
const initialValues = {
  product: 0,
  unitPrice: 0,
  totalQty: 0
};

const Stock = () => {

  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    errs.product = values.product && values.product > 0 ? '' : 'Please select a product';
    errs.unitPrice = values.unitPrice && values.unitPrice > 0 ? '' : 'Please enter a valid unit price';
    errs.totalQty = values.totalQty && values.totalQty > 0 ? '' : 'Please enter a valid qty';
    setErrors(errs);
    return Object.values(errs).every(value => value === '');
  };

  useEffect(() => {
      axios.get('/products')
        .then(res => {
          console.log('products', res.data.products);
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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const handleResetBtnClick = () => {
    setValues(initialValues);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Sbitting---')
    console.log(values);
    if (validate()) {
      console.log('valid');
      SwalUtils.showLoadingSwal();
      axios.post('/stocks', {
        productId: values.product,
        branchId: Cookies.get('branchId') || 2,
        unitPrice: values.unitPrice,
        totalQty: values.totalQty
      }).then(({ data }) => {
        SwalUtils.closeSwal();
        SwalUtils.showSuccessSwal(data.message);
        setValues(initialValues);
        // add product to products array
      }).catch((error) => {
        SwalUtils.closeSwal();
        SwalUtils.showErrorSwal(error?.response?.data?.message || 'Something went wrong!');
      });
    } else {
      const errMsg = Object.values(errors).find(err => err !== "");
      if (errMsg) SwalUtils.showErrorSwal(errMsg);
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          Stock
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm id="stockForm" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="product">Product</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect value={values.product} onChange={handleInputChange} custom name="product" id="product">
                    <option key="0" value="0">Select a product</option>
                    {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="unitPrice">Unit price</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.unitPrice || ''} onChange={handleInputChange} id="unitPrice" name="unitPrice"
                          type="number" placeholder="Enter unit price"/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="totalQty">Total Qty</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.totalQty || ''} onChange={handleInputChange} id="totalQty" name="totalQty"
                          type="number" placeholder="Enter total qty"/>
                </CCol>

              </CFormGroup>
            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton onClick={handleSubmit} className="rightMargin" id="btnSave" type="submit" size="sm" color="success">
            <CIcon name="cil-scrubber"/>
            Save
          </CButton>
          <CButton onClick={handleResetBtnClick} id="btnReset" type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
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
