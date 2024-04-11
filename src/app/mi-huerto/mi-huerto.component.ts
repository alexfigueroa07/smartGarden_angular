import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';

/* interface Planta {
  _id: string;
  nombre: string;
  descripcion: string;
  radiacionsolar: number;
  humedad: number;
  temperatura: number;
  ultimoriego: Date; // Cambiar el tipo a Date
}

 */

@Component({
  selector: 'app-mi-huerto',
  templateUrl: './mi-huerto.component.html',
  styleUrls: ['./mi-huerto.component.css']
})
export class MiHuertoComponent implements OnInit {
  plantas: any[] = []; // Inicializar la variable plantas como una lista vacía
  alumnos: any[] = []; // Inicializar la variable de alumnos ahora como una lista vacía


  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.obtenerDatos();
    interval(10 * 60 * 1000).subscribe(() => {
      this.obtenerDatos();
    });
  }

  obtenerDatos() {
    // Obtener plantas
    const urlPlantas = 'http://localhost:5000/api/plantas';
    this.http.get<any[]>(urlPlantas).subscribe(
      (data) => {
        this.plantas = data; // Asignar el valor obtenido de la solicitud HTTP
        console.log('Plantas:', this.plantas);
      },
      (error) => {
        console.error('Error al obtener las plantas:', error);
      }
    );

    // Obtener alumnos
    const urlAlumnos = 'http://localhost:5000/api/alumnos';
    this.http.get<any[]>(urlAlumnos).subscribe(
      (data) => {
        this.alumnos = data; // Asignar el valor obtenido de la solicitud HTTP
        console.log('Alumnos:', this.alumnos);
      },
      (error) => {
        console.error('Error al obtener los alumnos:', error);
      }
    );
  }
}
