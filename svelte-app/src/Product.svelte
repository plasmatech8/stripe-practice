<script>
  let stripe = Stripe('pk_test_51HsS6EIGfKGYwyIQG9e1Lse6ahZ1JGml89Mnyenl38M4gwAjLpC2JycluCnJaA0xiE9lzh1CgQSc0Ou4CH1P0NKJ00kcPT6teL')
  export let amount;
  export let name;
  export let sku;

  // Function to manage checkout
  // See https://stripe.com/docs/js/checkout/redirect_to_checkout
  async function startCheckout(){
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        { price: sku, quantity: 1 }
      ],
      mode: 'payment',
      successUrl: 'https://fireship.io/success',
      cancelUrl: 'https://fireship.io/canceled',
    });
    if (error){
      alert('Our payment system is broken!');
    }
  }

</script>

<section>
  <h2>Stripe Checkout</h2>
  <i>{name}</i>
  <button on:click={startCheckout}>Buy me ${amount/100}</button>
</section>

<style>
  section {
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    border-radius: 5px; /* 5px rounded corners */
    width: 500px;
    padding: 2em;
    margin: 0 auto;
  }
  i {
    font-size: 5em;
    text-align: center;
    display: box;
    font-style: normal;
    /* ... */
  }
  button {
    background: lightgreen;
    border: none;
  }
  button:disabled {
    background: #dddddd;
    cursor: not-allowed;
  }
</style>

