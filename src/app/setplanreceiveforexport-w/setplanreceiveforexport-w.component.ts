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

@Component({
  selector: 'app-setplanreceiveforexport-w',
  templateUrl: './setplanreceiveforexport-w.component.html',
  styleUrls: ['./setplanreceiveforexport-w.component.css']
})
export class SetplanreceiveforexportWComponent implements OnInit {
  @ViewChild('shipperGrid') shipperGrid: jqxGridComponent;
  @ViewChild('truckGrid') truckGrid: jqxGridComponent;
  @ViewChild('poGrid') poGrid: jqxGridComponent;
  @ViewChild('skuGrid') skuGrid: jqxGridComponent;
  

  @ViewChild('agentcombo') agentcombo: jqxComboBoxComponent;

  @ViewChild('countrycombo') countrycombo: jqxComboBoxComponent;

  @ViewChild('cargoreceiveddate') cargoreceiveddate: jqxDateTimeInputComponent;
  @ViewChild('transactiondate') transactiondate: jqxDateTimeInputComponent;
  @ViewChild('customerissueddate') customerissueddate: jqxDateTimeInputComponent;
  
  


  source: any;
  dataAdapter: any;
  columns : any=[];

  dataFields2 : any = [];
  source2 : any = [];
  dataAdapter2 : any;
  columns2 : any = [];

  dataFields3 : any = [];
  source3 : any = [];
  dataAdapter3 : any;
  columns3 : any = [];

  dataFields4 : any = [];
  source4 : any = [];
  dataAdapter4 : any;
  columns4 : any = [];


  // book textbox
  bookingid : any;

  //nooftrack textbox
  nooftrack : any;

  //noofcontainer textbox
  noofcontainer : any;

  //remark textbox
  remark : any;

  //agentcombo
  agentcombo_Adapter : any;  
  AgentList : any = [];
  agentsource : any = [];

  //countrycombo
  countrycombo_Adapter : any;
  countrycombodisable : any;
  CountryList : any = [];
  countrysource : any = [];

  //cargoreceiveddate
  cargoreceiveddatevalue : any;

  //customerissueddate
  customerissueddatevalue : any;

  //transactiondatevalue
  transactiondatevalue : any;

  //place holder
  remarkplaceholder : any;
  nooftrackplaceholder : any;
  noofcontainerplaceholder : any;
  bookidplaceholder : any = "";  
  agentplaceholder : any;
  countryplaceholder : any;

  localization: any = getLocalization('en'); 
  

  

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 

    this.bookidplaceholder = "BookID";
    this.agentplaceholder = 'Agent'
    this.countryplaceholder = "Country"
    this.nooftrackplaceholder = "NoOfTruck";
    this.noofcontainerplaceholder = "NoOfContainer";
    this.remarkplaceholder = "Remark";

    this.CreateGrid();

    
  }

  ngOnInit() {
  }

  onAgentComboChange(event)
  {

  }

  onCountryComboChange(event)
  {

  }

  onCargoReceivedDatechange(event)
  {

  }

  onCustomerIssueddate(event)
  {

  }

  onTransactionDateChange(event)
{

}

onremarkchange(event)
{

}

CreateGrid()
{
  this.source  =
  {
      datafields: [
          { name: 'BookingAsk' },
          { name: 'ShipperAsk' },
          { name: 'ShipperDetails' },
          { name: 'ShipperDisplaySequence' },
          { name: 'ShipperName' },
          { name: 'ShipperRemark' },
          { name: 'ShipperStatus' }
      ],
      localdata:
      [

      ]
  }

  this.dataAdapter = new jqx.dataAdapter(this.source);

  this.columns =
  [
      { text: 'Shipper Name', datafield: 'ShipperName', width: 250 },
      { text: 'Shipper Details', datafield: 'ShipperDetails', width: 150 },
      { text: 'Remark', datafield: 'ShipperRemark', width: 180 }    
  ];

  this.dataFields2 =
  [
      { name: 'BookingAsk' },
      { name: 'ShipperAsk' },
      { name: 'TruckAsk' },
      { name: 'TruckDisplaySequence' },
      { name: 'TruckID' },
      { name: 'TruckRemark' },
      { name: 'TruckStatus' },
      { name: 'TruckTypeAsk' },
      { name: 'Tracktype' },
      { name: 'weight' },
      { name: 'cm' }
  ];

  this.source2 =
  {
      datafields: this.dataFields2,
      localdata:
      [
          
      ]
  }

  this.dataAdapter2 = new jqx.dataAdapter(this.source2, { autoBind: true } );

  this.columns2 = 
  [
      { text: 'Track ID', datafield: 'TruckID', width: 100 },
      { text: 'Track Type', datafield: 'TrackType', width: 100 },
      { text: 'weight', datafield: 'weight', width: 100 },
      { text: 'cm', datafield: 'cm', width: 100 },
      { text: 'Remark', datafield: 'TruckRemark', width: 150 }
 
  ];

  this.dataFields3 =
  [
      { name: 'BookingAsk' },
      { name: 'POAsk' },
      { name: 'PODisplaySequence' },
      { name: 'PONo', },
      { name: 'POReferenceNo', },
      { name: 'PORemark' },
      { name: 'POShippingMark' },
      { name: 'POStatus' },
      { name: 'ShipperAsk' },
      { name: 'TruckAsk' }
  ];

  this.source3 =
  {
      datafields: this.dataFields3,
      localdata:
      [
         
      ]
  }

  this.dataAdapter3 = new jqx.dataAdapter(this.source3, { autoBind: true } );

  this.columns3 = 
  [
      { text: 'PO No', datafield: 'PONo', width: 100 },
      { text: 'Shiping Mark ', datafield: 'POShippingMark', width: 100 },
      { text: 'Reference No', datafield: 'POReferenceNo',  width: 150 },
      { text: 'Remark', datafield: 'PORemark', width: 150 }      
  ];

  this.dataFields4 =
  [
      { name: 'BookingAsk'  },
      { name: 'POAsk',type: 'string' },
      { name: 'SKUAsk',type: 'string' },
      { name: 'SKUDamageQty',type: 'number' },
      { name: 'SKUDamagephoto',type: 'string' },
      { name: 'SKUDetails',type: 'string'},
      { name: 'SKUDimensionBase',type: 'number' },
      { name: 'SKUDimensionHeight',type: 'number' },
      { name: 'SKUDimensionWidth',type: 'number' },
      { name: 'SKUDisplaySequence',type: 'string' },
      { name: 'SKUGoodQty',type: 'number' },
      { name: 'SKUGoodphoto',type: 'string' },
      { name: 'SKUName',type: 'string' },
      { name: 'SKUOverlandQty',type: 'number' },
      { name: 'SKUOverlandphoto',type: 'string' },
      { name: 'SKUPlanQty',type: 'number' },
      { name: 'SKUReceivedQty',type: 'number' },
      { name: 'SKUReference',type: 'string' },
      { name: 'SKURemark',type: 'string' },
      { name: 'SKUShortLandQty',type: 'number' },
      { name: 'SKUShortLandphoto',type: 'string' },
      { name: 'SKUStatus',type: 'string' },
      { name: 'SKUTruckID',type: 'string' },
      { name: 'SKUTruckType',type: 'string' },
      { name: 'SKUUOMAsk',type: 'string' },
      { name: 'SKUTruckType',type: 'string' },
      { name: 'SKUWeight',type: 'number' },
      { name: 'ShipperAsk',type: 'string' },
      { name: 'TruckAsk',type: 'string' },
      {name:'UOM',type: 'string'}
  ];

  this.source4 =
  {
      datafields: this.dataFields4,
      localdata:
      [
          
      ]
  }

  this.dataAdapter4 = new jqx.dataAdapter(this.source4, { autoBind: true } );

  this.columns4 = 
  [
      { text: 'SKU Name', datafield: 'SKUName'},      
      { text: 'Dimension Width', datafield: 'SKUDimensionWidth', cellsformat: 'd2' },

      { text: 'Dimension Height', datafield: 'SKUDimensionHeight', cellsformat: 'd2' },
      { text: 'Dimension Base', datafield: 'SKUDimensionBase', cellsformat: 'd2' },
      { text: 'Plan Qty', datafield: 'SKUPlanQty', cellsformat: 'd2' },
      { text: 'UOM', datafield: 'UOM' },
      { text: 'Remark', datafield: 'SKURemark' }    
  ];

}

  BindGrid()
  {
    this.source  =
    {
        datafields: [
            { name: 'CustomerID' },
            { name: 'CompanyName' },
            { name: 'ContactName' },
            { name: 'ContactTitle' },
            { name: 'Address' },
            { name: 'City' },
            { name: 'Country' }
        ],
        localdata:
        [
            { 'CustomerID': 'AAA', 'CompanyName': 'Alfreds Futterkiste', 'ContactName': 'Maria Anders', 'ContactTitle': 'Sales Representative', 'City': 'Berlin', 'Country': 'Germany' },
            { 'CustomerID': 'BBB', 'CompanyName': 'Trujillo Emparedados', 'ContactName': 'Gerry Trujillo', 'ContactTitle': 'Owner', 'City': 'Paris', 'Country': 'France' },
            { 'CustomerID': 'CCC', 'CompanyName': 'Moreno Taquera', 'ContactName': 'Antonio Moreno', 'ContactTitle': 'Manager', 'City': 'Mxico D.F.', 'Country': 'Mexico' }
        ]
    }

    this.dataAdapter = new jqx.dataAdapter(this.source);

    this.columns =
    [
        { text: 'Company Name', datafield: 'CompanyName', width: 250 },
        { text: 'Contact Name', datafield: 'ContactName', width: 150 },
        { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
        { text: 'City', datafield: 'City', width: 120 },
        { text: 'Country', datafield: 'Country' }
    ];

    this.dataFields2 =
    [
        { name: 'CustomerID' },
        { name: 'OrderID' },
        { name: 'OrderDate', type: 'date' },
        { name: 'ShippedDate', type: 'date' },
        { name: 'ShipName' },
        { name: 'ShipCountry' }
    ];

    this.source2 =
    {
        datafields: this.dataFields2,
        localdata:
        [
            { 'OrderID': 10248, 'CustomerID': 'AAA', 'OrderDate': '1996-07-04 00:00:00', 'ShippedDate': '1996-07-16 00:00:00', 'ShipName': 'Vins et alcools Chevalier' },
            { 'OrderID': 10249, 'CustomerID': 'AAA', 'OrderDate': '1996-07-05 00:00:00', 'ShippedDate': '1996-07-17 00:00:00', 'ShipName': 'Toms Spezialitten' },
            { 'OrderID': 10250, 'CustomerID': 'AAA', 'OrderDate': '1996-07-06 00:00:00', 'ShippedDate': '1996-07-18 00:00:00', 'ShipName': 'Hanari Carnes' },
            { 'OrderID': 10251, 'CustomerID': 'BBB', 'OrderDate': '1996-07-07 00:00:00', 'ShippedDate': '1996-07-19 00:00:00', 'ShipName': 'Lady Of Seas' },
            { 'OrderID': 10252, 'CustomerID': 'BBB', 'OrderDate': '1996-07-08 00:00:00', 'ShippedDate': '1996-07-20 00:00:00', 'ShipName': 'Queen Victoria' },
            { 'OrderID': 10253, 'CustomerID': 'BBB', 'OrderDate': '1996-07-09 00:00:00', 'ShippedDate': '1996-07-21 00:00:00', 'ShipName': 'Poseidon' },
            { 'OrderID': 10254, 'CustomerID': 'CCC', 'OrderDate': '1996-07-10 00:00:00', 'ShippedDate': '1996-07-22 00:00:00', 'ShipName': 'Wreckno' },
            { 'OrderID': 10255, 'CustomerID': 'CCC', 'OrderDate': '1996-07-11 00:00:00', 'ShippedDate': '1996-07-23 00:00:00', 'ShipName': 'Flash' },
            { 'OrderID': 10256, 'CustomerID': 'CCC', 'OrderDate': '1996-07-12 00:00:00', 'ShippedDate': '1996-07-24 00:00:00', 'ShipName': 'Titan' }
        ]
    }

    this.dataAdapter2 = new jqx.dataAdapter(this.source2, { autoBind: true } );

    this.columns2 = 
    [
        { text: 'CustomerID', datafield: 'CustomerID', width: 100 },        
        { text: 'OrderID', datafield: 'OrderID', width: 100 },
        { text: 'OrderDetailID', datafield: 'OrderDetailID', width: 100 },
        { text: 'OrderDetailDetailID', datafield: 'OrderDetailDetailID', width: 100 },
        { text: 'OrderDate', datafield: 'OrderDate', cellsformat: 'd', width: 150 },
        { text: 'Shipped Date', datafield: 'ShippedDate', cellsformat: 'd', width: 150 },
        { text: 'Ship Name', datafield: 'ShipName' }
    ];

    this.dataFields3 =
    [
        { name: 'CustomerID' },
        { name: 'OrderID' },
        { name: 'OrderDetailID' },
        { name: 'OrderDate', type: 'date' },
        { name: 'ShippedDate', type: 'date' },
        { name: 'ShipName' },
        { name: 'ShipCountry' }
    ];

    this.source3 =
    {
        datafields: this.dataFields3,
        localdata:
        [
            { 'OrderID': 10248,'OrderDetailID': 10248, 'CustomerID': 'AAA', 'OrderDate': '1996-07-04 00:00:00', 'ShippedDate': '1996-07-16 00:00:00', 'ShipName': 'Vins et alcools Chevalier' },
            { 'OrderID': 10249,'OrderDetailID': 10249, 'CustomerID': 'AAA', 'OrderDate': '1996-07-05 00:00:00', 'ShippedDate': '1996-07-17 00:00:00', 'ShipName': 'Toms Spezialitten' },
            { 'OrderID': 10250,'OrderDetailID': 10250, 'CustomerID': 'AAA', 'OrderDate': '1996-07-06 00:00:00', 'ShippedDate': '1996-07-18 00:00:00', 'ShipName': 'Hanari Carnes' },
            { 'OrderID': 10251,'OrderDetailID': 10251, 'CustomerID': 'BBB', 'OrderDate': '1996-07-07 00:00:00', 'ShippedDate': '1996-07-19 00:00:00', 'ShipName': 'Lady Of Seas' },
            { 'OrderID': 10252,'OrderDetailID': 10252, 'CustomerID': 'BBB', 'OrderDate': '1996-07-08 00:00:00', 'ShippedDate': '1996-07-20 00:00:00', 'ShipName': 'Queen Victoria' },
            { 'OrderID': 10253,'OrderDetailID': 10253, 'CustomerID': 'BBB', 'OrderDate': '1996-07-09 00:00:00', 'ShippedDate': '1996-07-21 00:00:00', 'ShipName': 'Poseidon' },
            { 'OrderID': 10254,'OrderDetailID': 10254, 'CustomerID': 'CCC', 'OrderDate': '1996-07-10 00:00:00', 'ShippedDate': '1996-07-22 00:00:00', 'ShipName': 'Wreckno' },
            { 'OrderID': 10255,'OrderDetailID': 10255, 'CustomerID': 'CCC', 'OrderDate': '1996-07-11 00:00:00', 'ShippedDate': '1996-07-23 00:00:00', 'ShipName': 'Flash' },
            { 'OrderID': 10256,'OrderDetailID': 10256, 'CustomerID': 'CCC', 'OrderDate': '1996-07-12 00:00:00', 'ShippedDate': '1996-07-24 00:00:00', 'ShipName': 'Titan' }
        ]
    }

    this.dataAdapter3 = new jqx.dataAdapter(this.source3, { autoBind: true } );

    this.columns3 = 
    [
        { text: 'OrderID', datafield: 'OrderID', width: 100 },
        { text: 'OrderDetailID', datafield: 'OrderDetailID', width: 100 },
        { text: 'OrderDate', datafield: 'OrderDate', cellsformat: 'd', width: 150 },
        { text: 'Shipped Date', datafield: 'ShippedDate', cellsformat: 'd', width: 150 },
        { text: 'Ship Name', datafield: 'ShipName' }
    ];

    this.dataFields4 =
    [
        { name: 'CustomerID' },
        { name: 'OrderID' },
        { name: 'OrderDetailID' },
        { name: 'OrderDetailDetailID' },
        { name: 'OrderDate', type: 'date' },
        { name: 'ShippedDate', type: 'date' },
        { name: 'ShipName' },
        { name: 'ShipCountry' }
    ];

    this.source4 =
    {
        datafields: this.dataFields4,
        localdata:
        [
            { 'OrderID': 10248,'OrderDetailID': 10248,'OrderDetailDetailID': 10248, 'CustomerID': 'AAA', 'OrderDate': '1996-07-04 00:00:00', 'ShippedDate': '1996-07-16 00:00:00', 'ShipName': 'Vins et alcools Chevalier' },
            { 'OrderID': 10249,'OrderDetailID': 10249,'OrderDetailDetailID': 10248, 'CustomerID': 'AAA', 'OrderDate': '1996-07-05 00:00:00', 'ShippedDate': '1996-07-17 00:00:00', 'ShipName': 'Toms Spezialitten' },
            { 'OrderID': 10250,'OrderDetailID': 10250,'OrderDetailDetailID': 10248, 'CustomerID': 'AAA', 'OrderDate': '1996-07-06 00:00:00', 'ShippedDate': '1996-07-18 00:00:00', 'ShipName': 'Hanari Carnes' },
            { 'OrderID': 10251,'OrderDetailID': 10251,'OrderDetailDetailID': 10248, 'CustomerID': 'BBB', 'OrderDate': '1996-07-07 00:00:00', 'ShippedDate': '1996-07-19 00:00:00', 'ShipName': 'Lady Of Seas' },
            { 'OrderID': 10252,'OrderDetailID': 10252,'OrderDetailDetailID': 10248, 'CustomerID': 'BBB', 'OrderDate': '1996-07-08 00:00:00', 'ShippedDate': '1996-07-20 00:00:00', 'ShipName': 'Queen Victoria' },
            { 'OrderID': 10253,'OrderDetailID': 10253,'OrderDetailDetailID': 10248, 'CustomerID': 'BBB', 'OrderDate': '1996-07-09 00:00:00', 'ShippedDate': '1996-07-21 00:00:00', 'ShipName': 'Poseidon' },
            { 'OrderID': 10254,'OrderDetailID': 10254,'OrderDetailDetailID': 10248, 'CustomerID': 'CCC', 'OrderDate': '1996-07-10 00:00:00', 'ShippedDate': '1996-07-22 00:00:00', 'ShipName': 'Wreckno' },
            { 'OrderID': 10255,'OrderDetailID': 10255,'OrderDetailDetailID': 10248, 'CustomerID': 'CCC', 'OrderDate': '1996-07-11 00:00:00', 'ShippedDate': '1996-07-23 00:00:00', 'ShipName': 'Flash' },
            { 'OrderID': 10256,'OrderDetailID': 10256,'OrderDetailDetailID': 10248, 'CustomerID': 'CCC', 'OrderDate': '1996-07-12 00:00:00', 'ShippedDate': '1996-07-24 00:00:00', 'ShipName': 'Titan' }
        ]
    }

    this.dataAdapter4 = new jqx.dataAdapter(this.source4, { autoBind: true } );

    this.columns4 = 
    [
        { text: 'OrderID', datafield: 'OrderID', width: 100 },
        { text: 'OrderDetailID', datafield: 'OrderDetailID', width: 100 },
        { text: 'OrderDetailDetailID', datafield: 'OrderDetailID', width: 100 },
        { text: 'OrderDate', datafield: 'OrderDate', cellsformat: 'd', width: 150 },
        { text: 'Shipped Date', datafield: 'ShippedDate', cellsformat: 'd', width: 150 },
        { text: 'Ship Name', datafield: 'ShipName' }
    ];

  }

  btnSave()
  {
      var Bookinglist = [];
      var Shipperlist = [];
      var Trucklist = [];
      var SKUlist = [];

      var shipperselectedrowindex  = this.shipperGrid.getselectedrowindex();     
      var shipperrowdata = this.shipperGrid.getrowdata(shipperselectedrowindex);      
      var selectedshippergridarray  = [];
     
        selectedshippergridarray.push({'Ask':'0'});
        selectedshippergridarray.push({'ShipperName':shipperrowdata.ShipperName});
        selectedshippergridarray.push({'ShipperDetails':shipperrowdata.ShipperDetails});
            
      let  shipperselectedjson = JSON.stringify(selectedshippergridarray);      

      var truckselectedrowindex  = this.truckGrid.getselectedrowindex();     
      var truckrowdata = this.truckGrid.getrowdata(truckselectedrowindex);      
      var selectedtruckgridarray  = [];

      
      
        selectedtruckgridarray.push({'Ask':'0'})
        selectedtruckgridarray.push({'TruckID':truckrowdata.TruckID})
        selectedtruckgridarray.push({'TruckTypeAsk':truckrowdata.TruckTypeAsk})            
      


      let  truckselectedjson = JSON.stringify(selectedtruckgridarray);
      //truckselectedjson = "["+truckselectedjson+"]";

      var poselectedrowindex  = this.poGrid.getselectedrowindex();     
      var porowdata = this.poGrid.getrowdata(poselectedrowindex);      
      var selectedpogridarray = []

      
      
        selectedpogridarray.push({'Ask':'0'})
        selectedpogridarray.push({'PONo':porowdata.PONo})
        selectedpogridarray.push({'ShippingMark':porowdata.POShippingMark})            
        selectedpogridarray.push({'ReferenceNo':porowdata.POReferenceNo})         
      
      let  poselectedjson = JSON.stringify(selectedpogridarray);
      //poselectedjson = "["+poselectedjson+"]";

      


      
      let shippergridarray = [];
      shippergridarray = this.shipperGrid.getrows();     
      var selectedshippergridid = this.shipperGrid.getselectedrowindex();
      shippergridarray.splice(selectedshippergridid,1);

      let shipperarray = [];
      for(let i=0; i < shippergridarray.length;i++)
      {
        shipperarray.push({'Ask':'0','ShipperName':shippergridarray[i].ShipperName,'ShipperDetails':shippergridarray[i].ShipperDetails});       
      }
       let shippergridjson = JSON.stringify(shipperarray);

      let truckgridarray = [];
      truckgridarray = this.truckGrid.getrows();    

      var selectedtruckgridid = this.truckGrid.getselectedrowindex();
      truckgridarray.splice(selectedtruckgridid,1);

      let truckarray = []; 
      for(let i=0; i < truckgridarray.length;i++)
      {
            truckarray.push({'Ask':'0','TruckID':truckgridarray[i].TruckID,'TruckTypeAsk':truckgridarray[i].TruckTypeAsk})                 
      }
      let truckgridjson = JSON.stringify(truckarray);

      let pogridarray = [];
      pogridarray = this.poGrid.getrows();   
      var selectedpogridid = this.poGrid.getselectedrowindex();
      pogridarray.splice(selectedpogridid,1);
      
      let poarray = []; 
      for(let i=0; i < truckgridarray.length;i++)
      {
        poarray.push({'Ask':'0','PONo':pogridarray[i].PONo,'ShippingMark':pogridarray[i].POShippingMark,'ReferenceNo':pogridarray[i].POReferenceNo})          
      }
      let pogridjson = JSON.stringify(poarray);

      let skugridarray = [];
      skugridarray = this.skuGrid.getrows();     

      let skuarray = []; 
      for(let i=0; i < skugridarray.length;i++)
      {
        skuarray.push({'Ask':'0','SKUName':skugridarray[i].SKUName,'SKUDetails':skugridarray[i].SKUDetails,'DimensionWidth':skugridarray[i].SKUDimensionWidth,
        'DimensionHeight':skugridarray[i].SKUDimensionHeight,'DimensionBase':skugridarray[i].SKUDimensionBase,'SKUWeight':skugridarray[i].SKUWeight,
'PlanQty':skugridarray[i].SKUPlanQty,'UOMAsk':skugridarray[i].SKUUOMAsk,'ReceivedQty':skugridarray[i].SKUReceivedQty,
'Reference':skugridarray[i].SKUReference,'TruckID':skugridarray[i].SKUTruckID,'TruckType':skugridarray[i].SKUTruckType,
'GoodQty':skugridarray[i].SKUGoodQty,'DamageQty':skugridarray[i].SKUDamageQty,
'ShortLandQty':skugridarray[i].SKUShortLandQty,'OverlandQty':skugridarray[i].SKUOverlandQty,
'Goodphoto':skugridarray[i].SKUGoodphoto,'Damagephoto':skugridarray[i].SKUDamagephoto,'ShortLandphoto':skugridarray[i].SKUShortLandphoto,
'Overlandphoto':skugridarray[i].SKUOverlandphoto    
    })
        
      }

      let skugridjson = JSON.stringify(skuarray);

      
      shipperselectedjson = shipperselectedjson.replace('[','')
      shipperselectedjson = shipperselectedjson.replace(']','')
      shipperselectedjson = shipperselectedjson.replace(/{/g,'')
      shipperselectedjson = shipperselectedjson.replace(/}/g,'')
    

      truckselectedjson = truckselectedjson.replace("[",'')
      truckselectedjson = truckselectedjson.replace("]",'')
      truckselectedjson = truckselectedjson.replace(/{/g,'')
      truckselectedjson = truckselectedjson.replace(/}/g,'')

      poselectedjson = poselectedjson.replace("[",'')
      poselectedjson = poselectedjson.replace("]",'')
      poselectedjson = poselectedjson.replace(/{/g,'')
      poselectedjson = poselectedjson.replace(/}/g,'')

      shippergridjson = shippergridjson.replace("[",'')
      shippergridjson = shippergridjson.replace("]",'')

      shippergridjson = shippergridjson.replace(/{/g,'')
      shippergridjson = shippergridjson.replace(/}/g,'')

      pogridjson = pogridjson.replace(/{/g,'')
      pogridjson = pogridjson.replace(/}/g,'') 

      truckgridjson = truckgridjson.replace(/{/g,'')
      truckgridjson = truckgridjson.replace(/}/g,'')
      


  
      skugridjson = skugridjson.replace("[",'')
      skugridjson = skugridjson.replace("]",'')

      
      pogridjson = pogridjson.replace("[",'')
      pogridjson = pogridjson.replace("]",'')

      
      truckgridjson = truckgridjson.replace("[",'')
      truckgridjson = truckgridjson.replace("]",'')
            
      
      
      
      var allgridjson =  "[{"+ shipperselectedjson+",\"TruckList\""+":[{"+truckselectedjson+",\"POList\""+":[{"+poselectedjson+",\"SKUList\""+":["+skugridjson+"]},{"+pogridjson+"}"+"]},{"+truckgridjson+"}"+"]},{"+shippergridjson+"}]"     
      allgridjson = "ShipperList\":"+allgridjson;
      //allgridjson = allgridjson.replace(/["']/g, "")

    
     
      var body = {
        "UserID" : "admin",
        "Password" : "123",
        "ProductAsk":"11",
        "Ask":"0",
        "BookingID":this.bookingid,
        "AgentAsk":"",//this.agentcombo.getSelectedItem().value,
        "Shipper":"",
        "CountryAsk":"",//this.countrycombo.getSelectedItem().value,
        "CargoReceivedDate":this.cargoreceiveddate.getText(),
        "CustomIssuedDate":this.customerissueddate.getText(),
        "TransactionDate":this.transactiondate.getText(),
        "Signature":"",
        "SignatureDate":"",
        "BookingStautsAsk":"",
        "NoOfTruck":this.nooftrack,
        "NoOfContainer":this.noofcontainer,
        "DisplaySequence":"",
        "Remark":this.remark+'"'+","+'"'+allgridjson
      }

      var jsonbodystring = '';
      jsonbodystring = JSON.stringify(body);
      jsonbodystring = jsonbodystring.replace(/}]"/g,'}]')
      jsonbodystring =  jsonbodystring.replace(/\\/g, '')
      

      
    

            
      this.backendservice.SaveReceived(jsonbodystring).then(data =>
        {
            alert(JSON.stringify(data)); 
        }) 
        console.log("body is "+JSON.stringify(body));
  }

  btnNew()
  {
                

    this.BindCountry();
    this.BindAgent();

    let shipperdatarow = this.generaterowshipper();             
    this.shipperGrid.addrow(null, shipperdatarow);

    let truckdatarow = this.generaterowshipper();             
    this.truckGrid.addrow(null, truckdatarow);
    
    let podatarow = this.generaterowshipper();             
    this.poGrid.addrow(null, podatarow);

    let skudatarow = this.generaterowsku();          
    this.skuGrid.addrow(null, skudatarow);

  /*  let datarow3 = this.generaterow3();              
    this.shipperGrid.addrow(null, datarow3);     

    let datarow4 = this.generaterow4();              
    this.skuGrid.addrow(null, datarow4);      */

     

  }

  CellvaluechangedShipper(event:any)
  {
    var index = this.shipperGrid.getselectedrowindex();
    var rowdata = this.shipperGrid.getrowdata(index);   
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

  CellendeditShipper()
{
  
  var index = this.shipperGrid.getselectedrowindex();
  var rowdata = this.shipperGrid.getrowdata(index);   
if(rowdata.ShipperName)
{
 // this.addnewrowwhencellleaveShipper()
}

}

addnewrowwhencellleaveShipper()
{
  
  var index = this.shipperGrid.getselectedrowindex();
  var rowcount = this.shipperGrid.getrows();
  var rowlength = rowcount.length - 1;
  if(rowlength == index)
  {
  //this.griddisable = false;
//   let datarow = this.generaterow();              
//       this.shipperGrid.addrow(null, datarow);      
  }
  //this.shipperGrid.setcolumnproperty('GLCode','editable',true);
  
}

CellvaluechangedTruck(event:any)
{
  var index = this.shipperGrid.getselectedrowindex();
  var rowdata = this.shipperGrid.getrowdata(index);   
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

CellendeditTruck()
{

var index = this.shipperGrid.getselectedrowindex();
var rowdata = this.shipperGrid.getrowdata(index);   
if(rowdata.ShipperName)
{
//this.addnewrowwhencellleaveShipper()
}

}

addnewrowwhencellleaveTruck()
{

var index = this.truckGrid.getselectedrowindex();
var rowcount = this.truckGrid.getrows();
var rowlength = rowcount.length - 1;
if(rowlength == index)
{
//this.griddisable = false;
// let datarow = this.generaterow();              
//     this.truckGrid.addrow(null, datarow);      
}
//this.shipperGrid.setcolumnproperty('GLCode','editable',true);

}

CellvaluechangedPO(event:any)
{
  var index = this.poGrid.getselectedrowindex();
  var rowdata = this.poGrid.getrowdata(index);   
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

CellendeditPO()
{

var index = this.shipperGrid.getselectedrowindex();
var rowdata = this.poGrid.getrowdata(index);   
if(rowdata.ShipperName)
{
//this.addnewrowwhencellleaveShipper()
}

}

addnewrowwhencellleavePO()
{

var index = this.poGrid.getselectedrowindex();
var rowcount = this.poGrid.getrows();
var rowlength = rowcount.length - 1;
if(rowlength == index)
{
//this.griddisable = false;
// let datarow = this.generaterow();              
//     this.poGrid.addrow(null, datarow);      
}
//this.shipperGrid.setcolumnproperty('GLCode','editable',true);

}

BindCountry()
{    
this.CountryList =
[
    {
        "Ask": "1",
        "CountryDetails": " ",
        "CountryName": "Myanmar",
        "DisplaySequence": "0",
        "Remark": " ",
        "Status": "0",
        "TS": "1",
        "UD": "1"
    },
    {
        "Ask": "2",
        "CountryDetails": " ",
        "CountryName": "ThaiLand",
        "DisplaySequence": "0",
        "Remark": " ",
        "Status": "0",
        "TS": "1",
        "UD": "1"
    },
    {
        "Ask": "3",
        "CountryDetails": "",
        "CountryName": "Singapore",
        "DisplaySequence": "0",
        "Remark": "",
        "Status": "0",
        "TS": "1",
        "UD": "1"
    }
]

       
  this.countrysource =
{
 dataType: 'json',
 dataFields: [
   { name: 'CountryName' }],

 localdata: this.CountryList
};

this.countrycombo_Adapter = new jqx.dataAdapter(this.countrysource);
}

BindAgent()
{    
this.AgentList = 
[
    {
        "Address": " ",
        "AgentDetails": " ",
        "AgentName": "Agent1",
        "Ask": "1",
        "BillingAddress": " ",
        "CompanyName": " ",
        "ContactPersonMobile": " ",
        "ContactPersonName": " ",
        "DisplaySequence": "0",
        "Email": " ",
        "Mobile": " ",
        "NationalID": " ",
        "Remark": " ",
        "ShippinggAddress": " ",
        "TS": "1",
        "UD": "1",
        "Website": " "
    },
    {
        "Address": " ",
        "AgentDetails": " ",
        "AgentName": "Agent2",
        "Ask": "2",
        "BillingAddress": " ",
        "CompanyName": " ",
        "ContactPersonMobile": " ",
        "ContactPersonName": " ",
        "DisplaySequence": "0",
        "Email": " ",
        "Mobile": " ",
        "NationalID": " ",
        "Remark": " ",
        "ShippinggAddress": " ",
        "TS": "1",
        "UD": "1",
        "Website": " "
    }
]

       
  this.agentsource =
{
 dataType: 'json',
 dataFields: [
   { name: 'AgentName' }],

 localdata: this.AgentList
};

this.agentcombo_Adapter = new jqx.dataAdapter(this.agentsource);
}

CellvaluechangedSKU(event:any)
{
  var index = this.skuGrid.getselectedrowindex();
  var rowdata = this.skuGrid.getrowdata(index);   
  var columnname = event.args.datafield;
  if(columnname == "ShipperName")
  {
      let oldvalue = event.args.oldvalue;
      let newvalue = event.args.newvalue;
      if(oldvalue != newvalue)
      {
      //this.shipperGrid.endcelledit(this.shipperGrid.getselectedrowindex(),"ShipperName",true);
      this.CellendeditShipper();
      }

  }
}

CellendeditSKU()
{

var index = this.shipperGrid.getselectedrowindex();
var rowdata = this.skuGrid.getrowdata(index);   
if(rowdata.ShipperName)
{
//this.addnewrowwhencellleaveShipper()
}

}

addnewrowwhencellleaveSKU()
{

var index = this.skuGrid.getselectedrowindex();
var rowcount = this.skuGrid.getrows();
var rowlength = rowcount.length - 1;
if(rowlength == index)
{
//this.griddisable = false;
// let datarow = this.generaterow();              
//     this.skuGrid.addrow(null, datarow);      
}
//this.shipperGrid.setcolumnproperty('GLCode','editable',true);

}





  generaterowshipper(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }

  generaterowtruck(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }

  generaterowpo(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }

  generaterowsku(): any {   
    let row = {};

     row['SKUDimensionWidth'] = 0;
     row['SKUDimensionHeight'] = 0;
     row['SKUDimensionBase'] = 0;
     row['SKUPlanQty'] = 0;
    return row;
  }

  shipperGridOnRowSelect(event: any): void {
    let customerID = event.args.row.CustomerID;
    let records = new Array();
    let dataAdapter = this.dataAdapter2;
    let length = dataAdapter.records.length;

    for (let i = 0; i < length; i++) {
        let record = dataAdapter.records[i];
        if (record.CustomerID == customerID) {
            records[records.length] = record;            
        }
    }
    let dataSource = {
        datafields: this.dataFields2,
        localdata: records
    }

    let adapter = new jqx.dataAdapter(dataSource);


    this.truckGrid.source(adapter);

    this.truckGrid.selectrow(0);
}

truckGridOnRowSelect(event: any): void {

    let orderid = event.args.row.OrderID;
    let records = new Array();
    let dataAdapter = this.dataAdapter3;
    let length = dataAdapter.records.length;

    for (let i = 0; i < length; i++) {
        let record = dataAdapter.records[i];
        if (record.OrderID == orderid) {
            records[records.length] = record;            
        }
    }
    let dataSource = {
        datafields: this.dataFields3,
        localdata: records
    }

    let adapter = new jqx.dataAdapter(dataSource);


    this.poGrid.source(adapter);
    this.poGrid.selectrow(0);
    //this.truckGrid.selectrow(0);

}


poGridOnRowSelect(event: any): void {

    let orderdetailid = event.args.row.OrderDetailID;
    let records = new Array();
    let dataAdapter = this.dataAdapter4;
    let length = dataAdapter.records.length;

    for (let i = 0; i < length; i++) {
        let record = dataAdapter.records[i];
        if (record.OrderDetailID == orderdetailid) {
            records[records.length] = record;            
        }
    }
    let dataSource = {
        datafields: this.dataFields4,
        localdata: records
    }

    let adapter = new jqx.dataAdapter(dataSource);


    this.skuGrid.source(adapter);

    //this.truckGrid.selectrow(0);

}



}


