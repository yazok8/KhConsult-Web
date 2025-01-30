export const dynamic = "force-dynamic";

import React from "react";

import { Card, CardContent} from "@/components/ui/card";
import Container from "@/components/Container";
import ForBusinesses from "./ForBusinesses/page";
import StudyingInGermany from "./studying-in-germany/page";
import GermanSpeaker from "./german-speaker/page";
import JobRelocation from "./Job-Relocation/page";


export default function Services() {
  return (
    <Container id="services">
    <Card className='p-0 border-none shadow-none'>
      <CardContent className="p-0 border-none">
      <JobRelocation />
      <GermanSpeaker />
      <StudyingInGermany />
      <ForBusinesses />
      </CardContent>
      </Card>
    </Container>
  );
}
