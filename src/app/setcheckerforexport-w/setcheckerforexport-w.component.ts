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
import { Tree } from '../../../node_modules/@angular/router/src/utils/tree';

@Component({
  selector: 'app-setcheckerforexport-w',
  templateUrl: './setcheckerforexport-w.component.html',
  styleUrls: ['./setcheckerforexport-w.component.css']
})
export class SetcheckerforexportWComponent implements OnInit {
  @ViewChild('myGrid') myGrid: jqxGridComponent;
  @ViewChild('cboTruckType') cboTrucType: jqxComboBoxComponent;
  @ViewChild('cboUOM') cboUOM: jqxComboBoxComponent;

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

  //Truck Type Combo
  cboTruckTypeAdapter : any;  
  cboTruckTypeList : any = [];
  cboTruckTypeSource : any = [];

 //Truck Type Combo
 cboUOMAdapter : any;  
 cboUOMList : any = [];
 cboUOMSource : any = [];


  HeaderJson:any;
  DetailJson : any;

  getJsonParaUser= {"UserID":"","Password":"","ProductAsk":""};
  saveJsonParamenter={
    "UserID" : "admin",
    "Password" : "123",
    "ProductAsk":"11",
    "Ask":"0",
    "BookingID":"0",
    "AgentAsk": "",
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
  //DetailJson = '[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]';

  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  { 
    this.bookingnoplaceholder = "BookID";
    this.agentplaceholder = 'Agent'
    // this.countryplaceholder = "Country"
    // this.nooftrackplaceholder = "NoOfTruck";
    // this.noofcontainerplaceholder = "NoOfContainer";
    // this.remarkplaceholder = "Remark";
    // this.bindHeader();
    // this.createGrid();       
  }
  ngAfterViewInit() {
    var bookask;
    var agentask;

    this.route.params.subscribe(params => {
        bookask = +params['param1']; 
        agentask = +params['param2']; 
    })

    //alert(bookask);
     this.getPRFEWarehouseList(bookask,agentask).then(data =>
        {
            debugger
            this.bindTrackType();
            this.bindUOM();
        }
      )
  }

  getPRFEWarehouseList(setupbookask,setupagentask)
  {
    //alert(setupbookask);
    return new Promise((resolve,reject) => { 
      debugger
    var body = {
        "UserID" : "admin",
        "Password" : "123",
        "ProductAsk":"11",
        "Ask":"" +setupbookask+"",
        "BookingID":"0",
        "AgentAsk": "",
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

       this.backendservice.wsCall(body,this.backendservice.wsgetPRFEWarehouseList).then(data =>
        {
            debugger
            alert(JSON.stringify(body));
            alert(JSON.stringify(data));
            var json = data;
            console.log('ws json is'+JSON.stringify(json));
            this.HeaderJson = data[0].BookingList;
            this.DetailJson = data[0].DetailList;   
            alert(JSON.stringify(this.HeaderJson.toString()));
            if(this.HeaderJson.length)
            {            

            // this.HeaderJson = data[0].BookingList;
            // this.DetailJson = data[0].DetailList;       
            this.createGrid();
            this.bindingcompleteTruckType(Event);
            this.bindingcompleteUOM(Event);

             this.bindHeader();
            // this.bookingid = this.HeaderJson[0].BookingID;
            // this.nooftrack = this.HeaderJson[0].NoOfTruck;
            // this.noofcontainer =  this.HeaderJson[0].NoOfContainer;
            // this.remark = this.HeaderJson[0].Remark;
            // this.cargoreceiveddate.setDate(this.HeaderJson[0].CargoReceivedDate)        
            // this.customerissueddate.setDate(this.HeaderJson[0].CustomIssuedDate)
            // this.transactiondate.setDate(this.HeaderJson[0].TransactionDate)
            resolve('success');

            }
           }) 
    })

    }

  bindingcompleteTruckType(event:any)
  {
      if(this.HeaderJson)
      {
          this.cboTrucType.selectItem(this.HeaderJson[0].TruckTypeAsk);          
      }      
  }
  bindingcompleteUOM(event:any)
  {
      if(this.HeaderJson)
      {
          this.cboUOM.selectItem(this.HeaderJson[0].UOMAsk);          
      }      
  }

bindTrackType()
{   
    this.getJsonParaUser.UserID = window.sessionStorage.getItem("userid");
    this.getJsonParaUser.Password= window.sessionStorage.getItem("Password");
    this.getJsonParaUser.ProductAsk="";
    this.backendservice.wsCall(this.getJsonParaUser,this.backendservice.wsgetTruckTypeList).then(data =>
        {
            this.cboTruckTypeList = data;
            this.cboTruckTypeSource =  {
                dataType: 'json',
                dataFields:[ {name: 'Description'}, {name:'Code'},{name:'Ask'} ],
                localdata: this.cboTruckTypeList,
            }
            this.cboTruckTypeAdapter = new jqx.dataAdapter(this.cboTruckTypeSource);   
        })  
}


bindUOM()
{   
    this.getJsonParaUser.UserID = window.sessionStorage.getItem("userid");
    this.getJsonParaUser.Password= window.sessionStorage.getItem("Password");
    this.getJsonParaUser.ProductAsk="";
    this.backendservice.wsCall(this.getJsonParaUser,this.backendservice.wsgetTruckTypeList).then(data =>
        {
            this.cboUOMList = data;
            this.cboUOMSource =  {
                dataType: 'json',
                dataFields:[ {name: 'Description'}, {name:'Code'},{name:'Ask'} ],
                localdata: this.cboUOMList,
            }
            this.cboUOMAdapter = new jqx.dataAdapter(this.cboUOMSource);   
        })  
}


  bindHeader()
  {
    this.bookingnoplaceholder = this.HeaderJson[0].BookingID;// "Booking No "+"- B000001";
    this.shipperlaceholder = this.HeaderJson[0].Shipper;// "Shipper Name "+"- Thura";
    this.agentplaceholder = this.HeaderJson[0].Agent;// "Agent Name "+"- Rayroom";
    this.statusplaceholder =  this.HeaderJson[0].BookingStatusAsk;//"Status "+"- Tally";
    this.trdateplaceholder =  this.HeaderJson[0].transactiondate;//"Transactoin Date "+"- 10/01/2018";
  }
 createGrid()
  {this.source  =
    {
      datafields: [
        { name: 'AgentAsk', type: 'string' },
        { name: 'Ask', type: 'string' },
        { name: 'BookingID', type: 'string' },
        { name: 'BookingStatusAsk', type: 'string' },
        { name: 'CargoReceivedDate', type: 'string' },
        { name: 'CountryAsk', type: 'string' },
        { name: 'NoOfContainer', type: 'string' },
        { name: 'NoOfTruck', type: 'string' },
        { name: 'POAsk', type: 'string' },
        { name: 'PONo', type: 'string' },
        { name: 'POReferenceNo', type: 'string' },
        { name: 'PORemark', type: 'string' },
        { name: 'POShippingMark', type: 'string' },
        { name: 'POStatus', type: 'string' },
        { name: 'SKUAsk', type: 'string' },
        { name: 'SKUDamageQty', type: 'string' },
        { name: 'SKUDamagephoto', type: 'string' },
        { name: 'SKUDetails', type: 'string' },
        { name: 'SKUDimensionBase', type: 'string' },
        { name: 'SKUDimensionHeight', type: 'string' },
        { name: 'SKUDimensionWidth', type: 'string' },
        //{ name: 'SKUDimension', type: 'string' },                
        { name: 'SKUGoodQty', type: 'string' },
        { name: 'SKUGoodphoto', type: 'string' },
        { name: 'SKUName', type: 'string' },
        { name: 'SKUOverlandQty', type: 'string' },
        { name: 'SKUOverlandphoto', type: 'string' },
        { name: 'SKUPlanQty', type: 'string' },
        { name: 'SKUReceivedQty', type: 'string' },
        { name: 'SKUReference', type: 'string' },
        { name: 'SKURemark', type: 'string' },
        { name: 'SKUShortLandQty', type: 'string' },
        { name: 'SKUShortLandphoto', type: 'string' },
        { name: 'SKUStatus', type: 'string' },
        { name: 'SKUTruckID', type: 'string' },
        { name: 'SKUTruckType', type: 'string' },
        { name: 'SKUUOMAsk', type: 'string' },
        { name: 'SKUWeight', type: 'string' },
        { name: 'Shipper', type: 'string' },
        { name: 'ShipperAsk', type: 'string' },
        { name: 'ShipperDetails', type: 'string' },
        { name: 'ShipperName', type: 'string' },
        { name: 'Signature', type: 'string' },
        { name: 'SignatureDate', type: 'string' },
        { name: 'TransactionDate', type: 'string' },
        { name: 'TruckAsk', type: 'string' },
        { name: 'TruckID', type: 'string' },
        { name: 'TruckRemark', type: 'string' },
        { name: 'TruckStatus', type: 'string' },
        { name: 'TruckTypeAsk', type: 'string' } ],
      localdata:this.DetailJson
        //[{"PONo": "001","ShippingMark": "SM-20180712001",	"ReferenceNo": "REF-A123/5","SKUName": "Salt",	"Dimission_W": "20","Dimission_H": "20",	"Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45",	"DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0","ShortLand": "0","OverLand": "0","TransactionDate": "20180712001","Remark": "Remark","Picture": ""},{"PONo": "002","ShippingMark": "SM-20180712002","ReferenceNo":"REF-A123/2","SKUName": "Chlorinator","Dimission_W": "25","Dimission_H": "25","Dimission_L": "25",	"CBM": "250","PlanedQTY": "45","ReceivedQTY": "50","DiffQTY": "5","UOM": "BAG","Weight": "8",	"TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "0","DamageCondition": "0",	"ShortLand":"0","OverLand": "5","TransactionDate": "20180712002",	"Remark": "Remark","Picture": ""},{"PONo": "003","ShippingMark": "SM-20180712003","ReferenceNo": "REF-A123/3","SKUName": "Fruid","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "40","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "40","DamageCondition": "0","ShortLand": "5","OverLand": "0","TransactionDate": "20180712003","Remark": "Remark","Picture": ""},{"PONo": "004","ShippingMark": "SM-20180712004","ReferenceNo": "REF-A123/4","SKUName": "Accessories","Dimission_W": "20","Dimission_H": "20","Dimission_L": "20","CBM": "250","PlanedQTY": "45","ReceivedQTY": "45","DiffQTY": "0","UOM": "BAG","Weight": "8","TruckID": "T-4568","TruckType": "4-Wheel","GoodCondition": "45","DamageCondition": "0",	"ShortLand": "0","OverLand": "0","TransactionDate": "20180712004","Remark": "Remark","Picture": ""}]
     }
  
    this.dataAdapter = new jqx.dataAdapter(this.source);  
    this. columns= [
      //display column
      { text: 'Booking', datafield: 'BookingID', width: 120,editable:false ,hidden:false },
      { text: 'Shipping Mark', datafield: 'POShippingMark', width: 100,editable: false,hidden:false },
      { text: 'PO', datafield: 'PONo', width: 120,editable: false,hidden:false },
      { text: 'SKU', datafield: 'SKUName', width: 120,editable: false,hidden:false },
      { text: 'D_L', datafield: 'SKUDimensionBase', width: 50,editable: false,hidden:false },
      { text: 'D_H', datafield: 'SKUDimensionHeight',width: 50,editable: false,hidden:false },
      { text: 'D_W', datafield: 'SKUDimensionWidth',width: 50,editable: false,hidden:false},                           
      { text: 'Dimission',width: 80,editable: false,hidden:false},                 
      { text: 'Quality', datafield: 'SKUPlanQty', width: 80,editable: false,hidden:false },
      { text: 'Received', datafield: 'SKUReceivedQty',width: 80, editable: false,hidden:false },
      { text: 'Diff',  width: 80,editable: false,hidden:false },
      { text: 'UOM', datafield: 'SKUUOMAsk',width: 80,editable: false,hidden:false },
      { text: 'Reference', datafield: 'POReferenceNo', width: 100,editable: false,hidden:false },
      { text: 'Truck ID', datafield: 'TruckID',width: 100,editable: false,hidden:false },
      { text: 'CBM', width: 80,editable: false,hidden:false },
      //hide column
      
      { text: 'AgentAsk', datafield: 'AgentAsk', width: 150,editable: false,hidden:true},
      { text: 'Ask', datafield: 'Ask', width: 150,editable: false,hidden:true },                   
      { text: 'BookingStatusAsk', datafield: 'BookingStatusAsk', width: 150,editable: false,hidden:true },
      { text: 'CargoReceivedDate', datafield: 'CargoReceivedDate', width: 150,editable: false,hidden:true },
      { text: 'CountryAsk', datafield: 'CountryAsk', width: 150,editable: false,hidden:true },
      { text: 'CustomIssuedDate', datafield: 'CustomIssuedDate', width: 150,editable: false,hidden:true },
      { text: 'NoOfContainer', datafield: 'NoOfContainer',width: 150,editable: false,hidden:true },
      { text: 'NoOfTruck', datafield: 'NoOfTruck', width: 150,editable: false,hidden:true },
      { text: 'POAsk', datafield: 'POAsk', width: 150,editable: false,hidden:true },               
      { text: 'PORemark', datafield: 'PORemark',width: 150,editable: false,hidden:true },     
      { text: 'POStatus', datafield: 'POStatus', width: 150,editable: false,hidden:true},
      { text: 'SKUAsk', datafield: 'SKUAsk',width: 150,editable: false,hidden:true },
      { text: 'SKUDamageQty', datafield: 'SKUDamageQty', width: 150,editable: false,hidden:true },
      { text: 'SKUDamagephoto', datafield: 'SKUDamagephoto', width: 150,editable: false,hidden:true },
      { text: 'SKUDetails', datafield: 'SKUDetails', width: 150,editable: false,hidden:true },
      { text: 'SKUGoodQty', datafield: 'SKUGoodQty', width: 150,editable: false,hidden:true},
      { text: 'SKUGoodphoto', datafield: 'SKUGoodphoto', width: 150,editable: false,hidden:true },                    
      { text: 'SKUOverlandQty', datafield: 'SKUOverlandQty',width: 150,editable: false,hidden:true },
      { text: 'SKUOverlandphoto', datafield: 'SKUOverlandphoto', width: 150,editable: false,hidden:true },  
      { text: 'SKUReference', datafield: 'SKUReference', width: 150,editable: false,hidden:true },
      { text: 'SKURemark', datafield: 'SKURemark', width: 150,editable: false,hidden:true },
      { text: 'SKUShortLandQty', datafield: 'SKUShortLandQty', width: 150,editable: false,hidden:true},
      { text: 'SKUShortLandphoto', datafield: 'SKUShortLandphoto',width: 150,editable: false,hidden:true },
      { text: 'SKUStatus', datafield: 'SKUStatus',width: 150,editable: false,hidden:true },
      { text: 'SKUTruckID":"",', datafield: 'SKUTruckID', width: 150,editable: false,hidden:true },
      { text: 'SKUTruckType', datafield: 'SKUTruckType',width: 150,editable: false,hidden:true },                    
      { text: 'SKUWeight', datafield: 'SKUWeight', width: 150,editable: false,hidden:true},
      { text: 'Shipper', datafield: 'Shipper',width: 150,editable: false,hidden:true },
      { text: 'ShipperAsk', datafield: 'ShipperAsk', width: 150,editable: false,hidden:true },
      { text: 'ShipperDetails', datafield: 'ShipperDetails', width: 150,editable: false,hidden:true },
      { text: 'ShipperName', datafield: 'ShipperName',width: 150,editable: false,hidden:true},
      { text: 'Signature', datafield: 'Signature', width: 150,editable: false,hidden:true },
      { text: 'SignatureDate', datafield: 'SignatureDate',width: 150,editable: false,hidden:true},
      { text: 'TransactionDate', TransactionDate: 'TransactionDate', width: 150,editable: false,hidden:true },
      { text: 'TruckAsk', datafield: 'TruckAsk', width: 150,editable: false,hidden:true },
      { text: 'TruckRemark', datafield: 'TruckRemark',width: 150,editable: false,hidden:true },
      { text: 'TruckStatus', datafield: 'TruckStatus', width: 150,editable: false,hidden:true },
      { text: 'TruckTypeAsk', datafield: 'TruckTypeAsk', width: 150,editable: false,hidden:true }
    ]
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
   // this.router.navigate(['lstexportchecker']);     
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





