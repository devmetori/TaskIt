import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {}
