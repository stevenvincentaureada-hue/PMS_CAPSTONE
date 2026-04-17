import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/module/shared/shared.module';
import { Router } from '@angular/router';
import { AuthResponse } from '../../../shared/models/auth-response.model';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthRegisterRequest } from '../../../shared/models/auth-register.model';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email = '';
  password = '';
  first_name = '';
  middle_name = '';
  last_name = '';
  address = '';
  phone_number = '';
  license_number = '';
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const payload: AuthRegisterRequest = {
      email: this.email,
      password: this.password,
      first_name: this.first_name,
      middle_name: this.middle_name,
      last_name: this.last_name,
      address: this.address,
      phone_number: this.phone_number,
      license_number: this.license_number,
    };

    this.authService.register(payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => alert(err.error.message),
    });
  }
}
