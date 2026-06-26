import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";
import { FieldGroup } from "@/components/ui/field";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { AuthField } from "@/features/auth/components/AuthField";
import PageTransition from "@/components/common/PageTransition";

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
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
    shouldFocusError: true,
  });

  function onSubmit(data: FormValues) {
    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-code p-4 text-code-foreground">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      style: {
        "--border-radius": "calc(var(--radius) + 4px)",
      } as React.CSSProperties,
    });
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
        onBottomLinkClick={() => navigate("/login")}
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
