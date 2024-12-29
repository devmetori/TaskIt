import { Directive, HostListener } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Directive({
    selector: '[appGoogleSso]',
    standalone: true,
})
export class GoogleSsoDirective {
    constructor(private angularFireAuth: AngularFireAuth) {}
    @HostListener('click')
    async onClick() {
        const creds = await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
        console.log({ creds });
    }
}
