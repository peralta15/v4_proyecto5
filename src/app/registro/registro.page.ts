import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false

})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private alertCtrl: AlertController) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')]], // Solo letras y espacios
      password: ['', [Validators.required, Validators.minLength(8)]], // Mínimo 8 caracteres
      email: ['', [Validators.required, Validators.email]], // Email válido
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]] // Solo 10 números
    });
  }

  async guardarDatos() {
    if (this.registroForm.valid) {
      const alert = await this.alertCtrl.create({
        header: 'Registro Exitoso',
        message: 'Tus datos han sido guardados correctamente.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      this.registroForm.markAllAsTouched();
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, completa correctamente todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
