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
  CInput, CInputRadio,
  CLabel, CSelect,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import axios from '../../utils/axios';
import Cookies from 'js-cookie';
import SwalUtils from '../../utils/SwalUtils';

const orderTableFields = ['id', 'customer', 'paymentMethod', 'createdDateTime', 'actions'];
const itemTableFields = ['stockId','product', 'unitPrice', 'qty', 'amount'];
const initialValues = {
  customer: 0,
  stock: 0,
  qty: 0,
  paymentMethod: '',
  total: 0.00
};

const Order = () => {

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const validate = () => {
    let errs = {};
    errs.customer = values.customer && values.customer > 0 ? '' : 'Please select a customer';
    errs.paymentMethod = values.paymentMethod && values.paymentMethod !== '' ? '' : 'Please select a payment method';
    errs.items = items && items.length > 0 ? '' : 'Please add some items';
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
    axios.get('/stocks/' + Cookies.get('branchId'))
      .then(res => {
        console.log('stocks', res.data.stocks);
        setStocks(res.data.stocks);
      }).catch(err => {
      console.log(err);
    });
    axios.get('/orders/branch/' + Cookies.get('branchId'))
      .then(res => {
        console.log('orders', res.data.customerOrders);
        setOrders(res.data.customerOrders);
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

  const handleAddItemClick = () => {
    if (values.qty > 0 && values.stock > 0) {
      const stock = stocks.find(stock => stock.id === +values.stock);
      const amount = stock.unitPrice * parseInt(values.qty);
      setItems([...items, {
        stockId: stock.id,
        product: stock.product.name,
        unitPrice: stock.unitPrice,
        qty: values.qty,
        amount: amount
      }]);
      setValues({...values, total: values.total + amount})
    }
  }

  const handleResetBtnClick = () => {
    setValues(initialValues);
    setItems([]);
  }

  const handleViewClick = (e) => {
    const stockRequestId = e.target.value;
    console.log('Stock request viewed ID:', stockRequestId);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('valid', values);
      SwalUtils.showLoadingSwal();
      axios.post('/orders', {
        customerId: values.customer,
        branchId: Cookies.get('branchId'),
        total: values.total,
        paymentMethod: values.paymentMethod,
        orderDetails: items.map(item => ({
          stockId: item.stockId,
          qty: item.qty,
          amount: item.amount
        }))
      }).then((resp) => {
        SwalUtils.closeSwal();
        SwalUtils.showSuccessSwal(resp.data.message);
        setValues(initialValues);
        axios.get('/orders/branch/' + Cookies.get('branchId'))
          .then(res => {
            console.log('orders', res.data.customerOrders);
            setOrders(res.data.customerOrders);
            setItems([]);
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
          Order
          <small> Form</small>
        </CCardHeader>
        <CCardBody>
          <CCol sm="12">
            <CForm >

              <CFormGroup row>
                <CCol md="12">
                  <CLabel htmlFor="customer">Customer</CLabel>
                </CCol>
                <CCol xs="12" md="12">
                  <CSelect value={values.customer} onChange={handleInputChange} custom name="customer" id="customer">
                    <option key="0" value="0">Select a customer</option>
                    {customers.map(customer => <option key={customer.id} value={customer.id}>{customer.nic} - {customer.name}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Payment Method</CLabel>
                </CCol>
                <CCol md="9">
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio onChange={handleInputChange} custom id="cash" name="paymentMethod" value="CASH" />
                    <CLabel variant="custom-checkbox" htmlFor="cash">Cash</CLabel>
                  </CFormGroup>
                  <CFormGroup variant="custom-radio" inline>
                    <CInputRadio onChange={handleInputChange} custom id="card" name="paymentMethod" value="CARD" />
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
                  <CSelect value={values.stock} onChange={handleInputChange} custom name="stock" id="stock">
                    <option key="0" value="0">Select a stock</option>
                    {stocks.map(stock => <option key={stock.id} value={stock.id}>{stock.id} - {stock.product.name}</option>)}
                  </CSelect>
                </CCol>
                <CCol xs="6" md="6">
                  <CInput value={values.qty || ''} onChange={handleInputChange} id="qty" name="qty" type="number"
                          placeholder="Enter Qty"/>
                </CCol>
                <CCol md="12">
                  <CButton onClick={handleAddItemClick} id="addItm" size="sm" color="success"><CIcon
                    name="cil-check"/> Add item</CButton>
                </CCol>
              </CFormGroup>

              <CDataTable
                items={items}
                fields={itemTableFields}
                itemsPerPage={5}
                pagination
                hover
                sorter
              />

              <CFormGroup row>
                <CCol md="12">
                  <CLabel id="totalLabel" htmlFor="text-input">Total: {values.total.toFixed(2)}</CLabel>
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
          Orders
        </CCardHeader>
        <CCardBody>
          <CDataTable
            items={orders.map(order => ({
              ...order,
              customer: order.customer.name,
              createdDateTime: new Date(order.createdAt).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ")
            }))}
            fields={orderTableFields}
            itemsPerPage={5}
            pagination
            hover
            sorter
            scopedSlots={
              {
                'actions': (item) => (<td>
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

export default Order
