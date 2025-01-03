import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-auth-page',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './auth-page.component.html',
    styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent {}
