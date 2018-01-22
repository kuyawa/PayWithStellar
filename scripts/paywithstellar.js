// PayWithStellar v1.0

var PayWithStellar = (function(){

    var styleSource = '<style>'+
        '#payxlm-modal { z-index:  999; position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; text-align: center; }'+
        '#payxlm-modbg { z-index: -999; position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; background-color: #000; opacity: 0.6; text-align: center; }'+
        '#payxlm-form  { z-index: 9999; position: fixed; top: 0; left: 0;/*bottom: 0;*/right: 0; max-width: 540px; margin: 40px auto; padding: 20px; background-color: #FFF; border: 1px solid #CCC; border-radius: 4px; text-align: center; box-shadow: 0 0 40px rgba(0,0,0,1); }'+
        '#payxlm-form li { list-style-type: none; }'+
        '#xlm-logo { text-align: center; }'+
        '#xlm-actions button { padding: 3px 20px; background-color: #CCC; border: 1px solid #AAA; border-radius: 3px; }'+
        '#xlm-actions button:hover  { color: #000; background-color: #DDD; cursor: pointer; }'+
        '#xlm-actions button:active { color: #333; background-color: #AAA; }'+
        '#xlm-after { padding: 10px 0; }'+
        '#xlm-address { text-align: center; font-size: 1.2em; font-family: monospace; word-wrap: break-word; }'+
        '#xlm-qrcode { width: 200px; height: 200px; margin: 0 auto; }'+
        '#xlm-qrcode img { width: 200px; height: 200px; }'+
        '@media screen and (max-width: 980px) and (orientation: portrait) {'+
        ' #payxlm-form { bottom: 0; margin: 0 auto; padding: 10px; } }'+
        '</style>';

    // Included for faster load times
    var buttonImg = "data:image/jpg;base64,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";

    var formTemplate = styleSource+
        '<li id="xlm-logo"><img src="'+buttonImg+'"></li>'+
        '<li>Please send payment of <span id="xlm-total">{total}</span> XLM to the following address and include code {refid} in the memo field</li>'+
        '<li id="xlm-address">{address}</li>'+
        '<div id="xlm-qrcode"></div>'+
        '<li id="xlm-after">Payments usually take less than 10 secs to confirm. After payment is sent please wait for confirmation</li>'+
        '<li id="xlm-actions"><button onclick="PayWithStellar.onConfirm()">CONFIRM</button> <button onclick="PayWithStellar.onCancel()">CANCEL</button></li>'+
        '<li id="xlm-results"></li>';
        //'<a href="{intent}" target="_blank"><div id="xlm-qrcode"></div></a>'+
        //'<li>If you are on mobile</li><li>touch the QR-Code to take you to your wallet</li>';


    function payment(event, amount, refid) {
        var already  = $('payxlm-form');
        if(already) { hideModal(); return; }
        state.amount = amount;
        state.refid  = refid;
        var event    = event || window.event
        var source   = event.target;
        var calc     = Math.round(state.amount / state.priceFiat / state.priceUsd); 
        var total    = money(calc, calc<1?4:2);
        console.log(state.amount, state.priceFiat, state.priceUsd, calc, total); 
        var memo     = escape(refid); // unescape on client
        var intent   = 'stellar://payment/'+state.options.address+'/'+amount+'/'+memo+'/';
        if(epoch()-state.lastCheck > state.options.refreshRate){ getTicker(true); }  // Update price after 5 mins

        // Build modal popup
        var modal   = document.createElement('div');
        var modbg   = document.createElement('div');
        var form    = document.createElement('div');
        var content = formTemplate.replace('{total}', total).replace('{refid}',refid).replace('{address}',state.options.address).replace('{intent}',intent);
        
        modal.setAttribute('id', 'payxlm-modal');
        modbg.setAttribute('id', 'payxlm-modbg');
        form.setAttribute('id',  'payxlm-form');
        form.innerHTML = content;
        modal.appendChild(modbg);
        modal.appendChild(form);
        document.body.appendChild(modal);
        
        showQrcode();
        checkPayments(refid, total);
    }

    function lastOrder() {
        var oid = state.orderid;
        state.orderid = null; // Reset to avoid multiple calls
        return oid;
    }

    function onConfirm() {
        if(!state.orderid){
            alert('Payment not received yet.\nPlease send payment to confirm order.');
        }
    }

    function onCancel() {
        hideModal();
        state.orderid = null; // Reset to avoid issues
        if(state.channel) { state.channel(); } // Close stream
        state.options.onCancel(state.refid);
    }

    function hideModal() {
        var modal = $('payxlm-modal');
        modal.style.display = 'none';
        modal.parentNode.removeChild(modal);
    }

    function showQrcode() {
        new QRCode('xlm-qrcode', state.options.address);
    }

    function getTicker(update=false) {
        console.log('Ticker');
        //var url = '/data/xlmprice.json';
        var url = 'https://api.coinmarketcap.com/v1/ticker/stellar/';
        webget(url, function(json) { 
            if(!json || json.error) {
                PayWithStellar.ready = false;
                state.ready = false;
                alert('Internet connection error.\nPayments are suspended');
                return;
            }
            PayWithStellar.ready = true;
            state.ready      = true;
            state.priceUsd   = parseFloat(json[0].price_usd);
            state.lastCheck  = epoch();
            if(update){ updateTotal(); }
        });
    }

    function updateTotal() {
        console.log('Update total');
        var calc  = Math.round(state.amount / state.priceFiat / state.priceUsd);
        var total = money(calc, calc<1?4:2);
        var tag   = $('xlm-total');
        if(tag) { tag.innerHTML = total; }
    }

    function getCurrency(fiat) {
        console.log('Fiat: ', fiat);
        if(fiat == 'USD') { return; }
        //var url = '/data/currencies.json';
        var url = 'https://finance.yahoo.com/webservice/v1/symbols/allcurrencies/quote?format=json';
        webget(url, function(json) { 
            if(!json || json.error) {
                PayWithStellar.ready = false;
                state.ready = false;
                alert('Internet connection error.\nPayments are suspended');
                return;
            }

            var found  = false;
            var symbol = 'USD/'+fiat;
            console.log(json.list);
            console.log(json.list.resources.length);

            for (var i = 0; i < json.list.resources.length; i++) {
                var item = json.list.resources[i];
                if(item.resource.fields.name == symbol){ 
                    state.priceFiat = parseFloat(item.resource.fields.price); 
                    found = true;
                    break;
                }
            }

            if(!found) { 
                console.log('Not found ',fiat);
                alert('Currency price not found. Payments disabled'); 
                state.ready = false; 
                PayWithStellar.ready = false;
                return; 
            }

            console.log('Found ', fiat, state.priceFiat);
            state.ready = true;
            PayWithStellar.ready = true;
        });
    }

    //---- PAYMENT CONFIRMATION

    function checkPayments(refid, total) {
        var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        if(state.net=='live') {
            server = new StellarSdk.Server('https://horizon.stellar.org');
        }

        state.channel = server.transactions().forAccount(state.options.address).cursor('now').stream({
            onmessage: function(transaction) {
                if(transaction.memo == refid) {
                    console.log('Found it ', refid);
                    transaction.operations().then(function(ops){
                        // get first op 
                        var payment = ops._embedded.records[0];
                        if(parseInt(parseFloat(payment.amount)*100) < parseInt(parseFloat(total)*100)) { 
                            alert('Payment insufficient. Purchase not completed'); 
                        } else { onPayment(payment); }
                    }).catch(function(error) {
                        error.target.close(); // Close stream
                        console.error('Payment Error: ', error);
                        alert('Error confirming payment. Try again later');
                    });
                }
            },
            onerror: function(error) {
                error.target.close(); // Close stream
                console.error('Streaming Error: ', error);
                alert('Error confirming payment. Try again later');
            }
        });
    }

    function onPayment(payment) {
        console.log('Payment received');
        hideModal();
        state.channel = null;
        state.orderid = state.refid;
        state.txid    = payment.id;
        state.options.onConfirm(state.refid, state.txid);
    }

    function getState() {
        //return state;  // For debugging only
    }


    //---- UTILS

    function $(id)   { return document.getElementById(id); }

    function epoch() { return (new Date()).getTime(); }

    function money(text, dec=2, comma=false) {
        var num = 0;
        if(comma){
            num = parseFloat(text).toLocaleString("en", {minimumFractionDigits: dec, maximumFractionDigits: dec});
        } else {
            num = parseFloat(text).toFixed(dec);
        }
        return num;
    }

    function webget(url, callback, target) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function() { 
            if(http.readyState==4) { 
                //console.log('Response: '+http.responseText);
                var json = null;
                try { 
                    json = JSON.parse(http.responseText); 
                } catch(ex) { 
                    console.log("JSON ERROR", ex.message); 
                    console.log('RESPONSE', http.responseText); 
                    //alert('Connection error');
                    json = { error: true, message: ex.message };
                }
                callback(json, target);
            } 
        };
        http.send();
    }


    //---- MAIN

    var baseOptions = {
        horizon     : 'live',
        merchantId  : '',
        registered  : false,
        address     : '',
        currency    : 'USD',
        refreshRate : 300000,
        onConfirm   : function(refid, txid) { alert('Payment confirmed!'); },
        onCancel    : function(refid) {}
    }

    var state = {
        ready     : false, 
        options   : baseOptions,
        priceUsd  : 1.0, 
        priceFiat : 1.0, 
        lastCheck : 0,
        lastToken : null,
        amount    : 0.0,
        txid      : '',
        refid     : '', 
        orderid   : '',
        channel   : null,
        payments  : null,
        onConfirm : null, 
        onCancel  : null
    };

    function main(options) {
        if(!options) { options = baseOptions; }
        if(!options.address) { alert('Fatal error: Stellar address not set up.\nRefer to the user guide.'); return; }
        state.options.horizon     = options.horizon     || 'live';
        state.options.merchantId  = options.merchantId  || '';
        state.options.address     = options.address     || '';
        state.options.currency    = options.currency    || 'USD';
        state.options.refreshRate = options.refreshRate || 300000;
        state.options.onConfirm   = options.onConfirm;
        state.options.onCancel    = options.onCancel;
        if(state.options.currency.toUpperCase()!='USD'){ getCurrency(state.options.currency); }
        options = null;
        getTicker();
    }

    var App = {
        ready     : false,
        main      : main,
        payment   : payment,
        lastOrder : lastOrder,
        onConfirm : onConfirm,
        onCancel  : onCancel
    };

    return App;

})();


//---- QRCODE --------------------------------------------------------------------
// QRCodeJS by David Shim - https://github.com/davidshimjs/qrcodejs
// Embedded script to avoid loading external libraries except StellarSDK
//--------------------------------------------------------------------------------
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){
var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,
b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}
this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}
function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}
function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);
for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}
function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;
return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}
function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}
if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");
return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},
b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);
return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},
makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);
for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),
this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),
this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},
setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},
getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();
for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);
for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)
for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},
setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);
this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}
for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)
for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},
b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;
if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);
for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;
j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;
var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;
for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};
for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],
[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],
[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,
getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},
getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;
case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;
default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},
getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;
case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;
default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))
for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;
a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;
e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);
for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;
var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;
return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];
for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;
c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;
for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);
return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],
[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],
[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],
[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],
[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],
[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],
[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],
[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],
[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],
j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e}
,j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},
k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);
this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};
var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],
[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],
[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],
o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);
for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();
var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});
h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));
for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});
k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();
)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;
if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};
return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}
if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}
var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),
this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};
return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;
c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},
e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};
return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");
for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;
k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];
"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},
QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();

// END