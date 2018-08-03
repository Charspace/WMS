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
import { jqxInputComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxinput';
import { jqxDateTimeInputComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxdatetimeinput';
import { jqxLayoutComponent } from '../../../node_modules/jqwidgets-scripts/jqwidgets-ts/angular_jqxlayout';

@Component({
  selector: 'app-lstplanreceiveforexport',
  templateUrl: './lstplanreceiveforexport.component.html',
  styleUrls: ['./lstplanreceiveforexport.component.css']
})
export class LstplanreceiveforexportComponent implements OnInit {
  @ViewChild('HeaderGrid') HeaderGrid: jqxGridComponent;
  @ViewChild('cboagentcombo') cboagentcombo: jqxComboBoxComponent;
  @ViewChild('cboTrstatustcombo') cboTrstatustcombo: jqxComboBoxComponent;
  @ViewChild('txtReferenceNo') txtReferenceNo: jqxInputComponent;
  @ViewChild('txtShipper') txtShipper: jqxInputComponent;
  @ViewChild('txtBookingID') txtBookingID: jqxInputComponent;
  @ViewChild('dtTransactionDate')dtTransactionDate : jqxDateTimeInputComponent
 
  values: number[] = [102, 115, 130, 137];
  //Place holder
  bookingnoplaceholder: string;
  shipperlaceholder: string;
  statusplaceholder: string;
  trdateplaceholder: string;
  agentplaceholder : any;

  //grid 
  HeaderSource: any;
  DetailSource: any;
  DetailSource1: any;
  HeaderAdapter : any;
  DetailAdapter: any;  
  headercolumns: any;
  detailcolumns: any;
  nestedGrids : any =[];
  initRowDetails : any;
  //HeaderJson = '[{"BookingAsk":"001","BookingNo":"B00001","ShipperName":"Mr. Raymoon","AgentName":"Miss. Vinny","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"},{"BookingAsk":"002","BookingNo":"B00002","ShipperName":"Dr. Boon","AgentName":"Mr. Thura","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"}]'
  //DetailJson = '[{"BookingAsk":"001","DocNo":"DOC-20180712001","ShippingMark":"A123/5","SKUDetail":"Refined Salt","D_W":"20","D_W":"20","D_D":"20","D_L":"20","ReceivedQTY":"250","UOM":"Bag","TotalCBM":"8","Remark":"with low qty"},{"BookingAsk":"002","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}]';
  
  //ParameterJson:any;
ParameterJson={"UserID" : "admin","Password" : "123","ProductAsk":"11", "Ask":"","BookingID":"","AgentAsk":"",
    "Shipper":"",
    "CountryAsk":"","CargoReceivedDate":"", "CustomIssuedDate":"", "TransactionDate":"","Signature":"",
    "SignatureDate":"", "BookingStatusAsk":"","NoOfTruck":"", "NoOfContainer":"", "TruckAsk":"",
    "TruckID":"", "TruckTypeAsk":"", "PONo":"","ShippingMark":"","ReferenceNo":"",
    "SKUAsk":"","SKUName":"", "SKUDetails":"","DimensionWidth":"", "DimensionHeight":"",
    "DimensionBase":"","SKUWeight":"", "PlanQty":"", "UOMAsk":"",
    "ReceivedQty":"", "Reference":"","TruckType":"","GoodQty":"",
    "DamageQty":"", "ShortLandQty":"","OverlandQty":""
   }; 
  UserJson={"UserID":"","Password":"","ProductAsk":""}
  HeaderJson :any;
  DetailJson :any;
   
  DetailSource2: any;
  DetailAdapter2 : any;
  detailcolumns2:any;
         
  agentcombo_Adapter : any;  
  AgentList : any = [];
  agentsource : any = [];

  TrStatusCombo_Adapter : any;  
  TrStatustList : any = [];
  TrStatussource : any = [];

 l_bookingID="";
 l_shipper="";
 l_refno="";
 l_agent="0";
 l_trdate="";
 l_status="0";

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bindPlaceholder();
    this.bindTransactionStatus();
    this.bindAgent();
 
    this.getPRFEWarehouseList();   
    this.bindUserJson();
  }
bindUserJson()
  
  {
      this.UserJson.UserID= this.backendservice.LoginUser;
      this.UserJson.Password= this.backendservice.LoginPwd;
      this.UserJson.ProductAsk=this.backendservice.ProductName;
  }
bindAgent()
{    
    this.bindUserJson();
    //var jsonbody = {"UserID":"Admin","Password":"123","ProductAsk":"11"}
   // this.backendservice.BindAgent(jsonbody).then(data =>
   this.backendservice.wsCall(this.UserJson,this.backendservice.wsgetAgentList).then(data =>      
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

bindTransactionStatus()
{   
     this.bindUserJson();    
    // console.log('ws json is'+JSON.stringify(this.UserJson));
    this.backendservice.wsCall(this.UserJson,this.backendservice.wsgetTransactionStatus).then(data =>
    {
        this.TrStatustList = data;
        this.TrStatussource ={
            dataType: 'json',
            dataFields: [ { name: 'StatusName'}, { name: 'Ask'}  ],
            localdata: this.TrStatustList
        }
        this.TrStatusCombo_Adapter = new jqx.dataAdapter(this.TrStatussource)
    })
}

BindingcompleteAgent(event:any)
{
    // if(this.HeaderJson)
    // {
    //     this.agentcombo.selectItem(this.HeaderJson[0].AgentAsk);          
    // }    
}

onAgentComboChange(event)
{

}
BindingcompleteTrStataus(event:any)
{
    // if(this.HeaderJson)
    // {
    //     this.agentcombo.selectItem(this.HeaderJson[0].AgentAsk);          
    // }    
}

onTrStatusComboChange(event)
{

}


  getPRFEWarehouseList()
  {debugger
       var body = this.ParameterJson;
       //alert('ws json is'+JSON.stringify(body));
       this.backendservice.wsCall(body,this.backendservice.wsgetPRFEDirectList).then(data =>
       //this.backendservice.getPRFEWarehouseListceivedlist(body).then(data =>
        {
            //alert(JSON.stringify(data));
            debugger
            var json = data;      
            if (data)
            {   
            console.log('ws json is'+JSON.stringify(json));
            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;    
            this.CreateGrid();   
            }     
                      
        }) 
    }

  bindPlaceholder()
  {
    this.bookingnoplaceholder = "Booking No";
    this.shipperlaceholder = 'Shipper Name'
    this.agentplaceholder = "Agent Name"
    this.statusplaceholder = "Status";
    this.trdateplaceholder = "Transactoin Date";
  }
  CreateGrid()
  {  debugger
    this.HeaderSource  =
    {
        datafields: [
           
            { name: 'AgentAsk',	 type: 'string' },
            { name: 'AgentName',	 type: 'string' },
            { name: 'Ask',	 type: 'string' },
            { name: 'BookingID',	 type: 'string' },
            { name: 'BookingStatus',	 type: 'string' },
            { name: 'BookingStatusAsk',	 type: 'string' },
            { name: 'CargoReceivedDate',	 type: 'string' },
            { name: 'ContainerETD',	 type: 'string' },
            { name: 'ContainerGrossWeight',	 type: 'string' },
            { name: 'ContainerMattWeight',	 type: 'string' },
            { name: 'ContainerNo',	 type: 'string' },
            { name: 'ContainerRemark',	 type: 'string' },
            { name: 'ContainerStatus',	 type: 'string' },
            { name: 'ContainerTareWeight',	 type: 'string' },
            { name: 'ContainerTotalWeight',	 type: 'string' },
            { name: 'ContainerType',	 type: 'string' },
            { name: 'CountryAsk',	 type: 'string' },
            { name: 'CountryName',	 type: 'string' },
            { name: 'CustomIssuedDate',	 type: 'string' },
            { name: 'DisplaySequence',	 type: 'string' },
            { name: 'LogisticTypeAsk',	 type: 'string' },
            { name: 'NoOfContainer',	 type: 'string' },
            { name: 'NoOfTruck',	 type: 'string' },
            { name: 'POAsk',	 type: 'string' },
            { name: 'Planner',	 type: 'string' },
            { name: 'ReferenceNo',	 type: 'string' },
            { name: 'Remark',	 type: 'string' },
            { name: 'Shipper',	 type: 'string' },
            { name: 'ShipperAsk',	 type: 'string' },
            { name: 'ShipperName',	 type: 'string' },
            { name: 'Signature',	 type: 'string' },
            { name: 'SignatureDate',	 type: 'string' },
            { name: 'TS',	 type: 'string' },
            { name: 'TotalGrossW',	 type: 'string' },
            { name: 'TotalVol',	 type: 'string' },
            { name: 'TransactionDate',	 type: 'string' },
            { name: 'UD',	 type: 'string' },
          
            // ,   
            // { name: 'AgentName'  , type: 'string' },
            // { name: 'BookingStatusName'  , type: 'string' },
            // { name: 'CountryName'  , type: 'string' },
            // { name: 'ShipperName'  , type: 'string' },
            // { name: 'CountryName'  , type: 'string' } 

        ],
        localdata: this.HeaderJson, 
        root: 'Header',
        //record: 'Header',       
        id: 'Ask',  
        datatype: 'json', 
    };
    this.HeaderAdapter = new jqx.dataAdapter(this.HeaderSource);  
    this.headercolumns =
    [        
        
        { text: 'AgentAsk',  datafield: 'AgentAsk', width: 120 },
        { text:'AgentName',  datafield:'AgentName', width: 120 },
        { text:'Ask',  datafield:'Ask', width: 120 },
        { text:'BookingID',  datafield:'BookingID', width: 120 },
        { text:'BookingStatus',  datafield:'BookingStatus', width: 120 },
        { text:'BookingStatusAsk',  datafield:'BookingStatusAsk', width: 120 },
        { text:'CargoReceivedDate',  datafield:'CargoReceivedDate', width: 120 },
        { text:'ContainerETD',  datafield:'ContainerETD', width: 120 },
        { text:'ContainerGrossWeight',  datafield:'ContainerGrossWeight', width: 120 },
        { text:'ContainerMattWeight',  datafield:'ContainerMattWeight', width: 120 },
        { text:'ContainerNo',  datafield:'ContainerNo', width: 120 },
        { text:'ContainerRemark',  datafield:'ContainerRemark', width: 120 },
        { text:'ContainerStatus',  datafield:'ContainerStatus', width: 120 },
        { text:'ContainerTareWeight',  datafield:'ContainerTareWeight', width: 120 },
        { text:'ContainerTotalWeight',  datafield:'ContainerTotalWeight', width: 120 },
        { text:'ContainerType',  datafield:'ContainerType', width: 120 },
        { text:'CountryAsk',  datafield:'CountryAsk', width: 120 },
        { text:'CountryName',  datafield:'CountryName', width: 120 },
        { text:'CustomIssuedDate',  datafield:'CustomIssuedDate', width: 120 },
        { text:'DisplaySequence',  datafield:'DisplaySequence', width: 120 },
        { text:'LogisticTypeAsk',  datafield:'LogisticTypeAsk', width: 120 },
        { text:'NoOfContainer',  datafield:'NoOfContainer', width: 120 },
        { text:'NoOfTruck',  datafield:'NoOfTruck', width: 120 },
        { text:'POAsk',  datafield:'POAsk', width: 120 },
        { text:'Planner',  datafield:'Planner', width: 120 },
        { text:'ReferenceNo',  datafield:'ReferenceNo', width: 120 },
        { text:'Remark',  datafield:'Remark', width: 120 },
        { text:'Shipper',  datafield:'Shipper', width: 120 },
        { text:'ShipperAsk',  datafield:'ShipperAsk', width: 120 },
        { text:'ShipperName',  datafield:'ShipperName', width: 120 },
        { text:'Signature',  datafield:'Signature', width: 120 },
        { text:'SignatureDate',  datafield:'SignatureDate', width: 120 },
        { text:'TS',  datafield:'TS', width: 120 },
        { text:'TotalGrossW',  datafield:'TotalGrossW', width: 120 },
        { text:'TotalVol',  datafield:'TotalVol', width: 120 },
        { text:'TransactionDate',  datafield:'TransactionDate', width: 120 },
        { text:'UD',  datafield:'UD', width: 120 },
        


    ];    
    this.DetailSource =
    {     
        datafields: [
            { name: 'AgentAddress',	 type: 'string' },
            { name: 'AgentAsk',	 type: 'string' },
            { name: 'AgentBillingAddress',	 type: 'string' },
            { name: 'AgentCompanyName',	 type: 'string' },
            { name: 'AgentContactPersonMobile',	 type: 'string' },
            { name: 'AgentContactPersonName',	 type: 'string' },
            { name: 'AgentDetails',	 type: 'string' },
            { name: 'AgentDisplaySequence',	 type: 'string' },
            { name: 'AgentEmail',	 type: 'string' },
            { name: 'AgentMobile',	 type: 'string' },
            { name: 'AgentName',	 type: 'string' },
            { name: 'AgentNationalID',	 type: 'string' },
            { name: 'AgentRemark',	 type: 'string' },
            { name: 'AgentShippingAddress',	 type: 'string' },
            { name: 'AgentTS',	 type: 'string' },
            { name: 'AgentUD',	 type: 'string' },
            { name: 'AgentWebsite',	 type: 'string' },
            { name: 'Ask',	 type: 'string' },
            { name: 'BookingID',	 type: 'string' },
            { name: 'BookingStatusAsk',	 type: 'string' },
            { name: 'CargoReceivedDate',	 type: 'string' },
            { name: 'ContainerAsk',	 type: 'string' },
            { name: 'ContainerBase',	 type: 'string' },
            { name: 'ContainerCarrier',	 type: 'string' },
            { name: 'ContainerColor',	 type: 'string' },
            { name: 'ContainerCountryAsk',	 type: 'string' },
            { name: 'ContainerCutOffDate',	 type: 'string' },
            { name: 'ContainerDetails',	 type: 'string' },
            { name: 'ContainerDisplaySequence',	 type: 'string' },
            { name: 'ContainerETA',	 type: 'string' },
            { name: 'ContainerETD',	 type: 'string' },
            { name: 'ContainerGrossWeight',	 type: 'string' },
            { name: 'ContainerHeight',	 type: 'string' },
            { name: 'ContainerMattWeight',	 type: 'string' },
            { name: 'ContainerNo',	 type: 'string' },
            { name: 'ContainerPaperlessCode',	 type: 'string' },
            { name: 'ContainerPicture',	 type: 'string' },
            { name: 'ContainerRemark',	 type: 'string' },
            { name: 'ContainerSealNo',	 type: 'string' },
            { name: 'ContainerStatus',	 type: 'string' },
            { name: 'ContainerTS',	 type: 'string' },
            { name: 'ContainerTareWeight',	 type: 'string' },
            { name: 'ContainerTotalWeight',	 type: 'string' },
            { name: 'ContainerTruckTypeAsk',	 type: 'string' },
            { name: 'ContainerType',	 type: 'string' },
            { name: 'ContainerUD',	 type: 'string' },
            { name: 'ContainerVesselNo',	 type: 'string' },
            { name: 'ContainerVoy',	 type: 'string' },
            { name: 'ContainerWidth',	 type: 'string' },
            { name: 'CountryAsk',	 type: 'string' },
            { name: 'CustomIssuedDate',	 type: 'string' },
            { name: 'DisplaySequence',	 type: 'string' },
            { name: 'LogisticTypeAsk',	 type: 'string' },
            { name: 'NoOfContainer',	 type: 'string' },
            { name: 'NoOfTruck',	 type: 'string' },
            { name: 'POAsk',	 type: 'string' },
            { name: 'PODisplaySequence',	 type: 'string' },
            { name: 'PONo',	 type: 'string' },
            { name: 'POReferenceNo',	 type: 'string' },
            { name: 'PORemark',	 type: 'string' },
            { name: 'POShippingMark',	 type: 'string' },
            { name: 'POStatus',	 type: 'string' },
            { name: 'POTS',	 type: 'string' },
            { name: 'POUD',	 type: 'string' },
            { name: 'Remark',	 type: 'string' },
            { name: 'SKUAsk',	 type: 'string' },
            { name: 'SKUDamageQty',	 type: 'string' },
            { name: 'SKUDetails',	 type: 'string' },
            { name: 'SKUDimensionBase',	 type: 'string' },
            { name: 'SKUDimensionHeight',	 type: 'string' },
            { name: 'SKUDimensionWidth',	 type: 'string' },
            { name: 'SKUDisplaySequence',	 type: 'string' },
            { name: 'SKUGoodQty',	 type: 'string' },
            { name: 'SKUName',	 type: 'string' },
            { name: 'SKUOverlandQty',	 type: 'string' },
            { name: 'SKUPlanQty',	 type: 'string' },
            { name: 'SKUReceivedQty',	 type: 'string' },
            { name: 'SKUReference',	 type: 'string' },
            { name: 'SKURemark',	 type: 'string' },
            { name: 'SKUShortLandQty',	 type: 'string' },
            { name: 'SKUStatus',	 type: 'string' },
            { name: 'SKUTS',	 type: 'string' },
            { name: 'SKUTruckType',	 type: 'string' },
            { name: 'SKUUD',	 type: 'string' },
            { name: 'SKUUOMAsk',	 type: 'string' },
            { name: 'SKUWeight',	 type: 'string' },
            { name: 'Shipper',	 type: 'string' },
            { name: 'ShipperAsk',	 type: 'string' },
            { name: 'ShipperDetails',	 type: 'string' },
            { name: 'ShipperDisplaySequence',	 type: 'string' },
            { name: 'ShipperName',	 type: 'string' },
            { name: 'ShipperRemark',	 type: 'string' },
            { name: 'ShipperStatus',	 type: 'string' },
            { name: 'ShipperTS',	 type: 'string' },
            { name: 'ShipperUD',	 type: 'string' },
            { name: 'Signature',	 type: 'string' },
            { name: 'SignatureDate',	 type: 'string' },
            { name: 'TS',	 type: 'string' },
            { name: 'TransactionDate',	 type: 'string' },
            { name: 'TruckAsk',	 type: 'string' },
            { name: 'TruckDisplaySequence',	 type: 'string' },
            { name: 'TruckID',	 type: 'string' },
            { name: 'TruckRemark',	 type: 'string' },
            { name: 'TruckStatus',	 type: 'string' },
            { name: 'TruckTS',	 type: 'string' },
            { name: 'TruckTypeAsk',	 type: 'string' },
            { name: 'TruckUD',	 type: 'string' },
            { name: 'UD',	 type: 'string' },
          
                 
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json',         
    };
    this.DetailAdapter = new jqx.dataAdapter(this.DetailSource, { autoBind: true });
    this.detailcolumns =
    [
        

{ text: 'AgentAddress',  datafield: 'AgentAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentAsk',  datafield:'AgentAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentBillingAddress',  datafield:'AgentBillingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentCompanyName',  datafield:'AgentCompanyName', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentContactPersonMobile',  datafield:'AgentContactPersonMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentContactPersonName',  datafield:'AgentContactPersonName', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentDetails',  datafield:'AgentDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentDisplaySequence',  datafield:'AgentDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentEmail',  datafield:'AgentEmail', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentMobile',  datafield:'AgentMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentName',  datafield:'AgentName', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentNationalID',  datafield:'AgentNationalID', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentRemark',  datafield:'AgentRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentShippingAddress',  datafield:'AgentShippingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentTS',  datafield:'AgentTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentUD',  datafield:'AgentUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'AgentWebsite',  datafield:'AgentWebsite', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'Ask',  datafield:'Ask', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'BookingID',  datafield:'BookingID', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'BookingStatusAsk',  datafield:'BookingStatusAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'CargoReceivedDate',  datafield:'CargoReceivedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerAsk',  datafield:'ContainerAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerBase',  datafield:'ContainerBase', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerCarrier',  datafield:'ContainerCarrier', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerColor',  datafield:'ContainerColor', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerCountryAsk',  datafield:'ContainerCountryAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerCutOffDate',  datafield:'ContainerCutOffDate', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerDetails',  datafield:'ContainerDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerDisplaySequence',  datafield:'ContainerDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerETA',  datafield:'ContainerETA', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerETD',  datafield:'ContainerETD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerGrossWeight',  datafield:'ContainerGrossWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerHeight',  datafield:'ContainerHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerMattWeight',  datafield:'ContainerMattWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerNo',  datafield:'ContainerNo', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerPaperlessCode',  datafield:'ContainerPaperlessCode', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerPicture',  datafield:'ContainerPicture', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerRemark',  datafield:'ContainerRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerSealNo',  datafield:'ContainerSealNo', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerStatus',  datafield:'ContainerStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerTS',  datafield:'ContainerTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerTareWeight',  datafield:'ContainerTareWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerTotalWeight',  datafield:'ContainerTotalWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerTruckTypeAsk',  datafield:'ContainerTruckTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerType',  datafield:'ContainerType', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerUD',  datafield:'ContainerUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerVesselNo',  datafield:'ContainerVesselNo', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerVoy',  datafield:'ContainerVoy', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ContainerWidth',  datafield:'ContainerWidth', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'CountryAsk',  datafield:'CountryAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'CustomIssuedDate',  datafield:'CustomIssuedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'DisplaySequence',  datafield:'DisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'LogisticTypeAsk',  datafield:'LogisticTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'NoOfContainer',  datafield:'NoOfContainer', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'NoOfTruck',  datafield:'NoOfTruck', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POAsk',  datafield:'POAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'PODisplaySequence',  datafield:'PODisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'PONo',  datafield:'PONo', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POReferenceNo',  datafield:'POReferenceNo', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'PORemark',  datafield:'PORemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POShippingMark',  datafield:'POShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POStatus',  datafield:'POStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POTS',  datafield:'POTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'POUD',  datafield:'POUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'Remark',  datafield:'Remark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUAsk',  datafield:'SKUAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDamageQty',  datafield:'SKUDamageQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDetails',  datafield:'SKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDimensionBase',  datafield:'SKUDimensionBase', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDimensionHeight',  datafield:'SKUDimensionHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDimensionWidth',  datafield:'SKUDimensionWidth', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUDisplaySequence',  datafield:'SKUDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUGoodQty',  datafield:'SKUGoodQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUName',  datafield:'SKUName', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUOverlandQty',  datafield:'SKUOverlandQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUPlanQty',  datafield:'SKUPlanQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUReceivedQty',  datafield:'SKUReceivedQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUReference',  datafield:'SKUReference', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKURemark',  datafield:'SKURemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUShortLandQty',  datafield:'SKUShortLandQty', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUStatus',  datafield:'SKUStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUTS',  datafield:'SKUTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUTruckType',  datafield:'SKUTruckType', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUUD',  datafield:'SKUUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUUOMAsk',  datafield:'SKUUOMAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SKUWeight',  datafield:'SKUWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'Shipper',  datafield:'Shipper', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperAsk',  datafield:'ShipperAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperDetails',  datafield:'ShipperDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperDisplaySequence',  datafield:'ShipperDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperName',  datafield:'ShipperName', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperRemark',  datafield:'ShipperRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperStatus',  datafield:'ShipperStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperTS',  datafield:'ShipperTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'ShipperUD',  datafield:'ShipperUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'Signature',  datafield:'Signature', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'SignatureDate',  datafield:'SignatureDate', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TS',  datafield:'TS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TransactionDate',  datafield:'TransactionDate', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckAsk',  datafield:'TruckAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckDisplaySequence',  datafield:'TruckDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckID',  datafield:'TruckID', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckRemark',  datafield:'TruckRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckStatus',  datafield:'TruckStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckTS',  datafield:'TruckTS', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckTypeAsk',  datafield:'TruckTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'TruckUD',  datafield:'TruckUD', width: '10%',editable: false,hidden:false }, //readonly cell.
{ text:'UD',  datafield:'UD', width: '10%',editable: false,hidden:false }, //readonly cell.



       
    ]    
    this.DetailSource2 =
    {

        datafields: [

            { name: 'AgentAddress',	 type: 'string' },
            { name: 'AgentAsk',	 type: 'string' },
            { name: 'AgentBillingAddress',	 type: 'string' },
            { name: 'AgentCompanyName',	 type: 'string' },
            { name: 'AgentContactPersonMobile',	 type: 'string' },
            { name: 'AgentContactPersonName',	 type: 'string' },
            { name: 'AgentDetails',	 type: 'string' },
            { name: 'AgentDisplaySequence',	 type: 'string' },
            { name: 'AgentEmail',	 type: 'string' },
            { name: 'AgentMobile',	 type: 'string' },
            { name: 'AgentName',	 type: 'string' },
            { name: 'AgentNationalID',	 type: 'string' },
            { name: 'AgentRemark',	 type: 'string' },
            { name: 'AgentShippingAddress',	 type: 'string' },
            { name: 'AgentTS',	 type: 'string' },
            { name: 'AgentUD',	 type: 'string' },
            { name: 'AgentWebsite',	 type: 'string' },
            { name: 'Ask',	 type: 'string' },
            { name: 'BookingID',	 type: 'string' },
            { name: 'BookingStatusAsk',	 type: 'string' },
            { name: 'CargoReceivedDate',	 type: 'string' },
            { name: 'ContainerAsk',	 type: 'string' },
            { name: 'ContainerBase',	 type: 'string' },
            { name: 'ContainerCarrier',	 type: 'string' },
            { name: 'ContainerColor',	 type: 'string' },
            { name: 'ContainerCountryAsk',	 type: 'string' },
            { name: 'ContainerCutOffDate',	 type: 'string' },
            { name: 'ContainerDetails',	 type: 'string' },
            { name: 'ContainerDisplaySequence',	 type: 'string' },
            { name: 'ContainerETA',	 type: 'string' },
            { name: 'ContainerETD',	 type: 'string' },
            { name: 'ContainerGrossWeight',	 type: 'string' },
            { name: 'ContainerHeight',	 type: 'string' },
            { name: 'ContainerMattWeight',	 type: 'string' },
            { name: 'ContainerNo',	 type: 'string' },
            { name: 'ContainerPaperlessCode',	 type: 'string' },
            { name: 'ContainerPicture',	 type: 'string' },
            { name: 'ContainerRemark',	 type: 'string' },
            { name: 'ContainerSealNo',	 type: 'string' },
            { name: 'ContainerStatus',	 type: 'string' },
            { name: 'ContainerTS',	 type: 'string' },
            { name: 'ContainerTareWeight',	 type: 'string' },
            { name: 'ContainerTotalWeight',	 type: 'string' },
            { name: 'ContainerTruckTypeAsk',	 type: 'string' },
            { name: 'ContainerType',	 type: 'string' },
            { name: 'ContainerUD',	 type: 'string' },
            { name: 'ContainerVesselNo',	 type: 'string' },
            { name: 'ContainerVoy',	 type: 'string' },
            { name: 'ContainerWidth',	 type: 'string' },
            { name: 'CountryAsk',	 type: 'string' },
            { name: 'CustomIssuedDate',	 type: 'string' },
            { name: 'DisplaySequence',	 type: 'string' },
            { name: 'LogisticTypeAsk',	 type: 'string' },
            { name: 'NoOfContainer',	 type: 'string' },
            { name: 'NoOfTruck',	 type: 'string' },
            { name: 'POAsk',	 type: 'string' },
            { name: 'PODisplaySequence',	 type: 'string' },
            { name: 'PONo',	 type: 'string' },
            { name: 'POReferenceNo',	 type: 'string' },
            { name: 'PORemark',	 type: 'string' },
            { name: 'POShippingMark',	 type: 'string' },
            { name: 'POStatus',	 type: 'string' },
            { name: 'POTS',	 type: 'string' },
            { name: 'POUD',	 type: 'string' },
            { name: 'Remark',	 type: 'string' },
            { name: 'SKUAsk',	 type: 'string' },
            { name: 'SKUDamageQty',	 type: 'string' },
            { name: 'SKUDetails',	 type: 'string' },
            { name: 'SKUDimensionBase',	 type: 'string' },
            { name: 'SKUDimensionHeight',	 type: 'string' },
            { name: 'SKUDimensionWidth',	 type: 'string' },
            { name: 'SKUDisplaySequence',	 type: 'string' },
            { name: 'SKUGoodQty',	 type: 'string' },
            { name: 'SKUName',	 type: 'string' },
            { name: 'SKUOverlandQty',	 type: 'string' },
            { name: 'SKUPlanQty',	 type: 'string' },
            { name: 'SKUReceivedQty',	 type: 'string' },
            { name: 'SKUReference',	 type: 'string' },
            { name: 'SKURemark',	 type: 'string' },
            { name: 'SKUShortLandQty',	 type: 'string' },
            { name: 'SKUStatus',	 type: 'string' },
            { name: 'SKUTS',	 type: 'string' },
            { name: 'SKUTruckType',	 type: 'string' },
            { name: 'SKUUD',	 type: 'string' },
            { name: 'SKUUOMAsk',	 type: 'string' },
            { name: 'SKUWeight',	 type: 'string' },
            { name: 'Shipper',	 type: 'string' },
            { name: 'ShipperAsk',	 type: 'string' },
            { name: 'ShipperDetails',	 type: 'string' },
            { name: 'ShipperDisplaySequence',	 type: 'string' },
            { name: 'ShipperName',	 type: 'string' },
            { name: 'ShipperRemark',	 type: 'string' },
            { name: 'ShipperStatus',	 type: 'string' },
            { name: 'ShipperTS',	 type: 'string' },
            { name: 'ShipperUD',	 type: 'string' },
            { name: 'Signature',	 type: 'string' },
            { name: 'SignatureDate',	 type: 'string' },
            { name: 'TS',	 type: 'string' },
            { name: 'TransactionDate',	 type: 'string' },
            { name: 'TruckAsk',	 type: 'string' },
            { name: 'TruckDisplaySequence',	 type: 'string' },
            { name: 'TruckID',	 type: 'string' },
            { name: 'TruckRemark',	 type: 'string' },
            { name: 'TruckStatus',	 type: 'string' },
            { name: 'TruckTS',	 type: 'string' },
            { name: 'TruckTypeAsk',	 type: 'string' },
            { name: 'TruckUD',	 type: 'string' },
            { name: 'UD',	 type: 'string' },
          
         
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json', 

    }

    this.DetailAdapter2 = new jqx.dataAdapter(this.DetailSource2, { autoBind: true });

    this.detailcolumns2 =
    [
        



        { text: 'AgentAddress',  datafield: 'AgentAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentAsk',  datafield:'AgentAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentBillingAddress',  datafield:'AgentBillingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentCompanyName',  datafield:'AgentCompanyName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentContactPersonMobile',  datafield:'AgentContactPersonMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentContactPersonName',  datafield:'AgentContactPersonName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentDetails',  datafield:'AgentDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentDisplaySequence',  datafield:'AgentDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentEmail',  datafield:'AgentEmail', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentMobile',  datafield:'AgentMobile', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentName',  datafield:'AgentName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentNationalID',  datafield:'AgentNationalID', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentRemark',  datafield:'AgentRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentShippingAddress',  datafield:'AgentShippingAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentTS',  datafield:'AgentTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentUD',  datafield:'AgentUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'AgentWebsite',  datafield:'AgentWebsite', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'Ask',  datafield:'Ask', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'BookingID',  datafield:'BookingID', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'BookingStatusAsk',  datafield:'BookingStatusAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'CargoReceivedDate',  datafield:'CargoReceivedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerAsk',  datafield:'ContainerAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerBase',  datafield:'ContainerBase', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerCarrier',  datafield:'ContainerCarrier', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerColor',  datafield:'ContainerColor', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerCountryAsk',  datafield:'ContainerCountryAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerCutOffDate',  datafield:'ContainerCutOffDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerDetails',  datafield:'ContainerDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerDisplaySequence',  datafield:'ContainerDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerETA',  datafield:'ContainerETA', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerETD',  datafield:'ContainerETD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerGrossWeight',  datafield:'ContainerGrossWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerHeight',  datafield:'ContainerHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerMattWeight',  datafield:'ContainerMattWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerNo',  datafield:'ContainerNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerPaperlessCode',  datafield:'ContainerPaperlessCode', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerPicture',  datafield:'ContainerPicture', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerRemark',  datafield:'ContainerRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerSealNo',  datafield:'ContainerSealNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerStatus',  datafield:'ContainerStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerTS',  datafield:'ContainerTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerTareWeight',  datafield:'ContainerTareWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerTotalWeight',  datafield:'ContainerTotalWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerTruckTypeAsk',  datafield:'ContainerTruckTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerType',  datafield:'ContainerType', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerUD',  datafield:'ContainerUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerVesselNo',  datafield:'ContainerVesselNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerVoy',  datafield:'ContainerVoy', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ContainerWidth',  datafield:'ContainerWidth', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'CountryAsk',  datafield:'CountryAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'CustomIssuedDate',  datafield:'CustomIssuedDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'DisplaySequence',  datafield:'DisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'LogisticTypeAsk',  datafield:'LogisticTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'NoOfContainer',  datafield:'NoOfContainer', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'NoOfTruck',  datafield:'NoOfTruck', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POAsk',  datafield:'POAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'PODisplaySequence',  datafield:'PODisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'PONo',  datafield:'PONo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POReferenceNo',  datafield:'POReferenceNo', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'PORemark',  datafield:'PORemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POShippingMark',  datafield:'POShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POStatus',  datafield:'POStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POTS',  datafield:'POTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'POUD',  datafield:'POUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'Remark',  datafield:'Remark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUAsk',  datafield:'SKUAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDamageQty',  datafield:'SKUDamageQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDetails',  datafield:'SKUDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDimensionBase',  datafield:'SKUDimensionBase', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDimensionHeight',  datafield:'SKUDimensionHeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDimensionWidth',  datafield:'SKUDimensionWidth', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUDisplaySequence',  datafield:'SKUDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUGoodQty',  datafield:'SKUGoodQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUName',  datafield:'SKUName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUOverlandQty',  datafield:'SKUOverlandQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUPlanQty',  datafield:'SKUPlanQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUReceivedQty',  datafield:'SKUReceivedQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUReference',  datafield:'SKUReference', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKURemark',  datafield:'SKURemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUShortLandQty',  datafield:'SKUShortLandQty', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUStatus',  datafield:'SKUStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUTS',  datafield:'SKUTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUTruckType',  datafield:'SKUTruckType', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUUD',  datafield:'SKUUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUUOMAsk',  datafield:'SKUUOMAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SKUWeight',  datafield:'SKUWeight', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'Shipper',  datafield:'Shipper', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperAsk',  datafield:'ShipperAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperDetails',  datafield:'ShipperDetails', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperDisplaySequence',  datafield:'ShipperDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperName',  datafield:'ShipperName', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperRemark',  datafield:'ShipperRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperStatus',  datafield:'ShipperStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperTS',  datafield:'ShipperTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'ShipperUD',  datafield:'ShipperUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'Signature',  datafield:'Signature', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'SignatureDate',  datafield:'SignatureDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TS',  datafield:'TS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TransactionDate',  datafield:'TransactionDate', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckAsk',  datafield:'TruckAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckDisplaySequence',  datafield:'TruckDisplaySequence', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckID',  datafield:'TruckID', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckRemark',  datafield:'TruckRemark', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckStatus',  datafield:'TruckStatus', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckTS',  datafield:'TruckTS', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckTypeAsk',  datafield:'TruckTypeAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'TruckUD',  datafield:'TruckUD', width: '10%',editable: false,hidden:false }, //readonly cell.
        { text:'UD',  datafield:'UD', width: '10%',editable: false,hidden:false }, //readonly cell.
        
        

    ] 
  
    this.nestedGrids = new Array();
        // create nested grid.
        this.initRowDetails = (index: number, parentElement: any, gridElement: any, record: any): void => {
        if(record)
        {
          let id = record.uid.toString();
          let nestedGridContainer = parentElement.children[0];          
          this.nestedGrids[index] = nestedGridContainer;
          let filtergroup = new jqx.filter();
          let filter_or_operator = 1;
          let filtervalue = id;
          let filtercondition = 'equal';
          let filter = filtergroup.createfilter('stringfilter', filtervalue, filtercondition);
          // fill the orders depending on the id.
          let Details = this.DetailAdapter.records;
          let Detailsbyid = [];
          for (let i = 0; i < Details.length; i++) {
              let result = filter.evaluate(Details[i]['Ask']);
              if (result)
              Detailsbyid.push(Details[i]);
          }
          let detailSource = {
              datafields: [
                { name: 'AgentAddress',	 type: 'string' },
                { name: 'AgentAsk',	 type: 'string' },
                { name: 'AgentBillingAddress',	 type: 'string' },
                { name: 'AgentCompanyName',	 type: 'string' },
                { name: 'AgentContactPersonMobile',	 type: 'string' },
                { name: 'AgentContactPersonName',	 type: 'string' },
                { name: 'AgentDetails',	 type: 'string' },
                { name: 'AgentDisplaySequence',	 type: 'string' },
                { name: 'AgentEmail',	 type: 'string' },
                { name: 'AgentMobile',	 type: 'string' },
                { name: 'AgentName',	 type: 'string' },
                { name: 'AgentNationalID',	 type: 'string' },
                { name: 'AgentRemark',	 type: 'string' },
                { name: 'AgentShippingAddress',	 type: 'string' },
                { name: 'AgentTS',	 type: 'string' },
                { name: 'AgentUD',	 type: 'string' },
                { name: 'AgentWebsite',	 type: 'string' },
                { name: 'Ask',	 type: 'string' },
                { name: 'BookingID',	 type: 'string' },
                { name: 'BookingStatusAsk',	 type: 'string' },
                { name: 'CargoReceivedDate',	 type: 'string' },
                { name: 'ContainerAsk',	 type: 'string' },
                { name: 'ContainerBase',	 type: 'string' },
                { name: 'ContainerCarrier',	 type: 'string' },
                { name: 'ContainerColor',	 type: 'string' },
                { name: 'ContainerCountryAsk',	 type: 'string' },
                { name: 'ContainerCutOffDate',	 type: 'string' },
                { name: 'ContainerDetails',	 type: 'string' },
                { name: 'ContainerDisplaySequence',	 type: 'string' },
                { name: 'ContainerETA',	 type: 'string' },
                { name: 'ContainerETD',	 type: 'string' },
                { name: 'ContainerGrossWeight',	 type: 'string' },
                { name: 'ContainerHeight',	 type: 'string' },
                { name: 'ContainerMattWeight',	 type: 'string' },
                { name: 'ContainerNo',	 type: 'string' },
                { name: 'ContainerPaperlessCode',	 type: 'string' },
                { name: 'ContainerPicture',	 type: 'string' },
                { name: 'ContainerRemark',	 type: 'string' },
                { name: 'ContainerSealNo',	 type: 'string' },
                { name: 'ContainerStatus',	 type: 'string' },
                { name: 'ContainerTS',	 type: 'string' },
                { name: 'ContainerTareWeight',	 type: 'string' },
                { name: 'ContainerTotalWeight',	 type: 'string' },
                { name: 'ContainerTruckTypeAsk',	 type: 'string' },
                { name: 'ContainerType',	 type: 'string' },
                { name: 'ContainerUD',	 type: 'string' },
                { name: 'ContainerVesselNo',	 type: 'string' },
                { name: 'ContainerVoy',	 type: 'string' },
                { name: 'ContainerWidth',	 type: 'string' },
                { name: 'CountryAsk',	 type: 'string' },
                { name: 'CustomIssuedDate',	 type: 'string' },
                { name: 'DisplaySequence',	 type: 'string' },
                { name: 'LogisticTypeAsk',	 type: 'string' },
                { name: 'NoOfContainer',	 type: 'string' },
                { name: 'NoOfTruck',	 type: 'string' },
                { name: 'POAsk',	 type: 'string' },
                { name: 'PODisplaySequence',	 type: 'string' },
                { name: 'PONo',	 type: 'string' },
                { name: 'POReferenceNo',	 type: 'string' },
                { name: 'PORemark',	 type: 'string' },
                { name: 'POShippingMark',	 type: 'string' },
                { name: 'POStatus',	 type: 'string' },
                { name: 'POTS',	 type: 'string' },
                { name: 'POUD',	 type: 'string' },
                { name: 'Remark',	 type: 'string' },
                { name: 'SKUAsk',	 type: 'string' },
                { name: 'SKUDamageQty',	 type: 'string' },
                { name: 'SKUDetails',	 type: 'string' },
                { name: 'SKUDimensionBase',	 type: 'string' },
                { name: 'SKUDimensionHeight',	 type: 'string' },
                { name: 'SKUDimensionWidth',	 type: 'string' },
                { name: 'SKUDisplaySequence',	 type: 'string' },
                { name: 'SKUGoodQty',	 type: 'string' },
                { name: 'SKUName',	 type: 'string' },
                { name: 'SKUOverlandQty',	 type: 'string' },
                { name: 'SKUPlanQty',	 type: 'string' },
                { name: 'SKUReceivedQty',	 type: 'string' },
                { name: 'SKUReference',	 type: 'string' },
                { name: 'SKURemark',	 type: 'string' },
                { name: 'SKUShortLandQty',	 type: 'string' },
                { name: 'SKUStatus',	 type: 'string' },
                { name: 'SKUTS',	 type: 'string' },
                { name: 'SKUTruckType',	 type: 'string' },
                { name: 'SKUUD',	 type: 'string' },
                { name: 'SKUUOMAsk',	 type: 'string' },
                { name: 'SKUWeight',	 type: 'string' },
                { name: 'Shipper',	 type: 'string' },
                { name: 'ShipperAsk',	 type: 'string' },
                { name: 'ShipperDetails',	 type: 'string' },
                { name: 'ShipperDisplaySequence',	 type: 'string' },
                { name: 'ShipperName',	 type: 'string' },
                { name: 'ShipperRemark',	 type: 'string' },
                { name: 'ShipperStatus',	 type: 'string' },
                { name: 'ShipperTS',	 type: 'string' },
                { name: 'ShipperUD',	 type: 'string' },
                { name: 'Signature',	 type: 'string' },
                { name: 'SignatureDate',	 type: 'string' },
                { name: 'TS',	 type: 'string' },
                { name: 'TransactionDate',	 type: 'string' },
                { name: 'TruckAsk',	 type: 'string' },
                { name: 'TruckDisplaySequence',	 type: 'string' },
                { name: 'TruckID',	 type: 'string' },
                { name: 'TruckRemark',	 type: 'string' },
                { name: 'TruckStatus',	 type: 'string' },
                { name: 'TruckTS',	 type: 'string' },
                { name: 'TruckTypeAsk',	 type: 'string' },
                { name: 'TruckUD',	 type: 'string' },
                { name: 'UD',	 type: 'string' },
              
              ],
              id: 'Ask',
              localdata: Detailsbyid
          }
          let nestedGridAdapter = new jqx.dataAdapter(detailSource);
          if (nestedGridContainer != null) {  
              let settings = {
                  width: '"100%"',
                  //height: 200,
                  rowsheight:25,
                  rowdetails:true,
                  filterable:true,
                  editable:false,
                  altrows:true,
                  autoheight:true, 
                  //onCelldoubleclick:'CellDoubleclick($event)',        
                  //showstatusbar:true,
                  //showaggregates:true, 
                  source: nestedGridAdapter, 
                  columns: [
                    

                    //Display Column

                    { text:'ContainerNo',  datafield:'ContainerNo', width: '10%',editable: false,hidden:true }, //readonly cell.
                    { text:'ShipperName',  datafield:'ShipperName', width: '10%',editable: false,hidden:true }, //readonly cell.
                    { text:'SKUName',  datafield:'SKUName', width: '10%',editable: false,hidden:false }, //readonly cell.

                    { text:'SKUPlanQty',  datafield:'SKUPlanQty', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text:'SKUUOMAsk',  datafield:'SKUUOMAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text:'SKURemark',  datafield:'SKURemark', width: '10%',editable: false,hidden:false }, //readonly cell.
                    //Hide Column
                    

                        { text: 'AgentAddress',  datafield: 'AgentAddress', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentAsk',  datafield:'AgentAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentBillingAddress',  datafield:'AgentBillingAddress', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentCompanyName',  datafield:'AgentCompanyName', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentContactPersonMobile',  datafield:'AgentContactPersonMobile', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentContactPersonName',  datafield:'AgentContactPersonName', width: '10%',editable: true,hidden:true }, //readonly cell.
                        { text:'AgentDetails',  datafield:'AgentDetails', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentDisplaySequence',  datafield:'AgentDisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentEmail',  datafield:'AgentEmail', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentMobile',  datafield:'AgentMobile', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentName',  datafield:'AgentName', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentNationalID',  datafield:'AgentNationalID', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentRemark',  datafield:'AgentRemark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentShippingAddress',  datafield:'AgentShippingAddress', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentTS',  datafield:'AgentTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentUD',  datafield:'AgentUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'AgentWebsite',  datafield:'AgentWebsite', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'Ask',  datafield:'Ask', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'BookingID',  datafield:'BookingID', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'BookingStatusAsk',  datafield:'BookingStatusAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'CargoReceivedDate',  datafield:'CargoReceivedDate', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerAsk',  datafield:'ContainerAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerBase',  datafield:'ContainerBase', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerCarrier',  datafield:'ContainerCarrier', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerColor',  datafield:'ContainerColor', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerCountryAsk',  datafield:'ContainerCountryAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerCutOffDate',  datafield:'ContainerCutOffDate', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerDetails',  datafield:'ContainerDetails', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerDisplaySequence',  datafield:'ContainerDisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerETA',  datafield:'ContainerETA', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerETD',  datafield:'ContainerETD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerGrossWeight',  datafield:'ContainerGrossWeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerHeight',  datafield:'ContainerHeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerMattWeight',  datafield:'ContainerMattWeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                      
                        { text:'ContainerPaperlessCode',  datafield:'ContainerPaperlessCode', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerPicture',  datafield:'ContainerPicture', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerRemark',  datafield:'ContainerRemark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerSealNo',  datafield:'ContainerSealNo', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerStatus',  datafield:'ContainerStatus', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerTS',  datafield:'ContainerTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerTareWeight',  datafield:'ContainerTareWeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerTotalWeight',  datafield:'ContainerTotalWeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerTruckTypeAsk',  datafield:'ContainerTruckTypeAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerType',  datafield:'ContainerType', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerUD',  datafield:'ContainerUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerVesselNo',  datafield:'ContainerVesselNo', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerVoy',  datafield:'ContainerVoy', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ContainerWidth',  datafield:'ContainerWidth', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'CountryAsk',  datafield:'CountryAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'CustomIssuedDate',  datafield:'CustomIssuedDate', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'DisplaySequence',  datafield:'DisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'LogisticTypeAsk',  datafield:'LogisticTypeAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'NoOfContainer',  datafield:'NoOfContainer', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'NoOfTruck',  datafield:'NoOfTruck', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POAsk',  datafield:'POAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'PODisplaySequence',  datafield:'PODisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'PONo',  datafield:'PONo', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POReferenceNo',  datafield:'POReferenceNo', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'PORemark',  datafield:'PORemark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POShippingMark',  datafield:'POShippingMark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POStatus',  datafield:'POStatus', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POTS',  datafield:'POTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'POUD',  datafield:'POUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'Remark',  datafield:'Remark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUAsk',  datafield:'SKUAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUDamageQty',  datafield:'SKUDamageQty', width: '10%',editable: false,hidden:true }, //readonly cell.
                     
                        { text:'SKUDimensionBase',  datafield:'SKUDimensionBase', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUDimensionHeight',  datafield:'SKUDimensionHeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUDimensionWidth',  datafield:'SKUDimensionWidth', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUDisplaySequence',  datafield:'SKUDisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUGoodQty',  datafield:'SKUGoodQty', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUDetails',  datafield:'SKUDetails', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUOverlandQty',  datafield:'SKUOverlandQty', width: '10%',editable: false,hidden:true }, //readonly cell.
                      
                        { text:'SKUReceivedQty',  datafield:'SKUReceivedQty', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUReference',  datafield:'SKUReference', width: '10%',editable: false,hidden:true }, //readonly cell.
                      
                        { text:'SKUShortLandQty',  datafield:'SKUShortLandQty', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUStatus',  datafield:'SKUStatus', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUTS',  datafield:'SKUTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUTruckType',  datafield:'SKUTruckType', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SKUUD',  datafield:'SKUUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                      
                        { text:'SKUWeight',  datafield:'SKUWeight', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'Shipper',  datafield:'Shipper', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperAsk',  datafield:'ShipperAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperDetails',  datafield:'ShipperDetails', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperDisplaySequence',  datafield:'ShipperDisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                      
                        { text:'ShipperRemark',  datafield:'ShipperRemark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperStatus',  datafield:'ShipperStatus', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperTS',  datafield:'ShipperTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'ShipperUD',  datafield:'ShipperUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'Signature',  datafield:'Signature', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'SignatureDate',  datafield:'SignatureDate', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TS',  datafield:'TS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TransactionDate',  datafield:'TransactionDate', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckAsk',  datafield:'TruckAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckDisplaySequence',  datafield:'TruckDisplaySequence', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckID',  datafield:'TruckID', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckRemark',  datafield:'TruckRemark', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckStatus',  datafield:'TruckStatus', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckTS',  datafield:'TruckTS', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckTypeAsk',  datafield:'TruckTypeAsk', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'TruckUD',  datafield:'TruckUD', width: '10%',editable: false,hidden:true }, //readonly cell.
                        { text:'UD',  datafield:'UD', width: '10%',editable: false,hidden:true }, //readonly cell.

                  ]
              };  
              jqwidgets.createInstance(`#${nestedGridContainer.id}`, 'jqxGrid', settings);
          }
      }      
    }
  };
  ngOnInit() {    
}


photoRenderer = (row: number, column: any, value: string): string => {
    let name = this.HeaderGrid.getrowdata(row).FirstName;
    //let imgurl = '../images/' + name.toLowerCase() + '.png';
    let imgurl = 'assets/img/supply.jpg';
    let img = '<div style="background: white;"><img style="margin: 2px; margin-left: 10px;" width="32" height="32" src="' + imgurl + '"></div>';
    return img;
}

renderer = (row: number, column: any, value: string): string => {
    return '<span style="margin-left: 4px; margin-top: 9px; float: left;">' + value + '</span>';
}

rowdetailstemplate: any = {
    rowdetails: '<div id="nestedGrid" style="margin: 10px;"></div>', rowdetailsheight: 220, rowdetailshidden: true
};

ready = (): void => {
    this.HeaderGrid.showrowdetails(1);
};
debugger
columns: any[] =
[   
   
    { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
    { text: 'Booking ID', datafield: 'BookingID', width: 120 , hidden:false }  ,


    { text: 'Agent Name', datafield: 'AgentName', width: 200 , hidden:false },
    { text: 'Shipper Name', datafield: 'ShipperName', width: 150, hidden:false  },
    { text: 'No Of Container', datafield: 'NoOfContainer', width: 120, hidden:false  }, 
    { text: 'No Of Truck', datafield: 'NoOfTruck', width: 120, hidden:false  }, 
    { text: 'ContainerAsk', datafield: 'ContainerAsk', width: 150, hidden:false  }, 
    { text: 'ContainerNo', datafield: 'ContainerNo', width: 150, hidden:false  }, 
    { text: 'Cont Type', datafield: 'ContainerType', width: 150, hidden:false  }, 
    
   
    { text: 'TotalGrossW', datafield: 'TotalGrossW', width: 150, hidden:false  }, 
    { text: 'Total W:', datafield: 'TotalVol', width: 150, hidden:false  }, 

    { text: 'Country Name', datafield: 'CountryName', width: 150, hidden:false },
    { text: 'Transaction Date', datafield: 'TransactionDate', width: 120, hidden:true  }, 
    { text: 'Container Remark', datafield: 'ContainerRemark', width: 200, hidden:false  }, 
    { text: 'Status', datafield: 'BookingStatus', width: 150 , hidden:false} ,
    { text: 'Cargo Received Date', datafield: 'CargoReceivedDate', width: 250, hidden:true }  ,    
    { text: 'CustomIssued Date', datafield: 'CustomIssuedDate', width: 120, hidden:true  }, 
    { text: 'Display Sequence', datafield: 'DisplaySequence', width: 120, hidden:true }, 
    { text: 'Signature', datafield: 'Signature', width: 120, hidden:true },         
    { text: 'Signature Date', datafield: 'SignatureDate', width: 120, hidden:true}, 
    { text: 'TS', datafield: 'TS', width: 120, hidden:true },   
    { text: 'UD', datafield: 'UD', width: 120, hidden:true  } 
 

]; 
btnNew()
{ 
    this.HeaderGrid.disabled(true); 
    this.router.navigate([ {outlets: { modal: 'setplanreceiveforexport-w' } } ]);
    this.HeaderGrid.disabled(false)    
}
btnRefresh()
{ 
   this.HeaderGrid.clear();
    this.bindParameterJson();    
    //alert(JSON.stringify(this.ParameterJson) );    
    this.getPRFEWarehouseList();
    //this.bindParameterJson();   
    //bba
}
public bindParameterJson()
{
    this.debugger
    //alert( this.ParameterJson.AgentAsk= this.cboagentcombo.val());
    this.ParameterJson.UserID= this.backendservice.LoginUser;
    this.ParameterJson.Password= this.backendservice.LoginPwd;
    this.ParameterJson.ProductAsk=this.backendservice.ProductName;
    if (JSON.stringify( this.txtBookingID.ngValue)!="")
    {
        this.ParameterJson.BookingID= this.txtBookingID.ngValue;
    }else{
        this.ParameterJson.BookingID= "";
    }
    if (JSON.stringify( this.txtShipper)!="")
    {
        this.ParameterJson.Shipper= this.txtShipper.ngValue;
    }else{
        this.ParameterJson.Shipper= "";
    }
    if (JSON.stringify( this.txtReferenceNo.ngValue)!="")
    {
        this.ParameterJson.ReferenceNo=  this.txtReferenceNo.ngValue;
    }else{
        this.ParameterJson.ReferenceNo= "";
    }
    if (this.dtTransactionDate.getText()!="")
    {
        //this.ParameterJson.TransactionDate= this.dtTransactionDate.getText();
    }else{
        this.ParameterJson.TransactionDate= "";
    }
    if (this.cboagentcombo.valueMember.toString()!="")
    {
        this.ParameterJson.AgentAsk= this.cboagentcombo.val() ;
    }else{
        this.ParameterJson.AgentAsk= "0";
    }
    if (this.cboTrstatustcombo.valueMember.toString()!="")
    {
        this.ParameterJson.BookingStatusAsk= this.cboTrstatustcombo.val();
    }else{
        this.ParameterJson.BookingStatusAsk= "0";
    }
}

CellDoubleclick(event:any)
{
    var columnindex = event.args.columnindex;
    var rowindex = this.HeaderGrid.getselectedrowindex();
    var rowid = this.HeaderGrid.getrowid(rowindex);  
    var rowdata = this.HeaderGrid.getrowdata(rowindex); 


     //this.router.navigate(['setplanreceiveforexport-w',{BookingAsk: rowdata.Ask,AgentAsk: rowdata.AgentAsk}]);   
    // this.HeaderGrid.disabled(true); 

    //this.router.navigate([ {outlets: { modal: 'setplanreceiveforexport-w' }},
    alert(JSON.stringify(rowdata.ContainerAsk));
    this.router.navigate([ {outlets: { modal: ['setplanreceiveforexport',rowdata.Ask,rowdata.AgentAsk,rowdata.ShipperAsk,"0"] } } ]);
    //{BookingAsk: rowdata.Ask,AgentAsk: rowdata.AgentAsk} ]);
    //this.HeaderGrid.disabled(false) 
    
}

btnSubmit()
{  
    alert("Soon, can submit after sign pwd");
}
btnPreview()
{  
    alert("Soon, can Preview the data in pdf");
    //this.router.navigate(['setcheckerforexport']);
}
btnPrint()
{  
    alert("Soon can print easy");
    //this.router.navigate(['setcheckerforexport']);
}
btnDelete()
{  
    alert("Soon, can delete selected row");
    //this.router.navigate(['setcheckerforexport']);
}
btnGenearateExcel()
{  
    alert("Soon to export data to excel");
   //this.router.navigate(['setcheckerforexport']);
}

}

