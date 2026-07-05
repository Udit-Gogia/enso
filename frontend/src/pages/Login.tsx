import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthField } from "@/features/auth/components/AuthField";
import PageTransition from "@/components/common/PageTransition";
import useAuth from "@/features/auth/hooks/useAuth";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

type FormValues = z.infer<typeof formSchema>;

export function Login() {
  const { submitLogin, navigateToRegister } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    shouldFocusError: true,
  });

  async function onSubmit(data: FormValues) {
    await submitLogin(data);
  }

  return (
    <PageTransition slideUp>
      <AuthCard
        title="Welcome back."
        subtitle="Sign in to continue on Enso."
        submitLabel="Sign in"
        submittingLabel="Signing in..."
        isSubmitting={form.formState.isSubmitting}
        formId="login-form"
        forgotPassword
        onForgotPassword={() => console.log("forgot password")}
        bottomText="Don't have an account?"
        bottomLinkText="Join Enso"
        onBottomLinkClick={navigateToRegister}
      >
        <form
          id="login-form"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-disabled={form.formState.isSubmitting}
        >
          <FieldGroup>
            <AuthField
              name="email"
              control={form.control}
              label="Email"
              placeholder="Email address"
              type="email"
              autoComplete="email"
              disabled={form.formState.isSubmitting}
            />
            <AuthField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={form.formState.isSubmitting}
              isPassword
              hint={
                <div className="w-full flex justify-end mt-2">
                  <p className="text-xs text-ink-muted/80 underline underline-offset-4 hover:text-primary hover:cursor-pointer transition-all duration-300 ease-in-out">
                    Forgot password?
                  </p>
                </div>
              }
            />
          </FieldGroup>
        </form>
      </AuthCard>
    </PageTransition>
  );
}
