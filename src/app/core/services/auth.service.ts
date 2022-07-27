import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from 'firebase/compat/app';
import {ToastrService} from "ngx-toastr";
import {UserService} from "./user.service";
import {User} from "../../shared/models/user";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private toast: ToastrService,
    private userService: UserService
  ) {
  }

  async isLogged(): Promise<boolean> {
    const user = await firstValueFrom(this.auth.authState);
    return user != null;
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-email':
          this.toast.error('Correo no valido');
          break;
        case 'auth/user-disabled':
          this.toast.error('Ponte en contacto con el soporte de Nomi', 'Cuenta suspendida');
          break;
        case 'auth/user-not-found':
          this.toast.error('Correo no registrado', '');
          break;
        case 'auth/wrong-password':
          this.toast.error('Contraseña incorrecta');
          break;
        default:
          throw e;
      }
    }
  }

  async signUpWithEmailAndPassword(options: { firstName?: string, lastName?: string, email: string, password: string }): Promise<void> {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(options.email, options.password);
      await this.createUserFirestore(options.firstName ?? `User_${Date.now()}`, userCredential);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          this.toast.error('Ya existe una cuenta registrada con este correo', '');
          break;
        case 'auth/invalid-email':
          this.toast.error('Correo no valido');
          break;
        case 'auth/weak-password':
          this.toast.error('Contraseña insegura');
          break;
        default:
          throw e;
      }
    }
  }

  async signInProvider(providerId: 'google.com' | 'apple.com' | 'facebook.com' | 'password'): Promise<void> {
    await this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    const provider = new firebase.auth.OAuthProvider(providerId);
    try {
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const user = await this.userService.getById(userCredential.user!.uid);
      if (!user) {
        await userCredential.user?.delete();
        throw new Error('user not found');
      }
      const value = await firebase.auth().fetchSignInMethodsForEmail(userCredential.user?.email ?? "");
      if (!value.includes(providerId)) {
        await firebase.auth().currentUser?.linkWithCredential(userCredential.credential!);
      }
      await this.createUserFirestore("", userCredential);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/account-exists-with-different-credential':
          let message = 'Estas registrado con ';
          const methods = await firebase.auth().fetchSignInMethodsForEmail(e.email);
          for (let i = 0; i < methods.length; i++) {
            message += (i > 0 ? ' y ' : '') + (methods[i] === 'password' ? 'contraseña' : methods[i]);
          }
          this.toast.warning(message);
          break;
        case 'auth/cancelled-popup-request':
          this.toast.error('La operación tardo demasiado tiempo', 'Cancelado', {disableTimeOut: true});
          break;
        case 'auth/popup-blocked':
          this.toast.error(
            'Intenta con correo y contraseña, si no tienes una contraseña ve y dale en "recuperar mi contraseña", así podrás generar una para tu cuenta.',
            'Tu navegador bloqueo el popup'
          );
          break;
        case 'auth/popup-closed-by-user':
          this.toast.error('Cancelado por el usuario');
          break;
        default:
          throw e;
      }
    }
  }

  async createUserFirestore(fullName: string, userCredential: firebase.auth.UserCredential): Promise<void> {
    if (userCredential.additionalUserInfo?.isNewUser) {
      const user = new User();
      user.email = userCredential.user?.email ?? undefined;
      user.fullName = fullName || userCredential.user?.displayName || undefined;
      user.picture = userCredential.user?.photoURL ?? undefined;
      try {
        await this.userService.insert(user, userCredential.user!.uid);
      } catch (e) {
        await userCredential.user?.delete();
        throw e;
      }
    }
  }

  async recoverPassword(email: string): Promise<void> {
    try {
      await this.auth.sendPasswordResetEmail(email);
      this.toast.success(
        'Se envío un correo electrónico a ' + email + ' recuperar tu contraseña',
        'Correo enviado'
      );
    } catch (e: any) {
      switch (e.code) {
        case 'auth/invalid-email':
          this.toast.error('Correo no valido');
          break;
        case 'auth/user-not-found':
          this.toast.error('No existe una cuenta con este correo');
          break;
        default:
          throw e;
      }
    }
  }
}
