"use client";

import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import { Button } from "./ui/button";
import { Service } from "@prisma/client";
import { Textarea } from '@/components/ui/textarea';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";

type ContactFormProps = {
  name: string; 
  email: string; 
  service: string; 
  serviceInquiry: string;
  message: string; 
};

interface TemplateParams {
  [key: string]: unknown;
  to_name: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  service?: string;
  service_details?: string;
}

export const ContactForm = () => {
  const [subject, setSubject] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContactFormProps>({
    name: "",
    email: "",
    service: "",
    serviceInquiry: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [services, setServices] = useState<Service[]>([]);

  const EMAILJS_USER_ID = process.env.NEXT_PUBLIC_EMAILJS_USER_ID!;
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services', {
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        const data: Service[] = await response.json();
        setServices(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    emailjs.init(EMAILJS_USER_ID);
  }, [EMAILJS_USER_ID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    const templateParams: TemplateParams = {
      to_name: "Abdallah Khirfan",
      from_name: formData.name,
      from_email: formData.email,
      subject: subject,
      message: formData.message,
    };

    if (subject === "service related") {
      const selectedServiceObj = services.find((s) => s.id === formData.service);
      templateParams.service = selectedServiceObj ? selectedServiceObj.title : formData.service;
      templateParams.service_details = formData.serviceInquiry;
      templateParams.message = formData.serviceInquiry;
    } else if (subject === "other") {
      templateParams.service = formData.service;
    }

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_USER_ID)
      .then(() => {
        toast.success("Message sent successfully");
        setError(null);
        setFormData({
          name: "",
          email: "",
          service: "",
          serviceInquiry: "",
          message: "",
        });
        setIsLoading(false);
      }, (error) => {
        setError(error.text);
        setIsLoading(false);
      });
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
    setError(null);
  };

  return (
    <div className="w-full lg:w-1/2 space-y-8">
      {!subject ? (
        <Card className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
          <CardContent className="pt-6">
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subjects" className="text-lg font-medium">
                  What can we help you with?
                </Label>
                <select
                  id="subjects"
                  value={subject || ""}
                  onChange={handleSubjectChange}
                  className="w-full p-3 text-base rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  required
                >
                  <option value="">-- Select a subject --</option>
                  <option value="service related">Service Related</option>
                  <option value="general query">General Query</option>
                </select>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>
          <CardContent className="pt-6">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium inline-flex items-center">
                  Name <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="Your Full Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium inline-flex items-center">
                  Email <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                  placeholder="you@example.com"
                />
              </div>

              {subject === "service related" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="service" className="text-base font-medium inline-flex items-center">
                      Service <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          service: e.target.value,
                        }))
                      }
                      required
                      className="w-full p-3 text-base rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
                    >
                      <option value="">Select A Service</option>
                      {services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceInquiry" className="text-base font-medium inline-flex items-center">
                      Service Details <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Textarea
                      id="serviceInquiry"
                      value={formData.serviceInquiry}
                      onChange={handleChange}
                      required
                      className="w-full p-3 min-h-32 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
                      placeholder="Please provide details about your service needs..."
                    />
                  </div>
                </>
              )}

              {subject === "general query" && (
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-base font-medium inline-flex items-center">
                    Your Message <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full p-3 min-h-32 rounded-lg bg-white/5 border border-white/20 backdrop-blur-sm transition-all focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
                    placeholder="What would you like to discuss with us?"
                  />
                </div>
              )}

              <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto py-3 px-6 bg-gradient-to-r from-primary/90 to-primary text-white font-medium rounded-lg transition-all hover:from-primary hover:to-primary/90 focus:outline-none focus:ring-1 focus:ring-primary/50"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : "Submit Message"}
                </Button>
                
                <button 
                  onClick={handleResetFormInputs}
                  type="button" 
                  className="text-sm text-gray-400 hover:text-primary underline transition-colors"
                >
                  Change Subject
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};