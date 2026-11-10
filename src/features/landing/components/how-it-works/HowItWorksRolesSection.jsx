import { Monitor, GraduationCap, Check } from "lucide-react";
import { motion } from "framer-motion";
import studentImg from "@/assets/images/image 13.png";
import teacherImg from "@/assets/images/image 14.png";
import { howItWorksRolesMock } from "@/mocks";
import { fadeInUp, scaleIn, scrollViewport } from "@/animations";

const ChecklistCol = ({ items }) => (
  <div className="flex flex-col gap-3">
    {items.map((item) => (
      <div key={item} className="flex items-start gap-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#febf11] text-[#01287b] mt-0.5 shadow-xs">
          <Check className="h-2.5 w-2.5 stroke-[3.5]" />
        </span>
        <span className="text-xs sm:text-[13px] text-slate-700 font-medium">
          {item}
        </span>
      </div>
    ))}
  </div>
);

const SparkRays = () => (
  <svg
    className="absolute -top-3.5 right-0.5 sm:-top-5 sm:-right-1.5 w-6 h-6 sm:w-8 sm:h-8 text-[#febf11] pointer-events-none"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentColor"
    strokeWidth="3.5"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <line x1="8" y1="26" x2="6" y2="8" />
    <line x1="15" y1="26" x2="25" y2="12" />
    <line x1="22" y1="27" x2="31" y2="21" />
  </svg>
);

export const HowItWorksRolesSection = () => {
  const { teacherCard, studentCard } = howItWorksRolesMock;

  return (
    <section
      id="how-it-works-roles"
      className="relative z-10 w-full bg-white py-10 sm:py-14 lg:py-18 overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 sm:gap-10 lg:gap-12">
        {/* Card 1: FOR TEACHERS (Warm Amber Theme) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-[#fdeecb]/80 bg-[#fffcf4] px-6 pt-6 pb-0 sm:px-10 sm:pt-8 sm:pb-0 lg:px-12 lg:pt-8 lg:pb-0 shadow-lg shadow-amber-950/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Teacher Image Column - Attached to Bottom */}
            <div className="order-1 lg:order-1 lg:col-span-4 flex items-end justify-center self-end">
              <img
                src={teacherImg}
                alt="A Smarter Way to Teach"
                className="h-56 sm:h-64 lg:h-72 w-auto object-contain object-bottom select-none -mb-0.5"
                loading="lazy"
              />
            </div>
            {/* Teacher Content Column */}
            <motion.div
              variants={fadeInUp}
              className="order-2 lg:order-2 lg:col-span-8 flex flex-col justify-center text-left pb-6 sm:pb-8 lg:pb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-3.5 py-1 shadow-xs mb-3 w-fit">
                <Monitor className="h-3.5 w-3.5 text-[#007be3]" />
                <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
                  {teacherCard.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold tracking-tight text-[#01287b] leading-[1.18]">
                <span>{teacherCard.headingPrefix}</span>
                <span className="relative inline-block text-[#007be3] pr-6 sm:pr-8">
                  {teacherCard.headingAccent}
                  <SparkRays />
                </span>
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {teacherCard.description}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-2xl">
                <ChecklistCol items={teacherCard.checklistCol1} />
                <ChecklistCol items={teacherCard.checklistCol2} />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Card 2: FOR STUDENTS (Soft Blue Theme) */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] border border-[#e1eeff] bg-[#f4f9ff] px-6 pt-6 pb-0 sm:px-10 sm:pt-8 sm:pb-0 lg:px-12 lg:pt-8 lg:pb-0 shadow-lg shadow-blue-950/5"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Student Content Column */}
            <motion.div
              variants={fadeInUp}
              className="order-2 lg:order-1 lg:col-span-8 flex flex-col justify-center text-left pb-6 sm:pb-8 lg:pb-8"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d2e6fc] bg-[#eaf3fe] px-3.5 py-1 shadow-xs mb-3 w-fit">
                <GraduationCap className="h-3.5 w-3.5 text-[#007be3]" />
                <span className="text-xs font-bold tracking-wider text-[#007be3] uppercase">
                  {studentCard.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] font-extrabold tracking-tight text-[#01287b] leading-[1.18]">
                <span>{studentCard.headingPrefix}</span>
                <span className="relative inline-block text-[#007be3] pr-6 sm:pr-8">
                  {studentCard.headingAccent}
                  <SparkRays />
                </span>
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {studentCard.description}
              </p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-4 max-w-2xl">
                <ChecklistCol items={studentCard.checklistCol1} />
                <ChecklistCol items={studentCard.checklistCol2} />
              </div>
            </motion.div>
            {/* Student Image Column - Attached to Bottom */}
            <div className="order-1 lg:order-2 lg:col-span-4 flex items-end justify-center self-end">
              <img
                src={studentImg}
                alt="A Better Way to Learn"
                className="h-56 sm:h-64 lg:h-72 w-auto object-contain object-bottom select-none -mb-0.5"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksRolesSection;