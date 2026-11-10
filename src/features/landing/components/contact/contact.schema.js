import { z } from "zod";
import { contactFormSectionMock } from "@/mocks";

const { validation } = contactFormSectionMock.form;

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: validation.firstNameRequired }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: validation.lastNameRequired }),
  email: z
    .string()
    .trim()
    .min(1, { message: validation.emailRequired })
    .email({ message: validation.emailInvalid }),
  subject: z
    .string()
    .min(1, { message: validation.subjectRequired }),
  message: z
    .string()
    .trim()
    .min(1, { message: validation.messageRequired })
    .min(10, { message: validation.messageMin }),
});

