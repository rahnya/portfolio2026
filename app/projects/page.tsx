import React, { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export default function ProjectsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen pt-24 pb-20 px-6"><div className="max-w-7xl mx-auto">Loading…</div></div>}>
      <ProjectsClient />
    </React.Suspense>
  );
}
