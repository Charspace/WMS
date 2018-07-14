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
  HeaderJson :any;
  DetailJson :any
   
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

              //HeaderJson = '[{"BookingAsk":"001","BookingNo":"B00001","ShipperName":"Mr. Raymoon","AgentName":"Miss. Vinny","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"},{"BookingAsk":"002","BookingNo":"B00002","ShipperName":"Dr. Boon","AgentName":"Mr. Thura","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"}]'
  //DetailJson = '[{"BookingAsk":"001","DocNo":"DOC-20180712001","ShippingMark":"A123/5","SKUDetail":"Refined Salt","D_W":"20","D_W":"20","D_D":"20","D_L":"20","ReceivedQTY":"250","UOM":"Bag","TotalCBM":"8","Remark":"with low qty"},{"BookingAsk":"002","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}]';


            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;

           // this.HeaderJson = '[{"BookingAsk":"001","BookingNo":"B00001","ShipperName":"Mr. Raymoon","AgentName":"Miss. Vinny","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"},{"BookingAsk":"002","BookingNo":"B00002","ShipperName":"Dr. Boon","AgentName":"Mr. Thura","Status":"Plan Received","TransactionDate":"12/7/2018","Remark":"VIP"}]'
           // this.DetailJson = '[{"BookingAsk":"001","DocNo":"DOC-20180712001","ShippingMark":"A123/5","SKUDetail":"Refined Salt","D_W":"20","D_W":"20","D_D":"20","D_L":"20","ReceivedQTY":"250","UOM":"Bag","TotalCBM":"8","Remark":"with low qty"},{"BookingAsk":"002","DocNo":"DOC-20180712002","ShippingMark":"AA/254","SKUDetail":"Chlorinator","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"50","UOM":"PCs","TotalCBM":"434","Remark":"remark"}]';

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
            { name: 'BookingAsk', type: 'string' },
            { name: 'BookingNo', type: 'string' },
            { name: 'ShipperName' , type: 'string' },
            { name: 'AgentName' , type: 'string' },
            { name: 'Status' , type: 'string' },
            { name: 'TransactionDate'  , type: 'string' } , 
            { name: 'Remark'  , type: 'string' }     
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
        
        { text: 'Booking No', datafield: 'BookingNo', width: 120 },
        { text: 'Shipper Name', datafield: 'ShipperName', width: 120 },
        { text: 'Agent Name', datafield: 'AgentName', width: 120 }  ,
        { text: 'Status', datafield: 'Status', width: 120 }   ,
        { text: 'Transaction Date', datafield: 'TransactionDate', width: 250 }  ,
        { text: 'Remark', datafield: 'Remark', width: 150 },
        { text: 'BookingAsk', datafield: 'BookingAsk', width: 120,  },         
    ];    
    this.DetailSource =
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
    //{ text: 'BookingAsk', datafield: 'BookingAsk', width: 120 },
    { text: 'Booking No', datafield: 'BookingNo', width: 120 },
    { text: 'Shipper Name', datafield: 'ShipperName', width: 120 },
    { text: 'Agent Name', datafield: 'AgentName', width: 120 }  ,
    { text: 'Status', datafield: 'Status', width: 120 }   ,
    { text: 'Transaction Date', datafield: 'TransactionDate', width: 150 } , 
    { text: 'Remark', datafield: 'Remark', width: 200 }         
]; 
btnNew()
{  
    this.router.navigate(['setplanreceiveforexport-w']);
}
btnSubmit()
{   
    //this.router.navigate(['setplanreceiveforexport-w']);
}


}
