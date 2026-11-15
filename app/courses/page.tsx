import type { Metadata } from "next";
import { courses } from "@/content/courses";
import { CourseCard, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "课程中心",
  description: "大模型课程：课程视频、课件、实验系统与配套教材。",
};

export default function CoursesPage() {
  return (
    <Section
      eyebrow="课程中心"
      title="课程"
      subtitle="课程视频、课件、实验系统与配套教材。"
      headingLevel="h1"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} />
        ))}
      </div>
    </Section>
  );
}
