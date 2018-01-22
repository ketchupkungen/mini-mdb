import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../../main-components/login/login.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [
    RestService
  ]
})

export class SidebarComponent {
	mySqlData: any;

	sidebar: LoginComponent;

  constructor(private restservice: RestService, private globalservice: GlobalService, private router: Router) {
    this.sidebar = new LoginComponent(restservice, router, globalservice);
  }

  @Output()
  close: EventEmitter<string> = new EventEmitter<string>();

	menuState:string = 'out';

  toggleMenu() {
  	//console.log('in child');
    this.close.emit('');

    // 1-line if statement that toggles the value:
    // this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  ngOnInit() {

  }

}
