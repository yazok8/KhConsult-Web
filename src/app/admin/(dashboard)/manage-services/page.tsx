"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
          <div className="py-5">
            <Link href="/admin/add-services/new">Create A New Service</Link>
          </div>
          <ul>
            {services &&
              services.map((service, index) => (
                <div key={index}>
                  <li>
                    <span>{service.title}</span>
                    {" | "}
                    <Link href={`/admin/edit-service/${service.id}/edit`}>
                      Edit
                    </Link>
                  </li>
                </div>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
