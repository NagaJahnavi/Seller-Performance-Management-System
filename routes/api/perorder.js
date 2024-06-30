const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
router.post('/',async(req,res)=>{
     var edeldate, adeldate, eshipdate, ashipdate, ret, cancel, org,flag=false,id,result;
    var ret_status = "false",cancel_status = "false", del_status = "no data",ship_status = "no data", origin = "not applicable";
    var q = req.body.orderid;
    const c1 = await Order.find({ orderId: q }).cursor( );
    await c1.eachAsync(function (doc, err) {
        if (err)
            throw err;
        id=doc.orderId;
        edeldate = doc.promisedDeliveryDate;
        adeldate = doc.actualDeliveryDate;
        eshipdate = doc.promisedShipDate;
        ashipdate = doc.actualShipDate;
        ret = doc.returnStatus;
        cancel = doc.cancelStatus;
        org = doc.cancellationOrigin;
    });
    if(typeof(id)=="undefined"){
        result={status:"order not found"};
    }
else{
if (typeof (edeldate) != "undefined" && typeof (eshipdate)!= "undefined"){
    if (typeof (adeldate) != "undefined") {
        edeldate = new Date(edeldate.toISOString().substring(0, 10));
        adeldate = new Date(adeldate.toISOString().substring(0, 10));
        if (+edeldate >= +adeldate)
            del_status = "true";
        else
            del_status = "false";
    }
    if (typeof (ashipdate) != "undefined") {
        eshipdate = new Date(eshipdate.toISOString().substring(0, 10));
        ashipdate = new Date(ashipdate.toISOString().substring(0, 10));
        if (+eshipdate >= +ashipdate)
            ship_status = "true";
        else
            ship_status = "false";
    }
}
if (typeof (ret) != "undefined")
    ret_status = true;
if (typeof (cancel) != "undefined") {
    cancel_status = true;
    origin = org;
}
result={ delivery: del_status, shipping: ship_status, return: ret_status, cancel: cancel_status, cancel_origin: origin};
}
  res.json(result);
});

module.exports=router;
