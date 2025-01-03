"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface Service {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
}

function ServicesTable() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) {
          throw new Error("Failed to fetch services.");
        }
        const data: Service[] = await res.json();
        setServices(data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Unable to load services at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading services...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex flex-col max-w-6xl mt-20 px-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Our Services</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-5">
            <Link href="/admin/add-services/new" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
              <IoMdAdd size={24} />
              <span>Add New Service</span>
            </Link>
          </div>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : services.length === 0 ? (
            <p className="text-gray-500">No services available.</p>
          ) : (
            <ul className="space-y-4">
              {services.map((service) => (
                <li key={service.id} className="bg-white shadow-md rounded-lg p-4 hover:bg-gray-50 transition">
                  <Link href={`/admin/edit-service/${service.id}`} className="flex items-center space-x-4">
                    {/* Service Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={`https://khconsult.s3.us-east-2.amazonaws.com/${service.imageSrc}`}
                        alt={service.title}
                        width={100}
                        height={100}
                        className="object-cover rounded-md"
                      />
                    </div>

                    {/* Service Details */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-800">{service.title}</h2>
                      <p className="text-gray-600 mt-2">{service.description}</p>
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
