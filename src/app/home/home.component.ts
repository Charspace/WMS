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
import { jqxBarGaugeComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxbargauge';

@Component({

   selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  @ViewChild('DashboardGrid') DashboardGrid: jqxGridComponent;
//   @ViewChild('HeaderGrid') HeaderGrid: jqxGridComponent;
  values: number[] = [5,2,8,7,9,6,10];
  //Place holder
  bookingnoplaceholder: string;
  shipperlaceholder: string;
  statusplaceholder: string;
  trdateplaceholder: string;
  agentplaceholder : any;
  ReferenceNoplaceholder:any;
  ReceivedPlaceholder:any;
  TallyPlaceholder:any;
  CheckPlaceholder:any;
  BarcodePlaceholder:any;
  AllocatePlaceholder:any;
  PickPlaceholder:any;
  DeliveryPlaceholder:any;

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
  HeaderJson = [
    {"BookingAsk":"001","BookingNo":"B00001","ShipperName":"Mr. Raymoon","AgentName":"Miss. Vinny","Status":"Received","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"002","BookingNo":"B00002","ShipperName":"Dr. Vinny","AgentName":"Mr. Raymoon","Status":"Received","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"003","BookingNo":"B00003","ShipperName":"Mr. Joshia","AgentName":"Mr. Vinny","Status":"Tally","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"004","BookingNo":"B00004","ShipperName":"Mr. Edwen Poh","AgentName":"Mr. Joshia","Status":"Tally","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"005","BookingNo":"B00005","ShipperName":"Dr. Poh","AgentName":"Mr. Edwen Poh","Status":"Checked","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"006","BookingNo":"B00006","ShipperName":"Miss. Rebecca","AgentName":"Dr. Poh","Status":"Checked","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"007","BookingNo":"B00007","ShipperName":"Miss. Swiff ","AgentName":"Miss. Rebecca","Status":"Barcode","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"008","BookingNo":"B00008","ShipperName":"Dr. Paw","AgentName":"Miss. Swiff","Status":"Barcode","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"009","BookingNo":"B00009","ShipperName":"Mr. Hnery","AgentName":"Dr. Paw","Status":"Allocate","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"010","BookingNo":"B00010","ShipperName":"Dr. Kate","AgentName":"Mr. Hnery","Status":"Allocate","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"011","BookingNo":"B00011","ShipperName":"Dr. Keleton","AgentName":"Dr. Kate","Status":"Pick","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"012","BookingNo":"B00012","ShipperName":"Mr. John","AgentName":"Dr. Keleton","Status":"Pick","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"013","BookingNo":"B00013","ShipperName":"Miss. Aye Mar","AgentName":"Mr. John","Status":"Delivery","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"014","BookingNo":"B00014","ShipperName":"Mr. Jagan","AgentName":"Miss. Aye Mar","Status":"Delivery","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"015","BookingNo":"B00015","ShipperName":"Miss. Wong","AgentName":"Mr. Jagan","Status":"Received","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"016","BookingNo":"B00016","ShipperName":"Mr. Fort","AgentName":"Miss. Wong","Status":"Received","TransactionDate":"12/7/2018","Remark":"VIP"}
  ,{"BookingAsk":"017","BookingNo":"B00017","ShipperName":"Dr. Bele","AgentName":"Mr. Fort","Status":"Received","TransactionDate":"12/7/2018","Remark":"VIP"}]
  DetailJson = [{"BookingAsk":"001","DocNo":"DOC-20180712001","ShippingMark":"A123/5","SKUDetail":"Refined Salt","D_W":"20","D_D":"20","D_L":"20","ReceivedQTY":"250","UOM":"Bag","TotalCBM":"8","Remark":"with low qty"}
  ,{"BookingAsk":"001","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"002","DocNo":"DOC-20180712001","ShippingMark":"A123/5","SKUDetail":"Refined Salt","D_W":"20","D_D":"20","D_L":"20","ReceivedQTY":"250","UOM":"Bag","TotalCBM":"8","Remark":"with low qty"}
  ,{"BookingAsk":"002","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"003","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"003","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"004","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"004","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"005","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"005","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"006","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"006","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"007","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"007","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"008","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"008","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"009","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"009","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"010","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"010","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"010","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"011","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"011","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"012","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"012","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"013","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"013","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"014","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"014","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"015","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"015","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"016","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"016","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"017","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"017","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}
  ,{"BookingAsk":"002","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}];
     
  DetailSource2: any;
  DetailAdapter2 : any;
  detailcolumns2:any;
            
           
  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  {  
    this.bindPlaceholder();
    this.CreateGrid();       
  }  
  bindPlaceholder()
  {
    this.bookingnoplaceholder = "Booking No";
    this.shipperlaceholder = 'Shipper Name'
    this.agentplaceholder = "Agent Name"
    this.statusplaceholder = "Status";
    this.trdateplaceholder = "Transactoin Date";
    this.ReferenceNoplaceholder="Reference No";    
    this.ReceivedPlaceholder="Received -"+" 5";
    this.TallyPlaceholder="Tally -"+" 2";
    this.CheckPlaceholder="Checked -"+" 8";
    this.BarcodePlaceholder="Barcode -"+" 7";
    this.AllocatePlaceholder="Allocate -"+" 9";
    this.PickPlaceholder="Pick List -"+" 6";
    this.DeliveryPlaceholder="Delivery -"+" 10";
  }
  CreateGrid()
  {this.HeaderSource  =
    {

        datafields: [
            { name: 'BookingAsk', type: 'string', resizable: false },
            { name: 'BookingNo', type: 'string' , resizable: false},
            { name: 'ShipperName' , type: 'string' , resizable: false},
            { name: 'AgentName' , type: 'string' , resizable: true},
            { name: 'Status' , type: 'string', resizable: true },
            { name: 'TransactionDate'  , type: 'string', resizable: true } , 
            { name: 'Remark'  , type: 'string' , resizable: true}     
        ],
        localdata: this.HeaderJson, 
        root: 'Header',
        //record: 'Header',       
        id: 'BookingAsk',  
        datatype: 'json', 
    };
    this.HeaderAdapter = new jqx.dataAdapter(this.HeaderSource);  
    this.headercolumns =
    [
        
        { text: 'Booking No', datafield: 'BookingNo', width: 120, resizable: false },
        { text: 'Shipper Name', datafield: 'ShipperName', width: 250 , resizable: false },
        { text: 'Agent Name', datafield: 'AgentName', width: 250, resizable: false }  ,
        { text: 'Status', datafield: 'Status', width: 120, resizable: true }   ,
        { text: 'Transaction Date', datafield: 'TransactionDate', width: 250, resizable: true }  ,
        { text: 'Remark', datafield: 'Remark', width: 200, resizable: true },
        { text: 'BookingAsk', datafield: 'BookingAsk', width: 120, resizable: true  },         
    ];    
    this.DetailSource =
    {     
        datafields: [
            { name: 'BookingAsk', type: 'string'  },
            { name: 'DocNo', type: 'string' },
            { name: 'ShippingMark', type: 'string' },
            { name: 'SKUDetail', type: 'string' },
            { name: 'D_W', type: 'string' },
            { name: 'D_D', type: 'string' },
            { name: 'D_L', type: 'string' },
            { name: 'ReceivedQTY', type: 'string' },
            { name: 'UOM', type: 'string' },
            { name: 'TotalCBM', type: 'string' },
            { name: 'Remark', type: 'string' }             
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json',         
    };
    this.DetailAdapter = new jqx.dataAdapter(this.DetailSource, { autoBind: true });
    this.detailcolumns =
    [
      { text: 'BookingAsk', datafield: 'BookingAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Doc No', datafield: 'DocNo', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Shipping Mark', datafield: 'ShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'SKU Detail', datafield: 'SKUDetail', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Width', datafield: 'D_W', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Heigh', datafield: 'D_D', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Length', datafield: 'D_L', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Received QTY', datafield: 'ReceivedQTY', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'UOM', datafield: 'UOM', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Total CBM', datafield: 'TotalCBM', width: '10%',editable: false,hidden:false }, //readonly cell. 
      { text: 'Remark', datafield: 'TotalCBM', width: '10%',editable: false,hidden:false }, //readonly cell.               
    ]    

    this.DetailSource2 =
    {

        datafields: [
            { name: 'BookingAsk', type: 'string' },
            { name: 'DocNo', type: 'string' },
            { name: 'ShippingMark', type: 'string' },
            { name: 'SKUDetail', type: 'string' },
            { name: 'D_W', type: 'string' },
            { name: 'D_D', type: 'string' },
            { name: 'D_L', type: 'string' },
            { name: 'ReceivedQTY', type: 'string' },
            { name: 'UOM', type: 'string' },
            { name: 'TotalCBM', type: 'string' },
            { name: 'Remark', type: 'string' }             
        ],
        localdata: this.DetailJson,
        root: 'Details',
        //record: 'Detail',      
        datatype: 'json', 

    }

    this.DetailAdapter2 = new jqx.dataAdapter(this.DetailSource2, { autoBind: true });

    this.detailcolumns2 =
    [
      { text: 'BookingAsk', datafield: 'BookingAsk', width: '50%',editable: false,hidden:false,  resizable: true }, //readonly cell.
      { text: 'Doc No', datafield: 'DocNo', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Shipping Mark', datafield: 'ShippingMark', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'SKU Detail', datafield: 'SKUDetail', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Width', datafield: 'D_W', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Heigh', datafield: 'D_D', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Dimission_Length', datafield: 'D_L', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Received QTY', datafield: 'ReceivedQTY', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'UOM', datafield: 'UOM', width: '50%',editable: false,hidden:false }, //readonly cell.
      { text: 'Total CBM', datafield: 'TotalCBM', width: '50%',editable: false,hidden:false }, //readonly cell. 
      { text: 'Remark', datafield: 'TotalCBM', width: '50%',editable: false,hidden:false }, //readonly cell.               
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
              let result = filter.evaluate(Details[i]['BookingAsk']);
              if (result)
              Detailsbyid.push(Details[i]);
          }
          let detailSource = {
              datafields: [
                { name: 'BookingAsk', type: 'string' },
                { name: 'DocNo', type: 'string' },
                { name: 'ShippingMark', type: 'string' },
                { name: 'SKUDetail', type: 'string' },
                { name: 'D_W', type: 'string' },
                { name: 'D_D', type: 'string' },
                { name: 'D_L', type: 'string' },
                { name: 'ReceivedQTY', type: 'string' },
                { name: 'UOM', type: 'string' },
                { name: 'TotalCBM', type: 'string' },
                { name: 'Remark', type: 'string' },   
              ],
              id: 'DocNo',
              localdata: Detailsbyid
          }
          let nestedGridAdapter = new jqx.dataAdapter(detailSource);
          if (nestedGridContainer != null) {  
              let settings = {
                  width: 780,
                  height: 200,
                  source: nestedGridAdapter, 
                  columns: [
                    //{ text: 'BookingAsk', datafield: 'BookingAsk', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Doc No', datafield: 'DocNo', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Shipping Mark', datafield: 'ShippingMark', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'SKU Detail', datafield: 'SKUDetail', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Dimission_Width', datafield: 'D_W', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Dimission_Heigh', datafield: 'D_D', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Dimission_Length', datafield: 'D_L', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Received QTY', datafield: 'ReceivedQTY', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'UOM', datafield: 'UOM', width: '10%',editable: false,hidden:false }, //readonly cell.
                    { text: 'Total CBM', datafield: 'TotalCBM', width: '10%',editable: false,hidden:false }, //readonly cell. 
                    { text: 'Remark', datafield: 'Remark', width: '10%',editable: false,hidden:false }, //readonly cell.  
                  ]
              };  
              jqwidgets.createInstance(`#${nestedGridContainer.id}`, 'jqxGrid', settings);
          }
      }      
  };
  ngOnInit() {    
}


photoRenderer = (row: number, column: any, value: string): string => {
    let name = this.DashboardGrid.getrowdata(row).FirstName;
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
    this.DashboardGrid.showrowdetails(1);
};

columns: any[] =
[
    //{ text: 'BookingAsk', datafield: 'BookingAsk', width: 120 },
    { text: 'Booking No', datafield: 'BookingNo', width: 120, resizable: false },
    { text: 'Shipper Name', datafield: 'ShipperName', width: 200, resizable: false },
    { text: 'Agent Name', datafield: 'AgentName', width: 200, resizable: false }  ,
    { text: 'Status', datafield: 'Status', width: 120 , resizable: true}   ,
    { text: 'Transaction Date', datafield: 'TransactionDate', width: 150, resizable: true } , 
    { text: 'Remark', datafield: 'Remark', width: 200 , resizable: true}         
]; 
btnNewReceive()
{  
    this.router.navigate(['setplanreceiveforexport-w']);
}
TallyCount()
{  
    this.router.navigate(['settallycheckforexport-w']);
}
Checker()
{  
    this.router.navigate(['setcheckerforexport-w']);
}
Barcode()
{  
    this.router.navigate(['setbarcodemappingforexport-w']);
}
Allocate()
{  
    this.router.navigate(['setallocationforexport-w']);
}
PickList()
{  
    this.router.navigate(['setpicklistforexport-w']);
}
Delivery()
{  
    this.router.navigate(['setdeliverforexport-w']);
}
Delete()
{  
    this.router.navigate(['']);
}
Preview()
{  
    this.router.navigate(['']);
}
GenearateExcel()
{  
    this.router.navigate(['']);
}
}

