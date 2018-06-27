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
      localdata: this.data
  };

  getAdapter(source: any): any {
      // create data adapter and perform data
      return new jqx.dataAdapter(this.source, { autoBind: true });
  };

  records = this.getAdapter(this.source).getRecordsHierarchy('id', 'parentid', 'items', [{ name: 'text', map: 'label' }]);

  itemclick(event: any): void {
      //this.eventLog.nativeElement.innerHTML = 'Id: ' + event.args.id + ', Text: ' + event.args.innerText;   
      if(event.args.id == 1)
      {
        this.Routeform('home');
      }
      else if(event.args.id == 3)
      {
        this.onlogout();
      }
      else if(event.args.id == 4)
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
