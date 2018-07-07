import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { escape } from 'querystring';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  //serverip : any = "aepmyanmar-001-site1.ctempurl.com/book.svc";
  serverip : any = "zawpyaethan-001-site1.btempurl.com/WMS.svc";
  serverport : any = "";

  constructor(public http: Http ) 
  { 

  }

  public SaveReceived()
  {
    return new Promise((resolve,reject) => {

    //var body = '{"Ask":"0","BookAsk":"1","ExpiredDate":"","ExtendTime":"","Libray":"1","MarkAsk":"","MemberAsk":"4","Pwd":"wj4IdPsXzjygAFKHFdRpuw==","ReadDate":"","ReadStatus":"1","Remark":"","ReturnDate":"","Ts":"0","UD":"","User":"thura"}'
    var body = {
      "UserID" : "admin",
      "Password" : "123",
      "ProductAsk":"11",
      "Ask":"0",
      "BookingID":"BookingID1",
      "AgentAsk":"",
      "Shipper":"",
      "CountryAsk":"",
      "CargoReceivedDate":"",
      "CustomIssuedDate":"",
      "TransactionDate":"",
      "Signature":"",
      "SignatureDate":"",
      "BookingStautsAsk":"",
      "NoOfTruck":"",
      "NoOfContainer":"",
      "DisplaySequence":"",
      "Remark":"",
      "ShipperList":[{
         "Ask":"0",
        "ShipperName":"Shipper1",
        "ShipperDetails":"",
        "TruckList":[{
              "Ask":"0",
              "TruckID":"Truck11",
              "TruckTypeAsk":"",
              "POList":[{
                    "Ask":"0",
                    "PONo":"PO111",
                    "ShippingMark":"",
                    "ReferenceNo":"",
                    "SKUList":[{
                          "Ask":"0",
                          "SKUName":"SKU1111",
                          "SKUDetails":"",
                          "DimensionWidth":"0",
                          "DimensionHeight":"0",
                          "DimensionBase":"0",
                          "SKUWeight":"0",
                          "PlanQty":"0",
                          "UOMAsk":"0",
                          "ReceivedQty":"",
                          "Reference":"",
                          "TruckID":"",
                          "TruckType":"",
                          "GoodQty":"",
                          "DamageQty":"",
                          "ShortLandQty":"",
                          "OverlandQty":"",
                          "Goodphoto":"",
                          "Damagephoto":"",
                          "ShortLandphoto":"",
                          "Overlandphoto":""
                          
                          }
                      ]
                    },
                   {
                     "Ask":"0",
                      "PONo":"PO112",
                      "ShippingMark":"",
                      "ReferenceNo":""
                   },
                   {
                     "Ask":"0",
                      "PONo":"PO113",
                      "ShippingMark":"",
                      "ReferenceNo":""
                   }
                ]
            },
           {
             "Ask":"0",
             "TruckID":"Truck12",
             "TruckTypeAsk":""
           },
           {
             "Ask":"0",
              "TruckID":"Truck13",
              "TruckTypeAsk":""
           }]
        
         },
         {
         "Ask":"0",
         "ShipperName":"Shipper2",
         "TruckTypeAsk":""
         }
     ]
     
     }
    var  headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    let url = 'http://'+this.serverip+'/savePRFEWarehouse'

    this.http
    .post(url,
      body, {
        headers: headers
      })
      .subscribe(data => {
        console.log(data);
             resolve(data.json());
      }, error => {
        reject("error");
          console.log(JSON.stringify(error.json()));
      });
      
    })


  } 


}
