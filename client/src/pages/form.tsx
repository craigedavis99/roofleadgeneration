import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { ShieldCheck } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, "You must agree to the terms"),
});

export default function FormPage() {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", values.message || "");
      formData.append("consent", values.consent ? "Yes" : "No");

      const response = await fetch("https://formspree.io/f/manrplvz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setLocation("/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your request. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#EA580C] text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <ShieldCheck className="w-4 h-4" />
            <span>Buckeye Roof Rescue</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Schedule Your Inspection</h1>
          <p className="text-slate-600">Tell us about your roofing needs.</p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-slate-100">
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
  );
}
