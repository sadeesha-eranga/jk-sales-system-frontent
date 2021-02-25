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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import SwalUtils from '../../utils/SwalUtils';
import axios from '../../utils/axios';
import Cookies from 'js-cookie';

const fields = ['id','name', 'nic', 'email'];
const initialValues = {
  name: '',
  nic: '',
  email: ''
};

const Customer = () => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([]);

  const validate = () => {
    let errs = {};
    errs.name = values.name && values.name !== '' ? '' : 'Please select a name';
    errs.nic = values.nic && values.nic !== '' ? '' : 'Please select a valid nic';
    errs.email = values.email && values.email !== '' ? '' : 'Please enter a valid email';
    setErrors(errs);
    return Object.values(errs).every(value => value === '');
  };

  useEffect(() => {
    axios.get('/customers')
      .then(res => {
        console.log('customers', res.data.customers);
        setCustomers(res.data.customers);
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
      SwalUtils.showLoadingSwal();
      axios.post('/customers', {
        name: values.name,
        nic: values.nic,
        email: values.email
      }).then((resp) => {
        SwalUtils.closeSwal();
        SwalUtils.showSuccessSwal(resp.data.message);
        setValues(initialValues);
        axios.get('/customers')
          .then(res => {
            console.log('customers', res.data.customers);
            setCustomers(res.data.customers);
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
          Customer
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm id="customerForm" >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="name">Name</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.name || ''} onChange={handleInputChange} id="name" name="name"
                          placeholder="Enter name"/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="nic">NIC</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.nic || ''} onChange={handleInputChange} id="nic" name="nic"
                          placeholder="Enter NIC number"/>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="email">Email</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CInput value={values.email || ''} onChange={handleInputChange} id="email" name="email" type="email"
                          placeholder="Enter email"/>
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
          Customers
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={customers}
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

export default Customer
