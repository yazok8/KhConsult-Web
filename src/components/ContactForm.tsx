"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui/button";
import { Service } from "@prisma/client";

type ContactFormProps = {
  name: string;
  email: string;
  service: string;
  serviceInquiry: string;
  message: string;
};

export const ContactForm = () => {
  const [subject, setSubject] = useState<string | null>(null); // Initially no subject selected
  const [formData, setFormData] = useState<ContactFormProps>({
    name: "",
    email: "",
    service: "",
    serviceInquiry: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null); // To track submission
  const [error, setError] = useState<string | null>(null); // To track errors
  const [isLoading, setIsLoading] = useState<boolean>(false); // To track loading state

  const [services, setServices] = useState<Service[]>([]);

  const [selectedService, setSelectedService] = useState<string>(
    formData.service
  );

  // EmailJS credentials from environment variables
  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

  useEffect(() => {
    // Fetch categories from the API
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services", {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServices();
  }, []);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID);
  }, [EMAILJS_USER_ID]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubject = e.target.value;
    setSubject(selectedSubject);

    setFormData({
      name: "",
      email: "",
      service: "",
      serviceInquiry: "",
      message: "",
    });
    setSubmissionStatus(null);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!subject) {
      setError("Please select a subject");
      setIsLoading(false);
      return;
    }

    const templateParams: { [key: string]: any } = {
      to_name: "Abdallah Khirfan",
      from_name: formData.name,
      from_email: formData.email,
      subject: subject,
      message: formData.message,
    };
    if (subject === "service related") {
      const selectedServiceObj = services.find(
        (s) => s.id === formData.service
      );
      templateParams.service = selectedServiceObj
        ? selectedServiceObj.title
        : formData.service;
      templateParams.service_details = formData.serviceInquiry;
      templateParams.message = formData.serviceInquiry;
    } else if (subject === "other") {
      templateParams.service = formData.service;
    }

    emailjs
      .send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_USER_ID
      )
      .then(
        (response) => {
          setSubmissionStatus("success");
          setError(null);
          setFormData({
            name: "",
            email: "",
            service: "",
            serviceInquiry: "",
            message: "",
          });
          setIsLoading(false);
        },
        (error) => {
          setSubmissionStatus("error");
          setError(error.text);
          setIsLoading(false);
        }
      );
  };

  const handleResetFormInputs = () => {
    setSubject(null);
    setFormData({
      name: "",
      email: "",
      service: "",
      serviceInquiry: "",
      message: "",
    });
    setSubmissionStatus(null);
    setError(null);
  };

  return (
    <>
      {!subject && (
        <div className="max-w-xl text-nowrap p-4 md:p-0 mx-auto mb-10 md:mx-0">
          <form
            onSubmit={(e) => e.preventDefault()} // Prevent form submission
            className="flex flex-col space-y-4"
          >
            <div>
              <label
                htmlFor="subjects"
                className="block text-sm font-medium text-gray-700"
              >
                Select Subject
              </label>
              <select
                id="subjects"
                value={subject || ""}
                onChange={handleSubjectChange}
                className="mt-1 block p-2 px-3 max-w-1/2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                required
              >
                <option value="">-- Select a subject --</option>
                <option value="service related">Service Related</option>
                <option value="general query">General Query</option>
              </select>
            </div>
          </form>
        </div>
      )}
      {subject && (
        <div className="w-full md:w-1/2 p-4 md:p-0">
          {submissionStatus === "success" && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              Your message has been successfully sent!
            </div>
          )}
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
            {/* Common Fields */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                placeholder="Your Full Name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                placeholder="you@example.com"
              />
            </div>

            {/* Conditional Fields */}
            {subject === "service related" && (
              <>
                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Name
                  </label>
                  <select
                    id="serviceId"
                    name="service"
                    value={formData.service}
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedService(value);
                      // Optionally update formData as well to keep them in sync:
                      setFormData((prev) => ({
                        ...prev,
                        service: value,
                      }));
                    }}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="" className="text-sm">
                      Select A Service
                    </option>
                    {services &&
                      services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="serviceInquiry"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Service Inquiry
                  </label>
                  <textarea
                    id="serviceInquiry"
                    value={formData.serviceInquiry}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-gray-600"
                    rows={4}
                    placeholder="Provide detailed information about the service."
                  ></textarea>
                </div>
              </>
            )}

            {subject === "general query" && (
              <>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-600 focus:border-gray-600"
                    rows={4}
                    placeholder="Enter your query or message here."
                  ></textarea>
                </div>
              </>
            )}

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={isLoading} // Disable Button while loading
                className={`w-full py-2 px-4 bg-primary text-white font-semibold rounded-md shadow ${
                  isLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-foreground`}
              >
                {isLoading ? "Sending..." : "Submit"}
              </Button>
            </div>
          </form>

          {/* Optional: Reset or Change Subject */}
          <div className="mt-4 text-center">
            <button
              onClick={handleResetFormInputs}
              className="text-sm hover:text-gray-600 underline"
            >
              Change Subject
            </button>
          </div>
        </div>
      )}
    </>
  );
};
