import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseError } from '@angular/fire/app';
import { Injectable } from '@angular/core';

import { SigninSchema, SignupSchema } from '@/app/shared/models/interfaces';
import { TServiceResponse } from '@/app/core/models/interfaces';

@Injectable({
    providedIn: 'platform',
})
export class AuthService {
    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFireDatabase,
    ) {}

    async SignUp(data: SignupSchema): Promise<TServiceResponse> {
        try {
            const response = await this.afAuth.createUserWithEmailAndPassword(data.email, data.password);
            if (!response.user) {
                return {
                    success: false,
                    message: 'Error creating user',
                };
            }
            const uid = response.user.uid;
            const userData = {
                Id: uid,
                Name: data.name,
                Surname: data.surname,
                Email: data.email,
                Password: data.password,
            };
            this.db.list(`/Users/${uid}`).push(userData);
            return {
                success: true,
                message: 'User created successfully',
                data: userData,
            };
        } catch (error) {
            const isFirebaseError = error instanceof FirebaseError;
            if (!isFirebaseError) {
                return {
                    success: false,
                    message: (error as Error).message,
                };
            }
            const message = this.getFirebaseAuthErrorMessage(error.code);

            return {
                success: false,
                message,
            };
        }
    }

    async SignIn(data: SigninSchema) {
        try {
            const response = await this.afAuth.signInWithEmailAndPassword(data.email, data.password);
            if (!response.user) {
                return {
                    success: false,
                    message: 'Error signing in',
                };
            }
            return {
                success: true,
                message: 'User signed in successfully',
                data: {
                    uid: response.user.uid,
                    email: response.user.email,
                    displayName: response.user.displayName,
                    photoURL: response.user.photoURL,
                },
            };
        } catch (error) {
            const isFirebaseError = error instanceof FirebaseError;
            if (!isFirebaseError) {
                return {
                    success: false,
                    message: (error as Error).message,
                };
            }
            const message = this.getFirebaseAuthErrorMessage(error.code);

            return {
                success: false,
                message,
            };
        }
    }

    getFirebaseAuthErrorMessage(errorCode: string): string {
        switch (errorCode) {
            case 'auth/email-already-in-use':
                return 'El correo electrónico ya está en uso. Por favor, utiliza otro.';
            case 'auth/invalid-email':
                return 'El correo electrónico proporcionado no es válido.';
            case 'auth/user-not-found':
                return 'No se encontró una cuenta asociada con este correo electrónico.';
            case 'auth/wrong-password':
                return 'La contraseña es incorrecta. Por favor, verifica e inténtalo nuevamente.';
            case 'auth/weak-password':
                return 'La contraseña debe tener al menos 6 caracteres.';
            case 'auth/operation-not-allowed':
                return 'El método de autenticación no está habilitado. Contacta al administrador.';
            case 'auth/requires-recent-login':
                return 'Para realizar esta operación, necesitas volver a iniciar sesión.';
            case 'auth/too-many-requests':
                return 'Se han detectado demasiados intentos fallidos. Intenta nuevamente más tarde.';
            case 'auth/network-request-failed':
                return 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
            case 'auth/internal-error':
                return 'Ocurrió un error interno en el servidor. Intenta nuevamente más tarde.';
            case 'auth/invalid-credential':
                return 'Las credenciales proporcionadas no son válidas.';
            case 'auth/user-disabled':
                return 'La cuenta de usuario ha sido deshabilitada. Contacta al soporte.';
            case 'auth/invalid-verification-code':
                return 'El código de verificación proporcionado no es válido.';
            case 'auth/invalid-verification-id':
                return 'El ID de verificación proporcionado no es válido.';
            case 'auth/missing-email':
                return 'Se requiere un correo electrónico para realizar esta acción.';
            case 'auth/account-exists-with-different-credential':
                return 'Ya existe una cuenta con diferentes credenciales asociadas a este correo.';
            case 'auth/popup-closed-by-user':
                return 'El proceso fue cancelado por el usuario.';
            case 'auth/quota-exceeded':
                return 'Se ha excedido la cuota de solicitudes. Intenta nuevamente más tarde.';
            default:
                return 'Ocurrió un error desconocido. Por favor, intenta nuevamente.';
        }
    }
}
