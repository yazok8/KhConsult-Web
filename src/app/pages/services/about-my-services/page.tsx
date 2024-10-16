import Container from "@/app/ui/Container";
import React from "react";

export default function AboutMyServiecs() {
  return (
    <>    
<Container
      id="about-my-services">
      <div>
        <h1 className=" pb-8">About My Services</h1>
        <div className="text-xl">
          Our team comprises foreigners and expats who have already been living
          in Germany for a long time. They have succeeded in securing jobs and
          obtaining citizenship, so they have walked in your shoes.
          <li className="mt-5">
            We can help you relocate to Germany from any country in the world
          </li>
        </div>
      </div>
    </Container>
    </>
  );
}
