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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from '../../utils/axios';
import SwalUtils from '../../utils/SwalUtils';

const fields = ['id', 'name', 'unit'];
const initialValues = {
  name: '',
  unit: ''
};

const Product = () => {

  const [products, setProducts] = useState([]);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    errs.name = values.name && values.name !== '' ? '' : 'Please enter valid name';
    errs.unit = values.unit && values.unit !== '' ? '' : 'Please enter a valid unit';
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('here')
      SwalUtils.showLoadingSwal();
      axios.post('/products', {
        name: values.name,
        unit: values.unit,
      }).then((resp) => {
        SwalUtils.closeSwal();
        SwalUtils.showSuccessSwal(resp.data.message);
        setValues(initialValues);
        axios.get('/products')
          .then(res => {
            console.log('products', res.data.products);
            setProducts(res.data.products);
          }).catch(err => {
          console.log(err);
        });
      }).catch((error) => {
        SwalUtils.closeSwal();
        SwalUtils.showErrorSwal(error?.response?.data?.message || 'Something went wrong!');
      });
    } else {
      console.log({ errors})
      const errMsg = Object.values(errors).find(err => err !== "");
      if (errMsg) SwalUtils.showErrorSwal(errMsg);
    }
  };

  return (
    <>
      <CCard>
        <CCardHeader>
          Product
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="name">Name</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.name || ''} onChange={handleInputChange} id="name" name="name"
                          type="text" placeholder="Enter product name"/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="unitPrice">Unit</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.unit || ''} onChange={handleInputChange} id="unit" name="unit"
                          type="text" placeholder="Enter unit"/>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCol>
        </CCardBody>
        <CCardFooter>
          <CButton onClick={handleSubmit} className="rightMargin" id="btnSave" type="submit" size="sm" color="success">
            <CIcon name="cil-scrubber"/> Save</CButton>
          <CButton onClick={handleResetBtnClick} id="btnReset" type="reset" size="sm" color="danger"><CIcon name="cil-ban"/> Reset</CButton>
        </CCardFooter>
      </CCard>

      <CCard>
        <CCardHeader>
          Stocks
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={products}
            fields={fields}
            itemsPerPage={5}
            pagination
            hover
            sorter
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Product
