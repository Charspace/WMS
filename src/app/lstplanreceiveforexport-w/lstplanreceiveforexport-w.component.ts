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

@Component({
  selector: 'app-lstplanreceiveforexport-w',
  templateUrl: './lstplanreceiveforexport-w.component.html',
  styleUrls: ['./lstplanreceiveforexport-w.component.css']
})
export class LstplanreceiveforexportWComponent implements OnInit {
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
ParameterJson={"UserID" : "admin","Password" : "123","ProductAsk":"11", "Ask":"0","BookingID":"","AgentAsk":"",
    "Shipper":"",
    "CountryAsk":"","CargoReceivedDate":"", "CustomIssuedDate":"", "TransactionDate":"","Signature":"",
    "SignatureDate":"", "BookingStatusAsk":"","NoOfTruck":"", "NoOfContainer":"", "TruckAsk":"",
    "TruckID":"", "TruckTypeAsk":"", "PONo":"","ShippingMark":"","ReferenceNo":"",
    "SKUAsk":"","SKUName":"", "SKUDetails":"","DimensionWidth":"", "DimensionHeight":"",
    "DimensionBase":"","SKUWeight":"", "PlanQty":"", "UOMAsk":"",
    "ReceivedQty":"", "Reference":"","TruckType":"","GoodQty":"",
    "DamageQty":"", "ShortLandQty":"","OverlandQty":""
   }; 
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
bindTransactionStatus()
{    
    var jsonbody = {"UserID":"Admin","Password":"123","ProductAsk":"11"}
    this.backendservice.wsCall(jsonbody,this.backendservice.wsgetTransactionStatus).then(data =>
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
  {
       var body = this.ParameterJson;
       console.log('ws json is'+JSON.stringify(body));
       this.backendservice.wsCall(body,this.backendservice.wsgetPRFEWarehouseList).then(data =>
       //this.backendservice.getReceivedlist(body).then(data =>
        {
            //alert(JSON.stringify(data));
            var json = data;             
            console.log('ws json is'+JSON.stringify(json));
            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;       
            this.CreateGrid();              
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
  {  
    this.HeaderSource  =
    {
        datafields: [
            { name: 'AgentAsk', type: 'string' },
            { name: 'Ask', type: 'string' },
            { name: 'BookingID' , type: 'string' },
            { name: 'BookingStatusAsk' , type: 'string' },
            { name: 'CargoReceivedDate' , type: 'string' },
            { name: 'CustomIssuedDate'  , type: 'string' } , 
            { name: 'DisplaySequence'  , type: 'string' },
            { name: 'NoOfContainer'  , type: 'string' } , 
            { name: 'NoOfTruck'  , type: 'string' } , 
            { name: 'Remark'  , type: 'string' } , 
            { name: 'Shipper'  , type: 'string' } , 
            { name: 'Signature'  , type: 'string' } , 
            { name: 'SignatureDate'  , type: 'string' } , 
            { name: 'TS'  , type: 'string' } , 
            { name: 'TransactionDate'  , type: 'string' } , 
            { name: 'UD'  , type: 'string' } 
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
        { text: 'AgentAsk', datafield: 'AgentAsk', width: 300 },
        { text: 'Ask', datafield: 'Ask', width: 300 },
        { text: 'Booking ID', datafield: 'BookingID', width: 300 }  ,
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 300 }   ,
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 300 }  ,
        { text: 'CountryAsk', datafield: 'CountryAsk', width: 300 },
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 300,  }, 
        { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 300,  }, 
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 300,  }, 
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 300,  }, 
        { text: 'Remark', datafield: 'Remark', width: 300,  }, 
        { text: 'Shipper', datafield: 'Shipper', width: 300,  }, 
        { text: 'Signature', datafield: 'Signature', width: 300,  },         
        { text: 'SignatureDate', datafield: 'SignatureDate', width: 300,  }, 
        { text: 'TS', datafield: 'TS', width: 300,  }, 
        { text: 'TransactionDate', datafield: 'TransactionDate', width: 300,  }, 
        { text: 'UD', datafield: 'UD', width: 300,  }
        // ,
        // { text: 'AgentName', datafield: 'UD', width: 300,  },
        // { text: 'BookingStatusName', datafield: 'UD', width: 300,  },
        // { text: 'CountryName', datafield: 'UD', width: 300,  },
        // { text: 'ShipperName', datafield: 'UD', width: 300,  }
    ];    
    this.DetailSource =
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
                { name: 'TruckTypeAsk', type: 'string' }            
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json',         
    };
    this.DetailAdapter = new jqx.dataAdapter(this.DetailSource, { autoBind: true });
    this.detailcolumns =
    [
        { text: 'AgentAsk', datafield: 'AgentAsk', width: 300,editable: false,hidden:false },
        { text: 'Ask', datafield: 'Ask', width: 300,editable: false,hidden:false },
        { text: 'BookingID', datafield: 'BookingID', width: 300,editable: false,hidden:false },
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 300,editable: false,hidden:false },
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 300,editable: false,hidden:false },
        { text: 'CountryAsk', datafield: 'CountryAsk', width: 300,editable: false,hidden:false },
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 300,editable: false,hidden:false },
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 300,editable: false,hidden:false },
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 300,editable: false,hidden:false },
        { text: 'POAsk', datafield: 'POAsk', width: 300,editable: false,hidden:false },
        { text: 'PONo', datafield: 'PONo', width: 300,editable: false,hidden:false },
        { text: 'POReferenceNo', datafield: 'POReferenceNo', width: 300,editable: false,hidden:false },
        { text: 'PORemark', datafield: 'PORemark', width: 300,editable: false,hidden:false },
        { text: 'POShippingMark', datafield: 'POShippingMark', width: 300,editable: false,hidden:false },
        { text: 'POStatus', datafield: 'POStatus', width: 300,editable: false,hidden:false },
        { text: 'SKUAsk', datafield: 'SKUAsk', width: 300,editable: false,hidden:false },
        { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 300,editable: false,hidden:false },
        { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 300,editable: false,hidden:false },
        { text: 'SKUDetails', datafield: 'SKUDetails', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionBase', datafield: 'SKUDimensionBase', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionHeight', datafield: 'SKUDimensionHeight', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionWidth', datafield: 'SKUDimensionWidth', width: 300,editable: false,hidden:false },
        { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 300,editable: false,hidden:false },
        { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUName', datafield: 'SKUName', width: 300,editable: false,hidden:false },
        { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty', width: 300,editable: false,hidden:false },
        { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUPlanQty', datafield: 'SKUPlanQty', width: 300,editable: false,hidden:false },
        { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty', width: 300,editable: false,hidden:false },
        { text: 'SKUReference', datafield: 'SKUReference', width: 300,editable: false,hidden:false },
        { text: 'SKURemark', datafield: 'SKURemark', width: 300,editable: false,hidden:false },
        { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 300,editable: false,hidden:false },
        { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUStatus', datafield: 'SKUStatus', width: 300,editable: false,hidden:false },
        { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 300,editable: false,hidden:false },
        { text: 'SKUTruckType', datafield: 'SKUTruckType', width: 300,editable: false,hidden:false },
        { text: 'SKUUOMAsk', datafield: 'SKUUOMAsk', width: 300,editable: false,hidden:false },
        { text: 'SKUWeight', datafield: 'SKUWeight', width: 300,editable: false,hidden:false },
        { text: 'Shipper', datafield: 'Shipper', width: 300,editable: false,hidden:false },
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 300,editable: false,hidden:false },
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 300,editable: false,hidden:false },
        { text: 'ShipperName', datafield: 'ShipperName', width: 300,editable: false,hidden:false },
        { text: 'Signature', datafield: 'Signature', width: 300,editable: false,hidden:false },
        { text: 'SignatureDate', datafield: 'SignatureDate', width: 300,editable: false,hidden:false },
        { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 300,editable: false,hidden:false },
        { text: 'TruckAsk', datafield: 'TruckAsk', width: 300,editable: false,hidden:false },
        { text: 'TruckID', datafield: 'TruckID', width: 300,editable: false,hidden:false },
        { text: 'TruckRemark', datafield: 'TruckRemark', width: 300,editable: false,hidden:false },
        { text: 'TruckStatus', datafield: 'TruckStatus', width: 300,editable: false,hidden:false },
        { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 300,editable: false,hidden:false }
    ]    
    this.DetailSource2 =
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
                { name: 'TruckTypeAsk', type: 'string' }          
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json', 

    }

    this.DetailAdapter2 = new jqx.dataAdapter(this.DetailSource2, { autoBind: true });

    this.detailcolumns2 =
    [
        { text: 'AgentAsk', datafield: 'AgentAsk', width: 300,editable: false,hidden:false },
        { text: 'Ask', datafield: 'Ask', width: 300,editable: false,hidden:false },
        { text: 'BookingID', datafield: 'BookingID', width: 300,editable: false,hidden:false },
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 300,editable: false,hidden:false },
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 300,editable: false,hidden:false },
        { text: 'CountryAsk', datafield: 'CountryAsk', width: 300,editable: false,hidden:false },
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 300,editable: false,hidden:false },
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 300,editable: false,hidden:false },
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 300,editable: false,hidden:false },
        { text: 'POAsk', datafield: 'POAsk', width: 300,editable: false,hidden:false },
        { text: 'PONo', datafield: 'PONo', width: 300,editable: false,hidden:false },
        { text: 'POReferenceNo', datafield: 'POReferenceNo', width: 300,editable: false,hidden:false },
        { text: 'PORemark', datafield: 'PORemark', width: 300,editable: false,hidden:false },
        { text: 'POShippingMark', datafield: 'POShippingMark', width: 300,editable: false,hidden:false },
        { text: 'POStatus', datafield: 'POStatus', width: 300,editable: false,hidden:false },
        { text: 'SKUAsk', datafield: 'SKUAsk', width: 300,editable: false,hidden:false },
        { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 300,editable: false,hidden:false },
        { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 300,editable: false,hidden:false },
        { text: 'SKUDetails', datafield: 'SKUDetails', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionBase', datafield: 'SKUDimensionBase', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionHeight', datafield: 'SKUDimensionHeight', width: 300,editable: false,hidden:false },
        { text: 'SKUDimensionWidth', datafield: 'SKUDimensionWidth', width: 300,editable: false,hidden:false },
        { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 300,editable: false,hidden:false },
        { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUName', datafield: 'SKUName', width: 300,editable: false,hidden:false },
        { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty', width: 300,editable: false,hidden:false },
        { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUPlanQty', datafield: 'SKUPlanQty', width: 300,editable: false,hidden:false },
        { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty', width: 300,editable: false,hidden:false },
        { text: 'SKUReference', datafield: 'SKUReference', width: 300,editable: false,hidden:false },
        { text: 'SKURemark', datafield: 'SKURemark', width: 300,editable: false,hidden:false },
        { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 300,editable: false,hidden:false },
        { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto', width: 300,editable: false,hidden:false },
        { text: 'SKUStatus', datafield: 'SKUStatus', width: 300,editable: false,hidden:false },
        { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 300,editable: false,hidden:false },
        { text: 'SKUTruckType', datafield: 'SKUTruckType', width: 300,editable: false,hidden:false },
        { text: 'SKUUOMAsk', datafield: 'SKUUOMAsk', width: 300,editable: false,hidden:false },
        { text: 'SKUWeight', datafield: 'SKUWeight', width: 300,editable: false,hidden:false },
        { text: 'Shipper', datafield: 'Shipper', width: 300,editable: false,hidden:false },
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 300,editable: false,hidden:false },
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 300,editable: false,hidden:false },
        { text: 'ShipperName', datafield: 'ShipperName', width: 300,editable: false,hidden:false },
        { text: 'Signature', datafield: 'Signature', width: 300,editable: false,hidden:false },
        { text: 'SignatureDate', datafield: 'SignatureDate', width: 300,editable: false,hidden:false },
        { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 300,editable: false,hidden:false },
        { text: 'TruckAsk', datafield: 'TruckAsk', width: 300,editable: false,hidden:false },
        { text: 'TruckID', datafield: 'TruckID', width: 300,editable: false,hidden:false },
        { text: 'TruckRemark', datafield: 'TruckRemark', width: 300,editable: false,hidden:false },
        { text: 'TruckStatus', datafield: 'TruckStatus', width: 300,editable: false,hidden:false },
        { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 300,editable: false,hidden:false } 
    ] 
  
    this.nestedGrids = new Array();
        // create nested grid.
        this.initRowDetails = (index: number, parentElement: any, gridElement: any, record: any): void => {
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
                { name: 'TruckTypeAsk', type: 'string' }   
              ],
              id: 'Ask',
              localdata: Detailsbyid
          }
          let nestedGridAdapter = new jqx.dataAdapter(detailSource);
          if (nestedGridContainer != null) {  
              let settings = {
                  width: 780,
                  height: 200,
                  source: nestedGridAdapter, 
                  columns: [
                    { text: 'AgentAsk', datafield: 'AgentAsk', width: 300,editable: false,hidden:false },
                    { text: 'Ask', datafield: 'Ask', width: 300,editable: false,hidden:false },
                    { text: 'BookingID', datafield: 'BookingID', width: 300,editable: false,hidden:false },
                    { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 300,editable: false,hidden:false },
                    { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 300,editable: false,hidden:false },
                    { text: 'CountryAsk', datafield: 'CountryAsk', width: 300,editable: false,hidden:false },
                    { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 300,editable: false,hidden:false },
                    { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 300,editable: false,hidden:false },
                    { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 300,editable: false,hidden:false },
                    { text: 'POAsk', datafield: 'POAsk', width: 300,editable: false,hidden:false },
                    { text: 'PONo', datafield: 'PONo', width: 300,editable: false,hidden:false },
                    { text: 'POReferenceNo', datafield: 'POReferenceNo', width: 300,editable: false,hidden:false },
                    { text: 'PORemark', datafield: 'PORemark', width: 300,editable: false,hidden:false },
                    { text: 'POShippingMark', datafield: 'POShippingMark', width: 300,editable: false,hidden:false },
                    { text: 'POStatus', datafield: 'POStatus', width: 300,editable: false,hidden:false },
                    { text: 'SKUAsk', datafield: 'SKUAsk', width: 300,editable: false,hidden:false },
                    { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 300,editable: false,hidden:false },
                    { text: 'SKUDetails', datafield: 'SKUDetails', width: 300,editable: false,hidden:false },
                    { text: 'SKUDimensionBase', datafield: 'SKUDimensionBase', width: 300,editable: false,hidden:false },
                    { text: 'SKUDimensionHeight', datafield: 'SKUDimensionHeight', width: 300,editable: false,hidden:false },
                    { text: 'SKUDimensionWidth', datafield: 'SKUDimensionWidth', width: 300,editable: false,hidden:false },
                    { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 300,editable: false,hidden:false },
                    { text: 'SKUName', datafield: 'SKUName', width: 300,editable: false,hidden:false },
                    { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 300,editable: false,hidden:false },
                    { text: 'SKUPlanQty', datafield: 'SKUPlanQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUReference', datafield: 'SKUReference', width: 300,editable: false,hidden:false },
                    { text: 'SKURemark', datafield: 'SKURemark', width: 300,editable: false,hidden:false },
                    { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 300,editable: false,hidden:false },
                    { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto', width: 300,editable: false,hidden:false },
                    { text: 'SKUStatus', datafield: 'SKUStatus', width: 300,editable: false,hidden:false },
                    { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 300,editable: false,hidden:false },
                    { text: 'SKUTruckType', datafield: 'SKUTruckType', width: 300,editable: false,hidden:false },
                    { text: 'SKUUOMAsk', datafield: 'SKUUOMAsk', width: 300,editable: false,hidden:false },
                    { text: 'SKUWeight', datafield: 'SKUWeight', width: 300,editable: false,hidden:false },
                    { text: 'Shipper', datafield: 'Shipper', width: 300,editable: false,hidden:false },
                    { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 300,editable: false,hidden:false },
                    { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 300,editable: false,hidden:false },
                    { text: 'ShipperName', datafield: 'ShipperName', width: 300,editable: false,hidden:false },
                    { text: 'Signature', datafield: 'Signature', width: 300,editable: false,hidden:false },
                    { text: 'SignatureDate', datafield: 'SignatureDate', width: 300,editable: false,hidden:false },
                    { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 300,editable: false,hidden:false },
                    { text: 'TruckAsk', datafield: 'TruckAsk', width: 300,editable: false,hidden:false },
                    { text: 'TruckID', datafield: 'TruckID', width: 300,editable: false,hidden:false },
                    { text: 'TruckRemark', datafield: 'TruckRemark', width: 300,editable: false,hidden:false },
                    { text: 'TruckStatus', datafield: 'TruckStatus', width: 300,editable: false,hidden:false },
                    { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 300,editable: false,hidden:false }
                  ]
              };  
              jqwidgets.createInstance(`#${nestedGridContainer.id}`, 'jqxGrid', settings);
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

columns: any[] =
[
   
    { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
    { text: 'Booking ID', datafield: 'BookingID', width: 120 , hidden:false }  ,
    { text: 'Agent Ask', datafield: 'AgentAsk', width: 200 , hidden:false },
    { text: 'Shipper', datafield: 'Shipper', width: 150, hidden:false  },
    { text: 'No Of Container', datafield: 'NoOfContainer', width: 120, hidden:false  }, 
    { text: 'No Of Truck', datafield: 'NoOfTruck', width: 120, hidden:false  },  
    // { text: 'Total Gross Weight', datafield: 'Remark', width: 150, hidden:false  }, 
    // { text: 'Total Vol:', datafield: 'Remark', width: 150, hidden:false  }, 
    { text: 'Country Ask', datafield: 'CountryAsk', width: 150, hidden:false },
    { text: 'Transaction Date', datafield: 'TransactionDate', width: 120, hidden:false  }, 
    { text: 'Remark', datafield: 'Remark', width: 200, hidden:false  }, 
    { text: 'Booking Status Ask', datafield: 'BookingStatusAsk', width: 150 , hidden:false} ,

    { text: 'Cargo Received Date', datafield: 'CargoReceivedDate', width: 250, hidden:true }  ,    
    { text: 'CustomIssued Date', datafield: 'CustomIssuedDate', width: 120, hidden:true  }, 
    { text: 'Display Sequence', datafield: 'DisplaySequence', width: 120, hidden:true }, 
    { text: 'Signature', datafield: 'Signature', width: 120, hidden:true },         
    { text: 'Signature Date', datafield: 'SignatureDate', width: 120, hidden:true}, 
    { text: 'TS', datafield: 'TS', width: 120, hidden:true },   
    { text: 'UD', datafield: 'UD', width: 120, hidden:true  } 
    // ,
    // { name: 'AgentName'  , type: 'string' },
    // { name: 'BookingStatusName'  , type: 'string' },
    // { name: 'CountryName'  , type: 'string' },
    // { name: 'ShipperName'  , type: 'string' },
    // { name: 'CountryName'  , type: 'string' } 

]; 
btnNew()
{ 
    this.HeaderGrid.disabled(true); 
    this.router.navigate([ {outlets: { modal: 'settallycheckforexport-w' } } ]);
    this.HeaderGrid.disabled(false)    
}
btnRefresh()
{ 
   // this.HeaderGrid.clear();
    this.validParameter();    
    //alert(JSON.stringify(this.ParameterJson) );    
    this.getPRFEWarehouseList();
    //this.bindParameterJson();   
}
public validParameter()
{
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
bindParameterJson()
{
    
}
btnSubmit()
{   
    //this.router.navigate(['setplanreceiveforexport-w']);
}

CellDoubleclick(event:any)
{
    var columnindex = event.args.columnindex;
    var rowindex = this.HeaderGrid.getselectedrowindex();
    var rowid = this.HeaderGrid.getrowid(rowindex);  
    var rowdata = this.HeaderGrid.getrowdata(rowindex); 

    // this.router.navigate(['setplanreceiveforexport-w',{BookingAsk: rowdata.Ask,AgentAsk: rowdata.AgentAsk}]);   
    // this.HeaderGrid.disabled(true); 

    this.router.navigate([ {outlets: { modal: 'setplanreceiveforexport-w' }},
    {BookingAsk: rowdata.Ask,AgentAsk: rowdata.AgentAsk} ]);
    this.HeaderGrid.disabled(false) 
    
}

}
