import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../../core/services/auth.service";
import {Router} from "@angular/router";
import {RouteNames} from "../../../../shared/constants/route-names";

@Component({
  selector: 'app-charging',
  templateUrl: './charging.component.html',
  styleUrls: ['./charging.component.css']
})
export class ChargingComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLogged().then(value => {
      if (value) {
        this.router.navigate([RouteNames.TODO_LIST]);
      } else {
        this.router.navigate([RouteNames.AUTH]);
      }
    })
  }

}
