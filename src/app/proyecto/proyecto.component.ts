import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  primeraPila: boolean[] = [false, false, false, false, false, false];
  segundaPila: boolean[] = [false, false, false, false, false, false, false, false];
  tiempoExcedido: boolean = false;
  personaExcedida: any = {};
  presencia: boolean = false; //LA PERSONA ESTA O NO??
  tiempoFuera: number = 0; //para contar cuanto tiempo no estoy en el tapete
  intervaloActual: any = null;

  constructor() { }
  ngOnInit(): void {
    // Primer intervalo para actualizar la primera pila cada 10 minutos
    setInterval(() => {
      this.onActualizarPrimeraPila();
    }, 600);

    // Segundo intervalo para contar el tiempo fuera cada minuto
    setInterval(() => {
      this.contarTiempoFuera();
    }, 60);
  }

  activarPresencia(): void {
    this.presencia = true;
    // Limpiar el intervalo existente antes de iniciar uno nuevo
    if (this.intervaloActual) {
      clearInterval(this.intervaloActual);
    }
    this.intervaloActual = setInterval(() => {
      this.onActualizarPrimeraPila();
    }, 600); // INTERVALO MODIFICADO PARA 10 MINUTOS
  }
  desactivarPresencia(): void {
    this.presencia = false;
    if (this.intervaloActual) {
      clearInterval(this.intervaloActual);
    }
    this.tiempoExcedido = true;
    const tiempoPrimeraPila = this.primeraPila.filter((valor) => valor).length * 10; // Tiempo de la primera pila en minutos (10 minutos por posición true)
    const tiempoSegundaPila = this.segundaPila.filter((valor) => valor).length * 60; // Tiempo de la segunda pila en minutos (60 minutos por posición true)
    const tiempoTotal = tiempoPrimeraPila + tiempoSegundaPila; // Tiempo total en minutos
    this.personaExcedida = {
      nombre: 'MARIA EMPLEADO #432',
      tiempo: tiempoTotal,
    };
    this.reiniciarPrimeraPila(); // Reiniciar la primera pila
  }

  onActualizarPrimeraPila(): void {
    if (this.presencia) {
      // Si hay presencia en el botón, activar una posición más en la primera pila
      this.primeraPila.push(true);
      this.primeraPila.shift(); // Eliminamos el elemento más antiguo de la pila
      if (this.primeraPila.every((valor) => valor)) {
        // Si la primera pila está completamente llena, agregar un valor true al principio de la segunda pila
        this.segundaPila.shift(); // Eliminamos el elemento más antiguo de la segunda pila
        this.segundaPila.push(true); // Agregamos un nuevo elemento true al final de la segunda pila
        this.primeraPila.fill(false); // Reiniciar la primera pila
      }
    }
  }

  reiniciarPrimeraPila(): void {
    // Reiniciar la primera pila o movemos todo a false
    this.primeraPila = [false, false, false, false, false, false];
  }

  contarTiempoFuera(): void {
    if (!this.presencia) {
      // Si no hay presencia, incrementar el tiempo fuera
      this.tiempoFuera++;
    } else {
      // Si hay presencia, reiniciar el tiempo fuera
      this.tiempoFuera = 0;
    }
  }
}