const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post('/',async(req,res)=>{
    var tod = 0, tos = 0, dot = 0, sot = 0, r = 0, to = 0, c = 0,id,flag=false,result;
    var date1 = new Date(req.body.date1);
    var date2 = new Date(req.body.date2);
    var cursor = Order.find({ sellerId: req.body.sellerid }).cursor( );
    await cursor.eachAsync(function (doc, err) {
        if (err)
            throw err;
        id=doc.sellerId;
        edeldate = doc.promisedDeliveryDate;
        adeldate = doc.actualDeliveryDate;
        eshipdate = doc.promisedShipDate;
        ashipdate = doc.actualShipDate;
        ret = doc.returnStatus;
        cancel = doc.cancelStatus;
        org = doc.cancellationOrigin;
        odate = doc.orderDate;
        odate = new Date(odate.toISOString().substring(0, 10));
        if (!flag && typeof(id) != "undefined")
            flag = true;
        if (+odate >= +date1 && +odate <= +date2) {
            to++;
            if (typeof (edeldate) != "undefined" && typeof (adeldate) != "undefined") {
                edeldate = new Date(edeldate.toISOString().substring(0, 10));
                adeldate = new Date(adeldate.toISOString().substring(0, 10));
                if (+edeldate >= +adeldate) {
                    tod++;
                    dot++;
                }
                else
                    tod++;
            }
            if (typeof (eshipdate) != "undefined" && typeof (ashipdate) != "undefined") {
                eshipdate = new Date(eshipdate.toISOString().substring(0, 10));
                ashipdate = new Date(ashipdate.toISOString().substring(0, 10));
                if (+eshipdate >= +ashipdate) {
                    tos++;
                    sot++;
                }
                else {
                    tos++;
                }
            }
            if (typeof(ret) != "undefined") {
                r++;
            }
            if (typeof(cancel) != "undefined" && org != "buyer") {
                c++;
            }
        }
    });
    if(flag==false)
      result={status:"seller not found"};
    else{
    var del_metric = "Not Applicable", ship_metric = "Not Applicable", return_metric = "Not Applicable";
    var cancel_metric = "Not Applicable";
    var health_status = "healthy";
    if (tod != 0) {
        del_metric = (dot / tod) * 100;
        if (del_metric < 98)
            health_status = "unhealthy"
    }
    if (tos != 0) {
        var ship_metric = (sot / tos) * 100;
        if (ship_metric < 98)
            health_status = "unhealthy";
    }
    if (to != 0) {
        var return_metric = (r / to) * 100;
        if (return_metric > 1)
            health_status = "unhealthy";
    }
    if (to != 0) {
        var cancel_metric = (c / to) * 100;
        if (cancel_metric > 2)
            health_status = "unhealthy";
    }
       if(tod==0 && tos==0 && r==0 && c==0)
         health_status="not applicable";
    result={ health: health_status};
}
  res.json(result);
});

module.exports=router;
