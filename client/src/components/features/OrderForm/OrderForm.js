import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addOrderRequest, getOrder } from '../../../redux/order/orderRedux';

const OrderForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();
  const order = useSelector((state) => getOrder(state));
  const handleSubmit = () => {
    console.log(order);
    dispatch(
      addOrderRequest(
        {
          name,
          surname,
          address,
          items: order.map((o) => {
            return { id: o.id, quantity: o.count };
          }),
        },
        setStatus,
      ),
    );
  };
  return (
    <div>
      {status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>Your order was successfully saved!. </p>
        </Alert>
      )}
      {status === 'clientError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Bad request, fill your order!</p>
        </Alert>
      )}
      {status === 'serverError' && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}
      {status === 'loading' && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            {...register('name', { required: true, minLength: 3 })}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && (
            <small className="d-block form-text text-danger mt-2">
              This field is required
            </small>
          )}
        </Form.Group>
        <Form.Group controlId="surname">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            {...register('surname', { required: true, minLength: 3 })}
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {errors.surname && (
            <small className="d-block form-text text-danger mt-2">
              This field is required
            </small>
          )}
        </Form.Group>
        <Form.Group controlId="adress">
          <Form.Label>Address:</Form.Label>
          <Form.Control
            {...register('address', { required: true, minLength: 3 })}
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {errors.address && (
            <small className="d-block form-text text-danger mt-2">
              This field is required
            </small>
          )}
        </Form.Group>
        <Button className="mt-3" type="submit">
          Send the order
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
