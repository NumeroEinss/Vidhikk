export class LoginModel {    // email: new FormControl('', `[Validators.pattern('^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')]`),
    // password: new FormControl('', [Validators.required, Validators.minLength(10)])
    email: string = "";
    password: string = "";
}

export class LoginModel2 {
    mobile: string = "";
    password: string = "";
}