import * as React from "react";
import { MoveRight, Loader2 } from "lucide-react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/features/auth/components/AuthForm";
import EnsoTitle from "@/components/common/EnsoTitle";

type AuthCardProps = {
  title: string;
  subtitle: string;
  submitLabel: string;
  submittingLabel: string;
  isSubmitting: boolean;
  formId: string;
  bottomText: string;
  bottomLinkText: string;
  onBottomLinkClick: () => void;
  forgotPassword?: boolean;
  onForgotPassword?: () => void;
  children: React.ReactNode;
};

export function AuthCard({
  title,
  subtitle,
  submitLabel,
  submittingLabel,
  isSubmitting,
  formId,
  bottomText,
  bottomLinkText,
  onBottomLinkClick,
  children,
}: AuthCardProps) {
  return (
    <AuthForm
      CardHeaderChildren={
        <>
          <EnsoTitle
            redirectToHome
            className="mx-auto text-2xl [&_img]:h-11 [&_img]:w-11"
          />
          <div className="flex flex-col gap-2">
            <CardTitle className="text-2xl font-bold tracking-tight leading-9">
              {title}
            </CardTitle>
            <CardDescription className="text-sm text-ink-muted">
              {subtitle}
            </CardDescription>
          </div>
        </>
      }
    >
      <CardContent className="px-8">{children}</CardContent>

      <CardFooter className="my-4 flex flex-col gap-2 px-8">
        <Field orientation="horizontal">
          <Button
            disabled={isSubmitting}
            className="w-full text-white active:scale-[0.99]"
            type="submit"
            form={formId}
          >
            {isSubmitting && <Loader2 className="animate-spin mr-2 h-4 w-4" />}
            {isSubmitting ? submittingLabel : submitLabel}
          </Button>
        </Field>
        <p className="text-center text-sm text-ink-muted/80 mt-2">
          {bottomText}{" "}
          <span
            onClick={onBottomLinkClick}
            className="group inline-flex items-center text-primary font-medium hover:underline underline-offset-2 hover:cursor-pointer transition-all duration-200 ease-in-out"
          >
            {bottomLinkText}{" "}
            <MoveRight
              className="group-hover:translate-x-1 transition-all duration-200 ease-in-out"
              height={10}
            />
          </span>
        </p>
      </CardFooter>
    </AuthForm>
  );
}
