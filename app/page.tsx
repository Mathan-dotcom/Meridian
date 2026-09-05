"use client";

import { Navbar } from "@/app/components/navbar";
import { HeroSection } from "@/app/components/landing/hero-section";
import { ProblemSection } from "@/app/components/landing/problem-section";
import { ArchitectureSection } from "@/app/components/landing/architecture-section";
import { MathSection } from "@/app/components/landing/math-section";
import { ScopeMatrix } from "@/app/components/landing/scope-matrix";
import Link from "next/link";
import { Activity } from "lucide-react";

import { Footer } from "@/app/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-white selection:text-black flex flex-col relative">
      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Landing Page Sections */}
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <ArchitectureSection />
        <MathSection />
        <ScopeMatrix />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
