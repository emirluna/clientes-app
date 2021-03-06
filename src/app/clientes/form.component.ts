import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router, ActivatedRoute } from  '@angular/router';
import { ClienteService } from './cliente.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";
  public errores: string[];

  constructor(private clienteService: ClienteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.activatedRoute.params
      .subscribe(params =>{
        let id = params['id']
        if(id){
          this.clienteService.getCliente(id).subscribe(
            (cliente) => this.cliente = cliente
          )
        }
      })
  }

  public create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
     this.router.navigate(['/clientes'])
     swal.fire('Nuevo Cliete', `Cliente ${cliente.name} creado con exito!`, 'success')
   },
   err => {
     this.errores = err.error.errors as string[];
     console.error('Codigo de error enviado por el servidor: '+ err.status);
     console.error(err.error.errors);
   }
    );
    }

    update(): void{
      this.clienteService.update(this.cliente)
      .subscribe( cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente Actualizado', `Cliente ${cliente.name} actualizado con exito!`, 'success')
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error enviado por el servidor: '+ err.status);
        console.error(err.error.errors);
      }
    );
    }

}
