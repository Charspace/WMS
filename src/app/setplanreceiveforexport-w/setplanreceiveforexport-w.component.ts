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

@Component({
  selector: 'app-setplanreceiveforexport-w',
  templateUrl: './setplanreceiveforexport-w.component.html',
  styleUrls: ['./setplanreceiveforexport-w.component.css']
})
export class SetplanreceiveforexportWComponent implements OnInit {
  @ViewChild('customersGrid') myGrid: jqxGridComponent;
  @ViewChild('ordersGrid') ordersGrid: jqxGridComponent;
  @ViewChild('ordersDetailGrid') ordersDetailGrid: jqxGridComponent;
  @ViewChild('ordersDetailandDetailGrid') ordersDetailandDetailGrid: jqxGridComponent;
  

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

  //countrycombo
  countrycombo_Adapter : any;
  countrycombodisable : any;

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

  customersGridOnRowSelect(event: any): void {
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


    this.ordersGrid.source(adapter);

    this.ordersGrid.selectrow(0);
}

ordersGridOnRowSelect(event: any): void {

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


    this.ordersDetailGrid.source(adapter);
    this.ordersDetailGrid.selectrow(0);
    //this.ordersGrid.selectrow(0);

}


ordersDetailGridOnRowSelect(event: any): void {

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


    this.ordersDetailandDetailGrid.source(adapter);

    //this.ordersGrid.selectrow(0);

}



}


