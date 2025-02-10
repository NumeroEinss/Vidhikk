import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
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
}
