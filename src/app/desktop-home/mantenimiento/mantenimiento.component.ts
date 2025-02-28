import { Component, OnInit } from '@angular/core';
import { Cuota, CuotasService } from '../../../services/cuota.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-mantenimiento',
  imports: [BrowserModule,FormsModule],
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})

export class MantenimientoComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}