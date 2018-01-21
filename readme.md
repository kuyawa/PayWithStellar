# PayWithStellar for Instant Payment

![marketplace](https://raw.githubusercontent.com/kuyawa/PayWithStellar/master/media/stellarmarket.jpg)

## What is PayWithStellar?

**PayWithStellar** is a simple button that easily enables your website to receive payments in XLM Lumens, the currency used in the Stellar Network as the leading platform for world commerce.

## How to use it?

In order to use **PayWithStellar** on your site you need to follow these easy steps:

- Have a Stellar account with at least 1 XLM in funds
- Download the PayWithStellar.js file from [here](https://github.com/kuyawa/PayWithStellar/tree/master/scripts)
- Download the PayWithStellar.jpg button image from [here](https://github.com/kuyawa/PayWithStellar/blob/master/media/paywithstellar.jpg)
- Add a click event to all your insta-pay buttons or to your checkout form at the end:

````HTML
<button onclick="PayWithStellar.payment(event, 950.00, 'YourOrderID')">
    <img src="/media/paywithstellar.jpg">
</button>
````

- Add confirm and cancel methods to process your orders based on our response
````HTML
<script>
function myOrderConfirm(refid) {
    if(PayWithStellar.lastOrder() == refid){
        alert('Thank you for your purchase!\nOrder ID: '+refid);
        // Confirmed order id {refid}
        // redirect to download link
        // window.location.href = 'http://example.com/download/'+refid
    }
}
function myOrderCancel(refid) {
    // alert('Continue shopping!');
    // Cancel order id {refid}
}
</script>
````

- Initalize the PayWithStellar object with some options:

````JS
window.onload = function(){ 
    var options = {
        horizon    : 'test', // live
        address    : 'G1234567890123456789012345678901234567890123456789012345',
        currency   : 'EUR',  // USD, CAD, etc
        onConfirm  : myOrderConfirm,
        onCancel   : myOrderCancel,
    };
    PayWithStellar.main(options);
};
````

- Add the PayWithStellar.js and StellarSDK.js libraries at the end of your html code

````HTML
    <script src="stellar-sdk.js"></script>
    <script src="paywithstellar.js"></script>
````

For more detailed information on how to set up your PayWithStellar button please refer to the [User Guide](https://github.com/kuyawa/PayWithStellar/blob/master/docs/userguide.md)

## Security first

We never ever ask for your secret key and you should never share it with anybody or enter it on any site. All the code is available on Github for peer review so it can be fully scrutinized by security experts worldwide.

Our library only checks for payments and when it finds a new one it validates it against the order ID and the amount, if they match the payment is considered valid and confirmed so you can proceed with the checkout while your customers never leave your site.

## How much will it cost?

Nothing. If you are a web developer and have basic html and javascript knowledge you can do it all by yourself in less than ten minutes. If you need help we will setup a site offering services for merchants like email confirmation, transaction explorer, orders and fulfillment, tracking, stats, etc. and we will charge the lowest fees in the market, not 10%, not 5%, just 1% so you keep all your hard earned money for your business.

## Ok, I'm interested, what now?

Wait for the public announcement while we finish testing and improving the libraries for all possible scenarios. Security is the most important aspect and we take it very seriously.

Come back soon!

## Can I use that cool button in my own site?

Sure! Go ahead and spread the love for Stellar, the world will be a better place if we all do, what's not to love about instant purchases and strict security in a highly reliable platform like the Stellar Network? Become one of the first merchants to offer the Stellar gateway in your site and enjoy the benefits of instant payments right now.

![PayWithStellar](https://raw.githubusercontent.com/kuyawa/PayWithStellar/master/media/paywithstellar.jpg)

You can see it running in this test site, play with it and pay with fake money to test the power of instant payments with Stellar.

[PayWithStellar Test Site](https://myplaynet.herokuapp.com/paywithstellar)

And please donate to help create more tools for the Stellar platform.

    GALT5LR4TDTR5TX7GFHYZQIZRDD6HX32YHXYII7CAFG3ZOZALZUYGMZK

----

## Changelog

- Added world currencies
- Initialize PayWithStellar object with options

----

External libraries

- Stellar SDK by the Stellar Foundation - https://github.com/stellar/js-stellar-sdk/
- QRCode JS by David Shim - https://github.com/davidshimjs/qrcodejs