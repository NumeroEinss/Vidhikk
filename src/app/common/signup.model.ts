export class SignUpModel {
    mobile: string = "";
    otp: string = "";
}

export class LawyerSignupModel {
    userType: string = "lawyer";
    orgainization: string = "";
    fullName: string = "";
    fatherName: string = "";
    address: string = "";
    state: string = "";
    city: string = "";
    mobile: string = "";
    email: string = "";
    stateBar: string = "";
    courtName: string = "";
    licenseNo: string = "";
    practiceYear: string = "";
    practiceField: string = "";
    question: string = '';
    answer: string = '';
    question2: string = '';
    answer2: string = '';
    coreCompetency: string = "";
    isAddressVisible: boolean = false;
    isPrimaryContactVisible: boolean = false;
    isPrimaryContactWhatsapp: boolean = false;
    isSecondaryContactVisible: boolean = false;
    isSecondaryContactWhatsapp: boolean = false;
    isEmailVisible: boolean = false;
    password: string = "";
    confirmPassword: string = "";
    secondaryContact: string = "";
}

export class UserSignupModel {
    userType: string = "user";
    fullName: string = "";
    address: string = "";
    state: string = "";
    city: string = "";
    mobile: string = "";
    email: string = "";
    question: string = '';
    answer: string = '';
    question2: string = '';
    answer2: string = '';
    isPrimaryContactWhatsapp: boolean = false;
    isSecondaryContactWhatsapp: boolean = false;
    password: string = "";
    confirmPassword: string = "";
    secondaryContact: string = "";
}


export class JudgeSignupModel{
    userType: string = "judge";
    fullName:string = "";
    address: string = "";
    state: string = "";
    city: string = "";
    district: string = "";
    mobile: string = "";
    email: string = "";
    currentState: string = "";
    currentDistrict: string = "";
    courtType: string = "";
    courtName: string = "";
    registrationNo: string = "";
    password: string = "";
    confirmPassword: string = "";
    question: string = '';
    answer: string = '';
    question2: string = '';
    answer2: string = '';
    isPrimaryContactWhatsapp: boolean = false;
    isSecondaryContactWhatsapp: boolean = false;
    secondaryContact: string = "";
    isEmailVisible: boolean = false;
}
