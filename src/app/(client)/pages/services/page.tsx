import React from "react";
import RelocationServices from "./relocation-sevices/page";
import ImmigrationSupport from "./immigration-support/page";
import JobCoaching from "./job-coaching/page";
import GermanSpeaker from "./german-speaker/page";
import ForBusinesses from "./for-businesses/page";

export default function Services() {
  return (
    <div className="overflow-hidden">
      <RelocationServices />
      <ImmigrationSupport/>
      <JobCoaching/>
      <GermanSpeaker/>
      <ForBusinesses/>
    </div>
  );
}
