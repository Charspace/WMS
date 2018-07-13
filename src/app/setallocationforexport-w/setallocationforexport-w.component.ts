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
  selector: 'app-setallocationforexport-w',
  templateUrl: './setallocationforexport-w.component.html',
  styleUrls: ['./setallocationforexport-w.component.css']
})
export class SetallocationforexportWComponent implements OnInit {

 @ViewChild('mySKUGrid') mySKUGrid: jqxGridComponent;
  @ViewChild('mySKUBarcodeGrid') mySKUBarcodeGrid: jqxGridComponent;

  //Place holder
  bookingnoplaceholder: string;
  shipperlaceholder: string;
  statusplaceholder: string;
  trdateplaceholder: string;
  agentplaceholder : any;

  //SKU grid 
  SKUsource: any;
  SKUdataAdapter: any;
  SKUcolumns : any=[];
//SKU Barcode grid
  SKUBarcodesource: any;
  SKUBarcodedataAdapter: any;
  SKUBarcodecolumns : any=[];


  trucktype:any;  
  //DetailJson = '[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]';

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bindHeader();
    this.createSKUGrid();   
    this.createSKUBarcodeGrid();    
  }
  bindHeader()
  {
    this.bookingnoplaceholder = "Booking No "+"- B000001";
    this.shipperlaceholder = "Shipper Name "+"- Thura";
    this.agentplaceholder = "Agent Name "+"- Rayroom";
    this.statusplaceholder = "Status "+"- Tally";
    this.trdateplaceholder = "Transactoin Date "+"- 10/01/2018";
  }
 createSKUGrid()
  {this.SKUsource  =
    {
        datafields: [
            { name: 'PONo' }, 
            { name: 'SKUName' },
            { name: 'Dimission_W' }, 
            { name: 'Dimission_H' }, 
            { name: 'Dimission_L' }, 
            { name: 'CBM' }, 
            { name: 'ReceivedQTY' }, 
            { name: 'LeftQTY' },
            { name: 'UOM'}
        ],
        localdata:[{"PONo": "001","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
        "ReceivedQTY": "45",	"LeftQTY": "0","UOM": "BAG"},{"PONo": "002","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
        "ReceivedQTY": "45",	"LeftQTY": "0","UOM": "BAG"},{"PONo": "003","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
        "ReceivedQTY": "45",	"LeftQTY": "0","UOM": "BAG"},{"PONo": "004","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
        "ReceivedQTY": "45",	"LeftQTY": "0","UOM": "BAG"}]
    }  
    this.SKUdataAdapter = new jqx.dataAdapter(this.SKUsource);  
    this.SKUcolumns =
    [
        { text: 'PO No', datafield: 'PONo', width: 70 },
        { text: 'SKU Name', datafield: 'SKUName', width: 150 }   ,        
        { text: 'Dimission_W', datafield: 'Dimission_W', width: 100 }   ,  
        { text: 'Dimission_H', datafield: 'Dimission_H', width: 100 }   ,
        { text: 'Dimission_L', datafield: 'Dimission_L', width: 100 }   ,
        { text: 'CBM', datafield: 'CBM', width: 100 },   
        { text: 'Received QTY', datafield: 'ReceivedQTY', width: 100 } ,
        { text: 'Left QTY', datafield: 'LeftQTY', width: 100 } ,
        { text: 'UOM', datafield: 'UOM', width: 80 } 
    ];       
  }

  createSKUBarcodeGrid()
  {this.SKUBarcodesource  =
    {
      datafields: [
        { name: 'PONo' }, 
        { name: 'SKUName' },
        { name: 'Dimission_W' }, 
        { name: 'Dimission_H' }, 
        { name: 'Dimission_L' }, 
        { name: 'CBM' }, 
        { name: 'ReceivedQTY' }, 
        { name: 'Barcode' },
        { name: 'UOM'},
        { name: 'Location' },
        { name: 'Pallet' }
      ],
      localdata:[{"PONo": "001","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
      "ReceivedQTY": "45",	"Barcode": "000010","Location": "A12120","Pallet": "P2510","UOM": "BAG"},{"PONo": "002","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
      "ReceivedQTY": "45",	"Barcode": "000001","Location": "B45120","Pallet": "P5610","UOM": "BAG"},{"PONo": "003","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
      "ReceivedQTY": "45",	"Barcode": "012050","Location": "C55220","Pallet": "P2650","UOM": "BAG"},{"PONo": "004","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250",
      "ReceivedQTY": "45",	"Barcode": "052120","Location": "D55220","Pallet": "P5150","UOM": "BAG"}] }  
    this.SKUBarcodedataAdapter = new jqx.dataAdapter(this.SKUBarcodesource);  
    this.SKUBarcodecolumns =
    [
      { text: 'PO No', datafield: 'PONo', width: 70 },
      { text: 'SKU Name', datafield: 'SKUName', width: 150 }   ,        
      { text: 'Dimission_W', datafield: 'Dimission_W', width: 100 }   ,  
      { text: 'Dimission_H', datafield: 'Dimission_H', width: 100 }   ,
      { text: 'Dimission_L', datafield: 'Dimission_L', width: 100 }   ,
      { text: 'CBM', datafield: 'CBM', width: 100 },   
      { text: 'Received QTY', datafield: 'ReceivedQTY', width: 100 } ,
      { text: 'Left QTY', datafield: 'LeftQTY', width: 100 } ,
      { text: 'Barcode', datafield: 'Barcode', width: 80 },
      { text: 'Location', datafield: 'Location', width: 80 },
      { text: 'Pallet', datafield: 'Pallet', width: 80 } 
    ];       
  }

  MySKUGridRowSelect(event: any): void {
    let customerID = event.args.row.DocNo;
    let records = new Array();
    let dataAdapter = this.SKUdataAdapter;
    let length = dataAdapter.records.length;
    //alert (this.myGrid.getselectedrowindex());
  }
  MySKUBarcodeGridRowSelect(event: any): void {
    let customerID = event.args.row.DocNo;
    let records = new Array();
    let dataAdapter = this.SKUBarcodedataAdapter;
    let length = dataAdapter.records.length;
    //alert (this.myGrid.getselectedrowindex());
  }

  MySKUGridCellEndEdit()
  {   
    var index = this.mySKUGrid.getselectedrowindex();
    var rowdata = this.mySKUGrid.getrowdata(index);   
    var rowcount = this.mySKUGrid.getrows();
    var rowlength = rowcount.length - 1;
    if(rowlength == index)
    {
      let mydatarow = this.MySKURowGenearate();             
      this.mySKUGrid.addrow(null, mydatarow);
    }
    {
      //alert("nothing")
    }    
  }
  MySKUBarcodeCellEndEdit()
  {   
    var index = this.mySKUBarcodeGrid.getselectedrowindex();
    var rowdata = this.mySKUBarcodeGrid.getrowdata(index);   
    var rowcount = this.mySKUBarcodeGrid.getrows();
    var rowlength = rowcount.length - 1;
    if(rowlength == index)
    {
      let mydatarow = this.MySKUBarcodeRowGenearate();             
      this.mySKUBarcodeGrid.addrow(null, mydatarow);
    }
    {
      //alert("nothing")
    }    
  }

  
  MySKUCellValueChange(event:any)
  {
    //alert (this.myGrid.getselectedcells.toString());    
  } 
  MySKUBarcodeCellValueChange(event:any)
  {
    //alert (this.myGrid.getselectedcells.toString());    
  }  
  MySKURowGenearate(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }
  MySKUBarcodeRowGenearate(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }
 

  btnMap()
  {

  }
  btnNew()
  {  
    // let mydatarow = this.MyGridRowGenearate();             
    // this.myGrid.addrow(null, mydatarow);  
  }
  btnSave()
  { 
    this.router.navigate(['lstlstbarcodemappingforexport-w']);     
    //alert("save")
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
    //alert("submit")
  } 
  
  ngOnInit() {    
  }
}
