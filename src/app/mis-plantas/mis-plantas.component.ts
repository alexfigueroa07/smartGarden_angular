import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-plantas',
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent {
  loadingUsuarios: boolean = true;
  // Propiedades del componente para almacenar los datos de los usuarios
  usuarios: any[]; // Cambia el tipo de dato según la estructura de tus usuarios
  _id: string;
  nombre: string;
  apellido: string;
  area: string;
  checkout: any; // Puedes ajustar el tipo de dato según la estructura de Timestamp
  checkin: any;  // Puedes ajustar el tipo de dato según la estructura de Timestamp
  fecha: Date;
  temperatura: number;

  constructor(private http: HttpClient) {
    console.log('Constructor MisPlantasComponent');

    // Inicializar las propiedades
    this.usuarios = [];
    this._id = '';
    this.nombre = '';
    this.apellido = '';
    this.area = '';
    this.checkout = null;
    this.checkin = null;
    this.fecha = new Date();
    this.temperatura = 0;

    // Realizar una solicitud GET al servidor Flask para obtener la información del usuario

    // Realizar una solicitud GET al servidor Flask para obtener la información de los usuarios
    this.http.get<any[]>('http://localhost:5000/api/usuarios').subscribe(
      (data) => {
        console.log('Datos de usuarios obtenidos:', data);

        this.usuarios = data;
        this.loadingUsuarios = false;
        // También puedes llenar los campos de entrada del formulario con los datos del primer usuario, si lo deseas
        this.cargarUsuarioEnFormulario(0); // Cambia el índice según el usuario que deseas mostrar en el formulario
      },
      (error) => {
        console.error('Error al obtener la información de los usuarios: ', error);
        this.loadingUsuarios = false;

      }
    );
  }

  // Función para cargar los datos del usuario seleccionado en el formulario
  cargarUsuarioEnFormulario(indice: number) {
    console.log('Cargando usuario en formulario:', indice);

    const usuarioSeleccionado = this.usuarios[indice];
    if (usuarioSeleccionado) {
      this._id = usuarioSeleccionado._id;
      this.nombre = usuarioSeleccionado.nombre;
      this.apellido = usuarioSeleccionado.apellido;
      this.area = usuarioSeleccionado.area;
      this.checkout = usuarioSeleccionado.checkout;
      this.checkin = usuarioSeleccionado.checkin;
      this.fecha = new Date(usuarioSeleccionado.fecha);
      this.temperatura = usuarioSeleccionado.temperatura;
      // Agrega aquí las demás propiedades del usuario que deseas mostrar en el formulario
    }
  }

}

/*   nombre: string;
  apellido: string;
  cargo: string;
  horaChecada: Date;
  horaSalida: Date;
  temperatura: number;
  fecha: Date;

  constructor() {
    // CAMBIAR ESTO A UN GET A MONGO... 
    this.nombre = 'HENRY';
    this.apellido = 'CAVIL';
    this.cargo = 'LINKTHINKS';
    this.horaChecada = new Date();
    this.horaChecada.setHours(8, 30, 0, 0);
    this.horaSalida = new Date();
    this.horaSalida.setHours(17, 15, 0, 0);
    this.temperatura = 0;
    this.fecha = new Date();
  } */

