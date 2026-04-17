import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared/shared.module';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthLoginRequest } from '../../../shared/models/auth-login.model';
import { AuthResponse } from '../../../shared/models/auth-response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const payload: AuthLoginRequest = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error(err.error.message);
        alert(err.error.message);
      },
    });
  }
}
