import { gql } from "apollo-angular";

export abstract class GQLConfig {

    //forMobile
    static sendOtp = gql`mutation 
        SendOtp($mobile:String!){
            sendOtp(input: { method:"phone",phoneNumber: $mobile }) {
                status
                message
              }
        }`;

    //forMobile
    static verifyOtp = gql`query 
        VerifyOTP($mobile:String!,$otp:String!){
            verifyOtp(input:{method:"phone",phoneNumber:$mobile,otp:$otp})
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
            verifyOtp(input: {method: "email", email: $email, otp: $otp })
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
            forgotPassword(input: {method:"phone", phoneNumber: $mobile })
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpMobile = gql`mutation
        ForgotPasswordVerifyOtpMobile($mobile: String!, $otp: String!) {
            forgotPasswordVerifyOtp(input: { method:"phone",phoneNumber: $mobile, otp: $otp })
            {
                status
                message

            }
        } `;

    // --------------------------------------------------------------------

    // forEmail
    static forgotPasswordEmail = gql`mutation
        ForgotPasswordEmail($email: String!) {
            forgotPassword(input: {method:"email",  email: $email })
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
            resetPassword(input: {phoneNumber: $mobile, password: $password, confirmPassword: $confirmPassword })
            {
                status
                message

            }
        } `;

    // forResetPasswordEmail
    static resetPasswordEmail = gql`mutation
        ResetPasswordEmail($email: String!, $password: String!, $confirmPassword: String!){
            resetPassword(input: {email: $email, password: $password, confirmPassword: $confirmPassword })
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

    static loginWithEmail = gql`mutation Login($email: String!, $password: String!, $userType: String!) {
        login(input: { email: $email, password: $password, userType: $userType }){
            status
            message
            data
        }
    }`;

    static loginWithMobile = gql`mutation Login($mobile: String!, $password: String!, $userType: String!) {
        login(input: { phoneNumber: $mobile, password: $password, userType: $userType }){
            status
            message
            data
        }
    }`;


    static createLawyer = gql`mutation CreateLawyer($userType: String!, $lawyerName: String!, $fatherName: String!, $primaryContact: String!,
        $isPrimaryContactWhatsapp: Boolean!, $isPrimaryMobileDisplay: Boolean!, $secondaryContact: String!, $isSecondaryContactWhatsapp: Boolean!, $isEmailDisplay: Boolean!,
        $isSecondaryMobileDisplay: Boolean!, $barAddress: String!, $city: String!, $state: String!, $email: String!, $password: String!, $confirmPassword: String!, $barLicenseNumber: String!,
        $stateBar: String!, $practiceYear: String!, $coreCompetency: String!, $practicingCourt: String!, $practicingField: [String!]!, $isBarAddressDisplay: Boolean!, $orgainization: String) {
        createLawyers(input: {
            userType: $userType,
            lawyerName: $lawyerName,
            fatherName: $fatherName,
            primaryContact: $primaryContact,
            isPrimaryContactWhatsapp: $isPrimaryContactWhatsapp,
            isPrimaryMobileDisplay: $isPrimaryMobileDisplay,
            secondaryContact: $secondaryContact,
            isSecondaryContactWhatsapp: $isSecondaryContactWhatsapp,
            isSecondaryMobileDisplay: $isSecondaryMobileDisplay,
            city: $city,
            state: $state,
            email: $email,
            password: $password,
            confirmPassword: $confirmPassword,
            barLicenseNumber: $barLicenseNumber,
            stateBar: $stateBar,
            practiceYear: $practiceYear,
            coreCompetency: $coreCompetency,
            practicingCourt: $practicingCourt,
            practicingField: $practicingField,
            barAddress: $barAddress,
            isBarAddressDisplay: $isBarAddressDisplay,
            isEmailDisplay: $isEmailDisplay
            orgainization: $orgainization
        }) {
            status
            message
            data
        }
    }`;

    static addPost = gql`mutation PostLawyerActivity($lawyerId: String!, $title: String!, $description: String!, $likeCount: Float,$commentCount:Float) {
        postLawyerActivity(input: {
            lawyerId: $lawyerId,
            title: $title,
            description: $description,
            likeCount: $likeCount,
            commentCount: $commentCount
        }) {
            status
            message
        }
    }`;

    static getActivityFeed = gql`query {
        getpostList {
          status
          message
          data
        }
    }`;

    static getNewsFeed = gql`query {
        getNewsFeed {
          status
          message
          data
        }
    }`;

    static likeUnlikePost = gql`mutation LikeUnlikePost($postId: String!, $isLiked: Boolean!, $userId: String!) {
        postLike(input: {
            postId: $postId,
            isLiked: $isLiked,
            userId: $userId
        }) {
            status
            message
        }
    }`
}