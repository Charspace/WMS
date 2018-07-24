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
  selector: 'app-lstallocationforexport-w',
  templateUrl: './lstallocationforexport-w.component.html',
  styleUrls: ['./lstallocationforexport-w.component.css']
})
export class LstallocationforexportWComponent implements OnInit {
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
    referenceplaceholder:any;
  
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
    ParameterJson={"UserID" : "admin","Password" : "123","ProductAsk":"11","Ask":"0","BookingID":"","AgentName":"","ShipperName":"","BookingStatus":"", "POReferenceNo":"", "TransactionDate":"" }; 
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
      this.ParameterJson.UserID= this.backendservice.LoginUser;
      this.ParameterJson.Password= this.backendservice.LoginPwd;
      this.ParameterJson.ProductAsk=this.backendservice.ProductName;
      this.bindPlaceholder();
      this.bindTransactionStatus();
      this.bindAgent();
      this.getPRFEWarehouseList();   
      this.bindUserJson();
      //this.bindParameterJson();
    }
  bindUserJson()    
    {
        debugger
        this.UserJson.UserID= this.backendservice.LoginUser;
        this.UserJson.Password= this.backendservice.LoginPwd;
        this.UserJson.ProductAsk=this.backendservice.ProductName;
    }
  bindAgent()
  {   
      //debugger 
    this.bindUserJson();
    //alert(JSON.stringify (this.UserJson));
      //var jsonbody = {"UserID":"Admin","Password":"123","ProductAsk":"11"}
     // this.backendservice.BindAgent(jsonbody).then(data =>
     this.backendservice.wsCall(this.UserJson,this.backendservice.wsgetAgentList).then(data =>      
      {
       // alert(JSON.stringify (this.AgentList));
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
    {
        debugger
        //this.bindParameterJson();
        //  var body = this.ParameterJson;
        console.log('paraeter json is'+JSON.stringify( this.ParameterJson));
         alert(JSON.stringify( this.ParameterJson));
         this.backendservice.wsCall(this.ParameterJson,this.backendservice.wsgetPRFEWarehouseList).then(data =>
         //this.backendservice.getReceivedlist(body).then(data =>
          {
              //alert(JSON.stringify(data));
              debugger
              var json = data;         
              if(data)
              {    
              console.log('return json is'+JSON.stringify(json));
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
      this.referenceplaceholder="Reference No";
    }
    CreateGrid()
    {  
      this.HeaderSource  =
      {
   
        
          datafields: [
              { name: 'AgentAsk', type: 'string' },
              { name: 'AgentName', type: 'string' },
              { name: 'Ask', type: 'string' },
              { name: 'BookingID' , type: 'string' },
              { name: 'BookingStatus' , type: 'string' },
              { name: 'BookingStatusAsk' , type: 'string' },
              { name: 'CargoReceivedDate' , type: 'string' },
              { name: 'CountryAsk' , type: 'string' },
              { name: 'CountryName' , type: 'string' },
              { name: 'CustomIssuedDate'  , type: 'string' } , 
              { name: 'DisplaySequence'  , type: 'string' },
              { name: 'LogisticTypeAsk'  , type: 'string' },
              { name: 'NoOfContainer'  , type: 'string' } , 
              { name: 'NoOfTruck'  , type: 'string' } ,               
              { name: 'POAsk'  , type: 'string' } ,
              { name: 'ReferenceNo'  , type: 'string' } , 
              { name: 'Remark'  , type: 'string' } ,
              { name: 'Shipper'  , type: 'string' } , 
              { name: 'ShipperAsk'  , type: 'string' } ,
              { name: 'Signature'  , type: 'string' } , 
              { name: 'SignatureDate'  , type: 'string' } , 
              { name: 'ShipperName'  , type: 'string' },
              { name: 'TS'  , type: 'string' } ,              
              { name: 'TotalGrossW'  , type: 'string' } , 
              { name: 'TotalVol'  , type: 'string' } , 
              { name: 'TransactionDate'  , type: 'string' } , 
              { name: 'UD'  , type: 'string' }              
          ],
          localdata: this.HeaderJson,  root: 'Header',
          //record: 'Header',       
          id: 'Ask',   datatype: 'json', 
      };
      this.HeaderAdapter = new jqx.dataAdapter(this.HeaderSource);  
      this.headercolumns =
      [       
      
        

          { text: 'AgentAsk', datafield: 'AgentAsk', width: 300 },
          { text: 'Agent Name', datafield: 'AgentName', width: 300 },
          { text: 'Ask', datafield: 'Ask', width: 300 },
          { text: 'Booking ID', datafield: 'BookingID', width: 300 }  ,
          { text: 'Booking Status', datafield: 'BookingStatus', width: 300 }   ,
          { text: 'Booking StatusAsk', datafield: 'BookingStatusAsk', width: 300 }  ,
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
          { text: 'Transaction Date', datafield: 'TransactionDate', width: 300,  }, 
          { text: 'UD', datafield: 'UD', width: 300,  },
          
        { text: 'Country Name', datafield: '', width: 300 },
        { text: 'Logistic TypeAsk', datafield: 'CountryName', width: 300 },               
        { text: 'POAsk', datafield: 'POAsk', width: 300 },
        { text: 'Reference No', datafield: 'ReferenceNo', width: 300 },
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 300 },    
        { text: 'Shipper Name', datafield: 'ShipperName', width: 300 },         
        { text: 'Total Weight', datafield: 'TotalGrossW', width: 300 },
        { text: 'Total Vol', datafield: 'TotalVol', width: 300 },
          // ,
          // { text: 'AgentName', datafield: 'UD', width: 300,  },
          // { text: 'BookingStatusName', datafield: 'UD', width: 300,  },
          // { text: 'CountryName', datafield: 'UD', width: 300,  },
          // { text: 'ShipperName', datafield: 'UD', width: 300,  }
      ];    
      this.DetailSource =
      {     
          datafields: [
            { name: '', type: 'string' },

                  { name: 'AgentAddress', type: 'string' },
                  { name: 'AgentAsk', type: 'string' },
                  { name: 'AgentBillingAddress', type: 'string' },
                  { name: 'AgentCompanyName', type: 'string' },
                  { name: 'AgentContactPersonMobile', type: 'string' },
                  { name: 'AgentContactPersonName', type: 'string' },
                  { name: 'AgentDetails', type: 'string' },
                  { name: 'AgentDisplaySequence', type: 'string' },
                  { name: 'AgentEmail', type: 'string' },
                  { name: 'AgentMobile', type: 'string' },
                  { name: 'AgentName', type: 'string' },
                  { name: 'AgentNationalID', type: 'string' },
                  { name: 'AgentRemark', type: 'string' },
                  { name: 'AgentTS', type: 'string' },
                  { name: 'AgentUD', type: 'string' },
                  { name: 'AgentWebsite', type: 'string' },
                  { name: 'Ask', type: 'string' },
                  { name: 'BookingID', type: 'string' },
                  { name: 'BookingStatusAsk', type: 'string' },
                  { name: 'CBM', type: 'string' },
                  { name: 'CargoReceivedDate', type: 'string' },
                  { name: 'CountryAsk', type: 'string' },
                  { name: 'CustomIssuedDate', type: 'string' },
                  { name: 'Diff', type: 'string' },
                  { name: 'Dimension', type: 'string' },
                  { name: 'DisplaySequence', type: 'string' },
                  { name: 'LogisticTypeAsk', type: 'string' },
                  { name: 'NoOfContainer', type: 'string' },
                  { name: 'NoOfTruck', type: 'string' },
                  { name: 'POAsk', type: 'string' },
                  { name: 'PODisplaySequence', type: 'string' },
                  { name: 'PONo', type: 'string' },
                  { name: 'POReferenceNo', type: 'string' },
                  { name: 'PORemark', type: 'string' },
                  { name: 'POShippingMark', type: 'string' },
                  { name: 'POStatus', type: 'string' },
                  { name: 'POTS', type: 'string' },
                  { name: 'POUD', type: 'string' },
                  { name: 'Remark', type: 'string' },
                  { name: 'SKUAsk', type: 'string' },
                  { name: 'SKUDamageQty', type: 'string' },
                  { name: 'SKUDetails', type: 'string' },
                  { name: 'SKUDimensionBase', type: 'string' },
                  { name: 'SKUDimensionHeight', type: 'string' },
                  { name: 'SKUDimensionWidth', type: 'string' },
                  { name: 'SKUDisplaySequence', type: 'string' },
                  { name: 'SKUGoodQty', type: 'string' },
                  { name: 'SKUName', type: 'string' },
                  { name: 'SKUOverlandQty', type: 'string' },
                  { name: 'SKUPlanQty', type: 'string' },
                  { name: 'SKUReceivedQty', type: 'string' },
                  { name: 'SKUReference', type: 'string' },
                  { name: 'SKURemark', type: 'string' },
                  { name: 'SKUShortLandQty', type: 'string' },
                  { name: 'SKUStatus', type: 'string' },
                  { name: 'SKUTS', type: 'string' },
                  { name: 'SKUTruckType', type: 'string' },
                  { name: 'SKUUD', type: 'string' },
                  { name: 'SKUUOMAsk', type: 'string' },
                  { name: 'SKUWeight', type: 'string' },
                  { name: 'Shipper', type: 'string' },
                  { name: 'ShipperAsk', type: 'string' },
                  { name: 'ShipperDetails', type: 'string' },
                  { name: 'ShipperDisplaySequence', type: 'string' },
                  { name: 'ShipperName', type: 'string' },
                  { name: 'ShipperRemark', type: 'string' },
                  { name: 'ShipperStatus', type: 'string' },
                  { name: 'ShipperTS', type: 'string' },
                  { name: 'ShipperUD', type: 'string' },
                  { name: 'Signature', type: 'string' },
                  { name: 'SignatureDate', type: 'string' },
                  { name: 'TS', type: 'string' },
                  { name: 'TransactionDate', type: 'string' },
                  { name: 'TruckAsk', type: 'string' },
                  { name: 'TruckDisplaySequence', type: 'string' },
                  { name: 'TruckID', type: 'string' },
                  { name: 'TruckRemark', type: 'string' },
                  { name: 'TruckStatus', type: 'string' },
                  { name: 'TruckTS', type: 'string' },
                  { name: 'TruckTypeAsk', type: 'string' },
                  { name: 'TruckUD', type: 'string' },
                  { name: 'UD', type: 'string' }          
          ],
          localdata: this.DetailJson,
          root: 'Details',
          //record: 'Detail',      
          datatype: 'json',         
      };
      this.DetailAdapter = new jqx.dataAdapter(this.DetailSource, { autoBind: true });
      this.detailcolumns =
      [
        { text: 'AgentAddress', datafield: 'AgentAddress', width: 150,editable: false,hidden:true },
        { text: 'AgentAsk', datafield: 'AgentAsk', width: 150,editable: false,hidden:true },
        { text: 'AgentBillingAddress', datafield: 'AgentBillingAddress', width: 150,editable: false,hidden:true },
        { text: 'AgentCompanyName', datafield: 'AgentCompanyName', width: 150,editable: false,hidden:true },
        { text: 'AgentContactPersonMobile', datafield: 'AgentContactPersonMobile', width: 150,editable: false,hidden:true },
        { text: 'AgentContactPersonName', datafield: 'AgentContactPersonName', width: 150,editable: false,hidden:true },
        { text: 'AgentDetails', datafield: 'AgentDetails', width: 150,editable: false,hidden:true },
        { text: 'AgentDisplaySequence', datafield: 'AgentDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'AgentEmail', datafield: 'AgentEmail', width: 150,editable: false,hidden:true },
        { text: 'AgentMobile', datafield: 'AgentMobile', width: 150,editable: false,hidden:true },
        { text: 'AgentName', datafield: 'AgentName', width: 150,editable: false,hidden:true },
        { text: 'AgentNationalID', datafield: 'AgentNationalID', width: 150,editable: false,hidden:true },
        { text: 'AgentRemark', datafield: 'AgentRemark', width: 150,editable: false,hidden:true },
        { text: 'AgentTS', datafield: 'AgentTS', width: 150,editable: false,hidden:true },
        { text: 'AgentUD', datafield: 'AgentUD', width: 150,editable: false,hidden:true },
        { text: 'AgentWebsite', datafield: 'AgentWebsite', width: 150,editable: false,hidden:true },
        { text: 'Ask', datafield: 'Ask', width: 150,editable: false,hidden:true },
        { text: 'BookingID', datafield: 'BookingID', width: 150,editable: false,hidden:true },
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 150,editable: false,hidden:true },
        { text: 'CBM', datafield: 'CBM', width: 150,editable: false,hidden:true },
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 150,editable: false,hidden:true },
        { text: 'CountryAsk', datafield: 'CountryAsk', width: 150,editable: false,hidden:true },
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 150,editable: false,hidden:true },
        { text: 'Diff', datafield: 'Diff', width: 150,editable: false,hidden:true },
        { text: 'Dimension', datafield: 'Dimension', width: 150,editable: false,hidden:true },
        { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'LogisticTypeAsk', datafield: 'LogisticTypeAsk', width: 150,editable: false,hidden:true },
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 150,editable: false,hidden:true },
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 150,editable: false,hidden:true },
        { text: 'POAsk', datafield: 'POAsk', width: 150,editable: false,hidden:true },
        { text: 'PODisplaySequence', datafield: 'PODisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'PONo', datafield: 'PONo', width: 150,editable: false,hidden:true },
        { text: 'POReferenceNo', datafield: 'POReferenceNo', width: 150,editable: false,hidden:true },
        { text: 'PORemark', datafield: 'PORemark', width: 150,editable: false,hidden:true },
        { text: 'POShippingMark', datafield: 'POShippingMark', width: 150,editable: false,hidden:true },
        { text: 'POStatus', datafield: 'POStatus', width: 150,editable: false,hidden:true },
        { text: 'POTS', datafield: 'POTS', width: 150,editable: false,hidden:true },
        { text: 'POUD', datafield: 'POUD', width: 150,editable: false,hidden:true },
        { text: 'Remark', datafield: 'Remark', width: 150,editable: false,hidden:true },
        { text: 'SKUAsk', datafield: 'SKUAsk', width: 150,editable: false,hidden:true },
        { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 150,editable: false,hidden:true },
        { text: 'SKUDetails', datafield: 'SKUDetails', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionBase', datafield: 'SKUDimensionBase', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionHeight', datafield: 'SKUDimensionHeight', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionWidth', datafield: 'SKUDimensionWidth', width: 150,editable: false,hidden:true },
        { text: 'SKUDisplaySequence', datafield: 'SKUDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 150,editable: false,hidden:true },
        { text: 'SKUName', datafield: 'SKUName', width: 150,editable: false,hidden:true },
        { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty', width: 150,editable: false,hidden:true },
        { text: 'SKUPlanQty', datafield: 'SKUPlanQty', width: 150,editable: false,hidden:true },
        { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty', width: 150,editable: false,hidden:true },
        { text: 'SKUReference', datafield: 'SKUReference', width: 150,editable: false,hidden:true },
        { text: 'SKURemark', datafield: 'SKURemark', width: 150,editable: false,hidden:true },
        { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 150,editable: false,hidden:true },
        { text: 'SKUStatus', datafield: 'SKUStatus', width: 150,editable: false,hidden:true },
        { text: 'SKUTS', datafield: 'SKUTS', width: 150,editable: false,hidden:true },
        { text: 'SKUTruckType', datafield: 'SKUTruckType', width: 150,editable: false,hidden:true },
        { text: 'SKUUD', datafield: 'SKUUD', width: 150,editable: false,hidden:true },
        { text: 'SKUUOMAsk', datafield: 'SKUUOMAsk', width: 150,editable: false,hidden:true },
        { text: 'SKUWeight', datafield: 'SKUWeight', width: 150,editable: false,hidden:true },
        { text: 'Shipper', datafield: 'Shipper', width: 150,editable: false,hidden:true },
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 150,editable: false,hidden:true },
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 150,editable: false,hidden:true },
        { text: 'ShipperDisplaySequence', datafield: 'ShipperDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'ShipperName', datafield: 'ShipperName', width: 150,editable: false,hidden:true },
        { text: 'ShipperRemark', datafield: 'ShipperRemark', width: 150,editable: false,hidden:true },
        { text: 'ShipperStatus', datafield: 'ShipperStatus', width: 150,editable: false,hidden:true },
        { text: 'ShipperTS', datafield: 'ShipperTS', width: 150,editable: false,hidden:true },
        { text: 'ShipperUD', datafield: 'ShipperUD', width: 150,editable: false,hidden:true },
        { text: 'Signature', datafield: 'Signature', width: 150,editable: false,hidden:true },
        { text: 'SignatureDate', datafield: 'SignatureDate', width: 150,editable: false,hidden:true },
        { text: 'TS', datafield: 'TS', width: 150,editable: false,hidden:true },
        { text: 'TransactionDate', datafield: 'TransactionDate', width: 150,editable: false,hidden:true },
        { text: 'TruckAsk', datafield: 'TruckAsk', width: 150,editable: false,hidden:true },
        { text: 'TruckDisplaySequence', datafield: 'TruckDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'TruckID', datafield: 'TruckID', width: 150,editable: false,hidden:true },
        { text: 'TruckRemark', datafield: 'TruckRemark', width: 150,editable: false,hidden:true },
        { text: 'TruckStatus', datafield: 'TruckStatus', width: 150,editable: false,hidden:true },
        { text: 'TruckTS', datafield: 'TruckTS', width: 150,editable: false,hidden:true },
        { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 150,editable: false,hidden:true },
        { text: 'TruckUD', datafield: 'TruckUD', width: 150,editable: false,hidden:true },
        { text: 'UD', datafield: 'UD', width: 150,editable: false,hidden:true },
 ]    
      this.DetailSource2 =
      {
  
          datafields: [
            { name: 'AgentAddress', type: 'string' },
            { name: 'AgentAsk', type: 'string' },
            { name: 'AgentBillingAddress', type: 'string' },
            { name: 'AgentCompanyName', type: 'string' },
            { name: 'AgentContactPersonMobile', type: 'string' },
            { name: 'AgentContactPersonName', type: 'string' },
            { name: 'AgentDetails', type: 'string' },
            { name: 'AgentDisplaySequence', type: 'string' },
            { name: 'AgentEmail', type: 'string' },
            { name: 'AgentMobile', type: 'string' },
            { name: 'AgentName', type: 'string' },
            { name: 'AgentNationalID', type: 'string' },
            { name: 'AgentRemark', type: 'string' },
            { name: 'AgentTS', type: 'string' },
            { name: 'AgentUD', type: 'string' },
            { name: 'AgentWebsite', type: 'string' },
            { name: 'Ask', type: 'string' },
            { name: 'BookingID', type: 'string' },
            { name: 'BookingStatusAsk', type: 'string' },
            { name: 'CBM', type: 'string' },
            { name: 'CargoReceivedDate', type: 'string' },
            { name: 'CountryAsk', type: 'string' },
            { name: 'CustomIssuedDate', type: 'string' },
            { name: 'Diff', type: 'string' },
            { name: 'Dimension', type: 'string' },
            { name: 'DisplaySequence', type: 'string' },
            { name: 'LogisticTypeAsk', type: 'string' },
            { name: 'NoOfContainer', type: 'string' },
            { name: 'NoOfTruck', type: 'string' },
            { name: 'POAsk', type: 'string' },
            { name: 'PODisplaySequence', type: 'string' },
            { name: 'PONo', type: 'string' },
            { name: 'POReferenceNo', type: 'string' },
            { name: 'PORemark', type: 'string' },
            { name: 'POShippingMark', type: 'string' },
            { name: 'POStatus', type: 'string' },
            { name: 'POTS', type: 'string' },
            { name: 'POUD', type: 'string' },
            { name: 'Remark', type: 'string' },
            { name: 'SKUAsk', type: 'string' },
            { name: 'SKUDamageQty', type: 'string' },
            { name: 'SKUDetails', type: 'string' },
            { name: 'SKUDimensionBase', type: 'string' },
            { name: 'SKUDimensionHeight', type: 'string' },
            { name: 'SKUDimensionWidth', type: 'string' },
            { name: 'SKUDisplaySequence', type: 'string' },
            { name: 'SKUGoodQty', type: 'string' },
            { name: 'SKUName', type: 'string' },
            { name: 'SKUOverlandQty', type: 'string' },
            { name: 'SKUPlanQty', type: 'string' },
            { name: 'SKUReceivedQty', type: 'string' },
            { name: 'SKUReference', type: 'string' },
            { name: 'SKURemark', type: 'string' },
            { name: 'SKUShortLandQty', type: 'string' },
            { name: 'SKUStatus', type: 'string' },
            { name: 'SKUTS', type: 'string' },
            { name: 'SKUTruckType', type: 'string' },
            { name: 'SKUUD', type: 'string' },
            { name: 'SKUUOMAsk', type: 'string' },
            { name: 'SKUWeight', type: 'string' },
            { name: 'Shipper', type: 'string' },
            { name: 'ShipperAsk', type: 'string' },
            { name: 'ShipperDetails', type: 'string' },
            { name: 'ShipperDisplaySequence', type: 'string' },
            { name: 'ShipperName', type: 'string' },
            { name: 'ShipperRemark', type: 'string' },
            { name: 'ShipperStatus', type: 'string' },
            { name: 'ShipperTS', type: 'string' },
            { name: 'ShipperUD', type: 'string' },
            { name: 'Signature', type: 'string' },
            { name: 'SignatureDate', type: 'string' },
            { name: 'TS', type: 'string' },
            { name: 'TransactionDate', type: 'string' },
            { name: 'TruckAsk', type: 'string' },
            { name: 'TruckDisplaySequence', type: 'string' },
            { name: 'TruckID', type: 'string' },
            { name: 'TruckRemark', type: 'string' },
            { name: 'TruckStatus', type: 'string' },
            { name: 'TruckTS', type: 'string' },
            { name: 'TruckTypeAsk', type: 'string' },
            { name: 'TruckUD', type: 'string' },
            { name: 'UD', type: 'string' }            
          ],
          localdata: this.DetailJson,
          root: 'Details',
          //record: 'Detail',      
          datatype: 'json', 
  
      }
  
      this.DetailAdapter2 = new jqx.dataAdapter(this.DetailSource2, { autoBind: true });
  
      this.detailcolumns2 =
      [
        { text: 'AgentAddress', datafield: 'AgentAddress', width: 150,editable: false,hidden:true },
        { text: 'AgentAsk', datafield: 'AgentAsk', width: 150,editable: false,hidden:true },
        { text: 'AgentBillingAddress', datafield: 'AgentBillingAddress', width: 150,editable: false,hidden:true },
        { text: 'AgentCompanyName', datafield: 'AgentCompanyName', width: 150,editable: false,hidden:true },
        { text: 'AgentContactPersonMobile', datafield: 'AgentContactPersonMobile', width: 150,editable: false,hidden:true },
        { text: 'AgentContactPersonName', datafield: 'AgentContactPersonName', width: 150,editable: false,hidden:true },
        { text: 'AgentDetails', datafield: 'AgentDetails', width: 150,editable: false,hidden:true },
        { text: 'AgentDisplaySequence', datafield: 'AgentDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'AgentEmail', datafield: 'AgentEmail', width: 150,editable: false,hidden:true },
        { text: 'AgentMobile', datafield: 'AgentMobile', width: 150,editable: false,hidden:true },
        { text: 'AgentName', datafield: 'AgentName', width: 150,editable: false,hidden:true },
        { text: 'AgentNationalID', datafield: 'AgentNationalID', width: 150,editable: false,hidden:true },
        { text: 'AgentRemark', datafield: 'AgentRemark', width: 150,editable: false,hidden:true },
        { text: 'AgentTS', datafield: 'AgentTS', width: 150,editable: false,hidden:true },
        { text: 'AgentUD', datafield: 'AgentUD', width: 150,editable: false,hidden:true },
        { text: 'AgentWebsite', datafield: 'AgentWebsite', width: 150,editable: false,hidden:true },
        { text: 'Ask', datafield: 'Ask', width: 150,editable: false,hidden:true },
        { text: 'BookingID', datafield: 'BookingID', width: 150,editable: false,hidden:true },
        { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 150,editable: false,hidden:true },
        { text: 'CBM', datafield: 'CBM', width: 150,editable: false,hidden:true },
        { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 150,editable: false,hidden:true },
        { text: 'CountryAsk', datafield: 'CountryAsk', width: 150,editable: false,hidden:true },
        { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 150,editable: false,hidden:true },
        { text: 'Diff', datafield: 'Diff', width: 150,editable: false,hidden:true },
        { text: 'Dimension', datafield: 'Dimension', width: 150,editable: false,hidden:true },
        { text: 'DisplaySequence', datafield: 'DisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'LogisticTypeAsk', datafield: 'LogisticTypeAsk', width: 150,editable: false,hidden:true },
        { text: 'NoOfContainer', datafield: 'NoOfContainer', width: 150,editable: false,hidden:true },
        { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 150,editable: false,hidden:true },
        { text: 'POAsk', datafield: 'POAsk', width: 150,editable: false,hidden:true },
        { text: 'PODisplaySequence', datafield: 'PODisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'PONo', datafield: 'PONo', width: 150,editable: false,hidden:true },
        { text: 'POReferenceNo', datafield: 'POReferenceNo', width: 150,editable: false,hidden:true },
        { text: 'PORemark', datafield: 'PORemark', width: 150,editable: false,hidden:true },
        { text: 'POShippingMark', datafield: 'POShippingMark', width: 150,editable: false,hidden:true },
        { text: 'POStatus', datafield: 'POStatus', width: 150,editable: false,hidden:true },
        { text: 'POTS', datafield: 'POTS', width: 150,editable: false,hidden:true },
        { text: 'POUD', datafield: 'POUD', width: 150,editable: false,hidden:true },
        { text: 'Remark', datafield: 'Remark', width: 150,editable: false,hidden:true },
        { text: 'SKUAsk', datafield: 'SKUAsk', width: 150,editable: false,hidden:true },
        { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 150,editable: false,hidden:true },
        { text: 'SKUDetails', datafield: 'SKUDetails', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionBase', datafield: 'SKUDimensionBase', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionHeight', datafield: 'SKUDimensionHeight', width: 150,editable: false,hidden:true },
        { text: 'SKUDimensionWidth', datafield: 'SKUDimensionWidth', width: 150,editable: false,hidden:true },
        { text: 'SKUDisplaySequence', datafield: 'SKUDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 150,editable: false,hidden:true },
        { text: 'SKUName', datafield: 'SKUName', width: 150,editable: false,hidden:true },
        { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty', width: 150,editable: false,hidden:true },
        { text: 'SKUPlanQty', datafield: 'SKUPlanQty', width: 150,editable: false,hidden:true },
        { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty', width: 150,editable: false,hidden:true },
        { text: 'SKUReference', datafield: 'SKUReference', width: 150,editable: false,hidden:true },
        { text: 'SKURemark', datafield: 'SKURemark', width: 150,editable: false,hidden:true },
        { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 150,editable: false,hidden:true },
        { text: 'SKUStatus', datafield: 'SKUStatus', width: 150,editable: false,hidden:true },
        { text: 'SKUTS', datafield: 'SKUTS', width: 150,editable: false,hidden:true },
        { text: 'SKUTruckType', datafield: 'SKUTruckType', width: 150,editable: false,hidden:true },
        { text: 'SKUUD', datafield: 'SKUUD', width: 150,editable: false,hidden:true },
        { text: 'SKUUOMAsk', datafield: 'SKUUOMAsk', width: 150,editable: false,hidden:true },
        { text: 'SKUWeight', datafield: 'SKUWeight', width: 150,editable: false,hidden:true },
        { text: 'Shipper', datafield: 'Shipper', width: 150,editable: false,hidden:true },
        { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 150,editable: false,hidden:true },
        { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 150,editable: false,hidden:true },
        { text: 'ShipperDisplaySequence', datafield: 'ShipperDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'ShipperName', datafield: 'ShipperName', width: 150,editable: false,hidden:true },
        { text: 'ShipperRemark', datafield: 'ShipperRemark', width: 150,editable: false,hidden:true },
        { text: 'ShipperStatus', datafield: 'ShipperStatus', width: 150,editable: false,hidden:true },
        { text: 'ShipperTS', datafield: 'ShipperTS', width: 150,editable: false,hidden:true },
        { text: 'ShipperUD', datafield: 'ShipperUD', width: 150,editable: false,hidden:true },
        { text: 'Signature', datafield: 'Signature', width: 150,editable: false,hidden:true },
        { text: 'SignatureDate', datafield: 'SignatureDate', width: 150,editable: false,hidden:true },
        { text: 'TS', datafield: 'TS', width: 150,editable: false,hidden:true },
        { text: 'TransactionDate', datafield: 'TransactionDate', width: 150,editable: false,hidden:true },
        { text: 'TruckAsk', datafield: 'TruckAsk', width: 150,editable: false,hidden:true },
        { text: 'TruckDisplaySequence', datafield: 'TruckDisplaySequence', width: 150,editable: false,hidden:true },
        { text: 'TruckID', datafield: 'TruckID', width: 150,editable: false,hidden:true },
        { text: 'TruckRemark', datafield: 'TruckRemark', width: 150,editable: false,hidden:true },
        { text: 'TruckStatus', datafield: 'TruckStatus', width: 150,editable: false,hidden:true },
        { text: 'TruckTS', datafield: 'TruckTS', width: 150,editable: false,hidden:true },
        { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 150,editable: false,hidden:true },
        { text: 'TruckUD', datafield: 'TruckUD', width: 150,editable: false,hidden:true },
        { text: 'UD', datafield: 'UD', width: 150,editable: false,hidden:true }, 
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
                    { name: 'AgentAddress', type: 'string' },
                  { name: 'AgentAsk', type: 'string' },
                  { name: 'AgentBillingAddress', type: 'string' },
                  { name: 'AgentCompanyName', type: 'string' },
                  { name: 'AgentContactPersonMobile', type: 'string' },
                  { name: 'AgentContactPersonName', type: 'string' },
                  { name: 'AgentDetails', type: 'string' },
                  { name: 'AgentDisplaySequence', type: 'string' },
                  { name: 'AgentEmail', type: 'string' },
                  { name: 'AgentMobile', type: 'string' },
                  { name: 'AgentName', type: 'string' },
                  { name: 'AgentNationalID', type: 'string' },
                  { name: 'AgentRemark', type: 'string' },
                  { name: 'AgentTS', type: 'string' },
                  { name: 'AgentUD', type: 'string' },
                  { name: 'AgentWebsite', type: 'string' },
                  { name: 'Ask', type: 'string' },
                  { name: 'BookingID', type: 'string' },
                  { name: 'BookingStatusAsk', type: 'string' },
                  { name: 'CBM', type: 'string' },
                  { name: 'CargoReceivedDate', type: 'string' },
                  { name: 'CountryAsk', type: 'string' },
                  { name: 'CustomIssuedDate', type: 'string' },
                  { name: 'Diff', type: 'string' },
                  { name: 'Dimension', type: 'string' },
                  { name: 'DisplaySequence', type: 'string' },
                  { name: 'LogisticTypeAsk', type: 'string' },
                  { name: 'NoOfContainer', type: 'string' },
                  { name: 'NoOfTruck', type: 'string' },
                  { name: 'POAsk', type: 'string' },
                  { name: 'PODisplaySequence', type: 'string' },
                  { name: 'PONo', type: 'string' },
                  { name: 'POReferenceNo', type: 'string' },
                  { name: 'PORemark', type: 'string' },
                  { name: 'POShippingMark', type: 'string' },
                  { name: 'POStatus', type: 'string' },
                  { name: 'POTS', type: 'string' },
                  { name: 'POUD', type: 'string' },
                  { name: 'Remark', type: 'string' },
                  { name: 'SKUAsk', type: 'string' },
                  { name: 'SKUDamageQty', type: 'string' },
                  { name: 'SKUDetails', type: 'string' },
                  { name: 'SKUDimensionBase', type: 'string' },
                  { name: 'SKUDimensionHeight', type: 'string' },
                  { name: 'SKUDimensionWidth', type: 'string' },
                  { name: 'SKUDisplaySequence', type: 'string' },
                  { name: 'SKUGoodQty', type: 'string' },
                  { name: 'SKUName', type: 'string' },
                  { name: 'SKUOverlandQty', type: 'string' },
                  { name: 'SKUPlanQty', type: 'string' },
                  { name: 'SKUReceivedQty', type: 'string' },
                  { name: 'SKUReference', type: 'string' },
                  { name: 'SKURemark', type: 'string' },
                  { name: 'SKUShortLandQty', type: 'string' },
                  { name: 'SKUStatus', type: 'string' },
                  { name: 'SKUTS', type: 'string' },
                  { name: 'SKUTruckType', type: 'string' },
                  { name: 'SKUUD', type: 'string' },
                  { name: 'SKUUOMAsk', type: 'string' },
                  { name: 'SKUWeight', type: 'string' },
                  { name: 'Shipper', type: 'string' },
                  { name: 'ShipperAsk', type: 'string' },
                  { name: 'ShipperDetails', type: 'string' },
                  { name: 'ShipperDisplaySequence', type: 'string' },
                  { name: 'ShipperName', type: 'string' },
                  { name: 'ShipperRemark', type: 'string' },
                  { name: 'ShipperStatus', type: 'string' },
                  { name: 'ShipperTS', type: 'string' },
                  { name: 'ShipperUD', type: 'string' },
                  { name: 'Signature', type: 'string' },
                  { name: 'SignatureDate', type: 'string' },
                  { name: 'TS', type: 'string' },
                  { name: 'TransactionDate', type: 'string' },
                  { name: 'TruckAsk', type: 'string' },
                  { name: 'TruckDisplaySequence', type: 'string' },
                  { name: 'TruckID', type: 'string' },
                  { name: 'TruckRemark', type: 'string' },
                  { name: 'TruckStatus', type: 'string' },
                  { name: 'TruckTS', type: 'string' },
                  { name: 'TruckTypeAsk', type: 'string' },
                  { name: 'TruckUD', type: 'string' },
                  { name: 'UD', type: 'string' }      
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
                      //display column
                      { text: 'Booking', datafield: 'BookingID', width: 150,editable: false,hidden:false },
                      { text: 'Reference', datafield: 'POReferenceNo', width: 150,editable: false,hidden:false },
                      { text: 'PO No', datafield: 'PONo', width: 150,editable: false,hidden:false },
                      { text: 'SKU', datafield: 'SKUName', width: 200,editable: false,hidden:false },
                    //   { text: 'D_L', datafield: 'SKUDimensionBase', width: 50,editable: false,hidden:false },
                    //   { text: 'D_H', datafield: 'SKUDimensionHeight',width: 50,editable: false,hidden:false },
                    //   { text: 'D_W', datafield: 'SKUDimensionWidth',width: 50,editable: false,hidden:false},                           
                      { text: 'Dimission', datafield: 'Dimension', width: 150,editable: false,hidden:false},                 
                      { text: 'Quality', datafield: 'SKUPlanQty', width: 150,editable: false,hidden:false },
                      { text: 'UOM', datafield: 'SKUUOMAsk',width: 100,editable: false,hidden:false },
                      
                      //hide column
                    //   { text: 'AgentAsk', datafield: 'AgentAsk', width: 150,editable: false,hidden:false},
                    //   { text: 'Ask', datafield: 'Ask', width: 150,editable: false,hidden:false },                   
                    //   { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 150,editable: false,hidden:false },
                    //   { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 150,editable: false,hidden:false },
                    //   { text: 'CountryAsk', datafield: 'CountryAsk', width: 150,editable: false,hidden:false },
                    //   { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 150,editable: false,hidden:false },
                    //   { text: 'NoOfContainer', datafield: 'NoOfContainer',width: 150,editable: false,hidden:false },
                    //   { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 150,editable: false,hidden:false },
                    //   { text: 'POAsk', datafield: 'POAsk', width: 150,editable: false,hidden:false },               
                    //   { text: 'PORemark', datafield: 'PORemark',width: 150,editable: false,hidden:false },
                    //   { text: 'POShippingMark', datafield: 'POShippingMark', width: 150,editable: false,hidden:false },
                    //   { text: 'POStatus', datafield: 'POStatus', width: 150,editable: false,hidden:false},
                    //   { text: 'SKUAsk', datafield: 'SKUAsk',width: 150,editable: false,hidden:false },
                    //   { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 150,editable: false,hidden:false },
                    //   { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 150,editable: false,hidden:false },
                    //   { text: 'SKUDetails', datafield: 'SKUDetails', width: 150,editable: false,hidden:false },
                    //   { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 150,editable: false,hidden:false},
                    //   { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 150,editable: false,hidden:false },                    
                    //   { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty',width: 150,editable: false,hidden:false },
                    //   { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 150,editable: false,hidden:false },                   
                    //   { text: 'SKUReceivedQty', datafield: 'SKUReceivedQty',width: 150,editable: false,hidden:false },
                    //   { text: 'SKUReference', datafield: 'SKUReference', width: 150,editable: false,hidden:false },
                    //   { text: 'SKURemark', datafield: 'SKURemark', width: 150,editable: false,hidden:false },
                    //   { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 150,editable: false,hidden:false},
                    //   { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto',width: 150,editable: false,hidden:false },
                    //   { text: 'SKUStatus', datafield: 'SKUStatus',width: 150,editable: false,hidden:false },
                    //   { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 150,editable: false,hidden:false },
                    //   { text: 'SKUTruckType', datafield: 'SKUTruckType',width: 150,editable: false,hidden:false },                    
                    //   { text: 'SKUWeight', datafield: 'SKUWeight', width: 150,editable: false,hidden:false},
                    //   { text: 'Shipper', datafield: 'Shipper',width: 150,editable: false,hidden:false },
                    //   { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 150,editable: false,hidden:false },
                    //   { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 150,editable: false,hidden:false },
                    //   { text: 'ShipperName', datafield: 'ShipperName',width: 150,editable: false,hidden:false},
                    //   { text: 'Signature', datafield: 'Signature', width: 150,editable: false,hidden:false },
                    //   { text: 'SignatureDate', datafield: 'SignatureDate',width: 150,editable: false,hidden:false},
                    //   { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 150,editable: false,hidden:false },
                    //   { text: 'TruckAsk', datafield: 'TruckAsk', width: 150,editable: false,hidden:false },
                    //   { text: 'TruckID', datafield: 'TruckID',width: 150,editable: false,hidden:false },
                    //   { text: 'TruckRemark', datafield: 'TruckRemark',width: 150,editable: false,hidden:false },
                    //   { text: 'TruckStatus', datafield: 'TruckStatus', width: 150,editable: false,hidden:false },
                    //   { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 150,editable: false,hidden:false }
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
  
  columns: any[] =
  [
     
      { text: 'Ask', datafield: 'Ask', width: 120, hidden:true },
      { text: 'Booking ID', datafield: 'BookingID', width: 120 , hidden:false }  ,
  
  
      { text: 'Agent Name', datafield: 'AgentName', width: 200 , hidden:false },
      { text: 'Shipper Name', datafield: 'ShipperName', width: 150, hidden:false  },
      { text: 'No Of Container', datafield: 'NoOfContainer', width: 120, hidden:false  }, 
      { text: 'No Of Truck', datafield: 'NoOfTruck', width: 120, hidden:false  },  
      { text: 'Total Gross Weight', datafield: 'TotalGrossW', width: 150, hidden:false  }, 
      { text: 'Total Vol:', datafield: 'TotalVol', width: 150, hidden:false  }, 
      { text: 'Country Name', datafield: 'CountryName', width: 150, hidden:false },
      { text: 'Transaction Date', datafield: 'TransactionDate', width: 120, hidden:false  }, 
      { text: 'Remark', datafield: 'Remark', width: 200, hidden:false  }, 
      { text: 'Status', datafield: 'BookingStatus', width: 150 , hidden:false} ,
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
      debugger
      //this.txtBookingID.val();
      //this.txtBookingID.valueMember
     //alert(this.cboagentcombo.selectItem.toString());
     //alert(this.cboTrstatustcombo.val());
      this.ParameterJson.UserID= this.backendservice.LoginUser;
      this.ParameterJson.Password= this.backendservice.LoginPwd;
      this.ParameterJson.ProductAsk=this.backendservice.ProductName;
      if ( this.txtBookingID.val()!="")
      {
          this.ParameterJson.BookingID= this.txtBookingID.val();
      }else{
          this.ParameterJson.BookingID= "";
      }
      if ( this.txtShipper.val()!="")
      {
          this.ParameterJson.ShipperName= this.txtShipper.val();
      }else{
          this.ParameterJson.ShipperName= "";
      }
      if ( this.txtReferenceNo.val()!="")
      {
          this.ParameterJson.POReferenceNo=  this.txtReferenceNo.val();
      }else{
          this.ParameterJson.POReferenceNo= "";
      }
      if (this.dtTransactionDate.getText()!="")
      {
          //this.ParameterJson.TransactionDate= this.dtTransactionDate.getText();
      }else{
          this.ParameterJson.TransactionDate= "";
      }
      if (this.cboagentcombo.val()!="")
      {
        //this.ParameterJson.AgentName=  this.cboagentcombo.val() ;
          //this.ParameterJson.AgentName= "Kate";// this.cboagentcombo.val() ;
          this.ParameterJson.AgentName= "20180724134131078";
      }else{
          this.ParameterJson.AgentName= "0";
      }
      if (this.cboTrstatustcombo.val()!="")
      {
          //this.ParameterJson.BookingStatus= this.cboTrstatustcombo.val();
          this.ParameterJson.BookingStatus= "1";
          this.ParameterJson.BookingStatus= "Receive";
      }else{
          this.ParameterJson.BookingStatus= "0";
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
      this.router.navigate([ {outlets: { modal: ['setplanreceiveforexport-w',rowdata.Ask,rowdata.AgentAsk] } } ]);
      //{BookingAsk: rowdata.Ask,AgentAsk: rowdata.AgentAsk} ]);
      this.HeaderGrid.disabled(false) 
      
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
  