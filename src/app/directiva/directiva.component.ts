import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {

    listCourses: string[] = ['TypeScript', 'JavaScript', 'JavaSE',
                            'C#', 'PHP'];
    habilitar: boolean = true;
    txtButton: string = 'ocultar';
  constructor() { }

  setHabilitar(): void {
    this.habilitar = (this.habilitar==true)? false: true;
    this.txtButton = (this.txtButton=='ocultar')? 'mostrar': 'ocultar';
  }

  ngOnInit(): void {
  }

}
