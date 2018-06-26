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

@Component({

   selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  source : any;
  employeesAdapter : any;
  ordersSource : any;
  ordersDataAdapter : any;
  ordersSource2 : any;
  ordersDataAdapter2 : any;
  headercolumns: any;
  detailcolumns: any;
  detailcolumns2: any;
  nestedcolumns: any;
  nestedGrids : any =[];
  initRowDetails : any;

  header = '{"FirstName":"Aung","LastName":"Maung","Title":"Mrs","Address":"Bahan","City":"Yangon","EmployeeID":"001"}'
  detail = '{"EmployeeID":"001","ShipName":"Yangonship","ShipAddress":"Bahan","ShipCity":"Bahan","ShipCountry":"Myanmar"}';


  constructor() {
    this.BindNestedGrid();
   }

  ngOnInit() {
  }

  BindNestedGrid()
  {
    
    this.source =
    {      
      datatype: 'json',
        datafields: [
            { name: 'FirstName' , type: 'string' },
            { name: 'LastName',type: 'string' },
            { name: 'Title',type: 'string' },
            { name: 'Address',type: 'string' },
            { name: 'City',type: 'string' },
            { name: 'EmployeeID',type: 'string' }
        ],
        localdata: this.header,         
        root: 'Employees',
        //record: 'Employee',
        id: 'EmployeeID', 
        
         
    };

    this.employeesAdapter = new jqx.dataAdapter(this.source);

      
    this.headercolumns =
    [
      { text: 'FirstName', datafield: 'FirstName', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'LastName', datafield: 'LastName', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Title', datafield: 'Title', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'Address', datafield: 'Address', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'City', datafield: 'City', width: '10%',editable: false,hidden:false }, //readonly cell.                
      { text: 'EmployeeID', datafield: 'EmployeeID', width: '10%',editable: false,hidden:false }, //readonly cell.  
  ]

  
  
     this.ordersSource =
    {
      

        datafields: [
            { name: 'EmployeeID', type: 'string' },
            { name: 'ShipName', type: 'string' },
            { name: 'ShipAddress', type: 'string' },
            { name: 'ShipCity', type: 'string' },
            { name: 'ShipCountry', type: 'string' }
            
        ],
        localdata: this.detail,
        root: 'Orders',
       // record: 'Order', 
        datatype: 'json',
         
    };

    this.ordersDataAdapter = new jqx.dataAdapter(this.ordersSource, { autoBind: true });



    this.detailcolumns =
    [
      { text: 'EmployeeID', datafield: 'EmployeeID', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'ShipName', datafield: 'ShipName', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'ShipAddress', datafield: 'ShipAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'ShipCity', datafield: 'ShipCity', width: '10%',editable: false,hidden:false }, //readonly cell.
      { text: 'ShipCountry', datafield: 'ShipCountry', width: '10%',editable: false,hidden:false }, //readonly cell.                
  ]

  this.ordersSource2 =
  {
    

      datafields: [
          { name: 'EmployeeID', type: 'string' },
          { name: 'ShipName', type: 'string' },
          { name: 'ShipAddress', type: 'string' },
          { name: 'ShipCity', type: 'string' },
          { name: 'ShipCountry', type: 'string' }
          
      ],
      localdata: this.detail,
      root: 'Orders',
     // record: 'Order', 
      datatype: 'json',
       
  };

  this.ordersDataAdapter2 = new jqx.dataAdapter(this.ordersSource2, { autoBind: true });



  this.detailcolumns2 =
  [
    { text: 'EmployeeID', datafield: 'EmployeeID', width: '10%',editable: false,hidden:false }, //readonly cell.
    { text: 'ShipName', datafield: 'ShipName', width: '10%',editable: false,hidden:false }, //readonly cell.
    { text: 'ShipAddress', datafield: 'ShipAddress', width: '10%',editable: false,hidden:false }, //readonly cell.
    { text: 'ShipCity', datafield: 'ShipCity', width: '10%',editable: false,hidden:false }, //readonly cell.
    { text: 'ShipCountry', datafield: 'ShipCountry', width: '10%',editable: false,hidden:false }, //readonly cell.                
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
          let orders = this.ordersDataAdapter.records;
          let ordersbyid = [];
          for (let i = 0; i < orders.length; i++) {
              let result = filter.evaluate(orders[i]['EmployeeID']);
              if (result)
                  ordersbyid.push(orders[i]);
          }
          let ordersSource = {
              datafields: [
                  { name: 'EmployeeID', type: 'string' },
                  { name: 'ShipName', type: 'string' },
                  { name: 'ShipAddress', type: 'string' },
                  { name: 'ShipCity', type: 'string' },
                  { name: 'ShipCountry', type: 'string' },
                  { name: 'ShippedDate', type: 'date' }
              ],
              id: 'OrderID',
              localdata: ordersbyid
          }
          let nestedGridAdapter = new jqx.dataAdapter(ordersSource);
          if (nestedGridContainer != null) {
  
              let settings = {
                  width: 780,
                  height: 200,
                  source: nestedGridAdapter, 
                  columns: [
                      { text: 'Ship Name', datafield: 'ShipName', width: 200 },
                      { text: 'Ship Address', datafield: 'ShipAddress', width: 200 },
                      { text: 'Ship City', datafield: 'ShipCity', width: 150 },
                      { text: 'Ship Country', datafield: 'ShipCountry', width: 150 },
                      { text: 'Shipped Date', datafield: 'ShippedDate', width: 200 }
                  ]
              };
  
              jqwidgets.createInstance(`#${nestedGridContainer.id}`, 'jqxGrid', settings);
          }
      }

  }

  photoRenderer = (row: number, column: any, value: string): string => {
    let name = this.myGrid.getrowdata(row).FirstName;
    let imgurl = '../images/' + name.toLowerCase() + '.png';
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
    this.myGrid.showrowdetails(1);
};

columns: any[] =
[
    { text: 'Photo', width: 50, cellsrenderer: this.photoRenderer },
    { text: 'First Name', datafield: 'FirstName', width: 100, cellsrenderer: this.renderer },
    { text: 'Last Name', datafield: 'LastName', width: 100, cellsrenderer: this.renderer },
    { text: 'Title', datafield: 'Title', width: 180, cellsrenderer: this.renderer },
    { text: 'Address', datafield: 'Address', width: 300, cellsrenderer: this.renderer },
    { text: 'City', datafield: 'City', width: 170, cellsrenderer: this.renderer }
];


}
