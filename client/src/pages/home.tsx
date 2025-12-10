import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Check, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/dark_cinematic_roofing_background.png";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export default function Home() {
  const [, setLocation] = useLocation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
      consent: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Simulate API call
    setTimeout(() => {
      setLocation("/success");
    }, 500);
  }

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Roofing Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Buckeye Roof Rescue</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-md">
              Free Emergency <br />
              <span className="text-[#EA580C]">Roof Inspection</span>
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-slate-200 text-lg mb-8 font-medium">
              <MapPin className="w-5 h-5 text-[#EA580C]" />
              <span>New Albany • Granville • Pataskala</span>
            </div>

            {/* Subtext */}
            <h2 className="text-2xl text-white font-semibold mb-2">
              Leaking roof? Ice dams? Wind damage?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl leading-relaxed">
              Get a trusted local roofer at your door fast — no obligation, no sales pressure.
            </p>

            {/* CTA Button */}
            <Button 
              onClick={scrollToForm}
              className="bg-[#EA580C] hover:bg-[#c2410c] text-white text-lg px-8 py-6 h-auto rounded-md font-semibold transition-all shadow-xl hover:translate-y-[-2px] hover:shadow-2xl"
            >
              Get My Free Inspection
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-100">
            
            {/* Left Column - Info */}
            <div className="bg-[#1E293B] p-10 md:w-1/3 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
                <p className="text-slate-300 mb-10 leading-relaxed">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>

                <div className="space-y-1">
                  <h4 className="text-[#EA580C] text-sm font-bold tracking-wider uppercase mb-2">Service Areas</h4>
                  <p className="text-lg font-medium">New Albany</p>
                  <p className="text-lg font-medium">Granville</p>
                  <p className="text-lg font-medium">Pataskala</p>
                </div>
              </div>

              <div className="mt-10 md:mt-0">
                <p className="text-slate-400 text-sm leading-relaxed">
                  Trusted by homeowners across Central Ohio.
                </p>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className="p-10 md:w-2/3 bg-white">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule Your Inspection</h3>
                <p className="text-slate-600">Tell us about your roofing needs.</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">Full Name</FormLabel>
                        <FormControl>
                          <Input className="bg-slate-50 border-slate-200 h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Email</FormLabel>
                          <FormControl>
                            <Input className="bg-slate-50 border-slate-200 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700">Phone Number</FormLabel>
                          <FormControl>
                            <Input className="bg-slate-50 border-slate-200 h-12" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700">How can we help?</FormLabel>
                        <FormControl>
                          <Textarea 
                            className="bg-slate-50 border-slate-200 min-h-[100px] resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-slate-100 bg-slate-50 p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-[#1E293B] border-slate-300"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal text-slate-600 leading-snug block">
                            I agree to receive calls and texts from Buckeye Roof Rescue at the number provided, including by autodialer or prerecorded voice. <span className="font-semibold text-slate-800">Message & data rates may apply.</span> Consent is not a condition of purchase.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white text-lg h-14 font-semibold shadow-md transition-all hover:shadow-lg"
                  >
                    Request Free Inspection
                  </Button>
                  
                  <div className="text-center">
                    <p className="text-xs text-slate-400">No obligation. Your information is secure.</p>
                  </div>

                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
