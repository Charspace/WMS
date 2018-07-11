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
  selector: 'app-settallycheckforexport-w',
  templateUrl: './settallycheckforexport-w.component.html',
  styleUrls: ['./settallycheckforexport-w.component.css']
})
export class SettallycheckforexportWComponent implements OnInit { 
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

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bookingnoplaceholder = "Booking No - B000001";
    this.shipperlaceholder = 'Shipper Name - Thura'
    this.agentplaceholder = "Agent Name - Rayroom"
    this.statusplaceholder = "Status - Tally";
    this.trdateplaceholder = "Transactoin Date - 10/01/2018";
    this.CreateGrid();   
    
  }

  CreateGrid()
  {this.source  =
    {
        datafields: [
            { name: 'DocNo' },
            { name: 'ShippingMark' },
            { name: 'TruckID' },
            { name: 'TruckType' },
            { name: 'SKUName' },
            { name: 'Dimission_W' },
            { name: 'Dimission_H' },
            { name: 'Dimission_L' },
            { name: 'ReceivedQTY' },
            { name: 'UOM'},
            { name: 'TransactionDate' },
            { name: 'Remark' }
        ],
        localdata:
        [
          { 'DocNo': 'AAA', 'ShippingMark': 'Alfreds Futterkiste', 'TruckID': 'Maria Anders', 'TruckType': 
          'Sales Representative', 'SKUName': 'Berlin', 'Dimission_W': '234' , 'Dimission_H': '234' , 'Dimission_L': '234' , 
          'ReceivedQTY': '45500' , 'UOM': 'Ton' , 'TransactionDate': '01/01/2018' , 'Remark': 'Just received' },
          { 'DocNo': 'BBB', 'ShippingMark': 'Trujillo Emparedados', 'TruckID': 'Gerry Trujillo', 'TruckType': 
          'Owner', 'SKUName': 'Paris', 'Dimission_W': '234' , 'Dimission_H': '234' , 'Dimission_L': '234' , 
          'ReceivedQTY': '45500' , 'UOM': 'Ton' , 'TransactionDate': '01/01/2018' , 'Remark': 'Just received'},
          { 'DocNo': 'CCC', 'ShippingMark': 'Moreno Taquera', 'TruckID': 'Antonio Moreno', 'TruckType': 
          'Manager', 'SKUName': 'Mxico D.F.', 'Dimission_W': '234' , 'Dimission_H': '234' , 'Dimission_L': '234' , 
          'ReceivedQTY': '45500' , 'UOM': 'Ton' , 'TransactionDate': '01/01/2018' , 'Remark': 'Just received' }
      ]
    }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this.columns =
    [
        { text: 'Doc No', datafield: 'DocNo', width: 70 },
        { text: 'Shippiing Mark', datafield: 'ShippingMark', width: 110 },
        { text: 'Truck ID', datafield: 'TruckID', width: 70 }  ,
        { text: 'Truck Type', datafield: 'TruckType', width: 100 }   ,
        { text: 'SKU Name', datafield: 'SKU Name', width: 150 }   ,
        { text: 'Dimission_W', datafield: 'Dimission_W', width: 100 }   ,  
        { text: 'Dimission_H', datafield: 'Dimission_H', width: 100 }   ,
        { text: 'Dimission_L', datafield: 'Dimission_L', width: 100 }   ,
        { text: 'Received QTY', datafield: 'ReceivedQTY', width: 100 } ,
        { text: 'UOM', datafield: 'UOM', width: 80 } ,
        { text: 'Transaction Date', datafield: 'TransactionDate', width: 130 } ,
        { text: 'Remark', datafield: 'Remark', width: 200 } 
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
        // this.myGrid.width(screen.width);
    // this.myGrid.height(screen.height);    
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





