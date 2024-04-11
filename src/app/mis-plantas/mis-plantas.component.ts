import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mis-plantas',
  templateUrl: './mis-plantas.component.html',
  styleUrls: ['./mis-plantas.component.css']
})
export class MisPlantasComponent {

  usuarioSeleccionadoIndex: number = -1; // Aqui puse con 0 para que me traiga a la primer persona... este va a cabiar depende a lo que el usuario seleccione

  mostrarListaUsuarios: boolean = false;

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
  imgPerfil: string; // Campo para la URL de la imagen de perfil


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
    this.imgPerfil = '';

    // Realizar una solicitud GET al servidor Flask para obtener la información del usuario

    // Realizar una solicitud GET al servidor Flask para obtener la información de los usuarios
    this.http.get<any[]>('http://localhost:5000/api/usuarios').subscribe(
      (data) => {
        console.log('Datos de usuarios obtenidos:', data);

        this.usuarios = data;
        this.loadingUsuarios = false;
        this.cargarUsuarioEnFormulario(-1); //
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

    if (indice >= 0) {
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
        this.imgPerfil = usuarioSeleccionado.imgPerfil;
        // Agrega aquí las demás propiedades del usuario que deseas mostrar en el formulario
      }
    } else {
      // Deja los campos en blanco si el índice es -1
      this._id = '';
      this.nombre = '';
      this.apellido = '';
      this.area = '';
      this.checkout = null;
      this.checkin = null;
      this.fecha = new Date();
      this.temperatura = 0;
      this.imgPerfil = '';
    }
  }
}


