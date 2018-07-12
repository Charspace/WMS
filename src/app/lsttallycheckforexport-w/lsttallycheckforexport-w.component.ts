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
  selector: 'app-lsttallycheckforexport-w',
  templateUrl: './lsttallycheckforexport-w.component.html',
  styleUrls: ['./lsttallycheckforexport-w.component.css']
})
export class LsttallycheckforexportWComponent implements OnInit {
  @ViewChild('HeaderGrid') HeaderGrid: jqxGridComponent;
//   @ViewChild('Detail') myGrid: jqxGridComponent;
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
  HeaderJson = '[{"BookingAsk":"001","BookingNo":"Maung","ShipperName":"Mrs","AgentName":"Bahan","Status":"Yangon","TransactionDate":"Aung"},{"BookingAsk":"002","BookingNo":"Maung","ShipperName":"Mrs","AgentName":"Bahan","Status":"Yangon","TransactionDate":"Hla"}]'
  DetailJson = '[{"BookingAsk":"001","DocNo":"Yangonship","ShippingMark":"Bahan","SKUDetail":"Bahan","D_W":"Myanmar","D_W":"Myanmar","D_D":"Myanmar","D_L":"Myanmar","ReceivedQTY":"Myanmar","UOM":"Myanmar","TotalCBM":"Myanmar","Remark":"Myanmar"},{"BookingAsk":"002","DocNo":"AA","ShippingMark":"AA","SKUDetail":"AA","D_W":"34","D_D":"44","D_L":"34","ReceivedQTY":"6566","UOM":"Ton","TotalCBM":"434","Remark":"remark"}]';
            
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
  {this.HeaderSource  =
    {

        datafields: [
            { name: 'BookingAsk', type: 'string' },
            { name: 'BookingNo', type: 'string' },
            { name: 'ShipperName' , type: 'string' },
            { name: 'AgentName' , type: 'string' },
            { name: 'Status' , type: 'string' },
            { name: 'TransactionDate'  , type: 'string' }       
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
        { text: 'BookingAsk', datafield: 'BookingAsk', width: 120 },
        { text: 'Booking No', datafield: 'BookingNo', width: 120 },
        { text: 'Shipper Name', datafield: 'ShipperName', width: 120 },
        { text: 'Agent Name', datafield: 'AgentName', width: 120 }  ,
        { text: 'Status', datafield: 'Status', width: 120 }   ,
        { text: 'Transaction Date', datafield: 'TransactionDate', width: 250 }         
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
          let DetailSource1 = {
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
          let nestedGridAdapter = new jqx.dataAdapter(this.DetailSource1);
          if (nestedGridContainer != null) {  
              let settings = {
                  width: 780,
                  height: 200,
                  HeaderSource: nestedGridAdapter, 
                  columns: [
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
    { text: 'BookingAsk', datafield: 'BookingAsk', width: 120 },
    { text: 'Booking No', datafield: 'BookingNo', width: 120 },
    { text: 'Shipper Name', datafield: 'ShipperName', width: 120 },
    { text: 'Agent Name', datafield: 'AgentName', width: 120 }  ,
    { text: 'Status', datafield: 'Status', width: 120 }   ,
    { text: 'Transaction Date', datafield: 'TransactionDate', width: 250 }         
]; 

btnNew()
{  
    //this.router.navigate(['settallycheckforexport-w']);
}

}
