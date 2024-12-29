import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-signin',
    imports: [ReactiveFormsModule],
    styleUrl: './signin.component.scss',
    templateUrl: './signin.component.html',
})
export class SigninComponent {
    private formBuilder = inject(FormBuilder);
    signinForm = this.formBuilder.group({
        email: ['test@gmail.com', [Validators.required, Validators.email]],
        password: [
            '',
            [
                Validators.required,
                Validators.minLength(8),
                Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}'),
            ],
        ],
    });

    constructor() {}
    async onSubmit() {
        const data = this.signinForm.value;

        console.log(data);
    }
}
