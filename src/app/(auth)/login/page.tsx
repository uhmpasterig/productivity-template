import PageContainer from "@/components/PageContainer";
import AuthForm from "../AuthPage";

export default function LoginPage() {
  return (
    <PageContainer>
      <div className="w-full max-w-sm">
        <AuthForm mode="login" />
      </div>
    </PageContainer>
  );
}
