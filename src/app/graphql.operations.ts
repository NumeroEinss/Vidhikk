import { gql } from "apollo-angular";

export abstract class GQLConfig {

    //forMobile
    static sendOtp = gql`mutation 
        SendOtp($mobile:String!){
            sendOtp(input: { method: "phone", phoneNumber: $mobile }) {
                status
                message
              }
        }`;

    //forMobile
    static verifyOtp = gql`query 
        VerifyOTP($mobile:String!,$otp:String!){
            verifyOtp(input:{method: "phone", phoneNumber:$mobile,otp:$otp})
                {
                    status
                    message
              
                }
        }`;
    // -------------------------------------------------------------------

    //forEmail
    static sendOtpEmail = gql`mutation
        SendOtpEmail($email: String!,$mobile:String!) {
            sendOtp(input: {method:"email", phoneNumber:$mobile, email:$email })
            {
                status
                message
            }
        }`;

    static verifyOtpEmail = gql`query
        VerifyOtpEmail($email: String!, $otp: String!) {
            verifyOtp(input: {method:"email", email: $email, otp: $otp })
            {
                status
                message

            }
        }`;

    static resendOtpEmail = gql`mutation
        SendOtpEmail($email: String!) {
            sendOtp(input: {method:"email", email:$email })
            {
                status
                message
            }
        }`;

    // --------------------------------------------------------------------

    //forMobile
    static forgotPasswordMobile = gql`mutation
        ForgotPasswordMobile($mobile: String!) {
            forgotPassword(input: {method:"phone", phoneNumber: $mobile })
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpMobile = gql`mutation
        ForgotPasswordVerifyOtpMobile($mobile: String!, $otp: String!) {
            forgotPasswordVerifyOtp(input: {method:"phone", phoneNumber: $mobile, otp: $otp })
            {
                status
                message

            }
        } `;


    // --------------------------------------------------------------------

    // forEmail
    static forgotPasswordEmail = gql`mutation
        ForgotPasswordEmail($email: String!) {
            forgotPassword(input: {method:"email", email: $email })
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpEmail = gql`mutation
        ForgotPasswordVerifyOtpEmail($email: String!, $otp: String!) {
            forgotPasswordVerifyOtp(input: {method:"email", email: $email, otp: $otp })
            {
                status
                message

            }
        } `;

    // ---------------------------------------------------------------------

    // forResetPasswordMobile
    static resetPasswordMobile = gql`mutation
        ResetPasswordMobile($mobile: String!, $password: String!, $confirmPassword: String!){
            resetPassword(input: { phoneNumber: $mobile, password: $password, confirmPassword: $confirmPassword })
            {
                status
                message

            }
        } `;

    // forResetPasswordEmail
    static resetPasswordEmail = gql`mutation
        ResetPasswordEmail($email: String!, $password: String!, $confirmPassword: String!){
            resetPassword(input: { email: $email, password: $password, confirmPassword: $confirmPassword })
            {
                status
                message

            }
        } `;

    // --------------------------------------------------------------------------------

    //createUser
    static createUser = gql`mutation
        CreateUser($userType: String!, $name: String!, $mobile: String!, $isPrimaryContactWhatsapp: Boolean!, $secondaryContact: String!, 
            $isSecondaryContactWhatsapp: Boolean!, $address: String!, $city: String!, $state: String!, $email: String!, $password: String!, $confirmPassword: String! ){
            createUser(input: {
                userType: $userType,
                name: $name,
                phoneNumber: $mobile,
                isPrimaryContactWhatsapp: $isPrimaryContactWhatsapp,
                secondaryContact: $secondaryContact,
                isSecondaryContactWhatsapp:  $isSecondaryContactWhatsapp,
                address: $address,
                city:$city,
                state: $state,
                email: $email,
                password: $password,
                confirmPassword: $confirmPassword
              })
              {
                status
                message
                data
              }
        } `;

        // login as mobile
        static loginToMobile = gql`mutation
        LoginToMobile($mobile:String!, $password:String!, $userType:String!){
            login(input:{phoneNumber:$mobile, password:$password, userType:$userType})
            {
                status
                message
                data
            }
        }`

         // login as email
         static loginToEmail = gql`mutation
         LoginToMobile($email:String!, $password:String!, $userType:String!){
             login(input:{email:$email, password:$password, userType:$userType})
             {
                 status
                 message
                 data
             }
         }`
}