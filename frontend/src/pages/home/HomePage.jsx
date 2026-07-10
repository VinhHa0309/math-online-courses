import Hero from "../../components/home/Hero";
import FeaturedSection from "../../components/home/FeaturedSection";
import InstructorSection from "../../components/home/InstructorSection";
import Testimonials from "../../components/home/Testimonials";
import CTASection from "../../components/home/CTASection";

export default function HomePage() {
  return (
    <div className="space-y-12 md:space-y-16 lg:space-y-20 pb-12 md:pb-16 lg:pb-20">
      {/* Hero Section */}
      <Hero />

      {/* Featured Courses Section */}
      <FeaturedSection />

      {/* Instructors Section */}
      <InstructorSection />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
