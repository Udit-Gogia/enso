import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthField } from "@/features/auth/components/AuthField";
import PageTransition from "@/components/common/PageTransition";
import useAuth from "@/features/auth/hooks/useAuth";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters.")
    .max(24, "Username can't exceed 24 characters.")
    .regex(/^[a-zA-Z0-9._]+$/, "Only letters, numbers, dots and underscores."),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function Register() {
  const { submitRegister, navigateToLogin } = useAuth();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
    shouldFocusError: true,
  });

  async function onSubmit(data: FormValues) {
    await submitRegister(data);
  }

  return (
    <PageTransition slideUp>
      <AuthCard
        title="Create your account."
        subtitle="Let's get you started."
        submitLabel="Create account"
        submittingLabel="Creating account..."
        isSubmitting={form.formState.isSubmitting}
        formId="register-form"
        bottomText="Already have an account?"
        bottomLinkText="Sign in"
        onBottomLinkClick={navigateToLogin}
      >
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit)}
          aria-disabled={form.formState.isSubmitting}
        >
          <FieldGroup>
            <AuthField
              name="name"
              control={form.control}
              label="Username"
              placeholder="johnsmith"
              autoComplete="username"
              disabled={form.formState.isSubmitting}
            />
            <AuthField
              name="email"
              control={form.control}
              label="Email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              disabled={form.formState.isSubmitting}
            />
            <AuthField
              name="password"
              control={form.control}
              label="Password"
              placeholder="Create a password"
              autoComplete="new-password"
              disabled={form.formState.isSubmitting}
              isPassword
              description="Use 8 or more characters."
            />
          </FieldGroup>
        </form>
      </AuthCard>
    </PageTransition>
  );
}
