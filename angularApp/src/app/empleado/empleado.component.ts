import { Component, OnInit } from '@angular/core';

import { EmpleadoService } from '../shared/empleado.service';
//import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NgForm } from '@angular/forms';

import { Empleado } from '../shared/empleado.model';

//Declaramos esta variable para llamar a la funcion toast (https://materializecss.com/toasts.html), que se usa en
//la funcion onSubmit() de abajo.
declare var M: any;

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadoComponent implements OnInit {

  constructor(private empleadoService: EmpleadoService) { }

  //Al poner por ejemplo, la funcion resetForm aqui, permitimos que se le pueda pasar el parametro form a la misma.
  ngOnInit() {
    this.resetForm();
    this.refrescarListaEmpleados();
  }

  //Se ejecuta al accionar el boton Reset. El parametro form puede ser nulo.
  //Si el parametro form es nulo, se ejecuta lo que está afuera del condicional, o sea solo limpia los campos.
  //Si el parametro form no es nulo (es decir, se seleccionó un formulario que esta siendo modificado), se ejecuta
  //la funcion form.reset() que lo resetea.
  resetForm(form? : NgForm) {
    if (form)
      form.reset();
    this.empleadoService.empleadoSeleccionado = {
      _id: "",
      nombre: "",
      posicion: "",
      localidad: "",
      salario: null
    }
  }

  //En este metodo consumimos el post request que esta en el archivo empleadoController.js
  //Y llamamos a la funcion postEmpleado que esta en el archivo empleado.service.ts
  //La funcion postEmpleado retorna un observable, entonces podemos llamar a la funcion suscribe().
  //Despues de insertar un nuevo registro resetea el formulario (llama a la funcion reset).
  //El condicional (form.value._id == "") es para verificar si se trata de una operacion insert o update, en caso
  //de que el id sera nulo, entonces se procedera con la operacion insert, caso contrario un update.
  //Para el update se tiene que consumir la funcion put del proyecto, para lo cual definimos la funcion putEmpleado()
  //en el archivo empleado.service.ts.

  /*
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.empleadoService.postEmpleado(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaEmpleados();
        M.toast({ html: 'Empleado guardado', classes: 'rounded' });
      });
    }
    
    else {
      this.empleadoService.putEmpleado(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaEmpleados();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }
  */

  
  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.empleadoService.postEmpleado(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaEmpleados();
        M.toast({ html: 'Empleado guardado', classes: 'rounded' });
      });
    }
    else {
      this.empleadoService.putEmpleado(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refrescarListaEmpleados();
        M.toast({ html: 'Empleado actualizado', classes: 'rounded' });
      });
    }
  }
  
  

  //Retorna un observable de la funcion getListaEmpleados que esta definida en el archivo empleado.service.ts
  //Al retornar un observable, podemos usar la funcion subscribe().
  //Dentro de la callback function ((res) => {...}), dentro del parametro res, vamos a tener un arreglo de registros
  //de la collecion de empleados.
  //Entonces podemos asignarle ese arreglo del parametro res, al arreglo definido en el archivo empleado.service.ts
  // llamado "empleados" (empleados: Empleado[];).
  //Al hacer esto nos tiraria error porque estamos asignando un objeto dentro de un arreglo de empleados, por lo
  //que debemos castear res a un arreglo de empleados, para lo que añadimos la importacion 'import { Empleado }
  //from '../shared/empleado.model'; ' de arriba
  refrescarListaEmpleados() {
    this.empleadoService.getListaEmpleados().subscribe((res) => {
      this.empleadoService.empleados = res as Empleado[];
    })
  }

  //El parametro emp se setea al empleadoSeleccionado del archivo empleado.service.ts
  /*
  onEdit(emp: Empleado) {
    this.empleadoService.empleadoSeleccionado = emp;
  }
  */

  onEdit(emp: Empleado) {
    this.empleadoService.empleadoSeleccionado = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('¿Seguro que querés borrar éste empleado?') == true) {
      this.empleadoService.borrarEmpleado(_id).subscribe((res) => {
        this.refrescarListaEmpleados();
        this.resetForm(form);
        M.toast({ html: 'Borrado exitoso', classes: 'rounded' });
      });
    }
  }

}
