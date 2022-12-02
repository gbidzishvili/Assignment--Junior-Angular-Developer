import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  list=[
    {
      mail:"g_bidzishvili",
      pn:10101000012,
      name:"giorgi",
      surname:"bidzishvili",
      birthDate:"15/05/2002",
      category:"VIP User",
      status:"active"

    },
    {
      mail:"n_chkadua",
      pn:10101000012,
      name:"nata",
      surname:"chkadua",
      birthDate:"13/11/2008",
      category:"user1",
      status:"active"

    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
