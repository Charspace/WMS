import { ViewChild,AfterViewInit, ElementRef,Component, OnInit,NgModule, ANALYZE_FOR_ENTRY_COMPONENTS  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../backend.service';
import { Http,RequestOptions, Headers, Jsonp } from '@angular/http';
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
import { jqxInputComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';

@Component({
  selector: 'app-setplanreceiveforexport',
  templateUrl: './setplanreceiveforexport.component.html',
  styleUrls: ['./setplanreceiveforexport.component.css']
})
export class SetplanreceiveforexportComponent implements OnInit {
  @ViewChild('BookingGrid') BookingGrid: jqxGridComponent;
  @ViewChild('ContainerGrid') ContainerGrid: jqxGridComponent;
  @ViewChild('ShipperGrid')ShipperGrid : jqxGridComponent;
  @ViewChild('TruckGrid') TruckGrid: jqxGridComponent;
  @ViewChild('POGrid')POGrid : jqxGridComponent;
  @ViewChild('SKUGrid') SKUGrid : jqxGridComponent;
//   @ViewChild('txtBookingID') txtBookingID : jqxInputComponent;
//   @ViewChild('txtContrainerID') txtContrainerID : jqxInputComponent;
//   @ViewChild('txtShipperID') txtShipperID : jqxInputComponent;
//   @ViewChild('txtTruckID') txtTruckID : jqxInputComponent;
//   @ViewChild('txtPOID') txtPOID : jqxInputComponent;
//   @ViewChild('txtSKUID') txtSKUID : jqxInputComponent;


//Inputbox
txtBookingID : any;
txtContrainerID : any;
txtShipperID : any;
txtTruckID : any;
txtPOID : any;
txtSKUID : any;

  //dataField : any = [];
  //Booking Grid
  BookingGridSource: any;
  BookingGridAdaptor: any;
  BookingGridColumn : any=[];
  BookingGriddataField : any = [];

  //Container Grid
  ContainerGridSource: any;
  ContainerGridAdaptor: any;
  ContainerGridColumn : any=[];
  ContainerGriddataField : any = [];

  //Shipper Grid
  ShipperGridSource: any;
  ShipperGridAdaptor: any;
  ShipperGridColumn : any=[];
  ShipperGriddataField : any = [];

  //Truck Grid
  TruckGridSource: any;
  TruckGridAdaptor: any;
  TruckGridColumn : any=[];
  TruckGriddataField : any = [];

  //PO Grid
  POGridSource: any;
  POGridAdaptor: any;
  POGridColumn : any=[];
  POGriddataField : any = [];

  //SKU Grid
  SKUGridSource: any;
  SKUGridAdaptor: any;
  SKUGridColumn : any=[];
  SKUGriddataField : any = [];

  //Place holder
  BookingPlaceHolder : any;
  ContainerPlaceHolder : any;
  ShipperPlaceHolder : any;
  POPlaceHolder : any;
  TruckPlaceHolder : any;
  SKUPlaceHolder : any;

  //Control
  BookingID : any;
  ContrainerID:any;
  ShipperID:any;
  TruckID:any;
  POGridID:any;
  SKUID:any;

  //Para Json
  Authorization={"UserID":"","Password":"","ProductAsk":""}
  CritiaParaJson={"UserID" : "", "Password" : "","ProductAsk":"","Ask":"0" ,"AgentAsk":"0","ContainerAsk":"0","ShipperAsk":"0","TruckAsk":"0" ,"POAsk":"0" }
  AgentParaJson:any;
  BookingParaJson:any;
  ContainerParaJson:any;
  ShipperParaJson:any;
  TruckParaJson:any;
  POParaJson:any;
  SKUParaJson:any;
  SKUParaJsonList=[];
  SaveParaJson:any;
bindDefaultSKU()
{
    this.SKUParaJson={  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "SKUName":"",
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
    "TruckType":"0",
    "GoodQty":"0",
    "DamageQty":"0",
    "ShortLandQty":"0",
    "OverlandQty":"0",
    "Goodphoto":"",
    "Damagephoto":"",
    "ShortLandphoto":"",
    "Overlandphoto":"",
    "Remark":""
    }
}

bindDefaultValue()
{
   this.BookingParaJson={"Ask":"0",
        "TS":"0",
        "UD":"0",
        "BookingID":"",
        "AgentAsk":"0",
        "Shipper":"",
        "CountryAsk":"0",
        "CargoReceivedDate":"",
        "CustomIssuedDate":"",
        "TransactionDate":"",
        "Signature":"",
        "SignatureDate":"",
        "BookingStautsAsk":"0",
        "NoOfTruck":"0",
        "NoOfContainer":"0",
        "DisplaySequence":"0",
        "Remark":"",
        "LogisticTypeAsk":"0",
        "TotalGrossW":"0",
        "TotalVol":"0"
    }
    this.AgentParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "AgentName":"",
        "AgentDetails":"",
        "NationalID":"",
        "BillingAddress":"",
        "ShippingAddress":"",
        "CompanyName":"",
        "Website":"",
        "Mobile":"",
        "Email":"",
        "ContactPersonName":"",
        "ContactPersonMobile":"",
        "Address":"",
        "DisplaySequence":"",
        "Remark":""
    }
    this.ContainerParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "ContainerNo":"",
        "ContainerDetails":"",
        "SealNo":"",
        "Width":"0",
        "Height":"0",
        "Base":"0",
        "ContainerType":"0",
        "Color":"",
        "TruckTypeAsk":"0",
        "Carrier":"",
        "Voy":"",
        "VesselNo":"",
        "ETA":"",
        "ETD":"",
        "CutOffDate":"",
        "PaperlessCode":"",
        "ContainerPicture":"",
        "CountryAsk":"0",
        "TareWeight":"0",
        "GrossWeight":"0",
        "MattWeight":"0",
        "TotalWeigt":"0",
        "Status":"0",
        "DisplaySequence":"0",
        "Remark":""
    }
    this.ShipperParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "ShipperName":"",
        "ShipperDetails":"",
        "Status":"0",
        "DisplaySequence":"0",
        "Remark":""
    }
    this.TruckParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "TruckID":"",
        "TruckTypeAsk":"0",
        "Status":"0",
        "DisplaySequence":"0",
        "Remark":""
    }
    this.POParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "PONo":"",
        "ShippingMark":"",
        "ReferenceNo":"",
        "Remark":" "
    }
    this.SKUParaJson={  
        "Ask":"0",
        "TS":"0",
        "UD":"0",
        "SKUName":"",
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
        "TruckType":"0",
        "GoodQty":"0",
        "DamageQty":"0",
        "ShortLandQty":"0",
        "OverlandQty":"0",
        "Goodphoto":"",
        "Damagephoto":"",
        "ShortLandphoto":"",
        "Overlandphoto":"",
        "Remark":""
    }
  

}
  //Return Json
  BookingReturnJson:any;
  AgentReturnJson:any;
  ContainerReturnJson:any;
  ShipperReturnJson:any;
  TruckReturnJson:any;
  POReturnJson:any;
  SKUReturnJson:any;  
/* 
  BookingReturnJson=[{  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "BookingID":"B0001",
    "AgentAsk":"1",
    "Shipper":"",
    "CountryAsk":"1",
    "CargoReceivedDate":"",
    "CustomIssuedDate":"",
    "TransactionDate":"",
    "Signature":"",
    "SignatureDate":"",
    "BookingStautsAsk":"2",
    "NoOfTruck":"2",
    "NoOfContainer":"2",
    "DisplaySequence":"1",
    "Remark":"e",
    "LogisticTypeAsk":"2",
    "TotalGrossW":"5",
    "TotalVol":"4"
 }];
 AgentReturnJson=[{  
    "Ask":"20180730091327024",
    "TS":"0",
    "UD":"0",
    "AgentName":"D_Ageng_1",
    "AgentDetails":"D_Ageng_1",
    "NationalID":"",
    "BillingAddress":"",
    "ShippingAddress":"",
    "CompanyName":"",
    "Website":"",
    "Mobile":"",
    "Email":"",
    "ContactPersonName":"",
    "ContactPersonMobile":"",
    "Address":"",
    "DisplaySequence":"",
    "Remark":""
 } ];
 ContainerReturnJson=[{  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "ContainerNo":"C_001",
    "ContainerDetails":"ContainerDetailsDirect002",
    "SealNo":"Sear-0001",
    "Width":"44.0",
    "Height":"44.0",
    "Base":"55.0",
    "ContainerType":"1",
    "Color":"Blue",
    "TruckTypeAsk":"2",
    "Carrier":"Thura",
    "Voy":"V0001",
    "VesselNo":"VS001",
    "ETA":"2018/01/01",
    "ETD":"2018/01/01",
    "CutOffDate":"2018/01/01",
    "PaperlessCode":"PC001",
    "ContainerPicture":"",
    "CountryAsk":"2",
    "TareWeight":"0.31",
    "GrossWeight":"12.0",
    "MattWeight":"33.0",
    "TotalWeigt":"011.0",
    "Status":"0",
    "DisplaySequence":"",
    "Remark":""
 }]
 ShipperReturnJson=[{  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "ShipperName":"THURA",
    "ShipperDetails":"THURA",
    "Status":"0",
    "DisplaySequence":"0",
    "Remark":"ShipperRemarkDirect002"
 }]
 TruckReturnJson=[{  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "TruckID":"TD0001",
    "TruckTypeAsk":"1",
    "Status":"0",
    "DisplaySequence":"0",
    "Remark":"TruckIDDirect002 Remark"
 }]
 POReturnJson=[{  
    "Ask":"0",
    "TS":"0",
    "UD":"0",
    "PONo":"PO_D_001",
    "ShippingMark":"SM_D_001",
    "ReferenceNo":"REF_D_001",
    "Remark":"PONoDirect002 Remark"
 }]
 SKUReturnJson=[  
    {  
       "Ask":"0",
       "TS":"0",
       "UD":"0",
       "SKUName":"SALT",
       "SKUDetails":"",
       "DimensionWidth":"3",
       "DimensionHeight":"4",
       "DimensionBase":"4",
       "SKUWeight":"5",
       "PlanQty":"6",
       "UOMAsk":"1",
       "ReceivedQty":"",
       "Reference":"AEFE",
       "TruckID":"DD",
       "TruckType":"1",
       "GoodQty":"",
       "DamageQty":"",
       "ShortLandQty":"",
       "OverlandQty":"",
       "Goodphoto":"",
       "Damagephoto":"",
       "ShortLandphoto":"",
       "Overlandphoto":"",
       "Remark":"SKUNameDirect0021 Remark"
    },
    {  
       "Ask":"0",
       "TS":"0",
       "UD":"0",
       "SKUName":"POOL SALT",
       "SKUDetails":"",
       "DimensionWidth":"8",
       "DimensionHeight":"7",
       "DimensionBase":"5",
       "SKUWeight":"4",
       "PlanQty":"777",
       "UOMAsk":"2",
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
       "Overlandphoto":"",
       "Remark":"SKUNameDirect0022 Remark"
    },
    {  
       "Ask":"0",
       "TS":"0",
       "UD":"0",
       "SKUName":"REFIND SAALT",
       "SKUDetails":"",
       "DimensionWidth":"5",
       "DimensionHeight":"3",
       "DimensionBase":"2",
       "SKUWeight":"45",
       "PlanQty":"555",
       "UOMAsk":"2",
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
       "Overlandphoto":"",
       "Remark":"SKUNameDirect0023 Remark"
    }
 ]
 */


  SKUListReturnJson: any = [];
  localization: any = getLocalization('en'); 

    //Truck Type Combo
    cboTruckTypeSource: any;
    cboTruckTypeAdaptor: any;
    cboTruckTypeColumn : any=[];
    cboTruckTypeList : any=[];
    cboTruckTypedataField : any = [];

  //UOM Combo
  cboUOMSource: any;
  cboUOMAdaptor: any;
  cboUOMColumn : any=[];
  cboUOMList : any=[];
  cboUOMdataField : any = [];

   //Country Combo
   cboCountrySource: any;
   cboCountryAdaptor: any;
   cboCountryColumn : any=[];
   cboCountryList : any=[];
   cboCountrydisable : any;
   cboCountrydataField : any = [];

   //Agent Combo
   cboAgentSource: any;
   cboAgentAdaptor: any;
   cboAgentColumn : any=[];
   cboAgentList : any=[];
   cboAgentdataField : any = [];

    //Transaction Status
    cboTrsStatusSource: any;
    cboTrsStatusAdaptor: any;
    cboTrsStatusColumn : any=[];
    cboTrsStatusList : any=[];
    cboTrsStatusdataField : any = [];


    constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
    { 
        debugger
        this.bindAuthorizationJson();
        this.bindPlaceHolder();
        this.bindDefaultValue();
        this.bindcboAgent();
        this.bindcboCountry();
        this.bindcboTrsStatus();
        this.bindcboTruckType();  
        this.bindcboUOM();         
        //this.createGrid();       
        //this.bindLabel();
       //this.bindGrid();
    }  
    bindAuthorizationJson()
    {
        this.Authorization.UserID= this.backendservice.LoginUser;
        this.Authorization.Password= this.backendservice.LoginPwd;
        this.Authorization.ProductAsk=this.backendservice.ProductName;
    }
    bindLabel()
    {
        
        this.txtBookingID="ok";
        this.txtBookingID="elkf";
        this.txtContrainerID="elkf";
        // this.txtShipperID.ngValue="aef";
        // this.txtTruckID.ngValue="";
        // this.txtPOID.ngValue="aef";
        // this.txtShipperID.ngValue="";
    }
    bookingask ="0";
    agendask ="0";
    shipperask ="0";
    containerask ="0";
    ngAfterViewInit() 
    {debugger
        
        this.route.params.subscribe(params => {
                if (params['bookingask']!=null) { this.bookingask = params['bookingask']; }
                if(params['agendask']!=null){this.agendask = params['agendask']; }
                if(params['shipperask']!=null){this.shipperask =params['shipperask']; }
                if(params['containerask']!=null){ this.containerask =params['containerask']; }
           }) 
           alert(JSON.stringify(this.containerask));
            this.getJsonbyCriteria().then(data =>
            {          
                debugger 
                // this.AgentReturnJson= data[0].Agent;
                // this.BookingReturnJson = data[0].Booking;
                // this.ContainerReturnJson = data[0].Container;
                // this.ShipperReturnJson = data[0].Shipper;  
                // this.TruckReturnJson = data[0].Truck;  
                // this.POReturnJson = data[0].PO;     
                // this.SKUReturnJson = data[0].SKU;

                // this.bindcboCountry();
                // this.bindcboTrsStatus();
                // this.bindcboTruckType();  
                // this.bindcboUOM();      
                this.bindGrid(); 
            })
    }
    bindPlaceHolder()
    {
        this.BookingPlaceHolder ="Booking";        
        this.ContainerPlaceHolder="Container ("+ "Booking ID - "+ "B0001" +")";
        this.ShipperPlaceHolder ="Shipper ("+"Booking ID - "+ "B0001"+", Container No - "+ "C0001"+")";
        this.TruckPlaceHolder ="Truck ("+"Booking ID - "+ "B0001"+", Container No - "+ "C0001"+", Shipper - "+ "S0001"+")";
        this.POPlaceHolder  ="PO ("+"Booking ID - "+ "B0001"+", Container No - "+ "C0001"+", Shipper - "+ "S0001"+", Truck No - "+"TD0001" +")";
        this.SKUPlaceHolder ="SKU ("+"Booking ID - "+ "B0001"+", Container No - "+ "C0001"+", Shipper - "+ "S0001"+", Truck No - "+"TD0001" +", PO No - "+"PO0001" +")";
    }
    bindcboTruckType()
    {         
        this.backendservice.wsCall(this.Authorization,this.backendservice.wsgetTruckTypeList).then(data =>
        {
            this.cboTruckTypeList = data;
            this.cboTruckTypeSource =
                {
                    dataType: 'json',
                    datafield:[                  
                    {name:'Ask'},
                    {name:'Code'},
                    {name: 'Description'}],
                    localdata: this.cboTruckTypeList,
                }
            this.cboTruckTypeAdaptor = new jqx.dataAdapter(this.cboTruckTypeSource);   
        })  
    }
    bindcboUOM()
    {         
        this.backendservice.wsCall(this.Authorization,this.backendservice.wsgetUOMList).then(data =>
        {
            this.cboUOMList = data;
            //alert(JSON.stringify( this.cboUOMList));
            this.cboUOMSource =
            {
                dataType: 'json',
                datafield:[                  
                {name:'Ask'},
                {name:'Name'},
                {name: 'Details'}],
                localdata: this.cboUOMList,
            }
            this.cboUOMAdaptor = new jqx.dataAdapter(this.cboUOMSource);   
        })  
    }
    bindcboCountry()
    {         
        //debugger
        //alert(JSON.stringify(this.Authorization));
        //console.log(JSON.stringify(this.Authorization));
        this.backendservice.wsCall(this.Authorization,this.backendservice.wsgetCountryList).then(data =>
        {
            this.cboCountryList = data;
            this.cboCountrySource =
            {
                dataType: 'json',
                datafield:[
                {name:'Ask'},
                {name:'CountryName'},
                {name: 'CountryDetails'}],
                localdata: this.cboCountryList,
            }
            this.cboCountryAdaptor = new jqx.dataAdapter(this.cboCountrySource);   
        })  
    }
    bindcboAgent()
    {         
        
        //alert(JSON.stringify(this.Authorization));
        //console.log(JSON.stringify(this.Authorization));
        this.backendservice.wsCall(this.Authorization,this.backendservice.wsgetAgentList).then(data =>
        {
            this.cboAgentList = data;
            this.cboAgentSource =
            {
                dataType: 'json',
                datafield:[
                {name:'Ask'},
                {name:'AgentName'},
                {name: 'AgentDetails'}],
                localdata: this.cboAgentList,
            }
            this.cboAgentAdaptor = new jqx.dataAdapter(this.cboAgentSource);   
        })  
    }
    bindcboTrsStatus()
    {         
        this.backendservice.wsCall(this.Authorization,this.backendservice.wsgetTransactionStatus).then(data =>
        {
            this.cboTrsStatusList = data;
            this.cboTrsStatusSource =
            {
                dataType: 'json',
                datafield:[
                {name:'Ask'},
                {name:'StatusName'},
                {name: 'StatusDetails'}],
                localdata: this.cboTrsStatusList,
            }
            this.cboTrsStatusAdaptor = new jqx.dataAdapter(this.cboTrsStatusSource);   
        })  
    }
    bindCritiaParaJson()
    {
        this.CritiaParaJson.AgentAsk = this.agendask;
        this.CritiaParaJson.Ask =this.bookingask;
        this.CritiaParaJson.ContainerAsk=this.containerask;
        this.CritiaParaJson.Password=this.backendservice.LoginPwd;
        this.CritiaParaJson.POAsk="0";
        this.CritiaParaJson.ProductAsk=this.backendservice.ProductName;
        this.CritiaParaJson.ShipperAsk=this.shipperask;
        this.CritiaParaJson.TruckAsk="0";
        this.CritiaParaJson.UserID=this.backendservice.LoginUser;


        // debugger
        // this.CritiaParaJson={
        //     "UserID" :""+this.backendservice.LoginUser+"",
        //     "Password" : ""+this.backendservice.LoginPwd+"",
        //     "ProductAsk":""+this.backendservice.ProductName+"",
        //     "Ask":""+this.bookingask+"",
        //     "AgentAsk": "" +this.agendask+"",
        //     "ContainerAsk":"" +this.containerask+"",
        //     "ShipperAsk":"" +this.shipperask+"",
        //     "TruckAsk":"0",
        //     "POAsk":"0"
        // }
        // this.CritiaParaJson= {
        //     "UserID" : "admin",
        //     "Password" : "123",
        //     "ProductAsk":"11",
        //     "Ask":"" +this.bookingask+"",
        //     "BookingID":"0",
        //     "AgentAsk": "" +this.agendask+"",
        //     "Shipper":"" +this.shipperask+"",
        //     "CountryAsk":"",
        //     "CargoReceivedDate":"",
        //     "CustomIssuedDate":"",
        //     "TransactionDate":"",
        //     "Signature":"",
        //     "SignatureDate":"",
        //     "BookingStatusAsk":"",
        //     "NoOfTruck":"",
        //     "NoOfContainer":"",
        //     "TruckAsk":"",
        //     "TruckID":"",
        //     "TruckTypeAsk":"",
        //     "PONo":"",
        //     "ShippingMark":"",
        //     "ReferenceNo":"",
        //     "SKUAsk":"",
        //     "SKUName":"",
        //     "SKUDetails":"",
        //     "DimensionWidth":"",
        //     "DimensionHeight":"",
        //     "DimensionBase":"",
        //     "SKUWeight":"",
        //     "PlanQty":"",
        //     "UOMAsk":"",
        //     "ReceivedQty":"",
        //     "Reference":"",
        //     "TruckType":"",
        //     "GoodQty":"",
        //     "DamageQty":"",
        //     "ShortLandQty":"",
        //     "OverlandQty":""
        // }

    }
    getJsonbyCriteria()
    {
        debugger
        this.bindCritiaParaJson();
        alert(JSON.stringify(this.CritiaParaJson));
        console.log("parammm"+this.CritiaParaJson);
        return new Promise((resolve,reject) => { 
            this.backendservice.wsCall(this.CritiaParaJson,this.backendservice.wsgetPRFEForDirect).then(data =>
            {
                debugger
                alert(JSON.stringify(data));
                var json = data;
                console.log('ws ret is'+JSON.stringify(json));
                this.AgentReturnJson= data[0].AgentList;
                this.BookingReturnJson = data[0].BookingList;
                this.ContainerReturnJson = data[0].ContainerList;
                this.ShipperReturnJson = data[0].ShipperList;  
                this.TruckReturnJson = data[0].TruckList;  
                this.POReturnJson = data[0].POList;     
                this.SKUReturnJson = data[0].SKUList;
                resolve('success'); 
                
            }) 
        })
     }
    
    createGrid()
    {
        //Boooking
        this.BookingGridSource  = {
            datafield : [
            { name: 'Ask', type: 'string'},
            { name: 'TS', type: 'string'},
            { name: 'UD', type: 'string'},
            { name: 'BookingID', type: 'string'},
            { name: 'AgentAsk', type: 'string'},
            { name: 'Shipper', type: 'string'},
            { name: 'CountryAsk', type: 'string'},
            { name: 'CargoReceivedDate', type: 'date'},
            { name: 'CustomIssuedDate', type: 'date'},
            { name: 'TransactionDate', type: 'date'},
            { name: 'Signature', type: 'string'},
            { name: 'SignatureDate', type: 'date'},
            { name: 'BookingStatusAsk', type: 'string'},
            { name: 'NoOfTruck', type: 'number'},
            { name: 'NoOfContainer', type: 'number'},
            { name: 'DisplaySequence', type: 'number'},
            { name: 'Remark', type: 'string'},
            { name: 'LogisticTypeAsk', type: 'string'},
            { name: 'TotalGrossW', type: 'number'},
            { name: 'TotalVol', type: 'number'}],
            //datatype: 'json',
            //datafields: this.datafield,
            localdata:[]  }
        this.BookingGridAdaptor = new jqx.dataAdapter(this.BookingGridSource)
       
      
        this.BookingGridColumn =
        [
            //{ text: 'R', width: 20, hidden:false },
            //{ text: 'C', width: 20,hidden:false },
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'Booking ID', datafield: 'BookingID', width: 120, hidden:false },
            //{ text: 'AgentAsk', datafield: 'AgentAsk', width: 120, hidden:false }, 
            { text: 'Agent Name', datafield: 'AgentAsk', width: '10%',displayfield: 'AgentName', columntype: 'combobox',
            cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                if (newvalue != oldvalue) {
                    for(let k=0; k< this.cboAgentList.length; k++)
                    {
                        if(this.cboAgentList[k].Ask == newvalue.value)
                        {
                            //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                        }
                    }                                    
                };
            },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboAgentAdaptor, displayMember: 'AgentName', valueMember: 'Ask' })     
                }          
            },
            { text: 'Shipper', datafield: 'Shipper', width: 120, hidden:true }, 
            //{ text: 'CountryAsk', datafield: 'CountryAsk', width: 120, hidden:false },
            { text: 'Country', datafield: 'CountryAsk', width: '10%',displayfield: 'CountryName', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboCountryList.length; k++)
                        {
                            if(this.cboCountryList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                    createeditor: (row: number, value: any, editor: any): void => {
                        editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboCountryAdaptor, displayMember: 'CountryName', valueMember: 'Ask' })     
                    }          
            }, 
            { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 120, hidden:true }, 
            { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 120, hidden:true }, 
            { text: 'Transaction Date', datafield: 'TransactionDate', width: 120, hidden:false }, 
            { text: 'Signature', datafield: 'Signature', width: 120, hidden:true }, 
            { text: 'Signature Date', datafield: 'Signature Date', width: 120, hidden:true },
            //{ text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 120, hidden:true }, 
            { text: 'Status', datafield: 'BookingStatusAsk', width: '10%',displayfield: 'StatusName', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboTrsStatusList.length; k++)
                        {
                            if(this.cboTrsStatusList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                    createeditor: (row: number, value: any, editor: any): void => {
                        editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboTrsStatusAdaptor, displayMember: 'StatusName', valueMember: 'Ask' })     
                    }          
            },
            { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 120, hidden:false },   
            { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 120, hidden:false }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:true },            
            { text: 'LogisticTypeAsk', datafield: 'LogisticTypeAsk', width: 120, hidden:true, }, 
            { text: 'TotalGrossW', datafield: 'TotalGrossW', width: 120, hidden:false }, 
            { text: 'TotalVol', datafield: 'TotalVol', width: 120, hidden:false },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false }, 
        ];

        //Container
        this.ContainerGridSource  = {
            datafield: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'ContainerNo', type: 'string'},
                { name: 'ContainerDetails', type: 'string'},
                { name: 'SealNo', type: 'string'},
                { name: 'Width', type: 'string'},
                { name: 'Height', type: 'date'},
                { name: 'Base', type: 'number'},
                { name: 'ContainerType', type: 'string'},
                { name: 'Color', type: 'string'},
                { name: 'TruckTypeAsk', type: 'string'},
                { name: 'Carrier', type: 'string'},
                { name: 'Voy', type: 'string'},
                { name: 'VesselNo', type: 'string'},
                { name: 'ETA', type: 'string'},
                { name: 'ETD', type: 'string'},
                { name: 'CutOffDate', type: 'Date'},
                { name: 'PaperlessCode', type: 'string'},
                { name: 'Container Picture', type: 'string'},
                { name: 'CountryAsk', type: 'string'},
                { name: 'TareWeight', type: 'number'},
                { name: 'GrossWeight', type: 'number'},
                { name: 'MattWeight', type: 'number'},
                { name: 'Total Weigt', type: 'number'},
                { name: 'Status', type: 'number'},
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'},
            ],localdata:[]  }
        this.ContainerGridAdaptor = new jqx.dataAdapter(this.ContainerGridSource);
        this.ContainerGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:false }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:false }, 
            { text: 'Container No', datafield: 'ContainerNo', width: 120, hidden:false },
            { text: 'Container Details', datafield: 'ContainerDetails', width: 120, hidden:false }, 
            { text: 'Seal No', datafield: 'SealNo', width: 120, hidden:false }, 
            { text: 'Width', datafield: 'Width', width: 120, hidden:false }, 
            { text: 'Height', datafield: 'Height', width: 120, hidden:false }, 
            { text: 'Base', datafield: 'Base', width: 120, hidden:false }, 
            { text: 'Container Type', datafield: 'ContainerType', width: 120, hidden:false }, 
            { text: 'Color', datafield: 'Color', width: 120, hidden:false }, 
            { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 120, hidden:false },
            { text: 'Carrier', datafield: 'Carrier', width: 120, hidden:false }, 
            { text: 'Voy', datafield: 'Voy', width: 120, hidden:false },   
            { text: 'Vessel No', datafield: 'VesselNo', width: 120, hidden:false }, 
            { text: 'ETA', datafield: 'ETA', width: 120, hidden:false }, 
            { text: 'ETD', datafield: 'ETD', width: 120, hidden:false }, 
            { text: 'CutOff Date', datafield: 'CutOffDate', width: 120, hidden:false }, 
            { text: 'Paperless Code', datafield: 'PaperlessCode', width: 120, hidden:false }, 
            { text: 'Container Picture', datafield: 'ContainerPicture', width: 120, hidden:false },
            { text: 'CountryAsk', datafield: 'CountryAsk', width: 120, hidden:false },
            { text: 'Tare Weight', datafield: 'TareWeight', width: 120, hidden:false },
            { text: 'Gross Weight', datafield: 'GrossWeight', width: 120, hidden:false },
            { text: 'Matt Weight', datafield: 'MattWeight', width: 120, hidden:false },
            { text: 'Total Weigt', datafield: 'TotalWeigt', width: 120, hidden:false },
            { text: 'Status', datafield: 'Status', width: 120, hidden:false },
            { text: 'Display Sequence', datafield: 'Display Sequence', width: 120, hidden:false },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false },
        ];

        //Shipper
        this.ShipperGridSource  = {
            datafield: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'ShipperName', type: 'string'},
                { name: 'ShipperDetails', type: 'string'},
                { name: 'Status', type: 'string'},            
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
        localdata:[]  }
        this.ShipperGridAdaptor = new jqx.dataAdapter(this.ShipperGridSource);
        this.ShipperGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:false }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:false }, 
            { text: 'Shipper Name', datafield: 'ShipperName', width: 300, hidden:false },
            { text: 'Shipper Details', datafield: 'ShipperDetails', width: 300, hidden:false }, 
            { text: 'Status', datafield: 'Status', width: 120, hidden:false }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:false }, 
            { text: 'Remark', datafield: 'Remark', width: 300, hidden:false }        
        ];

        //Truck
        this.TruckGridSource  = {
            datafield: [
            { name: 'Ask', type: 'string'},
            { name: 'TS', type: 'string'},
            { name: 'UD', type: 'string'},
            { name: 'TruckID', type: 'string'},
            { name: 'TruckTypeAsk', type: 'string'},
            { name: 'Status', type: 'string'},            
            { name: 'DisplaySequence', type: 'number'},
            { name: 'Remark', type: 'string'}],
            
        localdata:[]  }
       
        this.TruckGridAdaptor = new jqx.dataAdapter(this.TruckGridSource);
        this.TruckGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:false }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:false }, 
            { text: 'Truck ID', datafield: 'TruckID', width: 250, hidden:false },
            //{ text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 120, hidden:false }, 
            //{ text: 'Track ID', datafield: 'TruckID', width: 100 },
            // { text: 'Track Type', datafield: 'TrackType', width: 100 },
            { text: 'Track Type', datafield: 'TruckTypeAsk', width: 250,displayfield: 'Description', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboTruckTypeList.length; k++)
                        {
                            if(this.cboTruckTypeList[k].Ask == newvalue.value)
                            {
                                this.TruckGrid.setcellvalue(row,'weight',this.cboTruckTypeList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboTruckTypeAdaptor, displayMember: 'Description', valueMember: 'Ask' })     
                }          
            },
            { text: 'weight', datafield: 'weight', width: 200 },
            //{ text: 'cm', datafield: 'cm', width: 100 },
            //{ text: 'Remark', datafield: 'TruckRemark', width: 1120 },
            { text: 'Status', datafield: 'Status', width: 120, hidden:false }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:false }, 
            { text: 'Remark', datafield: 'Remark', width: 300, hidden:false }        
        ];



        //PO
        this.POGridSource  = {
            datafield: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'PONo', type: 'string'},
                { name: 'ShippingMark', type: 'string'},
                { name: 'ReferenceNo', type: 'string'},
                { name: 'Status', type: 'string'},            
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
            localdata:[]  }
        this.POGridAdaptor = new jqx.dataAdapter(this.POGridSource);
        this.POGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:false }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:false }, 
            { text: 'PO No', datafield: 'PONo', width: 200, hidden:false },
            { text: 'Shipping Mark', datafield: 'ShippingMark', width: 200, hidden:false },         
            { text: 'Reference No', datafield: 'ReferenceNo', width: 200, hidden:false }, 
            { text: 'Status', datafield: 'Status', width: 120, hidden:false }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:false }, 
            { text: 'Remark', datafield: 'Remark', width: 300, hidden:false }        
        ];

        //SKU
        this.SKUGridSource  = {
            datafield: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'SKUName', type: 'string'},
                { name: 'SKUDetails', type: 'string'},
                { name: 'DimensionWidth', type: 'number'},
                { name: 'DimensionHeight', type: 'number'},
                { name: 'DimensionBase', type: 'number'},
                { name: 'SKUWeight', type: 'number'},
                { name: 'PlanQty', type: 'number'},
                { name: 'UOMAsk', type: 'string'},
                { name: 'ReceivedQty', type: 'number'},
                { name: 'Reference', type: 'string'},
                { name: 'TruckID', type: 'string'},
                { name: 'TruckType', type: 'string'},
                { name: 'GoodQty', type: 'number'},
                { name: 'DamageQty', type: 'number'},
                { name: 'ShortLandQty', type: 'number'},
                { name: 'OverlandQty', type: 'number'},
                { name: 'Goodphoto', type: 'string'},
                { name: 'Damagephoto', type: 'string'},
                { name: 'ShortLandphoto', type: 'string'},
                { name: 'Overlandphoto', type: 'string'},
                //{ name: 'Status', type: 'string'},            
                //{ name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
            localdata:[]  }
        this.SKUGridAdaptor = new jqx.dataAdapter(this.SKUGridSource);
        this.SKUGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:false },
            { text: 'TS', datafield: 'TS', width: 120, hidden:false }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:false },
            { text: 'SKU Name', datafield: 'SKUName', width: 120, hidden:false },
            { text: 'SKU Details', datafield: 'SKUDetails', width: 120, hidden:false },
            { text: 'Dimension Width', datafield: 'DimensionWidth', width: 120, hidden:false }, 
            { text: 'Dimension Height', datafield: 'Dimensioneight', width: 120, hidden:false },
            { text: 'Dimension Base', datafield: 'DimensionBase', width: 120, hidden:false }, 
            { text: 'SKU Weight', datafield: 'SKUWeight', width: 120, hidden:false },
            { text: 'Plan Qty', datafield: 'PlanQty', width: 120, hidden:false },
            //{ text: 'UOMAsk', datafield: 'UOMAsk', width: 120, hidden:false },
            { text: 'UOM', datafield: 'UOMAsk', width: '10%',displayfield: 'Name', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboUOMList.length; k++)
                        {
                            if(this.cboUOMList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboUOMAdaptor, displayMember: 'Name', valueMember: 'Ask' })     
                }          
            },
            { text: 'Received Qty', datafield: 'ReceivedQty', width: 120, hidden:false }, 
            { text: 'Reference', datafield: 'Reference', width: 120, hidden:false },
            { text: 'Truck ID', datafield: 'TruckID', width: 120, hidden:false }, 
            { text: 'TruckType', datafield: 'TruckType', width: 120, hidden:false },
            { text: 'Good Qty', datafield: 'GoodQty', width: 120, hidden:false },
            { text: 'Damage Qty', datafield: 'DamageQty', width: 120, hidden:false },
            { text: 'Short Land Qty', datafield: 'ShortLandQty', width: 120, hidden:false }, 
            { text: 'Over Land Qty', datafield: 'OverlandQty', width: 120, hidden:false },
            { text: 'Good Photo', datafield: 'Goodphoto', width: 120, hidden:false }, 
            { text: 'Damage Photo', datafield: 'Damagephoto', width: 120, hidden:false },
            { text: 'ShortLand Photo', datafield: 'ShortLandphoto', width: 120, hidden:false },
            { text: 'Overland Photo', datafield: 'Overlandphoto', width: 120, hidden:false },
            //{ text: 'Status', datafield: 'Status', width: 120, hidden:false },        
            //{ text: 'Display Sequence', datafield: 'DisplaySequence', width: 120, hidden:false },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false },  
        ];
    }
    bindGrid()
    {
        debugger
        //Boooking
        this.BookingGridSource  = {
           BookingGriddataField : [
            //{ name: 'R', type: 'jqxButtonComponent'},
            //{ name: 'C', type: 'string'},
            { name: 'Ask', type: 'string'},
            { name: 'TS', type: 'string'},
            { name: 'UD', type: 'string'},
            { name: 'BookingID', type: 'string'},
            { name: 'AgentAsk', type: 'string'},
            { name: 'Shipper', type: 'string'},
            { name: 'CountryAsk', type: 'string'},
            { name: 'CargoReceivedDate', type: 'jqxdatetimeinput', showTimeButton: true},
            { name: 'CustomIssuedDate', type: 'jqxdatetimeinput', formatString: 'T', showTimeButton: true},
            { name: 'TransactionDate', type: 'jqxdatetimeinput',  formatString: 'yyyy-MM-dd HH:mm:ss', showTimeButton: false },
            { name: 'Signature', type: 'string'},
            { name: 'SignatureDate', type: 'date'},
            { name: 'BookingStatusAsk', type: 'string'},
            { name: 'NoOfTruck', type: 'number'},
            { name: 'NoOfContainer', type: 'number'},
            { name: 'DisplaySequence', type: 'number'},
            { name: 'Remark', type: 'string'},
            { name: 'LogisticTypeAsk', type: 'string'},
            { name: 'TotalGrossW', type: 'number'},
            { name: 'TotalVol', type: 'number'},],
            localdata:this.BookingReturnJson }
        this.BookingGridAdaptor = new jqx.dataAdapter(this.BookingGridSource);
        this.BookingGridColumn =
        [
            //{ text: 'R', width: 20, hidden:false },
            //{ text: 'C', width: 20,hidden:false },
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'Booking ID', datafield: 'BookingID', width: 120, hidden:false },
            //{ text: 'AgentAsk', datafield: 'AgentAsk', width: 120, hidden:false }, 
            { text: 'Agent Name', datafield: 'AgentAsk', width: '10%',displayfield: 'AgentName', columntype: 'combobox',
            cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                if (newvalue != oldvalue) {
                    for(let k=0; k< this.cboAgentList.length; k++)
                    {
                        if(this.cboAgentList[k].Ask == newvalue.value)
                        {
                            //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                        }
                    }                                    
                };
            },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboAgentAdaptor, displayMember: 'AgentName', valueMember: 'Ask' })     
                }          
            },
            { text: 'Shipper', datafield: 'Shipper', width: 120, hidden:true }, 
            //{ text: 'CountryAsk', datafield: 'CountryAsk', width: 120, hidden:false },
            { text: 'Country', datafield: 'CountryAsk', width: '10%',displayfield: 'CountryName', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboCountryList.length; k++)
                        {
                            if(this.cboCountryList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                    createeditor: (row: number, value: any, editor: any): void => {
                        editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboCountryAdaptor, displayMember: 'CountryName', valueMember: 'Ask' })     
                    }          
            }, 
           // { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 120, hidden:true }, 
            { text: 'CargoReceived Date', datafield: 'CargoReceivedDate', columntype: 'datetimeinput',  width: 120, hidden:false }, 
            //{ text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 120, hidden:true }, 
            { text: 'CustomIssued Date', datafield: 'CustomIssuedDate', columntype: 'datetimeinput', formatString: 'T', showTimeButton: true, width: 120, hidden:false }, 
            // { text: 'Transaction Date', datafield: 'TransactionDate', columntype: 'datetimeinput',formatString: "F",  showTimeButton: true, width: 300,Height:25, hidden:false }, 
            { text: 'Transaction Date', datafield: 'TransactionDate', columntype: 'datetimeinput', formatString: 'yyyy-MM-dd HH:mm:ss', showTimeButton: true, width: 120, hidden:false }, 
           
            { text: 'Signature', datafield: 'Signature', width: 120, hidden:true }, 
            { text: 'Signature Date', datafield: 'Signature Date', width: 120, hidden:true },
            //{ text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 120, hidden:true }, 
            { text: 'Status', datafield: 'BookingStatusAsk', width: '10%',displayfield: 'StatusName', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboTrsStatusList.length; k++)
                        {
                            if(this.cboTrsStatusList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                    createeditor: (row: number, value: any, editor: any): void => {
                        editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboTrsStatusAdaptor, displayMember: 'StatusName', valueMember: 'Ask' })     
                    }          
            },
            { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 120, hidden:false },   
            { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 120, hidden:false }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:true },            
            { text: 'LogisticTypeAsk', datafield: 'LogisticTypeAsk', width: 120, hidden:true, }, 
            { text: 'TotalGrossW', datafield: 'TotalGrossW', width: 120, hidden:false }, 
            { text: 'TotalVol', datafield: 'TotalVol', width: 120, hidden:false },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false }, 
        ];

        //Container
        this.ContainerGridSource  = {
            ContainerGriddataField: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'ContainerNo', type: 'string'},
                { name: 'ContainerDetails', type: 'string'},
                { name: 'SealNo', type: 'string'},
                { name: 'Width', type: 'number'},
                { name: 'Height', type: 'number'},
                { name: 'Base', type: 'number'},
                { name: 'ContainerType', type: 'string'},
                { name: 'Color', type: 'string'},
                { name: 'TruckTypeAsk', type: 'string'},
                { name: 'Carrier', type: 'string'},
                { name: 'Voy', type: 'string'},
                { name: 'VesselNo', type: 'string'},
                { name: 'ETA', type: 'Date'},
                { name: 'ETD', type: 'Date'},
                { name: 'CutOffDate', type: 'Date'},
                { name: 'PaperlessCode', type: 'string'},
                { name: 'Container Picture', type: 'string'},
                { name: 'CountryAsk', type: 'string'},
                { name: 'TareWeight', type: 'number'},
                { name: 'GrossWeight', type: 'number'},
                { name: 'MattWeight', type: 'number'},
                { name: 'TotalWeigt', type: 'number'},
                { name: 'Status', type: 'number'},
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'},
            ],localdata:this.ContainerReturnJson }
        this.ContainerGridAdaptor = new jqx.dataAdapter(this.ContainerGridSource);
        this.ContainerGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'Container No', datafield: 'ContainerNo', width: 120, hidden:false },
            { text: 'Container Details', datafield: 'ContainerDetails', width: 120, hidden:false }, 
            { text: 'Seal No', datafield: 'SealNo', width: 120, hidden:false }, 
            { text: 'Width', datafield: 'Width', width: 120, hidden:false }, 
            { text: 'Height', datafield: 'Height', width: 120, hidden:false }, 
            { text: 'Base', datafield: 'Base', width: 120, hidden:false }, 
            { text: 'Container Type', datafield: 'ContainerType', width: 120, hidden:true }, 
            { text: 'Color', datafield: 'Color', width: 120, hidden:true }, 
            { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 120, hidden:true },
            { text: 'Carrier', datafield: 'Carrier', width: 120, hidden:false }, 
            { text: 'Voy', datafield: 'Voy', width: 120, hidden:false },   
            { text: 'Vessel No', datafield: 'VesselNo', width: 120, hidden:false }, 
            { text: 'ETA', datafield: 'ETA', width: 120, hidden:false }, 
            { text: 'ETD', datafield: 'ETD', width: 120, hidden:false }, 
            { text: 'CutOff Date', datafield: 'CutOffDate', width: 120, hidden:false }, 
            { text: 'Paperless Code', datafield: 'PaperlessCode', width: 120, hidden:false }, 
            { text: 'Container Picture', datafield: 'ContainerPicture', width: 120, hidden:true },
            { text: 'CountryAsk', datafield: 'CountryAsk', width: 120, hidden:false },
            { text: 'Tare Weight', datafield: 'TareWeight', width: 120, hidden:false },
            { text: 'Gross Weight', datafield: 'GrossWeight', width: 120, hidden:false },
            { text: 'Matt Weight', datafield: 'MattWeight', width: 120, hidden:false },
            { text: 'Total Weigt', datafield: 'TotalWeigt', width: 120, hidden:false  },
            { text: 'Status', datafield: 'Status', width: 120, hidden:true },
            { text: 'Display Sequence', datafield: 'Display Sequence', width: 120, hidden:true },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false },
        ];

        //Shipper
        this.ShipperGridSource  = {
            ShipperGriddataField: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'ShipperName', type: 'string'},
                { name: 'ShipperDetails', type: 'string'},
                { name: 'Status', type: 'string'},            
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
            localdata:this.ShipperReturnJson  }
        this.ShipperGridAdaptor = new jqx.dataAdapter(this.ShipperGridSource);
        this.ShipperGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'Shipper Name', datafield: 'ShipperName', width: 300, hidden:false },
            { text: 'Shipper Details', datafield: 'ShipperDetails', width: 300, hidden:false }, 
            { text: 'Status', datafield: 'Status', width: 120, hidden:true }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:true }, 
            { text: 'Remark', datafield: 'Remark', width: 400, hidden:false }        
        ];

        //Truck
        this.TruckGridSource  = {
            TruckGriddataField: [
            { name: 'Ask', type: 'string'},
            { name: 'TS', type: 'string'},
            { name: 'UD', type: 'string'},
            { name: 'TruckID', type: 'string'},
            { name: 'TruckTypeAsk', type: 'string'},
            { name: 'Status', type: 'string'},            
            { name: 'DisplaySequence', type: 'number'},
            { name: 'Remark', type: 'string'}],
        localdata:this.TruckReturnJson }
        this.TruckGridAdaptor = new jqx.dataAdapter(this.TruckGridSource);
        this.TruckGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'Truck ID', datafield: 'TruckID', width: 250, hidden:false },
            //{ text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 120, hidden:false },            
            // { text: 'Track Type', datafield: 'TrackType', width: 100 },
            { text: 'Track Type', datafield: 'TruckTypeAsk', width: 250,displayfield: 'Description', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboTruckTypeList.length; k++)
                        {
                            if(this.cboTruckTypeList[k].Ask == newvalue.value)
                            {
                                this.TruckGrid.setcellvalue(row,'weight',this.cboTruckTypeList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboTruckTypeAdaptor, displayMember: 'Description', valueMember: 'Ask' })     
                }          
            },
            { text: 'weight', datafield: 'weight', width: 200  },
            //{ text: 'cm', datafield: 'cm', width: 100 },
            //{ text: 'Remark', datafield: 'TruckRemark', width: 1120 },
            { text: 'Status', datafield: 'Status', width: 120, hidden:true }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:true }, 
            { text: 'Remark', datafield: 'Remark', width: 300, hidden:false }        
        ];

        //PO
        this.POGridSource  = {
            POGriddataField: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'PONo', type: 'string'},
                { name: 'ShippingMark', type: 'string'},
                { name: 'ReferenceNo', type: 'string'},
                { name: 'Status', type: 'string'},            
                { name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
            localdata:this.POReturnJson }
        this.POGridAdaptor = new jqx.dataAdapter(this.POGridSource);
        this.POGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true }, 
            { text: 'PO No', datafield: 'PONo', width: 250, hidden:false },
            { text: 'Shipping Mark', datafield: 'ShippingMark', width: 250, hidden:false },         
            { text: 'Reference No', datafield: 'ReferenceNo', width: 250, hidden:false }, 
            { text: 'Status', datafield: 'Status', width: 120, hidden:true }, 
            { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120, hidden:true }, 
            { text: 'Remark', datafield: 'Remark', width: 300, hidden:false }        
        ];

        //SKU
        this.SKUGridSource  = {
            SKUGriddataField: [
                { name: 'Ask', type: 'string'},
                { name: 'TS', type: 'string'},
                { name: 'UD', type: 'string'},
                { name: 'SKUName', type: 'string'},
                { name: 'SKUDetails', type: 'string'},
                { name: 'DimensionWidth', type: 'number'},
                { name: 'DimensionHeight', type: 'number'},
                { name: 'DimensionBase', type: 'number'},
                { name: 'SKUWeight', type: 'number'},
                { name: 'PlanQty', type: 'number'},
                { name: 'UOMAsk', type: 'string'},
                { name: 'ReceivedQty', type: 'number'},
                { name: 'Reference', type: 'string'},
                { name: 'TruckID', type: 'string'},
                { name: 'TruckType', type: 'string'},
                { name: 'GoodQty', type: 'number'},
                { name: 'DamageQty', type: 'number'},
                { name: 'ShortLandQty', type: 'number'},
                { name: 'OverlandQty', type: 'number'},
                { name: 'Goodphoto', type: 'string'},
                { name: 'Damagephoto', type: 'string'},
                { name: 'ShortLandphoto', type: 'string'},
                { name: 'Overlandphoto', type: 'string'},
                //{ name: 'Status', type: 'string'},            
                //{ name: 'DisplaySequence', type: 'number'},
                { name: 'Remark', type: 'string'}],
            localdata:this.SKUReturnJson }
        this.SKUGridAdaptor = new jqx.dataAdapter(this.SKUGridSource);
        this.SKUGridColumn =
        [
            { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
            { text: 'TS', datafield: 'TS', width: 120, hidden:true }, 
            { text: 'UD', datafield: 'UD', width: 120, hidden:true },
            { text: 'SKU Name', datafield: 'SKUName', width: 120, hidden:false },
            { text: 'SKU Details', datafield: 'SKUDetails', width: 120, hidden:false },
            { text: 'Dimension Width', datafield: 'DimensionWidth', width: 120, hidden:false  }, 
            { text: 'Dimension Height', datafield: 'Dimensioneight', width: 120, hidden:false },
            { text: 'Dimension Base', datafield: 'DimensionBase', width: 120, hidden:false }, 
            { text: 'SKU Weight', datafield: 'SKUWeight', width: 120, hidden:false },
            { text: 'Plan Qty', datafield: 'PlanQty', width: 120, hidden:false },
            //{ text: 'UOMAsk', datafield: 'UOMAsk', width: 120, hidden:false },
            { text: 'UOM', datafield: 'UOMAsk', width: '10%',displayfield: 'Name', columntype: 'combobox',
                cellvaluechanging: (row: number, datafield: string, columntype: any, oldvalue: any, newvalue: any): void => {
                    if (newvalue != oldvalue) {
                        for(let k=0; k< this.cboUOMList.length; k++)
                        {
                            if(this.cboUOMList[k].Ask == newvalue.value)
                            {
                                //this.SKUGrid.setcellvalue(row,'weight',this.cboUOMList[k].StockWeight);                        
                            }
                        }                                    
                    };
                },
                createeditor: (row: number, value: any, editor: any): void => {
                    editor.jqxComboBox({ searchMode:'containsignorecase', autoComplete:true, source: this.cboUOMAdaptor, displayMember: 'Name', valueMember: 'Ask' })     
                }          
            },
            { text: 'Received Qty', datafield: 'ReceivedQty', width: 120, hidden:false }, 
            { text: 'Reference', datafield: 'Reference', width: 120, hidden:false },
            { text: 'Truck ID', datafield: 'TruckID', width: 120, hidden:true }, 
            { text: 'TruckType', datafield: 'TruckType', width: 120, hidden:true },
            { text: 'Good Qty', datafield: 'GoodQty', width: 120, hidden:true },
            { text: 'Damage Qty', datafield: 'DamageQty', width: 120, hidden:true },
            { text: 'Short Land Qty', datafield: 'ShortLandQty', width: 120, hidden:true }, 
            { text: 'Over Land Qty', datafield: 'OverlandQty', width: 120, hidden:true },
            { text: 'Good Photo', datafield: 'Goodphoto', width: 120, hidden:true }, 
            { text: 'Damage Photo', datafield: 'Damagephoto', width: 120, hidden:true },
            { text: 'ShortLand Photo', datafield: 'ShortLandphoto', width: 120, hidden:true },
            { text: 'Overland Photo', datafield: 'OverlandPhoto', width: 120, hidden:true },
            //{ text: 'Status', datafield: 'Status', width: 120, hidden:false },        
            //{ text: 'Display Sequence', datafield: 'DisplaySequence', width: 120, hidden:false },
            { text: 'Remark', datafield: 'Remark', width: 120, hidden:false },  
        ];
    }
    generateBookingGridRow(): any {   
        let row = {};
        // row['R'] = 'R',
        // row['C'] = 'C',
        row['Ask'] = "0";
        row['TS'] = "0";
        row['UD'] = "0";
        row['BookingID'] ="";
        row['AgentAsk'] = "0";
        row['Shipper'] = "0";
        row['CountryAsk'] = "0";
        row['CargoReceivedDate']  ="";
        row['CustomIssuedDate']  ="";
        row['TransactionDate']  ="";
        row['Signature']  ="";
        row['SignatureDate']  ="";
        row['BookingStatusAsk'] = "0";
        row['NoOfTruck'] = "0";
        row['NoOfContainer'] = "0";
        row['DisplaySequence'] = "0";
        row['Remark']  ="";
        row['LogisticTypeAsk'] = "0";
        row['TotalGrossW'] = "0";
        row['TotalVol'] = "0";
        return row;
    }    
    generateContainerGridRow(): any {   
        let row = {};
        row[''] = 'X'
        row['Width'] = 0;
        row['Height'] = 0;
        row['Base'] = 0;
        row['MattWeight'] = 0;
        row['TareWeight'] = 0;
        row['GrossWeight'] = 0;
        row['TotalWeigt'] = 0;
        row[''] = 0;
        return row;
    }
    generateShipperGridRow(): any {   
        let row = {};
        // row['DeleteRow'] = 'X'
        // row['LocalAmt'] = 0;
        // row['SourceAmt'] = 0;
        return row;
    }
    generateTruckGridRow(): any {   
        let row = {};
        // row['DeleteRow'] = 'X'
        row['weight'] = 0;
        // row['SourceAmt'] = 0;
        return row;
    }
    generatePOGridRow(): any {   
        let row = {};
        // row['DeleteRow'] = 'X'
        // row['LocalAmt'] = 0;
        // row['SourceAmt'] = 0;
        return row;
    }
    generateSKUGridRow(): any {   
        let row = {};
        row['SKUDimensionWidth'] = 0;
        row['SKUDimensionHeight'] = 0;
        row['SKUDimensionBase'] = 0;
        row['SKUWeight'] = 0;
        row['PlanQty'] = 0;
        row['ReceivedQty'] = 0;
        return row;
    }
    BookingGridOnRowSelect(event: any): void 
    {
       
    }
    BookingGridonCellvaluechanged(event:any)
    {
       
    }
    BookingGridonCellendedit()
    {

    }
    ContainerGridOnRowSelect(event: any): void 
    {
       
    }
    ContainerGridonCellvaluechanged(event:any)
    {
       
    }
    ContainerGridonCellendedit()
    {

    }
    ShipperGridOnRowSelect(event: any): void 
    {
       
    }
    ShipperGridonCellvaluechanged(event:any)
    {
       
    }
    ShipperGridonCellendedit()
    {

    }
    TruckGridOnRowSelect(event: any): void 
    {
       
    }
    TruckGridonCellvaluechanged(event:any)
    {
       
    }
    TruckGridonCellendedit()
    {

    }
    POGridOnRowSelect(event: any): void 
    {
       
    }
    POGridonCellvaluechanged(event:any)
    {
       
    }
    POGridonCellendedit()
    {

    }
    SKUGridOnRowSelect(event: any): void 
    {
       
    }
    SKUGridonCellvaluechanged(event:any)
    {
       
    }
    SKUGridonCellendedit()
    {

    }
    cellvaluechangedSKU(event:any)
    {
        var index = this.SKUGrid.getselectedrowindex();
        var rowdata = this.SKUGrid.getrowdata(index);   
        var columnname = event.args.datafield;
        if(columnname == "ShipperName")
        {
            let oldvalue = event.args.oldvalue;
            let newvalue = event.args.newvalue;
            if(oldvalue != newvalue)
            {
                //this.shipperGrid.endcelledit(this.shipperGrid.getselectedrowindex(),"ShipperName",true);
                //this.CellendeditShipper();
            }

        }
    }
    CellendeditSKU()
    {
        var index = this.SKUGrid.getselectedrowindex();
        var rowdata = this.SKUGrid.getrowdata(index);   
        if(rowdata.ShipperName)
        {
            this.addNewRowSKU();
        }
    }
    addNewRowSKU()
    {
        var index = this.SKUGrid.getselectedrowindex();
        var rowcount = this.SKUGrid.getrows();
        var rowlength = rowcount.length - 1;
        if(rowlength == index)
        {
            //this.griddisable = false;
            let datarow = this.generateSKUGridRow();              
            this.SKUGrid.addrow(null, datarow);      
        }
        // this.shipperGrid.setcolumnproperty('GLCode','editable',true);
    }
    prepareSaveJson()
    {
        this.bindDefaultValue();
        //alert(JSON.stringify( this.BookingGrid.getboundrows()));
        var BookingGridRowData = this.BookingGrid.getrows();      
        var ContainerGridRowData = this.ContainerGrid.getrows();   
        var ShipperGridRowData = this.ShipperGrid.getrows();   
        var TruckGridRowData = this.TruckGrid.getrows();   
        var POGridRowData = this.POGrid.getrows();   
        var SKUGridRowData = this.SKUGrid.getrows();   
        console.log("grid dataa - "+ JSON.stringify(BookingGridRowData));
        //alert("grid index - "+JSON.stringify(this.BookingGrid.getselectedrowindex())); 
        //alert(JSON.stringify(BookingGridRowData)); 

       // let skugridarray = [];
        //skugridarray = this.SKUGrid.getrows(); 
        //alert(JSON.stringify( skugridarray));

        // this.BookingParaJson=JSON.stringify(BookingGridRowData);
        // this.ContainerParaJson=JSON.stringify(ContainerGridRowData);
        // this.ShipperParaJson=JSON.stringify(ShipperGridRowData);
        // this.TruckParaJson=JSON.stringify(TruckGridRowData);
        // this.POParaJson=JSON.stringify(POGridRowData);
        // this.SKUParaJson=JSON.stringify(SKUGridRowData);
        // this.SKUJsonList=JSON.stringify(skugridarray);
debugger

        // //bind agent
        // if(BookingGridRowData[0].agendask!=null)
        // {
        //  alert("Agne" + BookingGridRowData[0].agendask)   
        // }
        // else
        // {
        //     alert("Agnet not null " + BookingGridRowData[0].agendask)   
        // }
                //bind booking data
                //alert(  BookingGridRowData[0].AgentAsk.valueMember);
        alert( JSON.stringify( BookingGridRowData[0].AgentAsk)) ;//undefined
        
        if (BookingGridRowData[0].AgentAsk!=undefined)
        {this.BookingParaJson.Ask= BookingGridRowData[0].Ask ;}
        else{
            alert("aefef");
        }
        this.BookingParaJson.Ask= BookingGridRowData[0].Ask ;

        this.BookingParaJson.AgentAsk = BookingGridRowData[0].AgentAsk;
        this.BookingParaJson.BookingID = BookingGridRowData[0].BookingID;
        this.BookingParaJson.BookingStautsAsk= BookingGridRowData[0].BookingStatusAsk;
        this.BookingParaJson.CargoReceivedDate= BookingGridRowData[0].CargoReceivedDate;
        this.BookingParaJson.CountryAsk= BookingGridRowData[0].CountryAsk;
        this.BookingParaJson.CustomIssuedDate= BookingGridRowData[0].CustomIssuedDate;
        this.BookingParaJson.DisplaySequence= BookingGridRowData[0].DisplaySequence;
        this.BookingParaJson.LogisticTypeAsk= BookingGridRowData[0].LogisticTypeAsk;
        this.BookingParaJson.NoOfContainer= BookingGridRowData[0].NoOfContainer;
        this.BookingParaJson.NoOfTruck= BookingGridRowData[0].NoOfTruck;
        this.BookingParaJson.Remark= BookingGridRowData[0].Remark;
        this.BookingParaJson.Shipper= BookingGridRowData[0].Shipper;
        this.BookingParaJson.Signature= BookingGridRowData[0].Signature;
        this.BookingParaJson.SignatureDate= BookingGridRowData[0].SignatureDate;
        this.BookingParaJson.TotalGrossW= BookingGridRowData[0].TotalGrossW;
        this.BookingParaJson.TotalVol= BookingGridRowData[0].TotalVol;
        this.BookingParaJson.TransactionDate= BookingGridRowData[0].TransactionDate;
        this.BookingParaJson.TS = BookingGridRowData[0].TS;
        this.BookingParaJson.UD= BookingGridRowData[0].UD;

        //bind container
        this.ContainerParaJson.Ask = ContainerGridRowData[0].Ask ;
        this.ContainerParaJson.Base = ContainerGridRowData[0].Base ;
        this.ContainerParaJson.Carrier = ContainerGridRowData[0].Carrier ;
        this.ContainerParaJson.Color = ContainerGridRowData[0].Color ;
        this.ContainerParaJson.ContainerDetails = ContainerGridRowData[0].ContainerDetails ;
        this.ContainerParaJson.ContainerNo = ContainerGridRowData[0].ContainerNo ;
        this.ContainerParaJson.ContainerPicture = ContainerGridRowData[0].ContainerPicture ;
        this.ContainerParaJson.ContainerType = ContainerGridRowData[0].ContainerType ;
        this.ContainerParaJson.CountryAsk = ContainerGridRowData[0].CountryAsk ;
        this.ContainerParaJson.CutOffDate = ContainerGridRowData[0].CutOffDate ;
        this.ContainerParaJson.DisplaySequence = ContainerGridRowData[0].DisplaySequence ;
        this.ContainerParaJson.ETA = ContainerGridRowData[0].ETA ;
        this.ContainerParaJson.ETD = ContainerGridRowData[0].ETD ;
        this.ContainerParaJson.GrossWeight = ContainerGridRowData[0].GrossWeight ;
        this.ContainerParaJson.Height = ContainerGridRowData[0].Height ;
        this.ContainerParaJson.MattWeight = ContainerGridRowData[0].MattWeight ;
        this.ContainerParaJson.PaperlessCode = ContainerGridRowData[0].PaperlessCode ;
        this.ContainerParaJson.Remark = ContainerGridRowData[0].Remark ;
        this.ContainerParaJson.SealNo = ContainerGridRowData[0].SealNo ;
        this.ContainerParaJson.Status = ContainerGridRowData[0].Status;
        this.ContainerParaJson.TareWeight = ContainerGridRowData[0].TareWeight ;
        this.ContainerParaJson.TotalWeigt = ContainerGridRowData[0].TotalWeigt ;
        this.ContainerParaJson.TruckTypeAsk = ContainerGridRowData[0].TruckTypeAsk ;
        this.ContainerParaJson.TS = ContainerGridRowData[0].TS ;
        this.ContainerParaJson.UD = ContainerGridRowData[0].UD ;
        this.ContainerParaJson.VesselNo = ContainerGridRowData[0].VesselNo ;
        this.ContainerParaJson.Voy = ContainerGridRowData[0].Voy ;
        this.ContainerParaJson.Width = ContainerGridRowData[0].Width ;


        //bind Shipper
        this.ShipperParaJson.Ask = ShipperGridRowData[0].Ask ; 
        this.ShipperParaJson.DisplaySequence = ShipperGridRowData[0].DisplaySequence ;
        this.ShipperParaJson.Remark = ShipperGridRowData[0].Remark ;
        this.ShipperParaJson.ShipperDetails = ShipperGridRowData[0].ShipperDetails ;
        this.ShipperParaJson.ShipperName = ShipperGridRowData[0].ShipperName ;
        this.ShipperParaJson.Status = ShipperGridRowData[0].Status ;
        this.ShipperParaJson.TS = ShipperGridRowData[0].TS ;
        this.ShipperParaJson.UD =ShipperGridRowData[0].UD ;
        
        //bind truck
        this.TruckParaJson.Ask = TruckGridRowData[0].Ask ;
        this.TruckParaJson.DisplaySequence = TruckGridRowData[0].DisplaySequence ;
        this.TruckParaJson.Remark = TruckGridRowData[0].Remark ;
        this.TruckParaJson.Status = TruckGridRowData[0].Status ;
        this.TruckParaJson.TruckID = TruckGridRowData[0].TruckID ;
        this.TruckParaJson.TruckTypeAsk = TruckGridRowData[0].TruckTypeAsk ;
        this.TruckParaJson.TS = TruckGridRowData[0].TS ;
        this.TruckParaJson.UD =TruckGridRowData[0].UD ;

        //bind po
        this.POParaJson.Ask =POGridRowData[0].Ask ;
        this.POParaJson.PONo = POGridRowData[0].PONo ;
        this.POParaJson.ReferenceNo = POGridRowData[0].ReferenceNo ;
        this.POParaJson.Remark = POGridRowData[0].Remark ;
        this.POParaJson.ShippingMark = POGridRowData[0].ShippingMark ;
        this.POParaJson.TS = POGridRowData[0].TS ;
        this.POParaJson.UD =POGridRowData[0].UD ;
debugger
        //bind SKU
        //alert(SKUGridRowData.length);
        for(let i=0; i < SKUGridRowData.length;i++)
        {
            alert(SKUGridRowData[i].Ask);
            this.bindDefaultSKU();
            this.SKUParaJson.Ask = SKUGridRowData[i].Ask ; 
            this.SKUParaJson.Damagephoto = SKUGridRowData[i].Damagephoto ; 
            this.SKUParaJson.DamageQty = SKUGridRowData[i].DamageQty ; 
            this.SKUParaJson.DimensionBase = SKUGridRowData[i].DimensionBase ; 
            this.SKUParaJson.DimensionHeight = SKUGridRowData[i].DimensionHeight ; 
            this.SKUParaJson.DimensionWidth = SKUGridRowData[i].DimensionWidth ; 
            this.SKUParaJson.Goodphoto = SKUGridRowData[i].Goodphoto ; 
            this.SKUParaJson.GoodQty = SKUGridRowData[i].GoodQty ; 
            this.SKUParaJson.Overlandphoto = SKUGridRowData[i].Overlandphoto ; 
            this.SKUParaJson.OverlandQty = SKUGridRowData[i].OverlandQty ; 
            this.SKUParaJson.PlanQty = SKUGridRowData[i].PlanQty ; 
            this.SKUParaJson.ReceivedQty = SKUGridRowData[i].ReceivedQty ; 
            this.SKUParaJson.Reference = SKUGridRowData[i].Reference ; 
            this.SKUParaJson.Remark = SKUGridRowData[i].Remark ; 
            this.SKUParaJson.ShortLandphoto = SKUGridRowData[i].ShortLandphoto ;
            this.SKUParaJson.ShortLandQty = SKUGridRowData[i].ShortLandQty ;
            this.SKUParaJson.SKUDetails = SKUGridRowData[i].SKUDetails ;
            this.SKUParaJson.SKUName = SKUGridRowData[i].SKUName ;
            this.SKUParaJson.SKUWeight = SKUGridRowData[i].SKUWeight ;
            this.SKUParaJson.TruckID = SKUGridRowData[i].TruckID ;
            this.SKUParaJson.TruckType = SKUGridRowData[i].TruckType ;
            this.SKUParaJson.TS = SKUGridRowData[i].TS ;
            this.SKUParaJson.UD = SKUGridRowData[i].UD ; 
            this.SKUParaJson.UOMAsk =SKUGridRowData[i].UOMAsk ;
            this.SKUParaJsonList.push(this.SKUParaJson);
            alert(JSON.stringify(this.SKUParaJsonList));
        }   



debugger
        this.SaveParaJson=  '{"Authorization":'+JSON.stringify( this.Authorization)
        +',"Agent":'+JSON.stringify(this.AgentParaJson)
        +",\"Booking\""+":"+JSON.stringify(this.BookingParaJson)
        +",\"Container\""+":"+JSON.stringify(this.ContainerParaJson)
        +",\"Shipper\""+":"+JSON.stringify(this.ShipperParaJson)
        +",\"Truck\""+":"+JSON.stringify(this.TruckParaJson)
        +",\"PO\""+":"+JSON.stringify(this.POParaJson)
        +",\"SKUList\""+":"+JSON.stringify(this.SKUParaJsonList)+"}";


        debugger
      //  alert(this.SaveParaJson);
        console.log("save para dataa - "+ this.SaveParaJson);
        // //alert(JSON.stringify(allgridjson));
        // this.SaveParaJson= {  
        //     "Authorization":{  
        //        "UserID":"admin",
        //        "Password":"123",
        //        "ProductAsk":"11"
        //     },
        //     "Booking":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "BookingID":"B0001",
        //        "AgentAsk":"1",
        //        "Shipper":"",
        //        "CountryAsk":"1",
        //        "CargoReceivedDate":"",
        //        "CustomIssuedDate":"",
        //        "TransactionDate":"",
        //        "Signature":"",
        //        "SignatureDate":"",
        //        "BookingStautsAsk":"2",
        //        "NoOfTruck":"2",
        //        "NoOfContainer":"2",
        //        "DisplaySequence":"1",
        //        "Remark":"e",
        //        "LogisticTypeAsk":"2",
        //        "TotalGrossW":"5",
        //        "TotalVol":"4"
        //     },
        //     "Agent":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "AgentName":"D_Ageng_1",
        //        "AgentDetails":"D_Ageng_1",
        //        "NationalID":"",
        //        "BillingAddress":"",
        //        "ShippingAddress":"",
        //        "CompanyName":"",
        //        "Website":"",
        //        "Mobile":"",
        //        "Email":"",
        //        "ContactPersonName":"",
        //        "ContactPersonMobile":"",
        //        "Address":"",
        //        "DisplaySequence":"",
        //        "Remark":""
        //     },
        //     "Container":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "ContainerNo":"C_001",
        //        "ContainerDetails":"ContainerDetailsDirect002",
        //        "SealNo":"Sear-0001",
        //        "Width":"44.0",
        //        "Height":"44.0",
        //        "Base":"55.0",
        //        "ContainerType":"1",
        //        "Color":"Blue",
        //        "TruckTypeAsk":"2",
        //        "Carrier":"Thura",
        //        "Voy":"V0001",
        //        "VesselNo":"VS001",
        //        "ETA":"2018/01/01",
        //        "ETD":"2018/01/01",
        //        "CutOffDate":"2018/01/01",
        //        "PaperlessCode":"PC001",
        //        "ContainerPicture":"",
        //        "CountryAsk":"2",
        //        "TareWeight":"0.31",
        //        "GrossWeight":"12.0",
        //        "MattWeight":"33.0",
        //        "TotalWeigt":"011.0",
        //        "Status":"0",
        //        "DisplaySequence":"",
        //        "Remark":""
        //     },
        //     "Shipper":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "ShipperName":"THURA",
        //        "ShipperDetails":"THURA",
        //        "Status":"0",
        //        "DisplaySequence":"0",
        //        "Remark":"ShipperRemarkDirect002"
        //     },
        //     "Truck":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "TruckID":"TD0001",
        //        "TruckTypeAsk":"1",
        //        "Status":"0",
        //        "DisplaySequence":"0",
        //        "Remark":"TruckIDDirect002 Remark"
        //     },
        //     "PO":{  
        //        "Ask":"0",
        //        "TS":"0",
        //        "UD":"0",
        //        "PONo":"PO_D_001",
        //        "ShippingMark":"SM_D_001",
        //        "ReferenceNo":"REF_D_001",
        //        "Remark":"PONoDirect002 Remark"
        //     },
        //     "SKUList":[  
        //        {  
        //           "Ask":"0",
        //           "TS":"0",
        //           "UD":"0",
        //           "SKUName":"SALT",
        //           "SKUDetails":"",
        //           "DimensionWidth":"3",
        //           "DimensionHeight":"4",
        //           "DimensionBase":"4",
        //           "SKUWeight":"5",
        //           "PlanQty":"6",
        //           "UOMAsk":"1",
        //           "ReceivedQty":"",
        //           "Reference":"AEFE",
        //           "TruckID":"DD",
        //           "TruckType":"1",
        //           "GoodQty":"",
        //           "DamageQty":"",
        //           "ShortLandQty":"",
        //           "OverlandQty":"",
        //           "Goodphoto":"",
        //           "Damagephoto":"",
        //           "ShortLandphoto":"",
        //           "Overlandphoto":"",
        //           "Remark":"SKUNameDirect0021 Remark"
        //        },
        //        {  
        //           "Ask":"0",
        //           "TS":"0",
        //           "UD":"0",
        //           "SKUName":"POOL SALT",
        //           "SKUDetails":"",
        //           "DimensionWidth":"8",
        //           "DimensionHeight":"7",
        //           "DimensionBase":"5",
        //           "SKUWeight":"4",
        //           "PlanQty":"777",
        //           "UOMAsk":"2",
        //           "ReceivedQty":"",
        //           "Reference":"",
        //           "TruckID":"",
        //           "TruckType":"",
        //           "GoodQty":"",
        //           "DamageQty":"",
        //           "ShortLandQty":"",
        //           "OverlandQty":"",
        //           "Goodphoto":"",
        //           "Damagephoto":"",
        //           "ShortLandphoto":"",
        //           "Overlandphoto":"",
        //           "Remark":"SKUNameDirect0022 Remark"
        //        },
        //        {  
        //           "Ask":"0",
        //           "TS":"0",
        //           "UD":"0",
        //           "SKUName":"REFIND SAALT",
        //           "SKUDetails":"",
        //           "DimensionWidth":"5",
        //           "DimensionHeight":"3",
        //           "DimensionBase":"2",
        //           "SKUWeight":"45",
        //           "PlanQty":"555",
        //           "UOMAsk":"2",
        //           "ReceivedQty":"",
        //           "Reference":"",
        //           "TruckID":"",
        //           "TruckType":"",
        //           "GoodQty":"",
        //           "DamageQty":"",
        //           "ShortLandQty":"",
        //           "OverlandQty":"",
        //           "Goodphoto":"",
        //           "Damagephoto":"",
        //           "ShortLandphoto":"",
        //           "Overlandphoto":"",
        //           "Remark":"SKUNameDirect0023 Remark"
        //        }
        //     ]
        //  };
   

   
        }
//       for(let i=0; i < shippergridarray.length;i++)
//       {
//         shipperarray.push({'Ask':'0','ShipperName':shippergridarray[i].ShipperName,'ShipperDetails':shippergridarray[i].ShipperDetails});       
//       }
//let skugridarray = [];
//       skugridarray = this.skuGrid.getrows();   
//       let skuarray = []; 
//       for(let i=0; i < skugridarray.length;i++)
//       {
//         skuarray.push({'Ask':'0','SKUName':skugridarray[i].SKUName,'SKUDetails':skugridarray[i].SKUDetails,'DimensionWidth':skugridarray[i].SKUDimensionWidth,
//         'DimensionHeight':skugridarray[i].SKUDimensionHeight,'DimensionBase':skugridarray[i].SKUDimensionBase,'SKUWeight':skugridarray[i].SKUWeight,
// 'PlanQty':skugridarray[i].SKUPlanQty,'UOMAsk':skugridarray[i].SKUUOMAsk,'ReceivedQty':skugridarray[i].SKUReceivedQty,
// 'Reference':skugridarray[i].SKUReference,'TruckID':skugridarray[i].SKUTruckID,'TruckType':skugridarray[i].SKUTruckType,
// 'GoodQty':skugridarray[i].SKUGoodQty,'DamageQty':skugridarray[i].SKUDamageQty,
// 'ShortLandQty':skugridarray[i].SKUShortLandQty,'OverlandQty':skugridarray[i].SKUOverlandQty,
// 'Goodphoto':skugridarray[i].SKUGoodphoto,'Damagephoto':skugridarray[i].SKUDamagephoto,'ShortLandphoto':skugridarray[i].SKUShortLandphoto,
// 'Overlandphoto':skugridarray[i].SKUOverlandphoto    
//     })
//       }
//       let skugridjson = JSON.stringify(skuarray);
//       var allgridjson =  "[{"+ shipperselectedjson+",\"TruckList\""+":[{"+truckselectedjson+",\"POList\""+":[{"+poselectedjson+",\"SKUList\""+":["+skugridjson+"]},{"+pogridjson+"}"+"]},{"+truckgridjson+"}"+"]},{"+shippergridjson+"}]"     
//       allgridjson = "ShipperList\":"+allgridjson;
//       //allgridjson = allgridjson.replace(/["']/g, "")
  
  
    btnNew()
    {
        
      this.BookingGrid.clear();
      this.ContainerGrid.clear();
      this.ShipperGrid.clear();
      this.TruckGrid.clear();
      this.POGrid.clear();
      this.SKUGrid.clear();

      this.bindcboCountry();
      this.bindcboTrsStatus();
      this.bindcboUOM();
      this.bindcboTruckType();
  
      let BookingGridRow = this.generateBookingGridRow();             
      this.BookingGrid.addrow(null, BookingGridRow);

      let ContainerGridRow = this.generateContainerGridRow();             
      this.ContainerGrid.addrow(null, ContainerGridRow);

      let ShipperGridRow = this.generateShipperGridRow();             
      this.ShipperGrid.addrow(null, ShipperGridRow);

      let TruckGridRow = this.generateTruckGridRow();             
      this.TruckGrid.addrow(null, TruckGridRow);

      let POGridRow = this.generatePOGridRow();             
      this.POGrid.addrow(null, POGridRow);

      let SKUGridRow = this.generateSKUGridRow();             
      this.SKUGrid.addrow(null, SKUGridRow);
    }
    btnSave()
    {
        this.prepareSaveJson();
        //alert(JSON.stringify(this.SaveParaJson)); 
        console.log("para is "+JSON.stringify(this.SaveParaJson));
        this.backendservice.wsCall(this.SaveParaJson,this.backendservice.wssavePRFEForDirect).then(data =>
        {
            debugger
            console.log("return is "+JSON.stringify(JSON.stringify( data)));
            //alert(JSON.stringify(data)); 
            this.AgentReturnJson= data[0].Agent;
            this.BookingReturnJson = data[0].Booking;
            this.ContainerReturnJson = data[0].Container;
            this.ShipperReturnJson = data[0].Shipper;  
            this.TruckReturnJson = data[0].Truck;  
            this.POReturnJson = data[0].PO;     
            this.SKUReturnJson = data[0].SKU;
        })
        this.bindGrid(); 
        //console.log("body is "+JSON.stringify(this.Authorization));
    }
    btnPrint()
    {
        debugger
         
        this.BookingReturnJson=[{  
            "Ask":"0",
            "TS":"0",
            "UD":"0",
            "BookingID":"B0001",
            "AgentAsk":"2",
            "Shipper":"",
            "CountryAsk":"2",
            "CargoReceivedDate":"",
            "CustomIssuedDate":"",
            "TransactionDate":"",
            "Signature":"",
            "SignatureDate":"",
            "BookingStautsAsk":"2",
            "NoOfTruck":"2",
            "NoOfContainer":"2",
            "DisplaySequence":"1",
            "Remark":"e",
            "LogisticTypeAsk":"2",
            "TotalGrossW":"5",
            "TotalVol":"4"
         }];
        this.AgentReturnJson=[{  
            "Ask":"20180730091327024",
            "TS":"0",
            "UD":"0",
            "AgentName":"D_Ageng_1",
            "AgentDetails":"D_Ageng_1",
            "NationalID":"",
            "BillingAddress":"",
            "ShippingAddress":"",
            "CompanyName":"",
            "Website":"",
            "Mobile":"",
            "Email":"",
            "ContactPersonName":"",
            "ContactPersonMobile":"",
            "Address":"",
            "DisplaySequence":"",
            "Remark":""
         } ];
        this.ContainerReturnJson=[{  
            "Ask":"0",
            "TS":"0",
            "UD":"0",
            "ContainerNo":"C_001",
            "ContainerDetails":"ContainerDetailsDirect002",
            "SealNo":"Sear-0001",
            "Width":"44.0",
            "Height":"44.0",
            "Base":"55.0",
            "ContainerType":"1",
            "Color":"Blue",
            "TruckTypeAsk":"2",
            "Carrier":"Thura",
            "Voy":"V0001",
            "VesselNo":"VS001",
            "ETA":"2018/01/01",
            "ETD":"2018/01/01",
            "CutOffDate":"2018/01/01",
            "PaperlessCode":"PC001",
            "ContainerPicture":"",
            "CountryAsk":"2",
            "TareWeight":"0.31",
            "GrossWeight":"12.0",
            "MattWeight":"33.0",
            "TotalWeigt":"011.0",
            "Status":"0",
            "DisplaySequence":"",
            "Remark":""
         }]
        this.ShipperReturnJson=[{  
            "Ask":"0",
            "TS":"0",
            "UD":"0",
            "ShipperName":"THURA",
            "ShipperDetails":"THURA",
            "Status":"0",
            "DisplaySequence":"0",
            "Remark":"ShipperRemarkDirect002"
         }]
        this.TruckReturnJson=[{  
            "Ask":"0",
            "TS":"0",
            "UD":"0",
            "TruckID":"TD0001",
            "TruckTypeAsk":"2",
            "Status":"0",
            "DisplaySequence":"0",
            "Remark":"TruckIDDirect002 Remark"
         }]
        this.POReturnJson=[{  
            "Ask":"0",
            "TS":"0",
            "UD":"0",
            "PONo":"PO_D_001",
            "ShippingMark":"SM_D_001",
            "ReferenceNo":"REF_D_001",
            "Remark":"PONoDirect002 Remark"
         }]
        this.SKUReturnJson=[  
            {  
               "Ask":"0",
               "TS":"0",
               "UD":"0",
               "SKUName":"SALT",
               "SKUDetails":"",
               "DimensionWidth":"3",
               "DimensionHeight":"4",
               "DimensionBase":"4",
               "SKUWeight":"5",
               "PlanQty":"6",
               "UOMAsk":"1",
               "ReceivedQty":"",
               "Reference":"AEFE",
               "TruckID":"DD",
               "TruckType":"1",
               "GoodQty":"",
               "DamageQty":"",
               "ShortLandQty":"",
               "OverlandQty":"",
               "Goodphoto":"",
               "Damagephoto":"",
               "ShortLandphoto":"",
               "Overlandphoto":"",
               "Remark":"SKUNameDirect0021 Remark"
            },
            {  
               "Ask":"0",
               "TS":"0",
               "UD":"0",
               "SKUName":"POOL SALT",
               "SKUDetails":"",
               "DimensionWidth":"8",
               "DimensionHeight":"7",
               "DimensionBase":"5",
               "SKUWeight":"4",
               "PlanQty":"777",
               "UOMAsk":"2",
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
               "Overlandphoto":"",
               "Remark":"SKUNameDirect0022 Remark"
            },
            {  
               "Ask":"0",
               "TS":"0",
               "UD":"0",
               "SKUName":"REFIND SAALT",
               "SKUDetails":"",
               "DimensionWidth":"5",
               "DimensionHeight":"3",
               "DimensionBase":"2",
               "SKUWeight":"45",
               "PlanQty":"555",
               "UOMAsk":"2",
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
               "Overlandphoto":"",
               "Remark":"SKUNameDirect0023 Remark"
            }
         ]
          
        this.bindGrid();
    }
    ngOnInit() { }
}

 
