import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Empleado } from './empleado.model';

//Dentro de la variable empleados se guardaran todos los empleados de la coleccion de mongo.
//Con la variable empleadoSeleccionado diseñamos un formulario para las operaciones de insertar y actualizar.
@Injectable()
export class EmpleadoService {
  empleadoSeleccionado: Empleado;
  empleados: Empleado[];
  readonly baseURL = 'http://localhost:3000/empleados';


  //Para hacer el post request necesario para la funcion onSubmit del archivo empleado.component.ts, se necesita
  //hacer un http request en el proyecto NodeJS, para eso usmos HttpClient.. Primeramente debemos inyectarlo en
  //el constructor
  constructor(private http : HttpClient) { }

  //Luego llamamos a esa variable privada que definimos en el constructor de arriba (http) con la funcion post().
  //Le pasamos como parametro la URL definida arriba.
  //Podemos llamar a esta funcion desde el archivo empleado.component.ts, de hecho, lo hacemos en la funcion onSubmit().
  postEmpleado(emp: Empleado) {
    return this.http.post(this.baseURL, emp);
  }

  //Devuelve la lista de empleados, por eso se le pasa como parametro baseURL, que esta definido arriba.
  //Se llama a esta funcion desde el archivo empleado.component.ts, desde la funcion refrescarListaEmpleados().
  getListaEmpleados() {
    return this.http.get(this.baseURL);
  }

  //Para consumir el put, en http llamamos a la funcion put() pasandole de parametro http://localhost:3000/{idDelEmpleado}.
  //Y como segundo parametro le pasamos emp, que es el objeto Empleado que queremos updatear.
  /*
  putEmpleado(emp: Empleado) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }
  */

  putEmpleado(emp: Empleado) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

  borrarEmpleado(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
