import { ViewChild,AfterViewInit, ElementRef,Component, OnInit,NgModule, ANALYZE_FOR_ENTRY_COMPONENTS  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Http,RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Inject } from '@angular/core';  
import {Router} from '@angular/router';
import { jqxMenuComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxmenu';
import { jqxGridComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxgrid';
import { jqxButtonComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbuttons';
import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { jqxComboBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcombobox';
import { HomeComponent } from '../home/home.component';
import { jqxDateTimeInputComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxTextAreaComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxtextarea';
import { getLocalization } from 'jqwidgets-scripts/localization';
import { Tree } from '../../../node_modules/@angular/router/src/utils/tree';

@Component({
  selector: 'app-setbarcodemappingforexport-w',
  templateUrl: './setbarcodemappingforexport-w.component.html',
  styleUrls: ['./setbarcodemappingforexport-w.component.css']
})
export class SetbarcodemappingforexportWComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('cboTruckType') cboTrucType: jqxComboBoxComponent;
  @ViewChild('cboUOM') cboUOM: jqxComboBoxComponent;

  //Place holder
  bookingnoplaceholder: string;
  shipperlaceholder: string;
  statusplaceholder: string;
  trdateplaceholder: string;
  agentplaceholder : any;

  //grid 
  source: any;
  dataAdapter: any;
  columns : any=[];
  trucktype:any;  

  agentcombo_Adapter : any;  
  AgentList : any = [];
  agentsource : any = [];

  //Truck Type Combo
  cboTruckTypeAdapter : any;  
  cboTruckTypeList : any = [];
  cboTruckTypeSource : any = [];

 //Truck Type Combo
 cboUOMAdapter : any;  
 cboUOMList : any = [];
 cboUOMSource : any = [];

  HeaderJson:any;
  DetailJson : any;
  saveJsonParaSKU:any;
  getJsonParaUser= {"UserID":"","Password":"","ProductAsk":""};
  saveJsonParamenter={
    "UserID" : "",
    "Password" : "",
    "ProductAsk":"11",
    "BookingAsk":"",
    "AgentAsk":"",
    "ShipperAsk":"0",
    "ContainerAsk":"0",
   "Ask":"0",
   "SKUName":"",
   "SKUDetails":"",
   "DimensionWidth":"0",
   "DimensionHeight":"0",
   "DimensionBase":"0",
   "SKUWeight":"0",
   "PlanQty":"0",
   "UOMAsk":"0",
   "ReceivedQty":"0",
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
  //DetailJson = '[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]';

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bookingnoplaceholder = "BookID";
    this.agentplaceholder = 'Agent';
    this.shipperlaceholder="Shipper";
    this.bindAgent();
    //alert("call contructor");
    //this.ngAfterViewInit();
    // this.countryplaceholder = "Country"
    // this.nooftrackplaceholder = "NoOfTruck";
    // this.noofcontainerplaceholder = "NoOfContainer";
    // this.remarkplaceholder = "Remark";
    // this.bindHeader();
    // this.createGrid();  
        
  }
  
bindAgent()
{    
    var jsonbody = {"UserID":"Admin","Password":"123","ProductAsk":"11"}
   // this.backendservice.BindAgent(jsonbody).then(data =>
   this.backendservice.wsCall(jsonbody,this.backendservice.wsgetAgentList).then(data =>      
    {
        this.AgentList = data;
        this.agentsource ={
            dataType: 'json',
            dataFields: [ { name: 'AgentName'}, { name: 'Ask'}  ],
            localdata: this.AgentList
        }
        this.agentcombo_Adapter = new jqx.dataAdapter(this.agentsource)
    })
}
  ngAfterViewInit() {
    var bookask;
    var agentask;

    this.route.params.subscribe(params => {
        bookask = +params['param1']; 
        agentask = +params['param2']; 
    })

    alert(bookask);
      // this.bindTrackType();
      // this.bindUOM();
      this.getPRFEWarehouseList(bookask,agentask).then(data =>
        {
            // debugger
            // this.bindTrackType();
            // this.bindUOM();
        }
      )
  }

  getPRFEWarehouseList(setupbookask,setupagentask)
  {
    //alert(setupbookask);
    return new Promise((resolve,reject) => { 
      debugger
    var body = {
        "UserID" : "admin",
        "Password" : "123",
        "ProductAsk":"11",
        "Ask":"" +setupbookask+"",
        "BookingID":"0",
        "AgentAsk": "",
        "Shipper":"",
        "CountryAsk":"",
        "CargoReceivedDate":"",
        "CustomIssuedDate":"",
        "TransactionDate":"",
        "Signature":"",
        "SignatureDate":"",
        "BookingStatusAsk":"",
        "NoOfTruck":"",
        "NoOfContainer":"",
        "TruckAsk":"",
        "TruckID":"",
        "TruckTypeAsk":"",
        "PONo":"",
        "ShippingMark":"",
        "ReferenceNo":"",
        "SKUAsk":"",
        "SKUName":"",
        "SKUDetails":"",
        "DimensionWidth":"",
        "DimensionHeight":"",
        "DimensionBase":"",
        "SKUWeight":"",
        "PlanQty":"",
        "UOMAsk":"",
        "ReceivedQty":"",
        "Reference":"",
        "TruckType":"",
        "GoodQty":"",
        "DamageQty":"",
        "ShortLandQty":"",
        "OverlandQty":""
       }
       console.log('ws json is'+JSON.stringify(body));
       this.backendservice.wsCall(body,this.backendservice.wsgetPRFEWarehouse).then(data =>
        {
            debugger            
            // alert(JSON.stringify(body));
            // alert(JSON.stringify(data));
            // var json = data;
            // console.log('ws json is'+JSON.stringify(json));
            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;   
            //alert(JSON.stringify(this.HeaderJson.toString()));
            if(this.HeaderJson.length)
            {            
              //("data hearder "+ this.HeaderJson.length);  
            // this.HeaderJson = data[0].BookingList;
            // this.DetailJson = data[0].DetailList;       
            this.createGrid();
            // this.bindingcompleteTruckType(Event);
            // this.bindingcompleteUOM(Event);

             this.bindHeader();
            // this.bookingid = this.HeaderJson[0].BookingID;
            // this.nooftrack = this.HeaderJson[0].NoOfTruck;
            // this.noofcontainer =  this.HeaderJson[0].NoOfContainer;
            // this.remark = this.HeaderJson[0].Remark;
            // this.cargoreceiveddate.setDate(this.HeaderJson[0].CargoReceivedDate)        
            // this.customerissueddate.setDate(this.HeaderJson[0].CustomIssuedDate)
            // this.transactiondate.setDate(this.HeaderJson[0].TransactionDate)
            resolve('success');

            }
           }) 
    })

    }
  bindingcompleteTruckType(event:any)
  {
      if(this.DetailJson)
      {
          this.cboTrucType.selectItem(this.DetailJson[0].TruckTypeAsk);          
      }      
  }
  bindingcompleteUOM(event:any)
  {
      if(this.DetailJson)
      {
          this.cboUOM.selectItem(this.DetailJson[0].UOMAsk);          
      }      
  }

bindTrackType()
{   
   this.getJsonParaUser.UserID = window.sessionStorage.getItem("userid");
    this.getJsonParaUser.Password= window.sessionStorage.getItem("password");
    this.getJsonParaUser.ProductAsk="11";
    //alert(JSON.stringify(this.getJsonParaUser));  
    this.backendservice.wsCall(this.getJsonParaUser,this.backendservice.wsgetTruckTypeList).then(data =>
        {
         // alert(this.getJsonParaUser);         
            this.cboTruckTypeList = data;
            //alert("truck type list ;; "+ JSON.stringify( this.cboTruckTypeList));
            this.cboTruckTypeSource =  {
                dataType: 'json',
                dataFields:[ {name: 'Ask'},{name:'Code'},{name:'Description'},{name:'DisplaySequence'},{name:'Remark'},{name:'Status'},{name:'StockWeight'},
                {name:'TS'},{name:'TareWeight'},{name:'TotalGrossW'},{name:'TotalVol'},{name:'TotalWeight'},{name:'UD'} ],
                localdata: this.cboTruckTypeList,
            }
            this.cboTruckTypeAdapter = new jqx.dataAdapter(this.cboTruckTypeSource);   
        })  
}
bindUOM()
{      
    this.getJsonParaUser.UserID = window.sessionStorage.getItem("userid");
    this.getJsonParaUser.Password= window.sessionStorage.getItem("password");
    this.getJsonParaUser.ProductAsk="11";
   // alert(this.getJsonParaUser); 
    this.backendservice.wsCall(this.getJsonParaUser,this.backendservice.wsgetUOMList).then(data =>
        {
            this.cboUOMList = data;
            this.cboUOMSource =  {
                dataType: 'json',
                dataFields:[ {name: 'Ask'},{name:'Details'},{name:'DisplaySequence'},{name:'Name'},{name:'Remark'},{name:'Status'}, {name:'TS'},{name:'UD'} ],
                localdata: this.cboUOMList,
            }
            this.cboUOMAdapter = new jqx.dataAdapter(this.cboUOMSource);   
        })  
}


  bindHeader()
  {
    this.bookingnoplaceholder = this.HeaderJson[0].BookingID;// "Booking No "+"- B000001";
    this.shipperlaceholder = this.HeaderJson[0].Shipper;// "Shipper Name "+"- Thura";
    this.agentplaceholder = this.HeaderJson[0].Agent;// "Agent Name "+"- Rayroom";
    this.statusplaceholder =  this.HeaderJson[0].BookingStatusAsk;//"Status "+"- Tally";
    this.trdateplaceholder =  this.HeaderJson[0].transactiondate;//"Transactoin Date "+"- 10/01/2018";
  }
 createGrid()
  {
    this.source  =
    {
      datafields: [
        { name: 'AgentAsk', type: 'string' },
        { name: 'Ask', type: 'string' },
        { name: 'BookingID', type: 'string' },
        { name: 'BookingStatusAsk', type: 'string' },
        { name: 'CargoReceivedDate', type: 'string' },
        { name: 'CountryAsk', type: 'string' },
        { name: 'NoOfContainer', type: 'string' },
        { name: 'NoOfTruck', type: 'string' },
        { name: 'POAsk', type: 'string' },
        { name: 'PONo', type: 'string' },
        { name: 'POReferenceNo', type: 'string' },
        { name: 'PORemark', type: 'string' },
        { name: 'POShippingMark', type: 'string' },
        { name: 'POStatus', type: 'string' },
        { name: 'SKUAsk', type: 'string' },
        { name: 'SKUDamageQty', type: 'string' },
        { name: 'SKUDamagephoto', type: 'string' },
        { name: 'SKUDetails', type: 'string' },
        { name: 'SKUDimensionBase', type: 'string' },
        { name: 'SKUDimensionHeight', type: 'string' },
        { name: 'SKUDimensionWidth', type: 'string' },
        //{ name: 'SKUDimension', type: 'string' },                
        { name: 'SKUGoodQty', type: 'string' },
        { name: 'SKUGoodphoto', type: 'string' },
        { name: 'SKUName', type: 'string' },
        { name: 'SKUOverlandQty', type: 'string' },
        { name: 'SKUOverlandphoto', type: 'string' },
        { name: 'SKUPlanQty', type: 'string' },
        { name: 'SKUReceivedQty', type: 'string' },
        { name: 'SKUReference', type: 'string' },
        { name: 'SKURemark', type: 'string' },
        { name: 'SKUShortLandQty', type: 'string' },
        { name: 'SKUShortLandphoto', type: 'string' },
        { name: 'SKUStatus', type: 'string' },
        { name: 'SKUTruckID', type: 'string' },
        { name: 'SKUTruckType', type: 'string' },
        { name: 'SKUUOMAsk', type: 'string' },
        { name: 'SKUWeight', type: 'string' },
        { name: 'Shipper', type: 'string' },
        { name: 'ShipperAsk', type: 'string' },
        { name: 'ShipperDetails', type: 'string' },
        { name: 'ShipperName', type: 'string' },
        { name: 'Signature', type: 'string' },
        { name: 'SignatureDate', type: 'string' },
        { name: 'TransactionDate', type: 'string' },
        { name: 'TruckAsk', type: 'string' },
        { name: 'TruckID', type: 'string' },
        { name: 'TruckRemark', type: 'string' },
        { name: 'TruckStatus', type: 'string' },
        { name: 'TruckTypeAsk', type: 'string' } ],
      localdata:this.DetailJson
        //[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]
     }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this. columns= [
      //display column
      { text: 'Booking', datafield: 'BookingID', width: 120,editable:false ,hidden:true },
      { text: 'Shipping Mark', datafield: 'POShippingMark', width: 100,editable: false,hidden:true },
      { text: 'PO', datafield: 'PONo', width: 100,editable: false,hidden:false },
      { text: 'SKU', datafield: 'SKUName', width: 100,editable: false,hidden:false },
      { text: 'D_L', datafield: 'SKUDimensionBase', width: 50,editable: false,hidden:false },
      { text: 'D_H', datafield: 'SKUDimensionHeight',width: 50,editable: false,hidden:false },
      { text: 'D_W', datafield: 'SKUDimensionWidth',width: 50,editable: false,hidden:false},                           
      { text: 'Dimission',width: 50,editable: false,hidden:false},                 
      { text: 'Quality', datafield: 'SKUPlanQty', width: 50,editable: false,hidden:true },
      { text: 'Received', datafield: 'SKUReceivedQty',width: 50, editable: false,hidden:false },
      { text: 'Diff',  width: 8050,editable: false,hidden:true },
      { text: 'UOM', datafield: 'SKUUOMAsk',width: 50,editable: false,hidden:false},
     // { button: 'Scan', string: "Scan", columntype: 'button',  width: 80,editable: false,hidden:false},
      { text: 'Weight', datafield: 'Track Weight', width: 100,editable: false,hidden:true },
      { text: 'Reference', datafield: 'POReferenceNo', width: 100,editable: false,hidden:true },
      { text: 'Truck ID', datafield: 'TruckID',width: 100,editable: false,hidden:true },
      { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 150, displayfield: 'Description', columntype: 'combobox',editable: false,hidden:true,
            cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => 
            {
                if (newvalue != oldvalue) {
                  for(let k=0; k< this.cboTruckTypeList.length; k++)
                    {
                        if(this.cboTruckTypeList[k].Ask == newvalue.value)
                        {
                            this.myGrid.setcellvalue(row,'Track Weight',this.cboTruckTypeList[k].Details);                        
                        }
                    }                                    
                };
            },
              createeditor: (row: number, value: any, editor: any): void => 
              {                   
                editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboTruckTypeAdapter
                , displayMember: 'Code', valueMember: 'Ask' })     
              }          
      },
      { text: 'Track Weight', width: 80,editable: false,hidden:true },
      { text: 'CBM', width: 80,editable: false,hidden:true },
      //hide column
      
      { text: 'AgentAsk', datafield: 'AgentAsk', width: 150,editable: false,hidden:true},
      { text: 'Ask', datafield: 'Ask', width: 150,editable: false,hidden:true },                   
      { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 150,editable: false,hidden:true },
      { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 150,editable: false,hidden:true },
      { text: 'CountryAsk', datafield: 'CountryAsk', width: 150,editable: false,hidden:true },
      { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 150,editable: false,hidden:true },
      { text: 'NoOfContainer', datafield: 'NoOfContainer',width: 150,editable: false,hidden:true },
      { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 150,editable: false,hidden:true },
      { text: 'POAsk', datafield: 'POAsk', width: 150,editable: false,hidden:true },               
      { text: 'PORemark', datafield: 'PORemark',width: 150,editable: false,hidden:true },     
      { text: 'POStatus', datafield: 'POStatus', width: 150,editable: false,hidden:true},
      { text: 'SKUAsk', datafield: 'SKUAsk',width: 150,editable: false,hidden:true },
      { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 150,editable: false,hidden:true },
      { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 150,editable: false,hidden:true },
      { text: 'SKUDetails', datafield: 'SKUDetails', width: 150,editable: false,hidden:true },
      { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 150,editable: false,hidden:true},
      { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 150,editable: false,hidden:true },                    
      { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty',width: 150,editable: false,hidden:true },
      { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 150,editable: false,hidden:true },  
      { text: 'SKUReference', datafield: 'SKUReference', width: 150,editable: false,hidden:true },
      { text: 'SKURemark', datafield: 'SKURemark', width: 150,editable: false,hidden:true },
      { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 150,editable: false,hidden:true},
      { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto',width: 150,editable: false,hidden:true },
      { text: 'SKUStatus', datafield: 'SKUStatus',width: 150,editable: false,hidden:true },
      { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 150,editable: false,hidden:true },
      { text: 'SKUTruckType', datafield: 'SKUTruckType',width: 150,editable: false,hidden:true },                    
      { text: 'SKUWeight', datafield: 'SKUWeight', width: 150,editable: false,hidden:true},
      { text: 'Shipper', datafield: 'Shipper',width: 150,editable: false,hidden:true },
      { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 150,editable: false,hidden:true },
      { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 150,editable: false,hidden:true },
      { text: 'ShipperName', datafield: 'ShipperName',width: 150,editable: false,hidden:true},
      { text: 'Signature', datafield: 'Signature', width: 150,editable: false,hidden:true },
      { text: 'SignatureDate', datafield: 'SignatureDate',width: 150,editable: false,hidden:true},
      { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 150,editable: false,hidden:true },
      { text: 'TruckAsk', datafield: 'TruckAsk', width: 150,editable: false,hidden:true },
      { text: 'TruckRemark', datafield: 'TruckRemark',width: 150,editable: false,hidden:true },
      { text: 'TruckStatus', datafield: 'TruckStatus', width: 150,editable: false,hidden:true },
      
    ]
  }


  MyGridRowSelect(event: any): void {
    let customerID = event.args.row.DocNo;
    let records = new Array();
    let dataAdapter = this.dataAdapter;
    let length = dataAdapter.records.length;
    //alert (this.myGrid.getselectedrowindex());
  }
  MyGridCellValueChange(event:any)
  {
    //alert (this.myGrid.getselectedcells.toString());    
  }  
  MyGridCellEndEdit()
  {   
    var index = this.myGrid.getselectedrowindex();
    var rowdata = this.myGrid.getrowdata(index);   
    var rowcount = this.myGrid.getrows();
    var rowlength = rowcount.length - 1;
    if(rowlength == index)
    {
      let mydatarow = this.MyGridRowGenearate();             
      this.myGrid.addrow(null, mydatarow);
    }
    {
      //alert("nothing")
    }    
  }
  MyGridRowGenearate(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }
 
  btnNew()
  {  
    let mydatarow = this.MyGridRowGenearate();             
    this.myGrid.addrow(null, mydatarow);  
  }
  isValidSaveParaJson()
  {}
  bindSaveParaJson()
  {

    let skugridarray = [];
    skugridarray = this.myGrid.getrows();     
    let skuarray = []; 
   // for(let i=0; i < skugridarray.length;i++)
    for(let i=0; i < 1 ;i++)
    {
      //this.saveJsonParamenter= null;
      this.saveJsonParamenter.UserID= window.sessionStorage.getItem("userid");
      this.saveJsonParamenter.Password= window.sessionStorage.getItem("password");
      this.saveJsonParamenter.ProductAsk="11";
      this.saveJsonParamenter.BookingAsk=skugridarray[i].BookingAsk;
      this.saveJsonParamenter.AgentAsk=skugridarray[i].AgentAsk;
      this.saveJsonParamenter.Ask=skugridarray[i].Ask;
      this.saveJsonParamenter.SKUName=skugridarray[i].SKUName;
      this.saveJsonParamenter.SKUDetails=skugridarray[i].SKUDetails;
      this.saveJsonParamenter.DimensionWidth=skugridarray[i].DimensionWidth;
      this.saveJsonParamenter.DimensionHeight=skugridarray[i].DimensionHeight;
      this.saveJsonParamenter.DimensionBase=skugridarray[i].DimensionBase;
      this.saveJsonParamenter.SKUWeight=skugridarray[i].SKUWeight;
      this.saveJsonParamenter.PlanQty=skugridarray[i].PlanQty;
      this.saveJsonParamenter.UOMAsk=skugridarray[i].UOMAsk;
      this.saveJsonParamenter.ReceivedQty=skugridarray[i].ReceivedQty;
      this.saveJsonParamenter.Reference=skugridarray[i].Reference;
      this.saveJsonParamenter.TruckID=skugridarray[i].TruckID;
      this.saveJsonParamenter.TruckType=skugridarray[i].TruckType;
      this.saveJsonParamenter.GoodQty=skugridarray[i].GoodQty;
      this.saveJsonParamenter.DamageQty=skugridarray[i].DamageQty;
      this.saveJsonParamenter.ShortLandQty=skugridarray[i].ShortLandQty;
      this.saveJsonParamenter.OverlandQty=skugridarray[i].OverlandQty;
      this.saveJsonParamenter.Goodphoto=skugridarray[i].Goodphoto;
      this.saveJsonParamenter.Damagephoto=skugridarray[i].Damagephoto;
      this.saveJsonParamenter.ShortLandphoto=skugridarray[i].ShortLandphoto;
      this.saveJsonParamenter.Overlandphoto=skugridarray[i].Overlandphoto;
      alert(i);
    }
    //let skugridjson = JSON.stringify(skuarray);
    //alert(JSON.stringify("list json --" + skugridjson)); 
  }
  btnSave()
  { 
    this.isValidSaveParaJson();
    this.bindSaveParaJson();
    alert(JSON.stringify("only json --" + JSON.stringify(this.saveJsonParamenter)));  
    console.log("save json is "+JSON.stringify(this.saveJsonParamenter));   
    this.backendservice.wsCall(this.saveJsonParamenter,this.backendservice.wssaveCheckerWarehouse).then(data =>
      {
          alert(JSON.stringify(data)); 
          console.log("body is "+JSON.stringify(data));
      }) 
     
}
  btnDelete()
  {  
    
    //alert("delete")
  }  
  btnRefresh()
  {  
    
    //alert("delete")
  } 
  btnSuveyReport()
  {  
    //alert("suvey")
  }
  btnSubmit()
  {  
    this.bindTrackType();
    this.bindUOM();
    //alert("submit")
  } 
  
  ngOnInit() {    
  }
}