# User Guide

Ok, first of all you need a Stellar account since payments will be sent to that account using Stellar XLM, so [go get one](https://www.stellar.org/account-viewer) and fund it with at least 1 XLM.

Once you have your account ready, we will be using the **public key** only, keep your **secret key** in a safe place and do not share it, do not enter it in any website on the internet. The public key is the address people will use to send you payments for their purchases.

Download the PayWithStellar button image from [here](https://github.com/kuyawa/PayWithStellar/blob/master/media/paywithstellar.jpg) and save it in your website media folder.

Download the PayWithStellar script from [here](https://github.com/kuyawa/PayWithStellar/tree/master/scripts) and save it in your website scripts folder.

Whenever you want a customer to buy something just place a button on your site. You can place one button for every item or one single button on the checkout form, feel free to style them to fit your website's theme.

The buttons should have the following attributes:

````HTML
<button onclick="PayWithStellar.payment(event, 950.00, 'YourOrderID')">
    <img src="/media/paywithstellar.jpg">
</button>
````
The parameters passed to the payment method are the event (literal word), the amount of the purchase and the order id which could be any reference to orders, transactions, tokens, etc that you control on your site to identify purchases.

The onclick event will call our library to listen for payments sent to your account. If a payment is received we will verify that the order Id and amount do match, only then the payment is confirmed and you will be notified.

The payment process can emit two possible outcomes: Confirm or Cancel. You need to define two methods to handle both scenarios in your site using the following format:

````HTML
<!-- Your two functions to capture our events -->
<script>
function myOrderConfirm(refid, txid) {
    if(PayWithStellar.lastOrder() == refid){
        alert('Thank you for your purchase!\nOrder ID: '+refid);
        // Confirmed order id {refid}
        // Validate Stellar txid on server for better security
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

You should define these events to do some post-processing after the order has been confirmed for automated fulfillment, redirecting to download links, etc.

Then initialize the PayWithStellar object with your options like:

````JS
window.onload = function(){ 
    var options = {
        horizon    : 'test',  // live
        address    : 'G1234567890123456789012345678901234567890123456789012345',
        currency   : 'EUR',   // USD, CAD, etc.
        onConfirm  : myOrderConfirm,
        onCancel   : myOrderCancel,
    };
    PayWithStellar.main(options);
};
````

The simplest use assuming live network, no post-processing and USD currency would be:

````JS
window.onload = function(){ 
    PayWithStellar.main({address: 'G1234567890123456789012345678901234567890123456789012345'});
};
````

Finally, add the Stellar SDK and PayWithStellar libraries at the end of the html page:

````HTML
<script src="/scripts/stellar-sdk.js"></script>
<script src="/scripts/paywithstellar.js"></script>
````

* Note: While we aim for excellence in the confirmation process, it is also good practice to check your Stellar account's ledger for incoming payments to catch transactions that for some reason could not be verified by our library so you can offer superb customer service when required. *

If you have problems implementing the PayWithStellar button or want to share any feedback, please [open an issue](https://github.com/kuyawa/PayWithStellar/issues) and we will gladly help you.

