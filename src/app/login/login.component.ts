import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn = false;

  // Lógica de inicio de sesión
  login() {
    // Realiza la lógica de inicio de sesión aquí
    // Si el inicio de sesión es exitoso, establece isLoggedIn en true
    this.isLoggedIn = true;
  }

  // Lógica de cierre de sesión
  logout() {
    // Realiza la lógica de cierre de sesión aquí
    // Si el cierre de sesión es exitoso, establece isLoggedIn en false
    this.isLoggedIn = false;
  }
}
