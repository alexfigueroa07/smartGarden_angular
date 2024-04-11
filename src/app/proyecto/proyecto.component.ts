import { Component, OnInit } from '@angular/core';

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
  presencia: boolean = false; // LA PERSONA ESTA O NO??
  tiempoFuera: number = 0; // para contar cuanto tiempo no estoy en el tapete
  intervaloActual: any = null;
  contadorTiempoFuera: number = 0;
  estadoPrimeraPilaFuera: boolean[] = [false, false, false, false, false, false]; // Variable para guardar el estado de la primera pila cuando no hay presencia

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

    // Restaurar el estado de la primera pila si hay un estado previo almacenado
    if (this.estadoPrimeraPilaFuera.length > 0) {
      this.primeraPila = [...this.estadoPrimeraPilaFuera];
    }
  }

  desactivarPresencia(): void {
    this.presencia = false;

    clearInterval(this.intervaloActual);
    clearInterval(this.contadorTiempoFuera);
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

    // Guardar el estado actual de la primera pila en this.estadoPrimeraPilaFuera
    this.estadoPrimeraPilaFuera = [...this.primeraPila];

    this.reiniciarPrimeraPila(); // Reiniciar la primera pila
  }

  onActualizarPrimeraPila(): void {
    if (this.presencia) {
      this.primeraPila.push(true);
      this.primeraPila.shift();
      if (this.primeraPila.every((valor) => valor)) {
        this.segundaPila.shift();
        this.segundaPila.push(true);
        this.primeraPila.fill(false);
      }
    }

    // Verificar si ha pasado el límite de tiempo (8 horas = 480 minutos)
    const tiempoTotal = this.primeraPila.filter((valor) => valor).length * 10 + this.segundaPila.filter((valor) => valor).length * 60;
    if (tiempoTotal >= 480) {
      this.finalizarJornada();
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
      this.contadorTiempoFuera = this.tiempoFuera; // El contador de tiempo fuera acumulado toma el valor actual de tiempoFuera
    } else {
      // Si hay presencia, reiniciar el tiempo fuera
      this.tiempoFuera = 0;
    }
  }
  finalizarJornada(): void {
    // Detener los intervalos
    clearInterval(this.intervaloActual);
    clearInterval(this.contadorTiempoFuera);

    // Calcular el tiempo total de permanencia
    const tiempoPrimeraPila = this.primeraPila.filter((valor) => valor).length * 10;
    const tiempoSegundaPila = this.segundaPila.filter((valor) => valor).length * 60;
    const tiempoTotal = tiempoPrimeraPila + tiempoSegundaPila;

    // Mostrar mensaje de jornada terminada y resumen de datos
    alert('Jornada Terminada');
    console.log('Tiempo total de permanencia: ', tiempoTotal, ' minutos');
  }

}
