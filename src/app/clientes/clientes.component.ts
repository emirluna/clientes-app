import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../usuarios/auth.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

clientes: Cliente[];
paginador: any;


  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
          let page: number = +params.get('page');

          if (!page) {
            page = 0;
          }

          this.clienteService.getClientes(page)
                .pipe(
                  tap(response => {
                    console.log('ClientesComponent: tap 3');
                    (response.content as Cliente[]).forEach(cliente => console.log(cliente.name));
                  })
                ).subscribe(response => {
                  this.clientes = response.content as Cliente[];
                  this.paginador = response;
                });
            });
          }

  delete(cliente: Cliente): void{
    swal.fire({
      title: 'Estas seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)

        swal.fire(
          'Eliminado!',
          `El Cliente ${cliente.name} ha sido eliminado`,
          'success'
        )
      })
      }
    })
  }


}
