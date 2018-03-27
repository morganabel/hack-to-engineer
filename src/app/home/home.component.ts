import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';
import { Observable } from 'rxjs/Observable';
import { select } from '@angular-redux/store';
import { User } from '@app/user/user';
import { AuthService } from '@app/core/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { 
  }

  ngOnInit() {
    
  }

}
