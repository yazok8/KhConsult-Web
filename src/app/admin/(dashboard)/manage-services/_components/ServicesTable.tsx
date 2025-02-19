"use client";

import { useServices } from "@/app/hooks/useServices";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMdAdd } from "react-icons/io";


function ServicesTable() {
  const { services, error, isLoading, mutate } = useServices();

  // Refresh data when component mounts and periodically
  React.useEffect(() => {
    mutate();
    
    const interval = setInterval(() => {
      mutate();
    }, 5000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error loading services: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col max-w-6xl px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Our Services</CardTitle>
        </CardHeader>
        <CardContent className="px-2 lg:p-6">
          <div className="flex justify-end mb-5">
            <Link
              href="/admin/manage-services/add-services/new"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            >
              <IoMdAdd size={24} />
              <span>Add New Service</span>
            </Link>
          </div>

          {!services || services.length === 0 ? (
            <p className="text-gray-500">No services available.</p>
          ) : (
            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="bg-white shadow-md rounded-lg p-0 lg:p-4 hover:bg-gray-50 transition"
                >
                  <Link
                    href={`/admin/manage-services/edit-service/${service.id}`}
                    className="flex flex-col-reverse lg:flex-row-reverse items-center space-x-4"
                  >
                    <div className="flex-shrink-0 my-4 px-5">
                      <Image
                        src={`https://khconsult.s3.us-east-2.amazonaws.com/${service.imageSrc}`}
                        alt={service.title}
                        width={400}
                        height={400}
                        className="object-cover rounded-md"
                      />
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">
                        {service.title}
                      </h2>
                      <div
                        className="text-gray-600 mt-2"
                        dangerouslySetInnerHTML={{ __html: service.description }}
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ServicesTable;