"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { personelFormConfig as steps } from "./stepsConfig";
import { useForm, FormProvider, type FieldPath } from "react-hook-form";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { createUser, type User } from "@/services/users";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import {userSchema,type UserFormSchema,} from "../../../lib/schemas/userSchema";


import Step1_IdInformation from "./steps/Step1_IdInformation";
import Step2_AddressInfo from "./steps/Step2_AddressInfo";
import Step3_RoleInfo from "./steps/Step3_RoleInfo";
import Step4_ManagerInfo from "./steps/Step4_ManagerInfo";
import Chatbot from "@/components/Chatbot";

const stepComponents = {
  Step1_IdInformation,
  Step2_AddressInfo,
  Step3_RoleInfo,
  Step4_ManagerInfo,
} as const;

export default function PersonelFormStepManager() {
  const [currentStep, setCurrentStep] = useState(0);

  // Controlled alanlar için güvenli defaultlar
  const methods = useForm<User>({
    resolver: zodResolver(userSchema) as Resolver<User>,
    defaultValues: {
      id_dec: "",
      id_hex: "",
      short_name: "",
      gender: "",
      op_name: "",
      op_username: "",
      op_password: "",
      address: "",
      e_mail: "",
      route: "",
      stop_name: "",
      part: "",
      title: "",
      op_section: "",
      is_admin: 0,
      is_active: 1,
      is_approver: 0,
      shift_validator: "",
      auth1: "",
      auth2: "",
      izin_bakiye: 0,
      roleId: 0,
    },
    mode: "all",
  });

  const { handleSubmit, trigger } = methods;

  const StepKey = steps[currentStep].component as keyof typeof stepComponents; // StepKey mutlaka stepComponents keylerinden bir tanesi
  const StepComponent = stepComponents[StepKey];
  const totalSteps = steps.length;
  const progress = Math.round(((currentStep + 1) / totalSteps) * 100);
  const fieldsForStep = useMemo(() => steps[currentStep].fields, [currentStep]);

  const handleNextStep = async () => {
    const ok = await trigger([...fieldsForStep] as FieldPath<User>[], {
      shouldFocus: true,
    });

    if (!ok) return;
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1);
  };

  const handleBackStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const onSubmit = async (data: User) => {
    const user: User = {
      id: 0,
      ...data,
      roleId: Number(data.roleId),
    };

    try {
      await createUser(user);
      toast.success("Kullanıcı başarıyla kaydedildi!");
      methods.reset();
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Kullanıcı kaydedilemedi!");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto -h-full py-8 px-4 md:px-6"
      >
        {/* Header + Stepper */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-muted-foreground">
              Adım{" "}
              <span className="font-medium text-foreground">
                {currentStep + 1}
              </span>{" "}
              / {totalSteps}
            </div>
            <div className="text-xs text-muted-foreground">{progress}%</div>
          </div>
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <Card className="shadow-sm">
          <CardContent>
            {/* Active Step */}
            <div className="min-h-[480px]">
              {StepComponent ? <StepComponent /> : null}
            </div>
          </CardContent>

          <CardFooter className="pt-0">
            <div className="flex w-full items-center justify-between gap-2 sticky bottom-0 bg-card py-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBackStep}
                disabled={currentStep === 0}
              >
                Geri
              </Button>

              {currentStep === totalSteps - 1 ? (
                <Button onClick={handleSubmit(onSubmit)} type="button">
                  Kaydet
                </Button>
              ) : (
                <Button type="button" onClick={handleNextStep}>
                  İleri
                </Button>
              )}
            </div>
           <Chatbot/>
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  );
}
