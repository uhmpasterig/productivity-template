export const authConfig = {
  loginUrl: "/login",
  signupUrl: "/signup",
  callbackUrl: "/api/auth/callback",
  redirectAfterSignout: "/",
  redirectAfterSignin: "/successtest",
  onboardingUrl: "/onboarding",
  protectedRoutes: ["/dashboard", "/settings"],
};
