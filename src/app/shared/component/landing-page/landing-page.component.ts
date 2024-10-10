import { Component, AfterViewInit } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {

  constructor(private _toastMessage: ToastMessageService) {
    this._toastMessage.showLoader = true;
  }

  ngAfterViewInit() {
    this._toastMessage.showLoader = false;
  }

  location = [
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Andhra Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Madhya Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Mumbai'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Delhi'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Gujrat'
    },
    {
      image: '../../../../assets/images/image/city_demo_image2.png',
      city: 'Andhra Pradesh'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Calcutta'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Karnataka'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Calcutta'
    },
    {
      image: '../../../../assets/images/image/city_demo_image.png',
      city: 'Karnataka'
    },
  ];



  termsCondition = [
    {
      section: '1',
    },
    {
      subHeading: '1. Use of the Website',
      details: [
        '1.1. You must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you are at least 18 years old.',
        '1.2. You agree to use the Website only for lawful purposes and in accordance with these Terms and all applicable laws and regulations.',
        '1.3. You may not use the Website in any manner that could disable, overburden, damage, or impair the Website or interfere with any other partys use of the Website.'
      ],
    },
    {
      subHeading: '2. Intellectual Property Rights',
      details: [
        '2.1. All content on the Website, including text, graphics, logos, images, audio clips, and software, is the property of Vidhik or its licensors and is protected by copyright and other intellectual property laws.',
        '2.2. You may not reproduce, distribute, modify, or create derivative works of any content from the Website without the prior written consent of Vidhik.',
      ],
    },
    {
      subHeading: '3. User Contributions',
      details: [
        '3.1. The Website may allow you to submit comments, feedback, or other content ("User Contributions").',
        '3.2. By submitting User Contributions, you grant Vidhik a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Contributions throughout the world in any media.',
        '3.3. You represent and warrant that your User Contributions do not infringe any third party&quotes rights, including intellectual property rights, and are not unlawful, defamatory, obscene, or otherwise objectionable.',
      ],
    },
    {
      subHeading: '4. Limitation of Liability',
      details: [
        '4.1. In no event shall Vidhik, its officers, directors, employees, or agents be liable to you or any third party for any indirect, consequential, incidental, special, or punitive damages arising out of or relating to your use of the Website.',
        '4.2. Vidhik shall not be liable for any loss or damage arising out of or relating to any User Contributions or third-party content posted on the Website.'
      ],
    },
    {
      subHeading: '5. Governing Law',
      details: [
        '5.1. Vidhik reserves the right to change these Terms at any time. Any changes will be effective immediately upon posting on the Website. Your continued use of the Website after the posting of revised Terms constitutes your acceptance of such changes.'
      ],
    },
    {
      subHeading: '6. Changes to Terms',
      details: [
        '6.1. You must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you are at least 18 years old.',
        '6.2. You agree to use the Website only for lawful purposes and in accordance with these Terms and all applicable laws and regulations.',
        '6.3. You may not use the Website in any manner that could disable, overburden, damage, or impair the Website or interfere with any other partys use of the Website.'
      ],
    },
    {
      subHeading: '7. Contact Information',
      details: [
        '7.1. If you have any questions about these Terms, please contact us at [Contact Email]. By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations.'
      ],
    },
  ];

  privacyPolicy = [
    {
      subHeading: '1. Information We Collect',
      details: [
        '1.1. Personal Identification Information: We may collect personal identification information from users in various ways, including but not limited to when users visit our Website, register on the Website, subscribe to newsletters, respond to surveys, fill out forms, and in connection with other activities, services, features, or resources we make available on our Website. Users may be asked for, as appropriate, name, email address, phone number, and other relevant information.',
        '1.2. Non-personal Identification Information: We may collect non-personal identification information about users whenever they interact with our Website. Non-personal identification information may include the browser name, the type of computer or device, and technical information about users means of connection to our Website, such as the operating system and the Internet service providers utilized.'
      ],
    },
    {
      subHeading: '2. How We Use Collected Information',
      details: [
        '2.1. We may collect and use userspersonal information for the following purposes: To personalize user experience: We may use information in the aggregate to understand how our users as a group use the services and resources provided on our Website.To improve our Website: We continually strive to improve our Website offerings based on the information and feedback we receive from users.To send periodic emails: We may use the email address to respond to inquiries, questions, and/or other requests.'
      ],
    },
    {
      subHeading: '3. How We Protect Your Information',
      details: [
        '3.1. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Website.'
      ],
    },
    {
      subHeading: '4. Sharing Your Personal Information',
      details: [
        '4.1. We do not sell, trade, or rent users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.'
      ],
    },
    {
      subHeading: '5. Third-Party Websites',
      details: [
        '5.1. Users may find advertising or other content on our Website that links to the sites and services of our partners, suppliers, advertisers,'
      ],
    },
  ];

  cookiesPolicy = [
    {
      subHeading: '1. What are Cookies?',
      details: [
        '1.1. Cookies are small text files that are placed on your computer or  device by websites that you visit. They are widely used in order to make  websites work, or work more efficiently, as well as to provide  information to the owners of the site.'
      ],
    },
    {
      subHeading: '2. How We Use Cookies',
      details: [
        '2.1. Essential Cookies: These cookies are necessary for the Website to function properly. They enable you to navigate around the Website and use its features.',
        '2.2. Analytical/Performance Cookies: These cookies allow us to recognize and count the number of visitors to the Website and see how visitors move around the Website. This helps us to improve the way the Website works.',
        '2.3. Functionality Cookies: These cookies are used to recognize you when you return to the Website. This enables us to personalize our content for you and remember your preferences.',
        '2.4. Advertising/Targeting Cookies: These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement, as well as to measure the effectiveness of the advertising campaign.',
      ],
    },
    {
      subHeading: '3. Third-Party Cookies',
      details: [
        '3.1. We may also use third-party cookies, such as those provided by  Google Analytics, to help us analyze how users use the Website and to  serve advertisements to you. The use of these cookies is subject to the  third parties own privacy policies.'
      ],
    },
    {
      subHeading: '4. How to Control Cookies',
      details: [
        '4.1. You can control and/or delete cookies as you wish. You can delete  all cookies that are already on your computer and you can set most  browsers to prevent them from being placed. If you do this, however, you  may have to manually adjust some preferences every time you visit a  site and some services and functionalities may not work.'
      ],
    },
    {
      subHeading: '5. Changes to this Cookies Policy',
      details: [
        '5.1. We may update this Cookies Policy from time to time in order to  reflect changes to the cookies we use or for other operational, legal,  or regulatory reasons. Please revisit this Cookies Policy regularly to  stay informed about our use of cookies.'
      ],
    },
  ];

  copyrights = [
    {
      subHeading: '1. Copyright Ownership',
      details: [
        '1.1. Cookies are small text files that are placed on your computer or  device by websites that you visit. They are widely used in order to make  websites work, or work more efficiently, as well as to provide  information to the owners of the site.'
      ],
    },
    {
      subHeading: '2. Use of Website Content',
      details: [
        '2.1. You may view, download, and print content from the Website for your personal, non-commercial use only, provided that you do not modify or alter the content in any way and that you retain all copyright and other proprietary notices contained in the original content.',
        '2.2. Except as expressly permitted above, you may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any content from the Website without the prior written consent of Vidhik.',
      ],
    },
    {
      subHeading: '3. Copyright Infringement',
      details: [
        '3.1. If you believe that your copyrighted work has been copied and is  accessible on the Website in a way that constitutes copyright  infringement, please notify us immediately by sending a notice to our  designated copyright agent at the  address',
        '3.2. Your notice must include:',
        'a. A physical or electronic signature of the copyright owner or a person authorized to act on behalf of the copyright owner',
        'b. Identification of the copyrighted work claimed to have been infringed',
        'c. Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material',
        'd. Information reasonably sufficient to permit us to contact you, such as an address, telephone number, and, if available, an email address',
        'e. A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law',
        'f. A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.'
      ],
    },
    {
      subHeading: '4. Counter-Notification',
      details: [
        '4.1. If you believe that the material removed or disabled as a result of a copyright infringement notice is not infringing, or that you have the authorization from the copyright owner, the copyright owner&quotes agent, or pursuant to law, to post and use the material in your content, you may send a counter-notification to our designated copyright agent at the address provided above.',
        '4.2. Your counter-notification must include:',
        'a. Your physical or electronic signature',
        'b. Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled',
        'c. A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material removed or disabled',
        'd. Your name, address, and telephone number, and a statement that you consent to the jurisdiction of the federal district court for the judicial district in which your address is located, or if your address is outside of the United States, for any judicial district in which we may be found, and that you will accept service of process from the person who provided the original notification of alleged infringement.'
      ],
    },
    {
      subHeading: '5. Changes to Copyright Policy',
      details: [
        '5.1. We reserve the right to modify or update this Copyrights Page at  any time without prior notice. Any changes will be effective immediately  upon posting on the Website. Your continued use of the Website after  the posting of revised Copyrights Page constitutes your acceptance of  such changes.'
      ],
    },
  ];

  trustSafety = [
    {
      subHeading: '1. User Safety',
      details: [
        '1.1. We are committed to providing a safe and secure environment for all users of the Website. We employ various measures to protect against unauthorized access, misuse, or alteration of information.',
        '1.2. Users are encouraged to report any suspicious or inappropriate activity, content, or behavior encountered on the Website. Reports can be submitted through the designated channels provided on the Website.'
      ],
    },
    {
      subHeading: '2. Privacy Protection',
      details: [
        '2.1. Essential Cookies: These cookies are necessary for the Website to function properly. They enable you to navigate around the Website and use its features.',
        '2.2. Analytical/Performance Cookies: These cookies allow us to recognize and count the number of visitors to the Website and see how visitors move around the Website. This helps us to improve the way the Website works.',
        '2.3. Functionality Cookies: These cookies are used to recognize you when you return to the Website. This enables us to personalize our content for you and remember your preferences.',
        '2.4. Advertising/Targeting Cookies: These cookies are used to deliver advertisements that are relevant to you and your interests. They are also used to limit the number of times you see an advertisement, as well as to measure the effectiveness of the advertising campaign.',
      ],
    },
    {
      subHeading: '3. Content Guidelines',
      details: [
        '3.1. We have established content guidelines to ensure that the material published on the Website complies with applicable laws and regulations and aligns with our community standards.',
        '3.2. Users are expected to adhere to these guidelines when posting or sharing content on the Website. Content that violates these guidelines may be removed, and users who repeatedly violate the guidelines may face account suspension or termination.'
      ],
    },
    {
      subHeading: '4. Reporting Violations',
      details: [
        '4.1. Users are encouraged to report any violations of our terms of service, content guidelines, or applicable laws and regulations. Reports can be submitted through the designated reporting channels provided on the Website.',
        '4.2. We investigate all reports promptly and take appropriate action, which may include removing offending content, suspending or terminating user accounts, and cooperating with law enforcement authorities if necessary.'
      ],
    },
    {
      subHeading: '5. Child Safety',
      details: [
        '5.1. We are committed to protecting the safety and privacy of children  online. The Website is not intended for use by children under the age of  13. We do not knowingly collect personal information from children  under 13. If you believe that we have inadvertently collected personal  information from a child under 13, please contact us immediately so that  we can take appropriate action.'
      ],
    },
  ];

  communityStandard = [
    {
      subHeading: '1. Respectful Conduct',
      details: [
        '1.1. We expect all users of the Website to treat each other with respect, dignity, and courtesy. Harassment, bullying, hate speech, discrimination, and threats of violence are strictly prohibited.',
        '1.2. Users are encouraged to engage in constructive and respectful dialogue, even when expressing differing opinions. Disagreements should be handled in a civil manner, without resorting to personal attacks or insults.'
      ],
    },
    {
      subHeading: '2. Content Guidelines',
      details: [
        '2.1. Users are responsible for the content they post or share on the Website. Content must not violate any applicable laws or regulations, including those relating to copyright, trademark, defamation, and privacy.',
        '2.2. Content that is illegal, obscene, pornographic, violent, hateful, or otherwise offensive is prohibited. This includes, but is not limited to, content that promotes violence, discrimination, or illegal activities.',
      ],
    },
    {
      subHeading: '3. Integrity of Information',
      details: [
        '3.1. Users should strive to provide accurate and truthful information on the Website. Misrepresentation, impersonation, or falsification of information is prohibited.',
        '3.2. Users are encouraged to cite sources and provide evidence to support their claims whenever possible. Deliberate dissemination of false information or misinformation is not tolerated.'
      ],
    },
    {
      subHeading: '4. Respect for Privacy',
      details: [
        '4.1. Users must respect the privacy of others and refrain from sharing personal or sensitive information without consent.',
        '4.2. Doxxing, stalking, or any other form of invasive behavior that compromises the privacy or safety of individuals is strictly prohibited.'
      ],
    },
    {
      subHeading: '5. Reporting Violations',
      details: [
        '5.1. Users are encouraged to report any violations of our community standards or terms of service. Reports can be submitted through the designated reporting channels provided on the Website.',
        '5.2. We investigate all reports promptly and take appropriate action, which may include removing offending content, suspending or terminating user accounts, and cooperating with law enforcement authorities if necessary.'
      ],
    },
  ];

  opacityStyling = { opacity: 0.1 };

  selectedSection(id: string) {
    let element = document.getElementById(id) as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
