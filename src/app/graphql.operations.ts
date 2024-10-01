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
        SendOtpEmail($email: String!,$phoneNumber: String!) {
            sendOtp(input: {method:"email", email:$email,phoneNumber:$phoneNumber })
            {
                status
                message
            }
        }`;

    static verifyOtpEmail = gql`query
        VerifyOtpEmail($email: String!, $otp: String!,$mobile:String!) {
            verifyOtp(input: {method: "email", email: $email, otp: $otp,phoneNumber:$mobile })
            {
                status
                message
            }
        }`;

    // --------------------------------------------------------------------

    //forMobile
    static forgotPasswordMobile = gql`mutation
        ForgotPasswordMobile($mobile: String!,$userType:String!) {
            forgotPassword(input: {method:"phone", phoneNumber: $mobile,userType:$userType })
            {
                status
                message
                data
            }
        }`;

    static forgotPasswordVerifyOtpMobile = gql`mutation
        ForgotPasswordVerifyOtpMobile($mobile: String!, $otp: String!,$userType:String!) {
            forgotPasswordVerifyOtp(input: { method:"phone",phoneNumber: $mobile, otp: $otp,userType:$userType })
            {
                status
                message

            }
        } `;

    // --------------------------------------------------------------------

    // forEmail
    static forgotPasswordEmail = gql`mutation
        ForgotPasswordEmail($email: String!, $userType: String!) {
            forgotPassword(input: {method:"email",  email: $email, userType:$userType})
            {
                status
                message

            }
        } `;

    static forgotPasswordVerifyOtpEmail = gql`mutation
        ForgotPasswordVerifyOtpEmail($email: String!, $otp: String!, $userType: String!) {
            forgotPasswordVerifyOtp(input: {method:"email", email: $email, otp: $otp, userType:$userType })
            {
                status
                message

            }
        } `;

    // ---------------------------------------------------------------------

    // forResetPasswordMobile
    static resetPasswordMobile = gql`mutation
        ResetPasswordMobile($mobile: String!, $password: String!, $confirmPassword: String!,$userType:String!){
            resetPassword(input: {phoneNumber: $mobile, password: $password, confirmPassword: $confirmPassword,userType:$userType })
            {
                status
                message

            }
        } `;

    // forResetPasswordEmail
    static resetPasswordEmail = gql`mutation
        ResetPasswordEmail($email: String!, $password: String!, $confirmPassword: String!,$userType:String!){
            resetPassword(input: {email: $email, password: $password, confirmPassword: $confirmPassword,userType:$userType })
            {
                status
                message

            }
        } `;

    // --------------------------------------------------------------------------------

    static resetLoginPassword = gql`mutation($phoneNumber: String!, $password: String!, $oldPassword: String!, $confirmPassword: String!,
     $userType: String!) {
        resetLoginPassword(input: {
            phoneNumber: $phoneNumber,
            oldPassword:$oldPassword,
            password: $password,
            confirmPassword: $confirmPassword,
            userType: $userType
        })
        {
            status
            message
            data
        }
    }`;

    //createUser
    static createUser = gql`mutation
        CreateUser($userType: String!, $name: String!, $mobile: String!, $isPrimaryContactWhatsapp: Boolean!, $secondaryContact: String!, 
            $isSecondaryContactWhatsapp: Boolean!, $address: String!, $city: String!, $state: String!, $email: String!, $password: String!,
             $confirmPassword: String! ){
            createUser(input: {
                userType: $userType,
                name: $name,
                primaryContact: $mobile,
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

    static loginWithEmail = gql`mutation Login($email: String!, $password: String!, $userType: String!,$notificationToken:String) {
        login(input: { email: $email, password: $password, userType: $userType,notificationToken:$notificationToken }){
            status
            message
            data
        }
    }`;

    static loginWithMobile = gql`mutation Login($mobile: String!, $password: String!, $userType: String!,$notificationToken:String) {
        login(input: { phoneNumber: $mobile, password: $password, userType: $userType,notificationToken:$notificationToken}){
            status
            message
            data
        }
    }`;


    static createLawyer = gql`mutation CreateLawyer($userType: String!, $lawyerName: String!, $fatherName: String!, $primaryContact: String!,
        $isPrimaryContactWhatsapp: Boolean!, $isPrimaryMobileDisplay: Boolean!, $secondaryContact: String!, $isSecondaryContactWhatsapp: Boolean!, $isEmailDisplay: Boolean!,
        $isSecondaryMobileDisplay: Boolean!, $barAddress: String!, $city: String!, $state: String!, $email: String!, $password: String!, $confirmPassword: String!, $barLicenseNumber: String!,
        $stateBar: String!, $practiceYear: Float!, $coreCompetency: String!, $practicingCourt: String!, $practicingField: [String!]!, $isBarAddressDisplay: Boolean!, $orgainization: String,
        $file:Upload) {
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
        },
        file:$file) {
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

    static getActivityFeed = gql`mutation {
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
    }`;

    static sendComment = gql`mutation PostComment($postId: String!, $lawyerId: String!, $comment: String!) {
        postComment(input: {postId: $postId,lawyerId: $lawyerId,commentText: $comment}) {
            status
            message
            data
        }
    }`;

    static getPostComment = gql`mutation GetPostComment($postId: String!) {
        getPostComment(input: {postId:$postId}) {
            status
            message
            data
        }
    }`;

    static caseDiarySignUp = gql`mutation SignUp($lawyerId: String!, $userName: String!, $password: String!, $confirmPassword: String!) {
        signUp(input: {
            lawyerId: $lawyerId,
            userName: $userName,
            password: $password,
            confirmPassword: $confirmPassword

        }) {
            status
            message
            data
        }
    }`;

    static caseDiaryLogin = gql`mutation($userName: String!, $password: String!,$lawyerId:String!) {
        signIn(input: {
            userName: $userName,
            password: $password,
            lawyerId: $lawyerId
        }) {
            status
            message
            data
        }
    }`;

    static getCaseDiaryList = gql`mutation($lawyerId: String!) {
        getCaseDiaryList(input: {lawyerId: $lawyerId}) {
            status
            message
            data
        }
    }`;

    static createCaseDiary = gql` mutation($lawyerId: String!, $registrationDate: String!, $courtName: String!, $caseNumber: String,
        $caseName: String!, $caseStage: String!, $city: String, $applicantName: String!, $respondentName: String, $applicationType: String!,
        $applicationSection: String!, $nextHearingDate: String!, $lawyreasonForAbsent: String, $representing: String!, $FIRNumber: String, $FIRDate: String,
        $sectionIPC: String) {
        createCaseDiary(input: {
            lawyerId: $lawyerId,
            registrationDate: $registrationDate,
            courtName: $courtName,
            caseNumber: $caseNumber,
            caseName: $caseName,
            caseStage: $caseStage,
            city: $city,
            applicantName: $applicantName,
            respondentName: $respondentName,
            applicationType: $applicationType,
            applicationSection: $applicationSection,
            nextHearingDate: $nextHearingDate,
            lawyreasonForAbsent: $lawyreasonForAbsent,
            representing: $representing,
            FIRNumber: $FIRNumber,
            FIRDate: $FIRDate,
            sectionIPC: $sectionIPC
        }) {
            status
            message
            data
        }
    }`;

    static getCaseDiaryDetail = gql`mutation($caseDiaryId: String!) {
        caseDiaryDetail(input: {
            caseDiaryId: $caseDiaryId
        }){
            status
            message
            data
        }
    }`;

    static updateCaseDiary = gql`mutation($caseDiaryId: String!, $registrationDate: String!, $courtName: String!, $caseNumber: String,
        $caseName:String!,$caseStage: String!, $city: String, $applicantName: String!, $respondentName: String, $applicationType: String!,
        $applicationSection: String!, $nextHearingDate: String!, $lawyreasonForAbsent: String,$representing:String!, $FIRNumber: String, $FIRDate: String,
        $sectionIPC: String) {
        caseDiaryUpdate(input: {
            caseDiaryId: $caseDiaryId,
            registrationDate: $registrationDate,
            courtName: $courtName,
            caseNumber: $caseNumber,
            caseName:$caseName,
            caseStage: $caseStage,
            city: $city,
            applicantName: $applicantName,
            respondentName: $respondentName,
            applicationType: $applicationType,
            applicationSection: $applicationSection,
            nextHearingDate: $nextHearingDate,
            lawyreasonForAbsent: $lawyreasonForAbsent,
            representing:$representing,
            FIRNumber: $FIRNumber,
            FIRDate: $FIRDate,
            sectionIPC: $sectionIPC
        }){
            status
            message
            data
        }
    }`;

    static forgotCaseDiaryPassword = gql`mutation($lawyerId:String!,$email:String) {
        forgotCaseDiaryPassword(input:{
          lawyerId:$lawyerId
          email:$email
          }) {
          status
          message
          data
        }
      }`;

    static verifyForgotCaseDiaryPassword = gql`mutation($email:String!,$otp:String!) {
        verifyForgotCaseDiaryPassword(input:{
          email:$email,
          otp:$otp
          }) {
          status
          message
          data
        }
      }`;

    static setNewCaseDiaryPassword = gql`mutation($lawyerId:String!,$password:String!,$confirmPassword:String!){
        setNewCaseDiaryPassword(input:{
          lawyerId:$lawyerId,
          password:$password,
          confirmPassword:$confirmPassword
          }) {
          status
          message
          data
        }
      }`;

    static resetCaseDiaryPassword = gql`mutation($lawyerId:String!,$oldPassword:String!,$password:String!,$confirmPassword:String!){
        resetCaseDiaryPassword(input:{
          lawyerId:$lawyerId,
          oldPassword:$oldPassword,
          password:$password,
          confirmPassword:$confirmPassword
          }) {
          status
          message
          data
        }
      }`;

    static getLawyersList = gql`mutation($lawyerId:String!){
        lawyersList(input:{    
        lawyerId:$lawyerId
        }){
            status
            message
            data
        }
    }`;

    static addMember = gql`mutation($lawyerId:String!,$memberId:String!){
        addMember(input:{
            lawyerId:$lawyerId
            memberId:$memberId
        }){
            status
            message
            data
        }
    }`;

    static deleteMember = gql`mutation($lawyerId:String!,$memberId:String!){
        deleteMember(input:{
        lawyerId:$lawyerId
        memberId:$memberId
        }){
            status
            message
            data
        }
    }`;

    static getMemberList = gql`mutation($lawyerId:String!){
        getListMember(input:{
        lawyerId:$lawyerId 
        }){
            status
            message
            data
        }
    }`;

    static createSubDiary = gql`mutation($lawyerId :String!,$caseDiaryId:String!,$memberId:String!){
        createSubDiary(input:{
      lawyerId:$lawyerId 
      caseDiaryId:$caseDiaryId
      memberId:$memberId
        }) {
          status
          message
          data
        }
    }`;

    static getSubDiaryList = gql`mutation($lawyerId:String!) {
        subDiaryList(input:{
          lawyerId:$lawyerId}) {
          status
          message
          data
        }
    }`;

    static getFilteredList = gql`mutation($lawyerId: String!, $experience: String!, $place: String!, $practicingField: String!){
        filterLawyerList(input: {
            lawyerId: $lawyerId
            experience: $experience
            place: $place
            practicingField: $practicingField
        }){
            status
            message
            data
        }
    }`;

    static deleteSubDiary = gql`mutation($subDiaryId: String!) {
        deleteSubDiary(input: {

            subDiaryId: $subDiaryId
        }) {
            status
            message
            data
        }
    }`;

    static addEvents = gql`mutation($lawyerId: String!, $caseId: String, $eventName: String, $eventDescription: String,
        $allDayCheck: Boolean, $colors: String, $eventStartDate: String, $eventEndDate: String, $eventStartTime: String,
        $eventEndTime: String, $repeat: String, $reminder: String) {
        createEvents(input: {
            lawyerId: $lawyerId
          caseId: $caseId
          eventName: $eventName
          eventDescription: $eventDescription
          allDayCheck: $allDayCheck
          colors: $colors
          eventStartDate: $eventStartDate
          eventEndDate: $eventEndDate
          eventStartTime: $eventStartTime
          eventEndTime: $eventEndTime
          repeat: $repeat
          reminder: $reminder
        }) {
            status
            message
            data
        }
    }`;

    static getLawyerEvents = gql`mutation($lawyerId:String!) {
        getLawyerEvent(input: {
          lawyerId: $lawyerId
        }) {
          status
          message
          data
        }
      }`;

    static editEvents = gql`mutation($eventId: String!, $eventName: String, $eventDescription: String,
        $allDayCheck: Boolean, $colors: String, $eventStartDate: String, $eventEndDate: String, $eventStartTime: String,
        $eventEndTime: String, $repeat: String, $reminder: String
    ) {
        editEvent(input: {
            eventId: $eventId
          eventName: $eventName
          eventDescription: $eventDescription
          allDayCheck: $allDayCheck
          colors: $colors
          eventStartDate: $eventStartDate
          eventEndDate: $eventEndDate
          eventStartTime: $eventStartTime
          eventEndTime: $eventEndTime
          repeat: $repeat
          reminder: $reminder

        }) {
            status
            message
            data
        }
    }`;

    static deleteEvent = gql`mutation($eventId: String!) {
        deleteEvent(input: {
            eventId: $eventId
        }) {
            status
            message
            data
        }
    }`;

    static addAvailability = gql`mutation($lawyerId: String!, $date: String!, $timeSlots: [TimeSlotInput!]) {
        addAvailability(input: {
            lawyerId: $lawyerId
          date: $date
          timeSlots: $timeSlots
        }) {
            status
            message
            data
        }
    }`;

    static getAvailabilityList = gql`mutation($lawyerId: String!) {
        getAvailabilityList(input: {
            lawyerId: $lawyerId
        }) {
            status
            message
            data
        }
    }`;

    static editAvailability = gql`mutation($_id: String!, $date: String!, $timeSlots: [TimeSlotInput!]) {
        editAvailability(input: {
            avability_id: $_id
            date: $date
            timeSlots: $timeSlots
        }) {
            status
            message
            data
        }
    }`;

    static deleteAvailability = gql`mutation($id: String!) {
        deleteAvailability(input: {
            avability_id: $id
        }) {
            status
            message
            data
        }
    }`;

    static getAdvocateList = gql`mutation {
        getLawyerList{
            status
            message
            data
        }
    }`;

    static getTicketList = gql`mutation($Id: String!,$userType:String!) {
        getTicketList(input: {
            Id: $Id
            userType:$userType
        }) {
            status
            message
            data
        }
    }`;

    static getTicketDetail = gql`mutation($ticketId: String) {
        getTicketDetail(input: {
            ticketId: $ticketId
        }) {
            status
            message
            data
        }
    }`;

    static replyTicket = gql`mutation($ticketId: String, $replyText: String, $replyType: String, $replyFrom: String) {
        replyTicket(input: {
            ticketId: $ticketId,
            replyText: $replyText,
            replyType: $replyType,
            replyFrom: $replyFrom
        }) {
            status
            message
            data
        }
    }`;

    static deleteTicket = gql`mutation($ticketId: String) {
        deleteTicket(input: {
            ticketId: $ticketId
        }){
            status
            message
            data
        }
    }`;

    static getLawyerDetail = gql`mutation($lawyerId:String) {
        lawyerProfile(input: {
            lawyerId: $lawyerId
        }) {
            status
            message
            data
        }
    }`;

    static getLawyerRating = gql`mutation($lawyerId: String) {
        getLawyerRatingList(input: {
            lawyerId: $lawyerId,
        }) {
            status
            message
            data
        }
    }`;

    static updateLawyerProfile = gql`mutation($lawyerId: String, $email: String, $primaryContact: String, $coreCompetency: String) {
        updateProfile(input: {
         lawyerId: $lawyerId
         email: $email
         primaryContact: $primaryContact
         coreCompetency: $coreCompetency
        }) {
            status
            message
            data
        }
    }`;

    static getPlanList = gql`mutation{
        planList(input: {
            planType: "LAWYER"
        }){
            status
            message
            data
        }
    }`;
}