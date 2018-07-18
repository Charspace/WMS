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

@Component({
  selector: 'app-lstplanreceiveforexport-w',
  templateUrl: './lstplanreceiveforexport-w.component.html',
  styleUrls: ['./lstplanreceiveforexport-w.component.css']
})
export class LstplanreceiveforexportWComponent implements OnInit {
  @ViewChild('HeaderGrid') HeaderGrid: jqxGridComponent;
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
  
  ParameterJson:any;  
  HeaderJson :any;
  DetailJson :any;
   
  DetailSource2: any;
  DetailAdapter2 : any;
  detailcolumns2:any;
            
  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bindPlaceholder();
    this.getPRFEWarehouseList();  
  }

  getPRFEWarehouseList()
  {
    var body = {
        "UserID" : "admin",
        "Password" : "123",
        "ProductAsk":"11",
        "Ask":"0",
        "BookingID":"",
        "AgentAsk":"",
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

       this.backendservice.getReceivedlist(body).then(data =>
        {
            alert(JSON.stringify(data));
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
              id: 'BookingID',
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
    { text: 'AgentAsk', datafield: 'AgentAsk', width: 120 },
    { text: 'Ask', datafield: 'Ask', width: 120 },
    { text: 'Booking ID', datafield: 'BookingID', width: 120 }  ,
    { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 120 }   ,
    { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 250 }  ,
    { text: 'CountryAsk', datafield: 'CountryAsk', width: 150 },
    { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 120,  }, 
    { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 120,  }, 
    { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 120,  }, 
    { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 120,  }, 
    { text: 'Remark', datafield: 'Remark', width: 120,  }, 
    { text: 'Shipper', datafield: 'Shipper', width: 120,  }, 
    { text: 'Signature', datafield: 'Signature', width: 120,  },         
    { text: 'SignatureDate', datafield: 'SignatureDate', width: 120,  }, 
    { text: 'TS', datafield: 'TS', width: 120,  }, 
    { text: 'TransactionDate', datafield: 'TransactionDate', width: 120,  }, 
    { text: 'UD', datafield: 'UD', width: 120,  }     
]; 
btnNew()
{  
    this.router.navigate(['setplanreceiveforexport-w']);
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

    this.router.navigate(['setplanreceiveforexport-w',{BookingID: rowdata.BookingID}]);   

}

}
