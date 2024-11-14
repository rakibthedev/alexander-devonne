import { useState, useImperativeHandle, forwardRef } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';

// eslint-disable-next-line react/display-name
const CheckoutForm = forwardRef(({ cartItems, formData, setLoading , sendOrderData}, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setInternalLoading] = useState(false);
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNameError, setCardNameError] = useState(null);
  const [cardNumberError, setCardNumberError] = useState(null);
  const [cardExpiryError, setCardExpiryError] = useState(null);
  const [cardCvcError, setCardCvcError] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [cardBrand, setCardBrand] = useState('');


  // Expose handleSubmit function to the parent component
  useImperativeHandle(ref, () => ({
    handleValidate: async (event) => {
      if (event) {
        event.preventDefault(); // Prevent the default form submission behavior
      }

      setInternalLoading(false);  // Set local loading state
      setLoading(false);  // Notify parent to show loading

      setPaymentError(null);
     
      if (!cardHolderName) {
        setCardNameError('Please enter card holder name');
      }

      if (!stripe || !elements) {        
        return;
      }

      const cardNumber = elements.getElement(CardNumberElement);

      // Create PaymentMethod with the card details
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: { name: cardHolderName },
      });

      if (paymentError) {
        setPaymentError(paymentError.message);
        return false;
      }else{
        if(!cardNameError){
         
          return ({
            holderName: cardHolderName,
            cardBrand: cardBrand
          });
        }
      }
    },




    handleSubmit: async (event) => {
      if (event) {
        event.preventDefault(); // Prevent the default form submission behavior
      }

      setInternalLoading(true);  // Set local loading state
      setLoading(true);  // Notify parent to show loading

      setPaymentError(null);
     
      if (!cardHolderName) {
        setCardNameError('Please enter card holder name');
      }

      if (!stripe || !elements) {
        setInternalLoading(false);  // Stop loading if Stripe or Elements is not available
        setLoading(false);
        return;
      }

      const cardNumber = elements.getElement(CardNumberElement);

      // Create PaymentMethod with the card details
      const { error: paymentError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardNumber,
        billing_details: {
          name: cardHolderName,
          email: formData.email,
          address: {
            line1: formData.billing.address_1,
            line2: formData.billing.address_2,
            city: formData.billing.city,
            state: formData.billing.state,
            postal_code: formData.billing.postcode,
            country: formData.billing.country,
          },
          phone: formData.billing.phone,
        },
      });

      if (paymentError) {
        setPaymentError(paymentError.message);
        setInternalLoading(false); // Stop loading in case of error
        setLoading(false);  // Stop loading in the parent        
        return;
      }

      // Call backend to create PaymentIntent and process the payment
      const paymentIntentResponse = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/stripe/payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          paymentMethodId: paymentMethod.id, 
          cartItems,
          formData, 
        }),
      });

      const data = await paymentIntentResponse.json();

      if (paymentIntentResponse.ok) {        
        setInternalLoading(true);  // Stop loading when payment is successful
        setLoading(true);  // Notify parent to stop loading
        console.log({
          success: data.success,          
          message: "Payment successfull",
          // data: data.paymentDetails,
          // orderId: data.orderId,
        });
        // Convert the object to a URL-safe query string format
        const orderData = {
          orderId: '',
          items: cartItems,
        }
        const orderedItems = JSON.stringify(orderData);
        localStorage.setItem("orderedItems", orderedItems);          

        sendOrderData();

      } else {        
        setPaymentError('Payment failed. Please try again.');
        setInternalLoading(false);  // Stop loading on failure
        setLoading(false);  // Stop loading in the parent
        return "error_found";
      }
    },

  }));

  const handleCardNameChange = (event) => {
    const { value } = event.target;
    setCardHolderName(value);
    setPaymentError(null);

    if (!value) {
      setCardNameError('Please enter card holder name');
    } else {
      setCardNameError(null);
    }
  };

  const handleCardNumberChange = (event) => {
    setPaymentError(null);

    if (event.complete) {
      setCardNumberError(null); // Clear error if valid
      setCardBrand(event.brand);
    } else {
      if (!event.empty) {
        setCardNumberError('Please enter a valid card number'); // Invalid number
      } else {
        setCardNumberError('Please enter a card number'); // Empty field
      }
    }
  };

  const handleCardExpiryChange = (event) => {
    setPaymentError(null);

    if (event.complete) {
      setCardExpiryError(null); // Clear error if valid
    } else {
      if (!event.empty) {
        setCardExpiryError('Please enter a valid expiry date'); // Invalid expiry date
      } else {
        setCardExpiryError('Please enter an expiry date'); // Empty field
      }
    }
  };

  const handleCardCvcChange = (event) => {
    setPaymentError(null);

    if (event.complete) {
      setCardCvcError(null); // Clear error if valid
    } else {
      if (!event.empty) {
        setCardCvcError('Please enter a valid CVC'); // Invalid CVC
      } else {
        setCardCvcError('Please enter a CVC'); // Empty field
      }
    }
  };

  // Check if the form is valid (no errors and name entered)
  const isFormValid = () => {
    return !cardNumberError && !cardExpiryError && !cardCvcError && !cardNameError;
  }                                                                                            

  const cardElementStyle = {
    base: {
      fontSize: '11px',
      color: '#000',
      letterSpacing: '0.025em',
      '::placeholder': {
        color: 'transparent',
      },
    },
    invalid: {
      color: '#000',
    },
    complete: {
      color: '#000',
    },
  };

  return (
    <div className="payment-form w-full flex flex-col gap-4">
      {/* Payment Error */}
      {paymentError && <div className="text-xs text-[#ff0000]">{paymentError}</div>}  
      {/* Cardholder Name Input */}
      <div className={`field-container`}>
        <div className={`form-field relative rounded h-12 ${cardNameError ? 'bg-[#00448a33]' : 'bg-white'}`}>
          <input
            type="text"
            className="outline-none w-full text-[11px] border-none p-0 block bg-transparent"
            onChange={handleCardNameChange}
            value={cardHolderName || ''}
          />
          <div className="absolute top-1 left-0 px-[14px] text-black/65 text-[9px] font-ibmPlexMedium">Name on Card</div>
        </div>
        {cardNameError && <div className="text-xs text-[#196cb1] mt-1">{cardNameError}</div>}
      </div>

      {/* Card Number Element */}
      <div className={`field-container`}>
        <div className={`form-field relative rounded h-12 ${cardNumberError ? 'bg-[#00448a33]' : 'bg-white'}`}>
          <CardNumberElement
            options={{ style: cardElementStyle }}
            onChange={handleCardNumberChange}
          />
          <div className="absolute top-1 left-0 px-[14px] text-black/65 text-[9px] font-ibmPlexMedium">Card Number</div>
        </div>
        {cardNumberError && <div className="text-xs text-[#196cb1] mt-1">{cardNumberError}</div>}
      </div>

      <div className='flex gap-4'>
        {/* Expiry Date & CVC Elements */}
        <div className={`field-container w-full`}>
          <div className={`form-field relative rounded h-12 ${cardExpiryError ? 'bg-[#00448a33]' : 'bg-white'}`}>
            <CardExpiryElement
              options={{ style: cardElementStyle }}
              onChange={handleCardExpiryChange}
            />
            <div className="absolute top-1 left-0 px-[14px] text-black/65 text-[9px] font-ibmPlexMedium">Expiration (MM/YY)</div>
          </div>
          {cardExpiryError && <div className="text-xs text-[#196cb1] mt-1">{cardExpiryError}</div>}
        </div>

        {/* CVC Element */}
        <div className={`field-container w-full`}>
          <div className={`form-field relative rounded h-12 ${cardCvcError ? 'bg-[#00448a33]' : 'bg-white'}`}>
            <CardCvcElement
              options={{ style: cardElementStyle }}
              onChange={handleCardCvcChange}
            />
            <div className="absolute top-1 left-0 px-[14px] text-black/65 text-[9px] font-ibmPlexMedium">CVC</div>
          </div>
          {cardCvcError && <div className="text-xs text-[#196cb1] mt-1">{cardCvcError}</div>}
        </div>
      </div>    

      {/* Submit Button (hidden in this component) */}
    </div>
  );
});

export default CheckoutForm;
