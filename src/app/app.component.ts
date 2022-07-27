import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";
import {UserService} from "./core/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba';
  loading = false;

  constructor(private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.authService.currentUser().subscribe(value => {
      if (value) {
        this.userService.getById(value.uid).then(user => {
          this.userService.changeUser(user);
        });
      }
    });
  }
}
