import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settallycheckforexport-w',
  templateUrl: './settallycheckforexport-w.component.html',
  styleUrls: ['./settallycheckforexport-w.component.css']
})
export class SettallycheckforexportWComponent implements OnInit {

  constructor() { }

  //grid 
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
  bookingno : any;

  //nooftrack textbox
  nooftrack : any;

  //noofcontainer textbox
  noofcontainer : any;

 
  

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
  {
    this.source  =
    {
        datafields: [
            { name: 'Doc No' },
            { name: 'Shipping Mark' },
            { name: 'Truck ID' },
            { name: 'Truck Type' },
            { name: 'SKU Name' },
            { name: 'Dimission_W' },
            { name: 'Dimission_H' },
            { name: 'Dimission_B' },
            { name: 'Received QTy' }, 
            { name: 'UOM' },
            { name: 'Date' },
            { name: 'Remark' }

        ],
        localdata:
        [
  
        ]
    }
    

  ngOnInit() {
  }

}
