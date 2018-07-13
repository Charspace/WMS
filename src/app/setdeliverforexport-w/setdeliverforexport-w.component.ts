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
  selector: 'app-setdeliverforexport-w',
  templateUrl: './setdeliverforexport-w.component.html',
  styleUrls: ['./setdeliverforexport-w.component.css']
})
export class SetdeliverforexportWComponent implements OnInit {
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
            { name: 'No' },
            { name: 'SKUName' },
            { name: 'BarCode' },
            { name: 'Location' },
            { name: 'Pallet' },
            { name: 'QTY' },
            { name: 'UOM'},
            { name: 'Status' },
            { name: 'Remark' }
        ],
        localdata:
        [
          { 'No': '1', 'SKUName': 'Salt', 'BarCode': '0121551', 'Location': 
          'A15120', 'Pallet': 'P6532', 'QTY': '234' , 'UOM': 'Ton' , 'Status': 'Yes' , 
          'Remark': 'VIP' },
          { 'No': '2', 'SKUName': 'Refined Salt', 'BarCode': '542451', 'Location': 
          'A15150', 'Pallet': 'P65532', 'QTY': '500' , 'UOM': 'Pack' , 'Status': 'Yes' , 
          'Remark': 'VIP'},
          { 'No': '3', 'SKUName': 'Salt', 'BarCode': '541551', 'Location': 
          'A15151', 'Pallet': 'P6852', 'QTY': '300' , 'UOM': 'PCs' , 'Status': 'No' , 
          'Remark': 'VIP' }
      ]
    }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this.columns =
    [
        { text: 'No', datafield: 'No', width: 70 },
        { text: 'SKU Name', datafield: 'SKUName', width: 110 },
        { text: 'BarCode', datafield: 'BarCode', width: 70 }  ,
        { text: 'Location', datafield: 'Location', width: 100 }   ,
        { text: 'Pallet', datafield: 'Pallet', width: 150 }   ,
        { text: 'QTY', datafield: 'QTY', width: 100 }   ,  
        { text: 'UOM', datafield: 'UOM', width: 100 }   ,
        { text: 'Status', datafield: 'Status', width: 100 }   ,
        { text: 'Remark', datafield: 'Remark', width: 100 }
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
    this.router.navigate(['lstdeliverforexport-w']);   
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