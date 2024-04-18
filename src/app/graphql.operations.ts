import { gql } from "apollo-angular";

export abstract class GQLConfig {

    //forMobile
    static sendOtp = gql`mutation 
        SendOtp($mobile:String!){
            sendOtp(input:{phoneNumber:$mobile})
                {
                    status
                    message
                }
        }`;

    //forMobile
    static verifyOtp = gql`query 
        VerifyOTP($mobile:String!,$otp:String!){
            verifyOtp(input:{phoneNumber:$mobile,otp:$otp})
                {
                    status
                    message
              
                }
        }`;
    // -------------------------------------------------------------------

    //forEmail
    static sendOtpEmail = gql`mutation
        SendOtpEmail($email: String!,$mobile:String!) {
            sendOtp(input: { phoneNumber:$mobile,email:$email })
            {
                status
                message
            }
        }`;

    static verifyOtpEmail = gql`query
        VerifyOtpEmail($email: String!, $otp: String!) {
            verifyOtp(input: { email: $email, otp: $otp })
            {
                status
                message

            }
        }`;

    static resendOtpEmail = gql`mutation
        SendOtpEmail($email: String!) {
            sendOtp(input: { email:$email })
            {
                status
                message
            }
        }`;

    // --------------------------------------------------------------------

    //forMobile
    static forgotPasswordMobile = gql`mutation
        ForgotPasswordMobile($mobile: String!) {
            forgotPassword(input: { phoneNumber: $mobile })
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpMobile = gql`mutation
        ForgotPasswordVerifyOtpMobile($mobile: String!, $otp: String!) {
            forgotPasswordVerifyOtp(input: { phoneNumber: $mobile, otp: $otp })
            {
                status
                message

            }
        } `;


    // --------------------------------------------------------------------

    // forEmail
    static forgotPasswordEmail = gql`mutation
        ForgotPasswordEmail($email: String!) {
            forgotPassword(input: { email: $email })
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpEmail = gql`mutation
        ForgotPasswordVerifyOtpEmail($email: String!, $otp: String!) {
            forgotPasswordVerifyOtp(input: { email: $email, otp: $otp })
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
        CreateUser($User: Object!){
            createUser(input:$User){
                status
                message
            }
        } `;
}