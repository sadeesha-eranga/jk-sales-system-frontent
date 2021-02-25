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
import SwalUtils from '../../utils/SwalUtils';
import Cookies from 'js-cookie';

const fields = ['id','status', 'branch', 'product', 'action'];
const initialValues = {
  product: 0,
  branch: 0,
  qty: 0
};

const StockRequest = () => {

  const [products, setProducts] = useState([]);
  const [branches, setBranches] = useState([]);
  const [stockRequests, setStockRequests] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    errs.product = values.product && values.product > 0 ? '' : 'Please select a product';
    errs.branch = values.branch && values.branch > 0 ? '' : 'Please select a valid branch';
    errs.qty = values.qty && values.qty > 0 ? '' : 'Please enter a valid qty';
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

    axios.get('/branches')
      .then(res => {
        console.log('branches', res.data.branches);
        setBranches(res.data.branches);
      }).catch(err => {
      console.log(err);
    });

    axios.get('/stocks/requests/' + Cookies.get('branchId'))
      .then(res => {
        console.log('stockRequests', JSON.stringify(res.data.stockRequests));
        setStockRequests(res.data.stockRequests);
      }).catch(err => {
      console.log(err);
    });
  }, []);

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

  const handleViewClick = (e) => {
    const stockRequestId = e.target.value;
    console.log('Stock request viewed ID:', stockRequestId);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      SwalUtils.showLoadingSwal();
      axios.post('/stocks/requests', {
        productId: values.product,
        fromBranchId: values.branch,
        toBranchId: Cookies.get('branchId'),
        qty: values.qty
      }).then((resp) => {
        SwalUtils.closeSwal();
        SwalUtils.showSuccessSwal(resp.data.message);
        setValues(initialValues);
        axios.get('/stocks/requests/' + Cookies.get('branchId'))
          .then(res => {
            setStockRequests(res.data.stockRequests);
          }).catch(err => {
          console.log(err);
        });
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
                  <CSelect value={values.product} onChange={handleInputChange} custom name="product" id="product">
                    <option key="0" value="0">Select a product</option>
                    {products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="fromBranch">From Branch</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect value={values.branch} onChange={handleInputChange} custom name="branch" id="branch">
                    <option key="0" value="0">Select a branch</option>
                    {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name} - {branch.type}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="qty">Qty</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.qty || ''} onChange={handleInputChange} id="qty" name="qty"
                          type="number" placeholder="Enter quantity"/>
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
          Stock Requests
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={stockRequests.map(sr => ({...sr, product: sr.product.name, branch: sr.fromBranch.name}))}
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
                    color='secondary'
                    size='sm'
                    className="m-2"
                    value={item.id}
                    onClick={(e) => handleViewClick(e)}
                  >
                    View
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

export default StockRequest
