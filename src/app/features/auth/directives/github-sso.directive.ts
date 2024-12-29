import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Directive, HostListener } from '@angular/core';
import { GithubAuthProvider } from '@angular/fire/auth';

@Directive({
    selector: '[appGithubSso]',
    standalone: true,
})
export class GithubSsoDirective {
    constructor(private auth: AngularFireAuth) {}

    @HostListener('click')
    async onClick() {
        const creds = await this.auth.signInWithPopup(new GithubAuthProvider());
        console.log({ creds });
    }
}
