export const baseUrl = 'https://jobs-api.squareboat.info/api/v1';
export const apis = {
    baseUrl: 'https://jobs-api.squareboat.info/api/v1',

    login: `${baseUrl}/auth/login`,
    register: `${baseUrl}/auth/register`,
    getResetPasswordToken: `${baseUrl}}/auth/resetpassword/`,
    VerifyPasswordToken: `${baseUrl}}/auth/resetpassword/`,
    changePassword: `${baseUrl}}/auth/resetpassword/`,

    createJobpost: `${baseUrl}/jobs`,
    fetchAllPostedJobs: `${baseUrl}/recruiters/jobs`,
    getSingleJobDetails: `${baseUrl}/jobs`,
    deleteJobpost: `${baseUrl}/jobs`,
}

export default apis;