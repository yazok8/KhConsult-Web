export const dynamic = "force-dynamic";

import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/Container";
import ForBusinesses from "./ForBusinesses/page";
import StudyingInGermany from "./studying-in-germany/page";
import GermanSpeaker from "./german-speaker/page";
import JobRelocation from "./Job-Relocation/page";


export default function Services() {
  return (
    <Container id="services">
    <Card className='p-0 border-none shadow-none'>
      <CardHeader className='border-none pl-9'>
        <CardTitle className="text-3xl md:text-5xl font-bold border-none text-center">Our Services</CardTitle>
      </CardHeader>
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
