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

  top: number = 0;
    left: number = -50;
    username : any = window.sessionStorage.getItem("userid")

    menudata = [
      
    {
      'id': '35',
      'text': 'DashBoard',
      'parentid': '-1',
      'subMenuWidth': '250px'
  },
        
      {            
          'id': '1',
          'text': 'Import',
          'parentid': '-1',
          'subMenuWidth': '250px'
      }, {
          'id': '2',
          'parentid': '1',
          'text': ' Plan Receive (Excel)'
      }, {
          'id': '3',
          'parentid': '1',
          'text': 'Plan Receive'
      }, {
          'id': '4',
          'parentid': '1',
          'text': 'Tally Check'
      }, {
          'id': '5',
          'parentid': '1',
          'text': 'Checker'
      }, {
          'id': '6',          
          'parentid': '1',
    'text': 'Barcode Mapping',
          'subMenuWidth': '200px'
  }, {
          'id': '7',
          'text': 'Allocation',
          'parentid': '1',
          'subMenuWidth': '200px'
  }, {
          'id': '8',
          'text': 'Pick List',
          'parentid': '1',
          'subMenuWidth': '200px'
      }, {
          'id': '9',
          'parentid': '-1',
          'text': 'Export'
      }, {
          'id': '10',
          'text': 'Plan for Cargo Receive',
          'parentid': '9'
      }, {
          'id': '11',
          'text': 'Tally Check',
          'parentid': '9'
      }, {
          'id': '12',
          'text': 'Checker',
          'parentid': '9'
      }, {
          'id': '13',
          'text': 'Barcode Mapping',
          'parentid': '9'
      }, {
          'id': '14',
          'text': 'Allocation',
          'parentid': '9'
      }, {
          'id': '15',
          'text': 'Pick List',
          'parentid': '9'
      }, {
          'id': '16',
          'text': 'Stock',
          'parentid': '-1'
      }, {
          'id': '17',
          'text': 'Stock List',
          'parentid': '16'
      }, {
          'id': '18',
          'text': 'Report',
          'parentid': '-1'
   }, {
          'id': '19',
          'parentid': '18',
          'text': 'Container Receiving'
      }, {
          'id': '20',
          'parentid': '18',
          'text': 'Proudct - Location'
      }, {
          'id': '21',
          'parentid': '18',
          'text': 'Stock Count Document'
      }, {
          'id': '22',          
          'parentid': '18',
    'text': 'Stock Adjustment',
          'subMenuWidth': '200px'
  }, {
          'id': '23',
          'text': 'Setting',
          'parentid': '-1',
          'subMenuWidth': '200px'
  }, {
          'id': '24',
          'text': 'User Agent Consignee',
          'parentid': '23',
         
      }, {
          'id': '25',
          'parentid': '24',
          'text': 'User'
      }, {
          'id': '26',
          'text': 'User Group',
          'parentid': '24'
      }, {
          'id': '27',
          'text': 'Agent',
          'parentid': '24'
      }, {
          'id': '28',
          'text': 'Consignee',
          'parentid': '24'
      }, {
          'id': '29',
          'text': 'Shipper',
          'parentid': '24'
      }, {
          'id': '30',
          'text': 'Warehouse/Stock',
          'parentid': '23'
      }, {
          'id': '31',
          'text': 'Location',
          'parentid': '30'      
      },
      {
        'id': '32',
        'text': this.username,
        'parentid': '-1',
        'subMenuWidth': '250px'
    },   
      {
        'id': '33',
        'text': 'Change Password',
        'parentid': '32',
        'subMenuWidth': '250px'
    },
    {
      'id': '34',
      'text': 'Logout',
      'parentid': '-1',
      'subMenuWidth': '250px'
    }
  ];

  /*
    data = [
      {
          'id': '1',
          'text': 'Home',
          'parentid': '-1',
          'subMenuWidth': '250px'
      },
      {
        'id': '5',
        'text': 'Warehouse',
        'parentid': '-1',
        'subMenuWidth': '250px'
    },
    {
      'id': '6',
      'text': 'Transfer',
      'parentid': '-1',
      'subMenuWidth': '250px'
  },
  {
    'id': '7',
    'text': 'Receive',
    'parentid': '-1',
    'subMenuWidth': '250px'
},
{
  'id': '8',
  'text': 'Product',
  'parentid': '-1',
  'subMenuWidth': '250px'
},
{
  'id': '1',
  'text': 'UserProfile',
  'parentid': '-1',
  'subMenuWidth': '250px'
},
{
  'id': '1',
  'text': 'Setting',
  'parentid': '-1',
  'subMenuWidth': '250px'
},

      {
        'id': '2',
        'text': this.username,
        'parentid': '-1',
        'subMenuWidth': '250px'
    },
      {
        'id': '3',
        'text': 'Logout',
        'parentid': '-1',
        'subMenuWidth': '250px'
      },
      {
        'id': '4',
        'text': 'Change Password',
        'parentid': '2',
        'subMenuWidth': '250px'
    },

    
    ];
    */

  // prepare the data
  source =
  {
      datatype: 'json',
      datafields: [
          { name: 'id' },
          { name: 'parentid' },
          { name: 'text' },
          { name: 'subMenuWidth' }
      ],
      id: 'id',
      localdata: this.menudata
  };

  getAdapter(source: any): any {
      // create data adapter and perform data
      return new jqx.dataAdapter(this.source, { autoBind: true });
  };

  records = this.getAdapter(this.source).getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

  itemclick(event: any): void {
      //this.eventLog.nativeElement.innerHTML = 'Id: ' + event.args.id + ', Text: ' + event.args.innerText;   
      if(event.args.id == 35)
      {
        this.Routeform('home');
      }
      else if(event.args.id == 34)
      {
        this.onlogout();
      }
      else if(event.args.id == 33)
      {
        this.Routeform('changepw');
      }
  };


  
  constructor(private route:ActivatedRoute,public backendservice:BackendService,private http: Http,private router: Router) 
  {      
    //bba git test
    this.username = "Aung Aung";
    this.username = window.sessionStorage.getItem("userid")
  }

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
