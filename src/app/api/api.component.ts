import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {
  respuestaAPI: any; // Variable para almacenar la respuesta de la API
  nuevoCarro: string | undefined; // Variable para almacenar el nuevo carro ingresado

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerDatosAPI();
  }

  obtenerDatosAPI(): void {
    this.http.get('http://localhost:5000/api/hola').subscribe(
      (response: any) => {
        this.respuestaAPI = response;
        console.log(response);
      },
      (error: any) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

  agregarCarro(): void {
    const nuevoCarroData = { car: this.nuevoCarro };
    this.http.post('http://localhost:5000/api/nuevo_car', nuevoCarroData).subscribe(
      (response: any) => {
        this.respuestaAPI = response;
        this.nuevoCarro = ''; // Limpiar el campo después de agregar el carro
      },
      (error: any) => {
        console.error('Error en la solicitud HTTP:', error);
      }
    );
  }

  consultarArreglo(): void {
    // Ordenar el arreglo
    const arregloOrdenado = this.respuestaAPI.mensaje.sort();
    console.log(arregloOrdenado);

    // Si deseas mostrar el arreglo ordenado en la página, asigna la variable a la propiedad respuestaAPI
    this.respuestaAPI.mensaje = arregloOrdenado;
  }
}