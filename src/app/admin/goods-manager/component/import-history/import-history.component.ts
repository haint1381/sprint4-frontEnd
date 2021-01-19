import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-import-history',
  templateUrl: './import-history.component.html',
  styleUrls: ['./import-history.component.css']
})
export class ImportHistoryComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  routerManager(managerGoods: string): void {
    this.router.navigateByUrl(managerGoods);
  }
}
