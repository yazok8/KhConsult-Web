"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

export default function ServiceListPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/services");
      const data = await res.json();
      setServices(data);
    })();
  }, []);

  return (
    <div className="mx-auto flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Our Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="py-5 mr-auto">
            <Link href="/admin/add-services/new">Create A New Service</Link>
          </div>
          <ul>
            {services &&
              services.map((service, index) => (
                <div key={index} className="flex justify-around flex-wrap">
                  <div className="max-w-1/4">
                  <li>
                    <span>{service.title}</span>
                    {" | "}
                    <Link href={`/admin/edit-service/${service.id}`}>
                      Edit
                    </Link>
                  </li>
                  </div>
                  <div className="my-5">
                    <Image src={`https://khconsult.s3.us-east-2.amazonaws.com/${service.imageSrc}`} alt={service.title} width={200} height={100} />
                  </div>
                </div>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
