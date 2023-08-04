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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerPlantas();
    interval(10 * 60 * 1000).subscribe(() => {
      this.obtenerPlantas();
    });
  }

  obtenerPlantas() {
    const url = 'http://localhost:5000/api/plantas';
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.plantas = data; // Asignar el valor obtenido de la solicitud HTTP
        console.log(this.plantas);
      },
      (error) => {
        console.error('Error al obtener las plantas:', error);
      }
    );
  }
}




