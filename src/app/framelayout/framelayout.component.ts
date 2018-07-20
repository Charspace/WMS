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


@Component({
  selector: 'app-framelayout',
  templateUrl: './framelayout.component.html',
  styleUrls: ['./framelayout.component.css']
})
export class FramelayoutComponent implements OnInit {
  @ViewChild('employees') employees: ElementRef;
  @ViewChild('eventLog') eventLog: ElementRef;
  MenuAdapter : any;  
  MenuList : any = [];
  MenuSource : any = [];
  MenuRecord: any=[];
  ParameterJson={"UserID":"","Password":"","ProductAsk":""}; 

  top: number = 0;
  left: number = -50;
  username : any = window.sessionStorage.getItem("userid")
  

//     menudata = [
//     {
//         "SubMenuWidth": "250px",
//         "id": "1",
//         "parentid": "-1",
//         "text": "Dashboard"
//     },
//     {
//         "SubMenuWidth": "250px",
//         "id": "2",
//         "parentid": "-1",
//         "text": "Import"
//     },
//     {
//         "SubMenuWidth": "250px",
//         "id": "3",
//         "parentid": "-1",
//         "text": "Export"
//     },
//     {
//         "SubMenuWidth": "250px",
//         "id": "4",
//         "parentid": "-1",
//         "text": "Setting "
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "5",
//         "parentid": "3",
//         "text": "Direct Export"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "6",
//         "parentid": "3",
//         "text": "Warehouse"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "7",
//         "parentid": "2",
//         "text": "Upload Excel Plan Receive"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "8",
//         "parentid": "2",
//         "text": "Plan Receive For Import"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "9",
//         "parentid": "2",
//         "text": "Tally Check"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "10",
//         "parentid": "2",
//         "text": "Import Checker"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "11",
//         "parentid": "2",
//         "text": "Barcode Mapping"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "12",
//         "parentid": "2",
//         "text": "Pick List Create"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "13",
//         "parentid": "5",
//         "text": "Plan Receive For Export"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "14",
//         "parentid": "5",
//         "text": "Tally Check For Export"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "15",
//         "parentid": "5",
//         "text": "Export Checker"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "16",
//         "parentid": "5",
//         "text": "Barcode Mapping For Export"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "17",
//         "parentid": "5",
//         "text": "Pick List Create For Export"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "18",
//         "parentid": "6",
//         "text": "Plan Receive For Export (W)"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "19",
//         "parentid": "6",
//         "text": "Tally Check For Export (W)"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "20",
//         "parentid": "6",
//         "text": "Export Checker (W)"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "21",
//         "parentid": "6",
//         "text": "Barcode Mapping For Export (W)"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "22",
//         "parentid": "6",
//         "text": "Pick List Create(W)"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "23",
//         "parentid": "4",
//         "text": "User"
//     },
//     {
//         "SubMenuWidth": "",
//         "id": "24",
//         "parentid": "4",
//         "text": "MenuGroup"
//     }
// ]

  // prepare the data
  // source =
  // {
  //     datatype: 'json',
  //     datafields: [
  //         { name: 'id' },
  //         { name: 'parentid' },
  //         { name: 'text' },
  //         { name: 'subMenuWidth' }
  //     ],
  //     id: 'id',
  //     localdata: this.MenuList
  // };

  // getAdapter(source: any): any {
  //     // create data adapter and perform data
  //     return new jqx.dataAdapter(this.source, { autoBind: true });
  // };

  // records = this.getAdapter(this.source).getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);



  
  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  {      
    this.username = "Aung Aung";
    this.username = window.sessionStorage.getItem("userid")
    this.bindParameterJson();
    this.bindAccessMenuList();
  } 
  
  bindAccessMenuList()
  {    
      //var jsonbody = {"UserID":"Admin","Password":"123","ProductAsk":"11"}

      this.backendservice.wsCall(this.ParameterJson,this.backendservice.wsgetAccessMenuList).then(data =>
      {       
          this.MenuList = data;
          // alert(JSON.stringify( this.ParameterJson));
          //alert(JSON.stringify( this.MenuList));
          this.MenuSource ={
              dataType: 'json',
              dataFields: [ { name: 'StatusName'}, { name: 'Ask'}  ],
              localdata: this.MenuList
          }
          this.MenuAdapter = new jqx.dataAdapter(this.MenuSource);      
          this.createAccessMenu();   
      })
  }

  public bindParameterJson()
  {
      //alert( this.ParameterJson.AgentAsk= this.cboagentcombo.val());
      this.ParameterJson.UserID= window.sessionStorage.getItem("userid");// this.backendservice.LoginUser;
      this.ParameterJson.Password=window.sessionStorage.getItem("password");// this.backendservice.LoginPwd;
      this.ParameterJson.ProductAsk="11";//window.sessionStorage.getItem("productask");//this.backendservice.ProductName;   
  }
  createAccessMenu()
  {
    this.MenuSource =
      {
          datatype: 'json',
          datafields: [
              { name: 'id' },
              { name: 'parentid' },
              { name: 'text' },
              { name: 'subMenuWidth' }
          ],
          id: 'id',
          localdata: this.MenuList
      };     
    this.MenuRecord = this.getAdapter(this.MenuSource).getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);
  }

  getAdapter(source: any): any {
    // create data adapter and perform data
    return new jqx.dataAdapter(this.MenuSource, { autoBind: true });
  };

  itemclick(event: any): void {
    //this.eventLog.nativeElement.innerHTML = 'Id: ' + event.args.id + ', Text: ' + event.args.innerText;   
    if(event.args.id == 1)
    {
      this.Routeform('home');
    }
    
    else if(event.args.id == 7)
    {
      this.Routeform('lstuploadexcelplanreceive');
    }
    else if(event.args.id == 8)
    {
      this.Routeform('lstplanreceiveforimport');
    }
    else if(event.args.id == 9)
    {
      this.Routeform('lsttallycheck');
    }
    else if(event.args.id == 10)
    {
      this.Routeform('lstimportchecker');
    }
    else if(event.args.id == 11)
    {
      this.Routeform('lstbarcodemapping');
    }
    else if(event.args.id == 12)
    {
      this.Routeform('lstpicklistcreate');
    }
    else if(event.args.id == 13)
    {
      this.Routeform('lstplanreceiveforexport');
    }
    else if(event.args.id == 14)
    {
      this.Routeform('lsttallycheckforexport');
    }
    else if(event.args.id == 15)
    {
      this.Routeform('lstexportchecker');
    }
    else if(event.args.id == 16)
    {
      this.Routeform('lstbarcodemappingforexport');
    }
    else if(event.args.id == 17)
    {
      this.Routeform('lstpicklistcreateforexport');
    }
    else if(event.args.id == 18)
    {
      this.Routeform('lstplanreceiveforexport-w');
    }
    else if(event.args.id == 19)
    {
      this.Routeform('lsttallycheckforexport-w');
    }
    else if(event.args.id == 20)
    {
      this.Routeform('lstexportchecker');
    }
    else if(event.args.id == 21)
    {
      this.Routeform('lstlstbarcodemappingforexport-w');
    }
    else if(event.args.id == 22)
    {
      this.Routeform('lstallocationforexport-w');
    }
    else if(event.args.id == 23)
    {
      this.Routeform('lstpicklistcreate-w');
    }
    else if(event.args.id == 24)
    {
      this.Routeform('lstdeliverforexport-w');
    }
    else if(event.args.id == 25)
    {
      this.Routeform('lstuser');
    }
    else if(event.args.id == 26)
    {
      this.Routeform('lstmenugroup');
    }
 
  };


  ngAfterViewInit() {

 /*    let data = new Array();
    let firstNames = ['POS', 'HR', 'Payroll', 'Attendance', 'Supply Chain', 'Hospital', 'Hotel'];
 
    for (let i = 0; i < firstNames.length; i++) {
        let row = {};
        row['firstname'] = firstNames[i];
        // row['lastname'] = lastNames[i];
        //row['title'] = titles[i];
        let imgurl = '../images/' + firstNames[i].toLowerCase() + '.png';
        let img = '<img height="50" width="45" src="' + imgurl + '"/>';
        let table = '<table style="min-width: 150px;"><tr><td style="width: 55px;" rowspan="2">' + img + '</td><td>' + firstNames[i] + '</td></tr><tr><td>' + '</td></tr></table>';
        this.employees.nativeElement.innerHTML += table;
    } */
}

  btnnewclick()
  {
    
  }
  Routeform(formname)
  {
    this.router.navigate([formname]);
  }

  onlogout()
  {
    sessionStorage.clear();    
    console.log("session storage length : " + sessionStorage.length);
    //console.log("userid after logout: " + this.userid);
    this.router.navigate(['login']);
  }

  ngOnInit() {
  }

}
