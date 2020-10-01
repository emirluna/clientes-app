import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { Router } from  '@angular/router';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public cliente: Cliente = new Cliente();
  public titulo: string = "Crear cliente";


  constructor(private clienteService: ClienteService,
  private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    this.clienteService.create(this.cliente)
    .subscribe(cliente => {
     this.router.navigate(['/clientes'])
     swal.fire('Nuevo Cliete', `Cliente ${cliente.name} creado con exito!`, 'success')
    }
    );
    }

}
