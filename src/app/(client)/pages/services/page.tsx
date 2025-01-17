import React from "react";
import GermanSpeaker from "./german-speaker/page";
import ForBusinesses from "./for-businesses/page";
import JobRelocation from "./job-relocation/page";
import StudyingInGermany from "./studying-in-germany/page";

export default function Services() {
  return (
    <div className="overflow-hidden">
      <JobRelocation/>
      <StudyingInGermany/>
      <GermanSpeaker/>
      <ForBusinesses/>
    </div>
  );
}
