import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { combineLatest, merge } from 'rxjs';
import { debounceTime, mapTo, startWith } from 'rxjs/operators';
import { repeatableFields } from '../../models/minuta.models';
import { AlertService } from '../../../../../ui/alert/services/alert.service';

@Component({
  selector: 'app-repeteable-field',
  templateUrl: './repeteable-field.component.html',
  styleUrls: ['./repeteable-field.component.scss'],
})
export class RepeteableFieldComponent implements OnInit {
  @Input() controlName!: repeatableFields;

  @Output() data: EventEmitter<{ form: any; type: repeatableFields }> =
    new EventEmitter<{ form: any; type: repeatableFields }>();

  formRepeatable!: FormGroup;
  activeButtonAddForm: boolean = false;

  // Getters and Setters

  get nombreValue() {
    return this.formRepeatable.controls['nombre'];
  }
  get detailsValue() {
    return this.formRepeatable.controls['details'];
  }

  constructor(private _fb: FormBuilder, private _aler: AlertService) {}

  ngOnInit(): void {
    this.formRepeatable = this._fb.group({
      nombre: ['', [Validators.minLength(5)]],
      details: ['', [Validators.minLength(5)]],
    });
  }

  getErrorMessage(field: string) {
    return (
      this.formRepeatable.controls[field]?.errors &&
      this.formRepeatable.controls[field]?.touched
    );
  }

  addForm() {
    if (this.nombreValue.value === '') {
      this._aler.opendAlert('Falta nombre', 'Agrege un nombre', 'warning');
      return;
    }

    if (this.detailsValue.value === '') {
      this._aler.opendAlert('Falta Detalles', 'Agrege los detalles', 'warning');
      return;
    }

    if (this.nombreValue.value !== '' && this.detailsValue.value !== '') {
      this.data.emit({
        form: this.formRepeatable.value,
        type: this.controlName,
      });
      this.formRepeatable.reset();

      // seteamos el los value para evitar BUG
      this.nombreValue.setValue('');
      this.detailsValue.setValue('');
    }
  }
}
