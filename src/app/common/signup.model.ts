import { FormControl, FormGroup, Validators } from "@angular/forms";

export class SignUpModel {
    mobile = new FormControl("", [Validators.required]);
    otp = new FormControl("", [Validators.required]);
}

export class LawyerSignupModel {
    fatherName = new FormControl("", [Validators.required]);
    userType = new FormControl("lawyer", [Validators.required]);
    name = new FormControl("", [Validators.required]);
    address = new FormControl("", [Validators.required]);
    city = new FormControl("", [Validators.required]);
    state = new FormControl("", [Validators.required]);
    email = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);
    confirmPassword = new FormControl("", [Validators.required]);
    question = new FormControl("", [Validators.required]);
    answer = new FormControl("", [Validators.required]);
    question2 = new FormControl("", [Validators.required]);
    answer2 = new FormControl("", [Validators.required]);
    phoneNumber = new FormControl("", [Validators.required]);
    isPrimaryContactWhatsapp = new FormControl(false, [Validators.required]);
    isPrimaryContactVisible = new FormControl(false, [Validators.required]);
    secondaryContact = new FormControl("", [Validators.required]);
    isSecondaryContactWhatsapp = new FormControl(false, [Validators.required]);
    isSecondaryContactVisible = new FormControl(false, [Validators.required]);
    isEmailVisible = new FormControl(false, [Validators.required]);
    isAddressVisible = new FormControl(false, [Validators.required]);
    stateBar = new FormControl("", [Validators.required]);
    courtName = new FormControl("", [Validators.required]);
    licenseNo = new FormControl("", [Validators.required]);
    practiceYear = new FormControl("", [Validators.required]);
    practiceField = new FormControl("", [Validators.required]);
    orgainization = new FormControl("", [Validators.required]);
    coreCompetency = new FormControl("", [Validators.required]);
}

export class UserSignupModel {
    userType = new FormControl("lawyer", [Validators.required]);
    name = new FormControl("", [Validators.required]);
    phoneNumber = new FormControl("", [Validators.required]);
    isPrimaryContactWhatsapp = new FormControl(false, [Validators.required]);
    secondaryContact = new FormControl("", [Validators.required]);
    isSecondaryContactWhatsapp = new FormControl(false, [Validators.required]);
    address = new FormControl("", [Validators.required]);
    city = new FormControl("", [Validators.required]);
    state = new FormControl("", [Validators.required]);
    email = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);
    confirmPassword = new FormControl("", [Validators.required]);
}

export class JudgeSignupModel {
    userType = new FormControl("judge", [Validators.required]);
    fullName = new FormControl("", [Validators.required]);
    address = new FormControl("", [Validators.required]);
    state = new FormControl("", [Validators.required]);
    city = new FormControl("", [Validators.required]);
    district = new FormControl("", [Validators.required]);
    mobile = new FormControl("", [Validators.required]);
    email = new FormControl("", [Validators.required]);
    currentState = new FormControl("", [Validators.required]);
    currentDistrict = new FormControl("", [Validators.required]);
    courtType = new FormControl("", [Validators.required]);
    courtName = new FormControl("", [Validators.required]);
    registrationNo = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);
    confirmPassword = new FormControl("", [Validators.required]);
    question = new FormControl("", [Validators.required]);
    answer = new FormControl("", [Validators.required]);
    question2 = new FormControl("", [Validators.required]);
    answer2 = new FormControl("", [Validators.required]);
    isPrimaryContactWhatsapp = new FormControl(false);
    isSecondaryContactWhatsapp = new FormControl(false);
    secondaryContact = new FormControl("");
    isEmailVisible = new FormControl(false);
}
