import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  User,
  Mail,
  MessageSquare,
  ChevronDown,
  MessageSquareText,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { contactFormSectionMock } from "@/mocks";
import { fadeInUp } from "@/animations";
import { contactFormSchema } from "./contact.schema";
import { ContactInputField } from "./ContactInputField";
import { ContactChannels } from "./ContactChannels";

export const ContactFormSection = () => {
  const { form } = contactFormSectionMock;
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { firstName: "", lastName: "", email: "", subject: "", message: "" },
  });

  const onSubmit = () => {
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section id="contact-form" className="w-full py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Form Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-7 rounded-[28px] sm:rounded-[32px] bg-[#f8faff] border border-[#e2edfa] p-6 sm:p-8 lg:p-10 shadow-xs"
          >
            {/* Form Header */}
            <div className="flex items-start gap-3.5">
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 text-[#007be3] shrink-0 mt-0.5"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 7V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-2" />
                <polyline points="7 4 15 10 23 4" />
                <rect x="2" y="8" width="18" height="13" rx="1.5" />
                <polyline points="2 9.5 11 15 20 9.5" />
              </svg>
              <div>
                <h2 className="text-2xl sm:text-[28px] font-bold text-[#01287b] leading-tight">
                  {form.title}
                </h2>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {form.subtitle}
                </p>
              </div>
            </div>

            {/* Success Notification */}
            {isSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs sm:text-sm text-emerald-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{form.successMessage}</span>
              </motion.div>
            )}

            {/* Form with Zod Validation */}
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 sm:mt-7 space-y-4" noValidate>
              {/* Row 1: First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ContactInputField
                  icon={User}
                  type={form.fields.firstName.type}
                  placeholder={form.fields.firstName.placeholder}
                  error={errors.firstName}
                  {...register("firstName")}
                />
                <ContactInputField
                  icon={User}
                  type={form.fields.lastName.type}
                  placeholder={form.fields.lastName.placeholder}
                  error={errors.lastName}
                  {...register("lastName")}
                />
              </div>

              {/* Row 2: Email Address */}
              <ContactInputField
                icon={Mail}
                type={form.fields.email.type}
                placeholder={form.fields.email.placeholder}
                error={errors.email}
                {...register("email")}
              />

              {/* Row 3: Subject Dropdown */}
              <div>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    {...register("subject")}
                    className={`w-full bg-white border rounded-xl sm:rounded-2xl pl-10 pr-10 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-800 outline-none transition-all appearance-none cursor-pointer shadow-2xs ${
                      errors.subject
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15"
                        : "border-[#dce6f2] focus:border-[#007be3] focus:ring-2 focus:ring-[#007be3]/15"
                    }`}
                  >
                    {form.fields.subject.options.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
                {errors.subject && (
                  <p className="mt-1 text-xs text-rose-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Row 4: Your Message Textarea */}
              <div>
                <div className="relative">
                  <MessageSquareText className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <textarea
                    rows={form.fields.message.rows}
                    placeholder={form.fields.message.placeholder}
                    {...register("message")}
                    className={`w-full bg-white border rounded-xl sm:rounded-2xl pl-10 pr-4 py-3 sm:py-3.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none transition-all shadow-2xs ${
                      errors.message
                        ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/15"
                        : "border-[#dce6f2] focus:border-[#007be3] focus:ring-2 focus:ring-[#007be3]/15"
                    }`}
                  />
                </div>
                {errors.message && (
                  <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
                )}
              </div>

              {/* Row 5: Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 sm:py-4 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0060d0] via-[#007be3] to-[#008ef8] hover:from-[#0050b5] hover:to-[#007be3] disabled:opacity-70 text-white font-semibold text-sm sm:text-base shadow-md shadow-[#007be3]/20 flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.99] cursor-pointer mt-2"
              >
                <span>{form.submitButton.label}</span>
                <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </button>
            </form>
          </motion.div>

          {/* Right Column: Other Ways to Reach Us */}
          <ContactChannels />
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
