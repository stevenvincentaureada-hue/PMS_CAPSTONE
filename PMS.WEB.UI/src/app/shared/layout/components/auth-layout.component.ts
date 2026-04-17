import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `<div class="auth-layout">
    <div class="container-fluid vh-100">
      <div class="row h-100 g-0">
        <div
          class="col-md-7 d-none d-md-flex flex-column justify-content-between p-5 text-white bg-success"
        >
          <div class="d-flex align-items-center gap-2">
            <span class="material-symbols-outlined">shield_with_heart</span>
            <div class="d-block">
              <h5 class="fw-bold m-0 text-uppercase fs-3 playfair text-white">
                Pampanga Medical Society
              </h5>
              <div class="divider"></div>
              <p class="fw-bold text-success mb-o text-uppercase">
                Member Portal System
              </p>
            </div>
          </div>

          <div class="px-5">
            <h1 class="display-3 fw-bold text-white">Integrated</h1>
            <h1 class="display-3 fw-bold text-white">Membership &</h1>
            <h1 class="display-3 fw-bold text-white">CPD Management</h1>
            <hr class="w-25 border-3" />
            <p class="text-uppercase small opacity-75">
              Stability through innovation
            </p>
          </div>

          <div class="small opacity-50 text-uppercase">
            Authorized Access Only
          </div>
        </div>

        <div
          class="col-md-5 d-flex align-items-center justify-content-center bg-light"
        >
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .bg-success {
        background: linear-gradient(135deg, #003d2b, #065f46) !important;
      }
      .container,
      .container-fluid,
      .container-lg,
      .container-md,
      .container-sm,
      .container-xl,
      .container-xxl {
        --ds-gutter-x: unset !important;
      }
      .divider {
        height: 1px;
        background-color: #dee2e6;
        margin: 5px 0;
      }
      .playfair {
        font-family: 'Playfair Display SC', serif;
      }
    `,
  ],
})
export class AuthLayoutComponent {}
