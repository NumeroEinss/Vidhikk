import { Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { SignUpModel, LawyerSignupModel, UserSignupModel, JudgeSignupModel, SellerSignupModel } from '../../common/signup.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('otpDialog', { static: false }) otpDialog!: TemplateRef<any>;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput!: NgOtpInputComponent;

  signupForm: FormGroup;
  lawyerForm: FormGroup;
  sellerForm: FormGroup;
  otpVerified: boolean = false;
  mobileNoEntered: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredField: any = [];
  displayField: any = [];

  userType: string = "LAWYER";
  userForm: FormGroup;
  judgeForm: FormGroup;
  userImage: any;
  emailOtpVerified: boolean = false;
  otp: string = "";

  private otpChangeTimeout: any;

  cityList: any[] = [];
  filteredCities: any[] = [];

  allDistricts: any[] = [
    { state: 'mp', value: 'indore', viewValue: 'Indore' },
    { state: 'mp', value: 'bhopal', viewValue: 'Bhopal' },
    { state: 'up', value: 'aligarh', viewValue: 'Aligarh' },
    { state: 'up', value: 'bareli', viewValue: 'Bareli' },
    { state: 'gujrat', value: 'surat', viewValue: 'Surat' },
    { state: 'gujrat', value: 'ahmedabad', viewValue: 'Ahmedabad' },
  ];

  allCourtType: any[] = [
    { district: 'indore', value: 'district Court', viewValue: 'District Court' },
    { district: 'bhopal', value: 'civil Court', viewValue: 'Civil Court' },
    { district: 'aligarh', value: 'subordinate Court', viewValue: 'Subordinate Court' },
    { district: 'bareli', value: 'supreme Court', viewValue: 'Supreme Court' },
    { district: 'surat', value: 'district Court', viewValue: 'District Court Surat' },
    { district: 'ahmedabad', value: 'supreme Court', viewValue: 'Supreme Court' },
  ];

  allCourtName: any[] = [
    { type: 'district Court', value: 'District & Session Court', viewValue: 'District & Session Court', },
    { type: 'civil Court', value: 'District & Session Court BHOPAL', viewValue: 'District & Session Court BHOPAL', },
    { type: 'subordinate Court', value: 'Civil Court Uttar Pradesh', viewValue: 'Civil Court Uttar Pradesh' },
    { type: 'supreme Court', value: 'Subordinate Court Ahmedabad', viewValue: 'Subordinate Court Ahmedabad' },
  ];

  fields: any = [];

  queries: any[] = [
    { value: 'What is your favorite color', viewValue: 'What is your favorite color' },
    { value: 'What is your DOB', viewValue: 'What is your DOB' },
    { value: 'which is your first school', viewValue: 'which is your first school' },
  ];

  termsCondition: any = [
    {
      subHeading: '1. The services we provide',
      details: [
        {
          heading: '',
          subHeading: `Our mission is to give people the power to search advocates throughout the nation of their choice based upon the information and feedbacks given by the advocates and their clients. We help advocates to search latest case laws stored in our library and to maintain their daily case dairy and to chat with the other lawyers to seek assistance without paying anything to the company. Although, the other usage are chargeable like retrieving personal information of the advocates, conference and additional daily case diaries. Commerce and Ecommerce companies can explore their business by listing their products in market place in a nominal subscription charges. The user whosoever may be entered his data in daily case diary is end-to-end encrypted by which no one including company cannot explore their personal information for its own benefit. Likewise, the company cannot concern with the information created in a personal chat room or in conference.   

            We use and develop advanced technologies such as artificial intelligence, machine learning systems and augmented reality so that people can use our Products safely regardless of physical ability or geographic location. We also build sophisticated network and communication technology to help more people connect to the Internet in areas with limited access. And we develop automated systems to improve our ability to detect and remove abusive and dangerous activity that may harm our community and the integrity of our Products. We work hard to maintain the security (including the availability, authenticity, integrity and confidentiality) of our Products and services. We employ dedicated teams around the world, work with external service providers, partners and other relevant entities and develop advanced technical systems to detect potential misuse of our Products, harmful conduct towards others and situations where we may be able to help support or protect our community, including to respond to user reports of potentially violating content. If we learn of content or conduct such as this, we may take appropriate action based on our assessment that may include notifying you, offering help, removing content, removing or restricting access to certain features, disabling an account or contacting law enforcement. We share information with Peraturb Decimo LLP and its allied companies that provide financial products and services to help them promote safety, security and integrity and comply with applicable law. Vidhik may access, preserve, use and share any information it collects about you where it has a good faith belief that it is required or permitted by law to do so.  `
        }
      ],
    },
    {
      subHeading: '2. How our services are funded',
      details: [
        {
          heading: '',
          subHeading: `Instead of paying to use certain services on Vidhik we offer, you agree that we can show you personalised ads and other commercial and sponsored content that businesses and organisations pay us to promote on and off Peraturb Decimo product. We use your personal data, such as information about your activity and interests, to show you personalised ads and sponsored content that may be more relevant to you.
            Protecting people's privacy is central to how we've designed our personalised ads system. This means that we can show you relevant and useful ads without telling advertisers who you are. We don't sell your personal data. We allow advertisers to tell us things such as their business goal, and the kind of audience that they want to see their ads. We then show their ad to people who we think might be interested.

            We also provide advertisers with reports about the performance of their ads to help them understand how people are interacting with their content on and off Peraturb Decimo Products. For example, we provide general demographic and interest information to advertisers to help them better understands their audience. We collect and use your personal data in order to provide the services described above for you. 

            We engage in research to develop, test and improve our Products. This includes analysing data that we have about our users, and understanding how people use our Products, for example by conducting surveys and testing and troubleshooting new features. Our Privacy Policy explains how we use data to support this research for the purposes of developing and improving our services.

            Our Products help you find and connect with people, groups, businesses, organisations and others that are important to you. We design our systems so that your experience is consistent and seamless across the different Peraturb Decimo that you use. For example, we use data about the people you engage with on Vidhik to make it easier for you to connect with them through Chat Room or Conference, and we enable you to communicate your businesses through Market Place`
        }
      ],
    },
    {
      subHeading: '3.	Ensuring access to our services:',
      details: [
        {
          heading: '',
          subHeading: `To operate our services and enable you to find out an appropriate lawyer of your need in India, we need to transfer, store and distribute content and data to our data centres, partners, service providers, vendors and systems around the world, including outside your country of residence. The use of this global infrastructure is necessary and essential to provide our services.`
        }
      ],
    },
    {
      subHeading: '4.	What you can share and do on Vidhik',
      details: [
        {
          heading: '',
          subHeading: `We want people to use Vidhik to express themselves and to share content that is important to them, but not at the expense of the safety and well-being of others or the integrity of our community. You therefore agree not to engage in the conduct described below (or to facilitate or support others in doing so):`
        },
        {
          heading: `1.You may not use our Products to do or share anything:`,
          subHeading: `That violates these Terms, the Community Standards, or other terms and policies that apply to your use of our Products.
            That is unlawful, misleading, discriminatory or fraudulent (or assists someone else in using our Products in such a way).
            That you do not own or have the necessary rights to share.
            That infringes or violates someone else's rights, including their intellectual property rights (such as by infringing another's copyright or trademark, or distributing or selling counterfeit or pirated goods), unless an exception or limitation applies under applicable law.`
        },
        {
          heading: '',
          subHeading: `2.You may not upload viruses or malicious code, use the services to send spam or do anything else that could disable, overburden, interfere with or impair the proper working, integrity, operation or appearance of our services, systems or Products.`
        },
        {
          heading: '',
          subHeading: `3.You may not access or collect data from our Products using automated means (without our prior permission) or attempt to access data that you do not have permission to access.`
        },
        {
          heading: '',
          subHeading: `4.You may not proxy, request or collect Product usernames or passwords, or misappropriate access tokens.`
        },
        {
          heading: '',
          subHeading: `5.You may not sell, license or purchase any data obtained from us or our services, except as provided in the Platform Terms.`
        },
        {
          heading: '',
          subHeading: `
            6.You may not misuse any reporting, flagging, dispute or appeals channel, such as by making fraudulent, duplicative or groundless reports or appeals.

            The Peraturb Decimo LLP can remove or restrict access to content that is in violation of these provisions. We can also suspend or disable your account for conduct that violates these provisions.

            If we remove content that you have shared in violation of the Community Standards, we'll let you know and explain any options you have to request another review, unless you seriously or repeatedly violate these Terms or if doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons. 

            To help support our community, we encourage you to report content or conduct that you believe violates your rights (including intellectual property rights) or our Terms and Policies, if this feature exists in your jurisdiction.

            We also can remove or restrict access to content features, services or information if we determine that doing so is reasonably necessary to avoid or mitigate misuse of our services or adverse legal or regulatory impacts to Vidhik.

            Report: This information is for people who want to report content (such as a post, photo or comment) on Vidhik.

            If you're having other issues, such as trouble logging into your account or if you think you have been hacked. 

            The best way to report abusive content or spam on Vidhik is by using the Report link near the content itself. 

            If you don't have an account or can't see the content that you'd like to report (e.g. someone blocked you).

            Intellectual Property Right: Vidhik is committed to helping people and organisations protect their intellectual property rights. The Peraturb Decimo LLP do not allow posting content that violates someone else's intellectual property rights, including copyright and trademark.

            Copyright
            Copyright is a legal right that seeks to protect original works of authorship (example: books, music, film, art). Generally, copyright protects original expression such as words or images. It does not protect facts and ideas, although it may protect the original words or images used to describe an idea. Copyright also doesn't protect things such as names, titles and slogans; however, another legal right called a trademark might protect those. 

            Trademark
            A trademark is a word, slogan, symbol or design (example: brand name, logo) that distinguishes the products or services offered by one person, group or company from another. Generally, trademark law seeks to prevent confusion among consumers about who provides or is affiliated with a product or service. 

            Limits on using our intellectual property
            If you use content covered by intellectual property rights that we have and make available in our Product, we retain all rights to that content (but not yours). You can only use our copyrights or trademarks (or any similar marks) as expressly permitted by our Brand Usage Guidelines or with our prior written permission. You must obtain our written permission (or permission under an open-source licence) to modify, translate, create derivative works of, decompile or reverse-engineer our products or their components, or otherwise attempt to extract source code from us, unless an exception or limitation applies under applicable law or your conduct relates to the Peraturb Decimo LLP. It is restricted to download or decrypt or copy the available data of Vidhik and it is available to our subscribers to read only.`
        }
      ],
    },
    {
      subHeading: '5.	The permissions you to Vidhik',
      details: [
        {
          heading: 'We need certain permissions from you to provide our services:',
          subHeading: ``
        },
        {
          heading: '1.Permission to use content that you create and share:',
          subHeading: `Some content that you share or upload through creating blogs may be protected by intellectual property laws.
            You retain ownership of the intellectual property rights (things such as copy right or trademarks) in any such content that you create and share on Vidhik that you use. Nothing in these Terms takes away the rights you have to your own content. You are free to share your content with anyone else, wherever you want.
            However, to provide our services we need you to give us some legal permissions (known as a "License") to use this content. This is solely for the purposes of providing and improving our Products and services.  
            Specifically, when you share, post or upload content that is covered by intellectual property rights on or in connection with our Products, you grant us a non-exclusive, transferable, sub-licensable, royalty-free and worldwide licence to host, use, distribute, modify, run, copy, publicly perform or display, translate and create derivative works of your content (consistent with your privacy and application  settings). This licence will end when your content is deleted from our systems.
            You can delete individual content that you share, post and upload at any time. In addition, all content posted to your personal account will be deleted if you delete your account. Account deletion does not automatically delete content that you post as an admin of a Page or content that you create collectively with other users that may continue to be visible to other members.
            It may take up to 90 days to delete content after we begin the account deletion process or receive a content deletion request. If you send content to the bin, the deletion process will automatically begin in 30 days unless you choose to delete the content sooner. While the deletion process for such content is being undertaken, the content is no longer visible to other users. After the content is deleted, it may take us up to another 90 days to remove it from backups and disaster recovery systems.
            Content will not be deleted within 90 days of the account deletion or content deletion process beginning in the following situations:
            where your content has been used by others in accordance with this licence and they have not deleted it (in which case this licence will continue to apply until that content is deleted).
            where deletion within 90 days is not possible due to technical limitations of our systems, in which case, we will complete the deletion as soon as technically feasible; or
            Where immediate deletion would restrict our ability to:
            investigate or identify illegal activity or breaches of our Terms and Policies (for example, to identify or investigate misuse of our Products or systems);
            protect the safety, integrity and security of our Products, systems, services, our employees and users, and to defend ourselves;
            comply with legal obligations for the preservation of evidence, including data that Meta Companies providing financial products and services preserve to comply with any record-keeping obligations required by law; or
            comply with a request of a judicial or administrative authority, law enforcement or a government agency;
            in which case, the content will be retained for no longer than is necessary for the purposes for which it has been retained (the exact duration will vary on a case-by-case basis).
            In each of the above cases, this licence will continue until the content has been fully deleted.`
        },
        {
          heading: '2.Permission to use your name, profile picture and information about your actions with ads and sponsored or commercial content:',
          subHeading: ` You give us permission to use your name and profile picture and information about actions that you have taken on Vidhik next to or in connection with ads, offers and other sponsored or commercial content that we display across our Products, without any compensation to you.`
        },
        {
          heading: '3.Permission to update software that you use or download:',
          subHeading: `If you download or use our software, you give us permission to download and install updates to the software where available.`
        },
      ],
    },
    {
      subHeading: '6.	Additional Provisions',
      details: [
        {
          heading: '1. Updating our Terms',
          subHeading: `We work constantly to improve our services and develop new features to make our Products better for you and our community. As a result, we may need to update these Terms from time to time to accurately reflect our services and practices, to promote a safe and secure experience on our Products and services, and/or to comply with applicable law. We will only make any changes if the provisions are no longer appropriate or if they are incomplete, and only if the changes are reasonable and take due account of your interests, or if the changes are required for safety and security purposes or to comply with applicable law.

            We will notify you (for example, by email or through our Products) at least 30 days before we make changes to these Terms and give you an opportunity to review them before they go into effect, unless changes are required by law. Once any updated Terms are in effect, you will be bound by them if you continue to use our Products.

            We hope that you will continue using our Products, but if you do not agree to our updated Terms and no longer want to be a part of the Vidhik community, you can delete your account at any time.`},
        {
          heading: '2. Account suspension or termination',
          subHeading: `We want Vidhik to be a place where people feel welcome and safe to express themselves and share their thoughts and ideas.
            If we determine, in our discretion, that you have clearly, seriously or repeatedly breached our Terms or Policies, including, in particular, the Community Standards, we may suspend or permanently disable your access to Peraturb Decimo LLP Products, and we may permanently disable or delete your account. We may also disable or delete your account if you repeatedly infringe other people's intellectual property rights or where we are required to do so for legal reasons.

            We may disable or delete your account if, after registration, your account is not confirmed, your account is unused and remains inactive for an extended period of time or if we detect that someone may have used it without your permission and we are unable to confirm your ownership of the account. 
            
            Where we take such action, we'll let you know and explain any options you have to request a review, unless doing so may expose us or others to legal liability; harm our community of users; compromise or interfere with the integrity or operation of any of our services, systems or Products; where we are restricted due to technical limitations; or where we are prohibited from doing so for legal reasons.

            You can know more about what you can do if your account has been disabled and how to contact us if you think that we have disabled your account by mistake.

            If you delete or we disable or delete your account, these Terms shall terminate as an agreement between you and us, but the following provisions will remain in place`
        },
        {
          heading: `3. Limits on liability`,
          subHeading: `We work hard to provide the best Products we can and to specify clear guidelines for everyone who uses them. Our Products, however, are provided "As is," and to the extent permissible by law, we make no guarantees that they always will be safe, secure, or error-free, or that they will function without disruptions, delays, or imperfections. To the extent permitted by law, we also disclaim all warranties, whether express or implied, including the implied warranties of merchantability, fitness for a particular purpose, title and non-infringement. We do not control or direct what people and others do or say, and we are not responsible for their actions or conduct (whether online or offline) or any content that they share (including offensive, inappropriate, obscene, unlawful and other objectionable content).

            We cannot predict when issues may arise with our Products. Accordingly, our liability shall be limited to the fullest extent permitted by applicable law. To the fullest extent permitted by applicable law, under no circumstance will we be liable to you for any lost profits, revenues, information, or data, or consequential, special, indirect, exemplary, punitive or incidental damages arising out of or related to these Terms (however caused and on any theory of liability, including negligence), even if we have been advised of the possibility of such damages.`
        },
        {
          heading: `4. Disputes`,
          subHeading: `We try to provide clear rules so that we can limit or hopefully avoid disputes between you and us. If a dispute does arise, however, it's useful to know upfront where it can be resolved and what laws will apply.

            If you are a user, the laws of the India will apply to any claim, cause of action or dispute that you have against us that arises out of or relates to these Terms, and you may resolve your claim in any competent court in India that has jurisdiction over the claim. 

            Any user, who use Vidhik outside the India, does not have any right to claim or cause of action or a dispute have against us, and the same will always deemed as no claim.`
        },
        {
          heading: `5. Other`,
          subHeading: `
            1.These Terms (formerly known as the Statement of Rights and Responsibilities) make up the entire agreement between you and Perturb Decimo LLP regarding your use of our Products. They supersede any prior agreements.
            `
        },
        {
          heading: '',
          subHeading: `2.Some of the Products that we offer are also governed by supplemental Terms. If you use any of those Products, supplemental terms will be made available and will become part of our agreement with you. For instance, if you access or use our Products for commercial or business purposes, such as buying ads, selling products, developing apps, managing a group or Page for your business, or using our measurement services, you must agree to our Commercial Terms. To the extent that any supplemental Terms conflict with these Terms, the supplemental Terms shall govern to the extent of the conflict.`
        },
        {
          heading: '',
          subHeading: `3.If any portion of these Terms is found to be unenforceable, the unenforceable portion will be deemed amended to the minimum extent necessary to make it enforceable, and if it can't be made enforceable, then it will be severed and the remaining portion will remain in full force and effect. If we fail to enforce any of these Terms, it will not be considered a waiver. Any amendment to or waiver of these Terms must be made in writing and signed by us.`
        },
        {
          heading: '',
          subHeading: `4.You will not transfer any of your rights or obligations under these Terms to anyone else without our consent.`
        },
        {
          heading: '',
          subHeading: `5.You may designate a person (Called a legacy contact) to manage your account if it is memorialised. If you enable it in your settings, only your legacy contact or a person who you have identified in a valid will or similar legal document expressing clear consent to disclose your content to that person upon death or incapacity will be able to seek limited disclosure of information from your account after it has been memorialised.`
        },
        {
          heading: '',
          subHeading: `6.These Terms do not confer any third-party beneficiary rights. All of our rights and obligations under these Terms are freely assignable by us in connection with a merger, acquisition or sale of assets, or by operation of law or otherwise.`
        },
        {
          heading: '',
          subHeading: `7.We always appreciate your feedback and other suggestions about our products and services. But we may use feedback and other suggestions without any restriction or obligation to compensate you, and we are under no obligation to keep them confidential.`
        },
        {
          heading: '',
          subHeading: `8.We reserve all rights not expressly granted to you.`
        }
      ],
    },
  ];

  privacyPolicy: any = [
    {
      subHeading: '1. Information We Collect',
      details: [
        {
          heading: '1.1. Personal Identification Information:',
          subHeading: 'We may collect personal identification information from users in various ways, including but not limited to when users visit our Website, register on the Website, subscribe to newsletters, respond to surveys, fill out forms, and in connection with other activities, services, features, or resources we make available on our Website. Users may be asked for, as appropriate, name, email address, phone number, and other relevant information.'
        },
        {
          heading: '1.2. Non-personal Identification Information:',
          subHeading: 'We may collect non-personal identification information about users whenever they interact with our Website. Non-personal identification information may include the browser name, the type of computer or device, and technical information about users means of connection to our Website, such as the operating system and the Internet service providers utilized.'
        }

      ],
    },
    {
      subHeading: '2. How We Use Collected Information',
      details: [
        {
          heading: '2.1. We may collect and use userspersonal information for the following purposes:',
          subHeading: 'To personalize user experience: We may use information in the aggregate to understand how our users as a group use the services and resources provided on our Website.To improve our Website: We continually strive to improve our Website offerings based on the information and feedback we receive from users.To send periodic emails: We may use the email address to respond to inquiries, questions, and/or other requests.'
        }
      ],
    },
    {
      subHeading: '3. How We Protect Your Information',
      details: [
        {
          heading: '',
          subHeading: '3.1. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Website.'
        }
      ],
    },
    {
      subHeading: '4. Sharing Your Personal Information',
      details: [
        {
          heading: '',
          subHeading: '4.1. We do not sell, trade, or rent users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.'
        }
      ],
    },
    {
      subHeading: '5. Third-Party Websites',
      details: [
        {
          heading: '',
          subHeading: '5.1. Users may find advertising or other content on our Website that links to the sites and services of our partners, suppliers, advertisers,'
        }
      ],
    },
  ];

  filteredDistricts: any[] = [];
  filteredCourtNames: any[] = [];
  filteredCourtTypes: any[] = [];

  docUploadEnabled: boolean = false;

  constructor(private _fb: FormBuilder, private _matDialog: MatDialog, private _router: Router, private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
    this.signupForm = this._fb.group(new SignUpModel());
    this.SignupFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.SignupFrmCtrl.otp.setValidators([Validators.required, Validators.minLength(6)]);

    this.lawyerForm = this._fb.group(new LawyerSignupModel);
    // this.signupForm2.controls.email.setValidators([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.lawyerForm.controls.email.setValidators([Validators.email]);
    this.lawyerForm.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.lawyerForm.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.lawyerForm.controls.confirmPassword.setValidators([Validators.required, this.validateConfirmPassword()]);

    this.userForm = this._fb.group(new UserSignupModel);
    this.userForm.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.userForm.controls.confirmPassword.setValidators([Validators.required, this.validateUserConfirmPassword()]);

    this.judgeForm = this._fb.group(new JudgeSignupModel);

    this.sellerForm = this._fb.group(new SellerSignupModel);
    this.sellerForm.controls.organisationInfo.setValidators([Validators.maxLength(200)]);
    this.sellerForm.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.sellerForm.controls.confirmPassword.setValidators([Validators.required, this.validateSellerConfirmPassword()]);
    this.sellerForm.controls.panNo.setValidators([Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]);
    this.sellerForm.controls.gstinNo.setValidators([Validators.pattern(/^([0-9]{2})([A-Z]{5})([0-9]{4})([A-Z]{1})([1-9A-Z]{1})(Z)([0-9A-Z]{1})$/)]);

    this.getCitiesList();
    this.getPractiscingField();
  }

  opacityStyling = { opacity: 0.1 };

  ngAfterViewInit() {
    let element = document.getElementById('modalButton') as HTMLElement;
    element.click();
  }

  get SignupFrmCtrl() {
    return this.signupForm.controls;
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmitOtp() {
    this.lawyerForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
    this.userForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
    this.judgeForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
    this.sellerForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.lawyerForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  validateUserConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.userForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  validateSellerConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.sellerForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.displayField.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    // this.signupForm2.controls.practiceField.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.displayField.indexOf(fruit);

    if (index >= 0) {
      this.displayField.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.displayField.push(event.option.viewValue);
    // this.fieldInput.nativeElement.value = '';
    // this.signupForm2.controls.practiceField.setValue(null);
  }

  private _filter(value: any): string[] {
    const filterValue = value.value.toLowerCase();
    return this.fields.filter((feilds: { value: string; }) => feilds.value.toLowerCase().includes(filterValue));
  }

  userImageChange(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (this.userType == "LAWYER") {
        this.lawyerForm.controls.file.patchValue(event.target.files[0]);
        this.lawyerForm.controls.fileDisplay.patchValue(e.target?.result);
      }
      else if (this.userType == "USER") {
        this.userForm.controls.file.patchValue(event.target.files[0]);
        this.userForm.controls.fileDisplay.patchValue(e.target?.result);
      }
      else if (this.userType == "JUDGE") {
        this.judgeForm.controls.file.patchValue(event.target.files[0]);
        this.judgeForm.controls.fileDisplay.patchValue(e.target?.result);
      }
      else if (this.userType == "SELLER") {
        this.sellerForm.controls.file.patchValue(event.target.files[0]);
        this.sellerForm.controls.fileDisplay.patchValue(e.target?.result);
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  docChange(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.lawyerForm.controls.docFile.patchValue(event.target.files[0]);
      this.lawyerForm.controls.docDisplay.patchValue(e.target?.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  onStateChange(selectedState: string) {
    this.filteredDistricts = this.allDistricts.filter(district => district.state === selectedState);
    this.judgeFrmCtrl.currentDistrict.setValue('');
    this.judgeFrmCtrl.courtType.setValue('');
    this.judgeFrmCtrl.courtName.setValue('');
  }

  onDistrictChange(selectedDistrict: string) {
    this.filteredCourtTypes = this.allCourtType.filter(court => court.district === selectedDistrict);
    this.judgeFrmCtrl.courtType.setValue('');
    this.judgeFrmCtrl.courtName.setValue('');
  }

  onCourtTypeChange(selectedCourtType: string) {
    this.filteredCourtNames = this.allCourtName.filter(name => name.type === selectedCourtType);
    this.judgeFrmCtrl.courtName.setValue('');
  }

  get judgeFrmCtrl() {
    return this.judgeForm.controls;
  }

  toUppercase(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.toUpperCase();
    this.sellerForm.controls['panNo'].setValue(input.value, { emitEvent: false });
  }


  //generateMobileOtpForSignup
  generateOtp() {
    let reqObj = {
      mobile: this.signupForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
          this.mobileNoEntered = !this.mobileNoEntered;
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }

  //verifyMobileOtpForSignup
  verifyOtp() {
    let reqObj: any = {
      mobile: this.signupForm.controls.mobile.value,
      otp: this.signupForm.controls.otp.value
    };
    this._apolloService.query(GQLConfig.verifyOtp, reqObj).subscribe((data: any) => {
      if (data.data != null) {
        if (data.data.verifyOtp.status == 200) {
          this._toastMessage.message(data.data.verifyOtp.message);
          this.otpVerified = !this.otpVerified;
          this.lawyerForm.controls.phoneNumber.patchValue(this.SignupFrmCtrl.mobile.value);
          this.userForm.controls.phoneNumber.patchValue(this.SignupFrmCtrl.mobile.value);
        }
        else {
          this._toastMessage.error(data.data.verifyOtp.message);
        }
      }
    })
  }

  //resendOtpForSignup
  resendOtp() {
    let reqObj = {
      mobile: this.signupForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }


  //sendOtpEmail
  sendOtpForEmail() {
    let data = {}
    if (this.userType == "USER") {
      data = {
        email: this.userForm.controls.email.value,
        phoneNumber: this.userForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "LAWYER") {
      data = {
        email: this.lawyerForm.controls.email.value,
        phoneNumber: this.lawyerForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "SELLER") {
      data = {
        email: this.sellerForm.controls.email.value,
        phoneNumber: this.sellerForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          let el = document.getElementById('otpModalButton') as HTMLElement;
          el.click();
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.ngOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  onOtpChange(e: any) {
    clearTimeout(this.otpChangeTimeout);
    this.otpChangeTimeout = setTimeout(() => {
      if (e.length == 6 && !this.emailOtpVerified) {
        let data = {};
        if (this.userType == "USER") {
          data = {
            email: this.userForm.controls.email.value,
            mobile: this.userForm.controls.phoneNumber.value,
            otp: e
          };
        }
        else if (this.userType == "LAWYER") {
          data = {
            email: this.lawyerForm.controls.email.value,
            mobile: this.lawyerForm.controls.phoneNumber.value,
            otp: e
          };
        }
        else if (this.userType == "SELLER") {
          data = {
            email: this.sellerForm.controls.email.value,
            mobile: this.sellerForm.controls.phoneNumber.value,
            otp: e
          };
        }
        else if (this.userType == "JUDGE") {
          data = {
            email: this.judgeForm.controls.email.value,
            mobile: this.judgeForm.controls.phoneNumber.value,
            otp: e
          };
        }
        this._apolloService.mutate(GQLConfig.verifyOtpEmail, data).subscribe(objEmailOtp => {
          if (objEmailOtp.data != null) {
            if (objEmailOtp.data.verifyOtp.status == 200) {
              this.emailOtpVerified = true;
              let el = document.getElementById('closeOtpModalButton') as HTMLElement;
              el.click();
              this._toastMessage.success(objEmailOtp.data.verifyOtp.message);
              this.ngOtpInput.setValue('');
            } else {
              this._toastMessage.error(objEmailOtp.data.verifyOtp.message);
            }
          }
        });
      }
    }, 300); // 300ms delay
  }

  resendEmailOtp() {
    let data = {}
    if (this.userType == "USER") {
      data = {
        email: this.userForm.controls.email.value,
        phoneNumber: this.userForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "LAWYER") {
      data = {
        email: this.lawyerForm.controls.email.value,
        phoneNumber: this.lawyerForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "SELLER") {
      data = {
        email: this.sellerForm.controls.email.value,
        phoneNumber: this.sellerForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "JUDGE") {
      data = {
        email: this.judgeForm.controls.email.value,
        phoneNumber: this.judgeForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.ngOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  userSignUp() {
    if (!this.userForm.valid) {
      this._toastMessage.error("Please fill all the fields !!");
    }
    else if (!this.emailOtpVerified) {
      this._toastMessage.error("Please verify your email !!");
    }
    else {
      let reqObj = {
        userType: this.userType,
        name: this.userForm.controls.name.value,
        mobile: this.userForm.controls.phoneNumber.value,
        isPrimaryContactWhatsapp: this.userForm.controls.isPrimaryContactWhatsapp.value,
        secondaryContact: this.userForm.controls.secondaryContact.value,
        isSecondaryContactWhatsapp: this.userForm.controls.isSecondaryContactWhatsapp.value,
        address: this.userForm.controls.address.value,
        city: this.userForm.controls.city.value,
        state: this.userForm.controls.state.value,
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        confirmPassword: this.userForm.controls.confirmPassword.value,
      }
      this._apolloService.mutate(GQLConfig.createUser, reqObj).subscribe(data => {
        if (data.data != null) {
          if (data.data.createUser.status == 200) {
            this._toastMessage.success(data.data.createUser.message + '. Login to proceed further');
            setTimeout(() => { this._router.navigateByUrl('/auth/login'); }, 2000);
          }
          else {
            this._toastMessage.error(data.data.createUser.message);
          }
        }
      })
    }
  }

  async lawyerSignup() {
    // accountVerificationButton
    if (this.lawyerForm.value.file == "") {
      this._toastMessage.error("Please add profile image !!");
    }
    else if (this.docUploadEnabled == true && this.lawyerForm.controls.docFile.value == "") {
      this._toastMessage.error("Please upload your Identification Proof !!")
    }
    else if (!this.lawyerForm.valid) {
      this._toastMessage.error("Please Fill all the fields !!");
    }
    else if (!this.emailOtpVerified) {
      this._toastMessage.error("Please verify your email !!");
    }
    else {
      let status: string = "";

      let isLawyerVerified: Boolean = await this.isLawyerVerified(this.lawyerForm.controls.licenseNo.value.trim());

      isLawyerVerified === true ? status = "Approved" : status = "";

      const mutation = {
        "query": "mutation ($input: AdvocateProfile!, $profileFile: Upload, $docFile:Upload) { createLawyers(input: $input, profileFile: $profileFile, docFile:$docFile) { status message data } }",
        "variables": {
          "input": {
            "userType": this.userType,
            "lawyerName": this.lawyerForm.controls.name.value,
            "fatherName": this.lawyerForm.controls.fatherName.value,
            "orgainization": this.lawyerForm.controls.orgainization.value,
            "primaryContact": this.lawyerForm.controls.phoneNumber.value,
            "isPrimaryContactWhatsapp": this.lawyerForm.controls.isPrimaryContactWhatsapp.value,
            "isPrimaryMobileDisplay": this.lawyerForm.controls.isPrimaryContactVisible.value,
            "secondaryContact": this.lawyerForm.controls.secondaryContact.value,
            "isSecondaryContactWhatsapp": this.lawyerForm.controls.isSecondaryContactWhatsapp.value,
            "isSecondaryMobileDisplay": this.lawyerForm.controls.isSecondaryContactVisible.value,
            "city": this.lawyerForm.controls.city.value,
            "state": this.lawyerForm.controls.state.value,
            "email": this.lawyerForm.controls.email.value,
            "password": this.lawyerForm.controls.password.value,
            "confirmPassword": this.lawyerForm.controls.confirmPassword.value,
            "barLicenseNumber": this.lawyerForm.controls.licenseNo.value,
            "stateBar": this.lawyerForm.controls.stateBar.value,
            "practiceYear": parseInt(this.lawyerForm.controls.practiceYear.value),
            "coreCompetency": this.lawyerForm.controls.coreCompetency.value,
            "practicingCourt": this.lawyerForm.controls.courtName.value,
            "practicingField": this.lawyerForm.controls.practiceField.value,
            "isEmailDisplay": false,
            "barAddress": this.lawyerForm.controls.barAddress.value,
            "isBarAddressDisplay": this.lawyerForm.controls.isAddressVisible.value,
            "status": status,
            "subDivision": this.lawyerForm.controls.subDivision.value,
          },
          "profileFile": null,
          "docFile": null
        }
      }

      this._apolloService.uploadLawyer(mutation, this.lawyerForm.controls.file.value, this.lawyerForm.controls.docFile.value).subscribe(objRes => {
        if (objRes.data != null) {

          if (isLawyerVerified == false) {
            if (objRes.data.createLawyers.status == 200) {
              let btn = document.getElementById('accountVerificationButton') as HTMLElement;
              btn.click();
            }
            else {
              this._toastMessage.error(objRes.data.createLawyers.message);
            }
          }
          if (isLawyerVerified == true) {
            this._toastMessage.success(objRes.data.createLawyers.message);
            this._router.navigate(['/auth/login']);
          }
        }
        else {
          this._toastMessage.error(objRes.data.createLawyers.message);
        }
      })
    }
  }

  async isLawyerVerified(barLiscenceNo: string): Promise<Boolean> {
    let isVerified: any = false;
    let reqObj = {
      enrollmentNo: barLiscenceNo
    }
    let respObj = await lastValueFrom(this._apolloService.post('/lawyer/verify', reqObj));
    if (respObj.status == "success") {
      isVerified = true;
    }
    return isVerified;
  }

  hasGstInNo() {
    if (this.sellerForm.controls.hasGstin.value == true) {
      this.sellerForm.controls.gstinNo.addValidators(Validators.required)
    }
    else {
      this.sellerForm.controls.hasGstin.removeValidators(Validators.required)
    }
  }

  sellerSignup() {
    if (this.sellerForm.value.file == "") {
      this._toastMessage.error("Please add profile image !!");
    }
    else if (!this.sellerForm.valid) {
      this._toastMessage.error("Please Fill all the fields !!");
    }
    else if (!this.emailOtpVerified) {
      this._toastMessage.error("Please verify your email !!");
    }
    else {
      const mutation = {
        "query": "mutation ($input: SellerProfile!, $file: Upload) { CreateSeller(input: $input, file: $file) { status message data }}",
        "variables": {
          "input": {
            "name": this.sellerForm.controls.name.value,
            "primaryContact": this.sellerForm.controls.phoneNumber.value,
            "isPrimaryMobileDisplay": this.sellerForm.controls.isPrimaryContactVisible.value,
            "isPrimaryContactWhatsapp": this.sellerForm.controls.isPrimaryContactWhatsapp.value,
            "state": this.sellerForm.controls.state.value,
            "secondaryContact": this.sellerForm.controls.secondaryContact.value,
            "isSecondaryContactWhatsapp": this.sellerForm.controls.isSecondaryContactWhatsapp.value,
            "isSecondaryMobileDisplay": this.sellerForm.controls.isSecondaryContactVisible.value,
            "userType": this.userType,
            "orgainization": this.sellerForm.controls.orgainization.value,
            "city": this.sellerForm.controls.city.value,
            "password": this.sellerForm.controls.password.value,
            "confirmPassword": this.sellerForm.controls.confirmPassword.value,
            "email": this.sellerForm.controls.email.value,
            "isEmailVisible": this.sellerForm.controls.isEmailVisible.value,
            "organisationInfo": this.sellerForm.controls.organisationInfo.value,
            "address": this.sellerForm.controls.address.value,
            "isAddressVisible": this.sellerForm.controls.isAddressVisible.value,
            "haveGSTIN": this.sellerForm.controls.hasGstin.value,
            "gstinNo": this.sellerForm.controls.gstinNo.value,
            "panNo": this.sellerForm.controls.panNo.value,
          },
          "file": null
        }
      }
      // console.log("file", this.sellerForm.controls.file.value)

      this._apolloService.upload(mutation, this.sellerForm.controls.file.value, "0").subscribe(objRes => {
        if (objRes.data != null) {
          // console.log("objRes", objRes.data)
          this._toastMessage.success(objRes.data.CreateSeller.message);
          this._router.navigate(['/auth/login']);
        }
        else {
          this._toastMessage.error(objRes.data.CreateSeller.message);
        }
      })
    }
  }

  citySelectionChange(e: any, formName: string) {
    let stateObj = this.cityList.find(x => x.name == e.value);
    switch (formName) {
      case 'userForm':
        this.userForm.controls.state.patchValue(stateObj.state);
        break;
      case 'lawyerForm':
        this.lawyerForm.controls.state.patchValue(stateObj.state);
        if (stateObj.state == 'Madhya Pradesh') {
          this.docUploadEnabled = false;
        }
        else if (stateObj.state == 'Maharashtra') {
          this.docUploadEnabled = false;
        }
        else {
          this.docUploadEnabled = true;
        }
        break;
      case 'judgeForm':
        this.judgeForm.controls.state.patchValue(stateObj.state);
        break;
      case 'sellerForm':
        this.sellerForm.controls.state.patchValue(stateObj.state);
        break;
      default:
        break;
    }
  }

  getCitiesList() {
    this._http.get('assets/JSON/cities.json').subscribe((data: any) => {
      this.cityList = data;
      this.filteredCities = this.cityList;
    })
  }

  filterCity(e: any) {
    let filter = e.target.value.toLowerCase();
    this.filteredCities = this.cityList.filter((key: any) =>
      key.name.toLowerCase().startsWith(filter)
    );
  }

  userTypeChange() {
    this.lawyerForm.reset();
    this.lawyerForm = this._fb.group(new LawyerSignupModel());
    this.userForm.reset();
    this.userForm = this._fb.group(new UserSignupModel());
    this.judgeForm.reset();
    this.judgeForm = this._fb.group(new JudgeSignupModel());
    this.emailOtpVerified = false;
    this.onSubmitOtp();
  }

  getPractiscingField() {
    this._http.get('assets/JSON/practiscing_field.json').subscribe({
      next: (data) => {
        this.fields = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getImage(image: any) {
    return window.location.host + image;
  }

  ngOnDestroy() {
    let element = document.getElementById('dismissModal') as HTMLElement;
    element.click();
  }
}
