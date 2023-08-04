import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Agrega esta línea
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MisPlantasComponent } from './mis-plantas/mis-plantas.component';
import { MiHuertoComponent } from './mi-huerto/mi-huerto.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ApiComponent } from './api/api.component';

const routes: Routes = [
  // Configura tus rutas aquí
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'misplantas',
    component: MisPlantasComponent
  },
  {
    path: 'miapi',
    component: ApiComponent
  },
  {
    path: 'mihuerto',
    component: MiHuertoComponent
  },
  {
    path: 'miproyecto',
    component: ProyectoComponent
  },
  {
    path: 'miperfil',
    component: PerfilComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ApiComponent,
    MiHuertoComponent,
    MisPlantasComponent,
    ProyectoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
