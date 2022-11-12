import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';
import { FormContainer, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
  const stripe = useStripe();
  const element = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();

    if(!stripe && !element) {
      return
    }
  }

  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2> Credit Card Payment: </h2>
        <CardElement/>
        <Button buttonType={BUTTON_TYPES_CLASSES.inverted}> Pay now: </Button>
      </FormContainer>
    </PaymentFormContainer>
  )
}

export default PaymentForm;