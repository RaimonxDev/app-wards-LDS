import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ActionForm,
  tipoMinutas,
  Discursante,
  formControlRepeatable,
} from '../../models/minuta.models';
import { MinutaService } from '../../services/minuta.service';
import { AlertService } from '../../../../../ui/alert/services/alert.service';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { Observable } from 'rxjs';
import { repeatableFields } from '../../models/minuta.models';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss'],
})
export class TemplateFormComponent implements OnInit, AfterViewInit {
  // Outpus Inputs
  @Input() ActionForm!: ActionForm;

  @Output() DataForm = new EventEmitter<any>();

  // Variables
  tipoMinuta!: Observable<tipoMinutas[]>;
  formMinuta!: FormGroup;

  // Getters and Setters
  get discursantesArr() {
    return this.formMinuta.get('discursantes') as FormArray;
  }
  get relevosArr() {
    return this.formMinuta.get('relevos') as FormArray;
  }
  get sostenimientosArr() {
    return this.formMinuta.get('sostenimientos') as FormArray;
  }

  getAnyField(field: string) {
    return this.formMinuta.get(`${field}`);
  }

  constructor(
    private _fb: FormBuilder,
    private _minutaServices: MinutaService,
    private _alert: AlertService,
    private _authService: AuthService
  ) {}
  ngOnInit(): void {
    this.tipoMinuta = this._minutaServices.tiposDeMinuta$;

    this.initFormMinuta();
    if (this.ActionForm === 'crear') {
      // Formulario Vacio
      // this.formMinuta.patchValue({});
    }
    if (this.ActionForm === 'editar') {
      // Data a editar
      // this.formMinuta.patchValue({})
    }
  }
  ngAfterViewInit() {}

  initFormMinuta() {
    this.formMinuta = this._fb.group({
      tipos_de_minuta: ['', [Validators.required]],
      completa: [false],
      barrio: [this._authService.barrioID],
      preside: ['Presiente Inzunza', [Validators.required]],
      dirige: ['Obispo Hernandez', [Validators.required]],
      fecha: ['', [Validators.required]],
      preludioMusica: ['Himno 1'],
      reconocimientos: ['reconocimientos 1'],
      anuncios: ['reconocimientos 2'],
      primer_himno: ['himno2'],
      primera_oracion: ['oracion'],
      relevos: this._fb.array([]),
      sostenimientos: this._fb.array([]),
      himno_sacramental: ['himnos'],
      discursantes: this._fb.array([]),
      ultimo_himno: ['himno himnoFinal'],
      ultima_oracion: ['oracion final'],
    });
  }

  processData(data: { form: formControlRepeatable; type: repeatableFields }) {
    if (data.type === 'relevos') {
      const { nombre, llamamiento } = data.form;
      this.relevosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [llamamiento, [Validators.required]],
        })
      );
    }
    if (data.type === 'sostenimientos') {
      const { nombre, llamamiento } = data.form;
      this.sostenimientosArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          llamamiento: [llamamiento, [Validators.required]],
        })
      );
    }

    if (data.type === 'discursantes') {
      console.log(data.form, data.type);
      const { nombre, tema } = data.form;
      this.discursantesArr.push(
        this._fb.group({
          nombre: [nombre, [Validators.required]],
          tema: [tema, [Validators.required]],
        })
      );
    }
  }

  addAnuncios() {
    return null;
  }

  guardarMinuta() {
    if (
      this.discursantesArr.length !== 0 &&
      this.relevosArr.length !== 0 &&
      this.sostenimientosArr.length !== 0
    ) {
      this.formMinuta.controls['completa'].setValue(true);
    }
    this._minutaServices
      .createMinuta(this.formMinuta.value)
      .subscribe((resp) => {
        console.log(resp);
        this._alert.opendAlert('Creado', '', 'success');
      });
  }

  eliminarDiscursante(index: number) {
    this.discursantesArr.removeAt(index);
  }
  eliminarRelevo(index: number) {
    this.relevosArr.removeAt(index);
  }
  eliminarSostenimiento(index: number) {
    this.sostenimientosArr.removeAt(index);
  }
}
