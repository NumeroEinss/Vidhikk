import { FormControl, FormGroup, Validators } from "@angular/forms";

export class SignUpModel {
    mobile = new FormControl("", [Validators.required]);
    otp = new FormControl("", [Validators.required]);
}

export class LawyerSignupModel {
    fatherName = new FormControl("", [Validators.required]);
    userType = new FormControl("LAWYER", [Validators.required]);
    name = new FormControl("", [Validators.required]);
    barAddress = new FormControl("", [Validators.required]);
    city = new FormControl("", [Validators.required]);
    state = new FormControl("", [Validators.required]);
    email = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);
    confirmPassword = new FormControl("", [Validators.required]);
    question = new FormControl("");
    answer = new FormControl("");
    question2 = new FormControl("");
    answer2 = new FormControl("");
    phoneNumber = new FormControl("", [Validators.required]);
    isPrimaryContactWhatsapp = new FormControl(false);
    isPrimaryContactVisible = new FormControl(false);
    secondaryContact = new FormControl("");
    isSecondaryContactWhatsapp = new FormControl(false);
    isSecondaryContactVisible = new FormControl(false);
    isEmailVisible = new FormControl(false);
    isAddressVisible = new FormControl(false);
    stateBar = new FormControl("", [Validators.required]);
    courtName = new FormControl("", [Validators.required]);
    licenseNo = new FormControl("", [Validators.required]);
    practiceYear = new FormControl("", [Validators.required]);
    practiceField = new FormControl("", [Validators.required]);
    orgainization = new FormControl("");
    coreCompetency = new FormControl("", [Validators.required]);
    profileImage = new FormControl("");
    notificationToken = new FormControl("");
}

export class UserSignupModel {
    userType = new FormControl("USER", [Validators.required]);
    name = new FormControl("", [Validators.required]);
    phoneNumber = new FormControl("", [Validators.required]);
    isPrimaryContactWhatsapp = new FormControl(false, [Validators.required]);
    secondaryContact = new FormControl("");
    isSecondaryContactWhatsapp = new FormControl(false, [Validators.required]);
    address = new FormControl("", [Validators.required]);
    city = new FormControl("", [Validators.required]);
    state = new FormControl("", [Validators.required]);
    email = new FormControl("", [Validators.required]);
    password = new FormControl("", [Validators.required]);
    confirmPassword = new FormControl("", [Validators.required]);
    profileImage = new FormControl("");
    notificationToken = new FormControl("");
}

export class JudgeSignupModel {
    userType = new FormControl("JUDGE", [Validators.required]);
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
    profileImage = new FormControl("");
    notificationToken = new FormControl("");
}