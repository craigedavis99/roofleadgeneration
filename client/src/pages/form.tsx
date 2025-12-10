import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { ShieldCheck, Upload, X, ImageIcon } from "lucide-react";
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
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles].slice(0, 5)); // Limit to 5 files
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("name", values.fullName);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", values.message || "");
      formData.append("consent", values.consent ? "Yes" : "No");
      
      // Append files
      files.forEach((file, index) => {
        formData.append(`photo_${index + 1}`, file);
      });

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

              {/* Photo Upload */}
              <div className="space-y-2">
                <FormLabel className="text-slate-700">Upload Photos (optional)</FormLabel>
                <div 
                  className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center cursor-pointer hover:border-[#EA580C] transition-colors bg-slate-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to upload photos of your roof</p>
                  <p className="text-xs text-slate-400 mt-1">Up to 5 images (JPG, PNG)</p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                {/* File previews */}
                {files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {files.map((file, index) => (
                      <div key={index} className="relative group bg-slate-100 rounded-lg p-2 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600 max-w-[150px] truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
