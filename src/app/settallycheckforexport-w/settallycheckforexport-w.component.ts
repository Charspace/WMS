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
  selector: 'app-settallycheckforexport-w',
  templateUrl: './settallycheckforexport-w.component.html',
  styleUrls: ['./settallycheckforexport-w.component.css']
})
export class SettallycheckforexportWComponent implements OnInit { 
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
    //alert("call contructor");
    //this.ngAfterViewInit();
    // this.countryplaceholder = "Country"
    // this.nooftrackplaceholder = "NoOfTruck";
    // this.noofcontainerplaceholder = "NoOfContainer";
    // this.remarkplaceholder = "Remark";
    // this.bindHeader();
    this.createGrid();  
        
  }
  ngAfterViewInit() {
    var bookask;
    var agentask;

    this.route.params.subscribe(params => {
        bookask = +params['param1']; 
        agentask = +params['param2']; 
    })

    //alert(bookask);
      this.bindTrackType();
      this.bindUOM();
      this.getTallyCountList(bookask,agentask).then(data =>
        {
            debugger
            this.bindTrackType();
            this.bindUOM();
        }
      )
  }
  getTallyCountList(setupbookask,setupagentask)
  {
    //alert(setupbookask);
    return new Promise((resolve,reject) => { 
      debugger
    var body = {
        "UserID" : "admin",
        "Password" : "123",
        "ProductAsk":"11",
        "Ask":"" +"0"//+setupbookask+"",
        
       }

       this.backendservice.wsCall(body,this.backendservice.wsgetTallyWarehouseList).then(data =>
        {
            debugger            
            // alert(JSON.stringify(body));
            // alert(JSON.stringify(data));
            // var json = data;
           // console.log('ws json is'+JSON.stringify(body));
            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;   
            // alert(JSON.stringify(this.HeaderJson));
            // alert(JSON.stringify(this.DetailJson));
            if(this.HeaderJson.length)
            {            
              //("data hearder "+ this.HeaderJson.length);  
            // this.HeaderJson = data[0].BookingList;
            // this.DetailJson = data[0].DetailList;       
            this.bindGrid();
            this.bindingcompleteTruckType(Event);
            this.bindingcompleteUOM(Event);

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
  bindGrid()
  {
    this.source  =
    {
      datafields: [
        { name: 'AgentAddress', type: 'string' },
        { name: 'AgentAsk', type: 'string' },
        { name: 'AgentBillingAddress', type: 'string' },
        { name: 'AgentCompanyName', type: 'string' },
        { name: 'AgentContactPersonMobile', type: 'string' },
        { name: 'AgentContactPersonName', type: 'string' },
        { name: 'AgentDetails', type: 'string' },
        { name: 'AgentEmail', type: 'string' },
        { name: 'AgentMobile', type: 'string' },
        { name: 'AgentName', type: 'string' },
        { name: 'AgentNationalID', type: 'string' },
        { name: 'AgentShippinggAddress', type: 'string' },
        
        { name: 'AgentWebsite', type: 'string' },
        { name: 'BookingAsk', type: 'string' },
        { name: 'BookingID', type: 'string' },
        { name: 'BookingStatusAsk', type: 'string' },
        { name: 'CargoReceivedDate', type: 'string' },
        { name: 'CountryAsk', type: 'string' },
        { name: 'CustomIssuedDate', type: 'string' },
        { name: 'NoOfContainer', type: 'string' },
        { name: 'NoOfTruck', type: 'string' },
        { name: 'Shipper', type: 'string' },
        { name: 'ShipperAsk', type: 'string' },   
                
        { name: 'ShipperDetails', type: 'string' },
        { name: 'ShipperName', type: 'string' },
        { name: 'TallyAsk', type: 'string' },
        { name: 'TallyCheckDate', type: 'string' },
        { name: 'TallyDimensionBase', type: 'string' },
        { name: 'TallyDimensionHeight', type: 'string' },
        { name: 'TallyDimensionWeight', type: 'string' },
        { name: 'TallyDocNo', type: 'string' },
        { name: 'TallyReceiveDate', type: 'string' },
        { name: 'TallyReceivedQty', type: 'string' },
        { name: 'TallySKUDetails', type: 'string' },    
        
        { name: 'TallySKUID', type: 'string' },
        { name: 'TallyShippingMark', type: 'string' },
        { name: 'TallySignature', type: 'string' },
        { name: 'TallySignatureDate', type: 'string' },
        { name: 'TallyStatus', type: 'string' },
        { name: 'TallyTransactionDate', type: 'string' },
        { name: 'TallyTruckID', type: 'string' },
        { name: 'TallyTruckTypeAsk', type: 'string' },
        { name: 'TallyUOMAsk', type: 'string' }],
      localdata:this.DetailJson
        //[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]
     }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this. columns= [
      //display column
      [
        { text: 'AgentAddress', datafield: 'AgentAddress', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'AgentAsk', datafield: 'AgentAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'AgentBillingAddress', datafield: 'AgentBillingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentCompanyName', datafield: 'AgentCompanyName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentContactPersonMobile', datafield: 'AgentContactPersonMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentContactPersonName', datafield: 'AgentContactPersonName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentDetails', datafield: 'AgentDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentEmail', datafield: 'AgentEmail', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentMobile', datafield: 'AgentMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentName', datafield: 'AgentName', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'AgentNationalID', datafield: 'AgentNationalID', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        { text: 'AgentShippinggAddress', datafield: 'AgentShippinggAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentWebsite', datafield: 'AgentWebsite', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'BookingAsk', datafield: 'BookingAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'BookingID', datafield: 'BookingID', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'CountryAsk', datafield: 'CountryAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'Shipper', datafield: 'Shipper', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'ShipperName', datafield: 'ShipperName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyAsk', datafield: 'TallyAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'TallyCheckDate', datafield: 'TallyCheckDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionBase', datafield: 'TallyDimensionBase', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionHeight', datafield: 'TallyDimensionHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionWeight', datafield: 'TallyDimensionWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDocNo', datafield: 'TallyDocNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyReceiveDate', datafield: 'TallyReceiveDate', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'TallyReceivedQty', datafield: 'TallyReceivedQty', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        { text: 'TallySKUID', datafield: 'TallySKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySKUDetails', datafield: 'TallySKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyShippingMark', datafield: 'TallyShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySignature', datafield: 'TallySignature', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySignatureDate', datafield: 'TallySignatureDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        
        { text: 'TallyStatus', datafield: 'TallyStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyTransactionDate', datafield: 'TallyTransactionDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyTruckID', datafield: 'TallyTruckID', width: '10%',editable: false,hidden:false }, //readonly cell.
        
        { text: 'TallyTruckTypeAsk', datafield: 'TallyTruckTypeAsk', width: '10%',editable: false,hidden:true }, //readonly cell. 
        { text: 'TallyUOMAsk', datafield: 'TallyUOMAsk', width: '10%',editable: false,hidden:true } //readonly cell. 
      ]       
      
    ]
  }
  createGrid()
  {
    this.source  =
    {
      datafields: [
        { name: 'AgentAddress', type: 'string' },
        { name: 'AgentAsk', type: 'string' },
        { name: 'AgentBillingAddress', type: 'string' },
        { name: 'AgentCompanyName', type: 'string' },
        { name: 'AgentContactPersonMobile', type: 'string' },
        { name: 'AgentContactPersonName', type: 'string' },
        { name: 'AgentDetails', type: 'string' },
        { name: 'AgentEmail', type: 'string' },
        { name: 'AgentMobile', type: 'string' },
        { name: 'AgentName', type: 'string' },
        { name: 'AgentNationalID', type: 'string' },
        { name: 'AgentShippinggAddress', type: 'string' },
        
        { name: 'AgentWebsite', type: 'string' },
        { name: 'BookingAsk', type: 'string' },
        { name: 'BookingID', type: 'string' },
        { name: 'BookingStatusAsk', type: 'string' },
        { name: 'CargoReceivedDate', type: 'string' },
        { name: 'CountryAsk', type: 'string' },
        { name: 'CustomIssuedDate', type: 'string' },
        { name: 'NoOfContainer', type: 'string' },
        { name: 'NoOfTruck', type: 'string' },
        { name: 'Shipper', type: 'string' },
        { name: 'ShipperAsk', type: 'string' },   
                
        { name: 'ShipperDetails', type: 'string' },
        { name: 'ShipperName', type: 'string' },
        { name: 'TallyAsk', type: 'string' },
        { name: 'TallyCheckDate', type: 'string' },
        { name: 'TallyDimensionBase', type: 'string' },
        { name: 'TallyDimensionHeight', type: 'string' },
        { name: 'TallyDimensionWeight', type: 'string' },
        { name: 'TallyDocNo', type: 'string' },
        { name: 'TallyReceiveDate', type: 'string' },
        { name: 'TallyReceivedQty', type: 'string' },
        { name: 'TallySKUDetails', type: 'string' },    
        
        { name: 'TallySKUID', type: 'string' },
        { name: 'TallyShippingMark', type: 'string' },
        { name: 'TallySignature', type: 'string' },
        { name: 'TallySignatureDate', type: 'string' },
        { name: 'TallyStatus', type: 'string' },
        { name: 'TallyTransactionDate', type: 'string' },
        { name: 'TallyTruckID', type: 'string' },
        { name: 'TallyTruckTypeAsk', type: 'string' },
        { name: 'TallyUOMAsk', type: 'string' }],
      localdata:[]
        //[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]
     }  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this. columns= [      //display column
    
        { text: 'AgentAddress', datafield: 'AgentAddress', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'AgentAsk', datafield: 'AgentAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'AgentBillingAddress', datafield: 'AgentBillingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentCompanyName', datafield: 'AgentCompanyName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentContactPersonMobile', datafield: 'AgentContactPersonMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentContactPersonName', datafield: 'AgentContactPersonName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentDetails', datafield: 'AgentDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentEmail', datafield: 'AgentEmail', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentMobile', datafield: 'AgentMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentName', datafield: 'AgentName', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'AgentNationalID', datafield: 'AgentNationalID', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        { text: 'AgentShippinggAddress', datafield: 'AgentShippinggAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'AgentWebsite', datafield: 'AgentWebsite', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'BookingAsk', datafield: 'BookingAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'BookingID', datafield: 'BookingID', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'CountryAsk', datafield: 'CountryAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'Shipper', datafield: 'Shipper', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'ShipperName', datafield: 'ShipperName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyAsk', datafield: 'TallyAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
        { text: 'TallyCheckDate', datafield: 'TallyCheckDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionBase', datafield: 'TallyDimensionBase', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionHeight', datafield: 'TallyDimensionHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDimensionWeight', datafield: 'TallyDimensionWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyDocNo', datafield: 'TallyDocNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyReceiveDate', datafield: 'TallyReceiveDate', width: '10%',editable: false,hidden:false }, //readonly cell. 
        { text: 'TallyReceivedQty', datafield: 'TallyReceivedQty', width: '10%',editable: false,hidden:false }, //readonly cell. 
        
        { text: 'TallySKUID', datafield: 'TallySKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySKUDetails', datafield: 'TallySKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyShippingMark', datafield: 'TallyShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySignature', datafield: 'TallySignature', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallySignatureDate', datafield: 'TallySignatureDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        
        { text: 'TallyStatus', datafield: 'TallyStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyTransactionDate', datafield: 'TallyTransactionDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text: 'TallyTruckID', datafield: 'TallyTruckID', width: '10%',editable: false,hidden:false }, //readonly cell.
        
        { text: 'TallyTruckTypeAsk', datafield: 'TallyTruckTypeAsk', width: '10%',editable: false,hidden:true }, //readonly cell. 
        { text: 'TallyUOMAsk', datafield: 'TallyUOMAsk', width: '10%',editable: false,hidden:true } //readonly cell. 
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
      //alert(i);
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





