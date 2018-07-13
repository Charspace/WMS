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
  selector: 'app-setcheckerforexport-w',
  templateUrl: './setcheckerforexport-w.component.html',
  styleUrls: ['./setcheckerforexport-w.component.css']
})
export class SetcheckerforexportWComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;

  //Place holder
  bookingnoplaceholder: string;
  shipperlaceholder: string;
  statusplaceholder: string;
  trdateplaceholder: string;
  agentplaceholder : any;

  //grid 
  source: any;
  dataAdapter: any;
  columns : any=[];
  trucktype:any;  
  DetailJson = '[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]';

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bindHeader();
    this.createGrid();       
  }
  bindHeader()
  {
    this.bookingnoplaceholder = "Booking No "+"- B000001";
    this.shipperlaceholder = "Shipper Name "+"- Thura";
    this.agentplaceholder = "Agent Name "+"- Rayroom";
    this.statusplaceholder = "Status "+"- Tally";
    this.trdateplaceholder = "Transactoin Date "+"- 10/01/2018";
  }
 createGrid()
  {this.source  =
    {
        datafields: [
            { name: 'PONo' },{ name: 'ShippingMark' }, { name: 'ReferenceNo' },   { name: 'SKUName' },
            { name: 'Dimission_W' }, { name: 'Dimission_H' }, { name: 'Dimission_L' }, { name: 'CBM' },
            { name: 'PlanedQTY' }, { name: 'ReceivedQTY' }, { name: 'DiffQTY' },{ name: 'UOM'}, { name: 'Weight'},
            { name: 'TruckID'}, { name: 'TruckType'}, { name: 'GoodCondition'}, { name: 'DamageCondition'},
            { name: 'ShortLand'},{ name: 'OverLand'},{ name: 'TransactionDate' }, { name: 'Remark' }, { name: 'Picture' }
        ],
        localdata:[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]
     
    }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this.columns =
    [
        { text: 'PO No', datafield: 'PONo', width: 70 },
        { text: 'Shippiing Mark', datafield: 'ShippingMark', width: 110 },
        { text: 'Reference No', datafield: 'ReferenceNo', width: 70 }  ,
        { text: 'SKU Name', datafield: 'SKUName', width: 150 }   ,        
        { text: 'Dimission_W', datafield: 'Dimission_W', width: 100 }   ,  
        { text: 'Dimission_H', datafield: 'Dimission_H', width: 100 }   ,
        { text: 'Dimission_L', datafield: 'Dimission_L', width: 100 }   ,
        { text: 'CBM', datafield: 'CBM', width: 100 }   ,
        { text: 'Received QTY', datafield: 'PlanedQTY', width: 100 } ,
        { text: 'Received QTY', datafield: 'ReceivedQTY', width: 100 } ,
        { text: 'Difference QTY', datafield: 'DiffQTY', width: 100 } ,
        { text: 'UOM', datafield: 'UOM', width: 80 } ,
        { text: 'Weight', datafield: 'Weight', width: 200 },
        { text: 'Truck ID', datafield: 'TruckID', width: 100 },
        { text: 'Truck Type', datafield: 'TruckType', width: 100 },
        { text: 'Good Condition', datafield: 'GoodCondition', width: 100 },
        { text: 'Damage Condition', datafield: 'DamageCondition', width: 100 },
        { text: 'Short Land', datafield: 'ShortLand', width: 100 },
        { text: 'Over Land', datafield: 'OverLand', width: 100 },       
        { text: 'Transaction Date', datafield: 'TransactionDate', width: 130 } ,
        { text: 'Remark', datafield: 'Remark', width: 200 } ,
        { text: 'Picture', datafield: 'Picture', width: 100 }
    ];       
  }
  MyGridRowSelect(event: any): void {
    let customerID = event.args.row.DocNo;
    let records = new Array();
    let dataAdapter = this.dataAdapter;
    let length = dataAdapter.records.length;
    //alert (this.myGrid.getselectedrowindex());
  }
  MyGridCellValueChange(event:any)
  {
    //alert (this.myGrid.getselectedcells.toString());    
  }  
  MyGridCellEndEdit()
  {   
    var index = this.myGrid.getselectedrowindex();
    var rowdata = this.myGrid.getrowdata(index);   
    var rowcount = this.myGrid.getrows();
    var rowlength = rowcount.length - 1;
    if(rowlength == index)
    {
      let mydatarow = this.MyGridRowGenearate();             
      this.myGrid.addrow(null, mydatarow);
    }
    {
      //alert("nothing")
    }    
  }
  MyGridRowGenearate(): any {   
    let row = {};
    // row['DeleteRow'] = 'X'
    // row['LocalAmt'] = 0;
    // row['SourceAmt'] = 0;
    return row;
  }
 
  btnNew()
  {  
    let mydatarow = this.MyGridRowGenearate();             
    this.myGrid.addrow(null, mydatarow);  
  }
  btnSave()
  { 
    this.router.navigate(['lstexportchecker']);     
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





