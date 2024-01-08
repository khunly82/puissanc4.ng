import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sessionStart } from '../../store/session.state';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  fg!: FormGroup

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router,
    private readonly _store: Store
  ) { }

  ngOnInit(): void {
    this.fg = this._fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    if(this.fg.invalid) {
      return;
    }

    this._authService.login(this.fg.value).subscribe({
      next: data => {
        // en cas de succes
        this._router.navigate(['/']);
        this._store.dispatch(sessionStart({
          token: data.token,
          username: (jwtDecode(data.token) as any)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        }))
      },
      error: err => {
        // en cas d'erreur
        alert('impossible de se connecter')
      },
      // complete: () => {
        // qd l'observable a fini d'emettre
      // }
    })
  }

}
