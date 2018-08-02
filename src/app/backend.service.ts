import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { escape } from 'querystring';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendService {

  LoginUser = "admin";
  LoginPwd = "123";
  ProductName="11";
  CurrentMenu="";
  CurrentEvent="";
  CurrentDevice="";
  CurrentBroswer="";
  CurrentIP="";

  //serverip : any = "aepmyanmar-001-site1.ctempurl.com/book.svc";
  serverip : any = "zawpyaethan-001-site1.btempurl.com/WMS.svc";
  serverport : any = "";//":4200";


  wsProtocol="http://"; // "http://" or "https://"
  //wsServere : any ="localhost:8588" ;
  wsServere : any ="zawpyaethan-001-site1.btempurl.com";
  wsPort : any = "";//":4200";
  wsName:any = "/WMS.svc";  

  //web service get method
  wsgettestLogIn = "/testLogIn";
  wsgetAgentList = "/getAgentList";
  wsgetTransactionStatus = "/getTransactionStatusList";
  wsgetSysMenuGroup = "/getSysMenuGroup";
  wsgetSysMenuGroupList = "/getSysMenuGroupList";
  wsgetAccessMenuList = "/getAccessMenu";
  wsgetAccessControlList = "/getAccessControl";  
  wsgetSysControlGroupList = "/getSysControlGroupList";
  wsgetSysControlGroup = "/getSysControlGroup";
  wsgetSysProduct = "/getSysProduct";
  wsgetSysUserList = "/getSysUserList";
  wsgetPRFEWarehouseList = "/getPRFEWarehouseList";
  wsgetPRFEWarehouse = "/getPRFEWarehouse";
  //wsgetPRFEDirectList = "/getPRFEDirectList";
  wsgetSKUBarcodeList = "/getPRFEWarehouseList";
  wsgetCheckerWarehouseList = "/getPRFEWarehouseList";
  wsgetCountryList = "/getCountryList";
  wsgetUOMList = "/getUOMList";
  wsgetTruckTypeList = "/getTruckTypeList";
  wsgetTallyWarehouseList = "/getTallyWarehouseList";
  wsgetTallyWarehouse = "/getTallyWarehouse";
  wsgetAllocation = "/getAllocation";
  wsgetSelectCreatePickList = "/getSelectCreatePickList";
  wsgetDeliverlist = "/getDeliverlist";
  wsgetPRFEDirectList = "/getPRFEDirectList";
  wsgetPRFEForDirect = "/getPRFEForDirect";
  wsgetCheckerDirect = "/getCheckerDirect";

  //Save web service method
  wssavePRFEForDirect="/savePRFEForDirect";
  wssaveCheckerDirect = "/saveCheckerDirect";
  wssavePRFEDirect = "/savePRFEDirect";
  wssaveDeliverlist = "/saveDeliverlist";
  wssaveCreatePicklist = "/saveCreatePicklist";
  wssaveAllocation = "/saveAllocation";
  wssaveCheckerWarehouse = "/saveCheckerWarehouse";
  wssaveSKUBarcode = "/saveSKUBarcode";
  wssaveTallyWarehouse = "/saveTallyWarehouse";
  wssavePRFEWarehouse = "/savePRFEWarehouse";
  wssaveSysUser = "/saveSysUser";
  wssaveSysMenuGroup = "/saveSysMenuGroup";


  constructor(public http: Http ) 
  { 

  }

  public SaveReceived(body)
  {
    return new Promise((resolve,reject) => {

    //var body = '{"Ask":"0","BookAsk":"1","ExpiredDate":"","ExtendTime":"","Libray":"1","MarkAsk":"","MemberAsk":"4","Pwd":"wj4IdPsXzjygAFKHFdRpuw==","ReadDate":"","ReadStatus":"1","Remark":"","ReturnDate":"","Ts":"0","UD":"","User":"thura"}'
    /*  var body = {
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
     
     } */ 


     

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

  //Thura
  public wsCall(body,wsMethod)
  {
    return new Promise((resolve,reject) => {
//debugger
      var  headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      let url = this.wsProtocol+this.wsServere+this.wsPort+this.wsName+ wsMethod;
      //let url = 'http://'+this.serverip+ this.wsName+this.wsMethodAgent;  
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

  public getReceivedlist(body)
  {
    return new Promise((resolve,reject) => {   
    var  headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    let url = 'http://'+this.serverip+this.wsgetPRFEWarehouseList

    debugger

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

  
  public getTallyWarehouseList(body)
  {
    return new Promise((resolve,reject) => {   
    var  headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    let url = 'http://'+this.serverip+'/getTallyWarehouseList'

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

  
  public getPRFEWarehouseList(body)
  {
    return new Promise((resolve,reject) => {   
    var  headers = new Headers();
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    let url = 'http://'+this.serverip+'/getPRFEWarehouseList'

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



  public BindTrackType(body)
  {
    return new Promise((resolve,reject) => {

      var  headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      let url = 'http://'+this.serverip+'/getTruckTypeList'
  
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

  public BindAgent(body)
  {
    return new Promise((resolve,reject) => {

      var  headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      let url = 'http://'+this.serverip+'/getAgentList'
  
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

  public bindTrStatusList(body)
  {
    return new Promise((resolve,reject) => {

      var  headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      let url = 'http://'+this.serverip+'/getTransactionStatusList'  
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

  public BindCountry(body)
  {
    return new Promise((resolve,reject) => {

      var  headers = new Headers();
      headers.append('Content-Type', 'application/json')
      headers.append('Accept', 'application/json')
      let url = 'http://'+this.serverip+'/getCountryList'
  
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
