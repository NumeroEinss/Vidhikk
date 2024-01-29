export abstract class ApiResourceConfig {

    static baseUrl = "localhost:3002/api/"

    static loginWithMobile = "lawyer/addContact";
    static loginWithEmail = "lawyer/loginViaEmail";
    static addContact = "lawyer/addContact";
    static reVerifyContact = "lawyer/resendVerifyContact";
    static verifyContact = "lawyer/verifyContact";
    static sendEmailVerification = "lawyer/emailVerification";
    static emailVerification = "lawyer/verifyEmail";
    static addProfile = "lawyer/addProfile";
    static completeProfile = "lawyer/completeProfile";
    static forgotPassword = "lawyer/forgotPassword";
    static verifyForgotPassword = "lawyer/verifyForgotPassword";

    static setNewPassword(id: string) {
        return `lawyer/setNewPassword/${id}`;
    }

    //Activity Feed
    static createPost = "lawyer/createPost";
    static getFeedList = "lawyer/postList";

    static getFeedDetail(id: string) {
        return `lawyer/postDetails/${id}`;
    }

    static commentPost(id: string) {
        return `lawyer/commentPost/${id}`;
    }

    static likeUnlikePost(id: string) {
        return `lawyer/reactPost/${id}`;
    }
}