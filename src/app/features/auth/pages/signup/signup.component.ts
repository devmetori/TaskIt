import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AuthService } from '@/app/core/services';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.scss',
})
export class SignupComponent {
    private formBuilder = inject(FormBuilder);
    signupForm = this.formBuilder.group({
        name: ['Test', [Validators.required, Validators.minLength(2)]],
        surname: ['Test', [Validators.required, Validators.minLength(2)]],
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

    constructor(private readonly authService: AuthService) {}

    async onSubmit() {
        const data = this.signupForm.value;
        this.authService.SignUp({
            name: data.name as string,
            surname: data.surname as string,
            email: data.email as string,
            password: data.password as string,
        });
    }
}
