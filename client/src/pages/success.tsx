import { Link } from "wouter";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Success() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 md:p-12 text-center border border-slate-100 animate-in fade-in zoom-in duration-500">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
            <Check className="w-6 h-6 text-white stroke-[3]" />
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-3xl font-bold text-[#1E293B] mb-4">
          Request Received!
        </h1>

        {/* Message */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          Thank you for contacting Buckeye Roof Rescue. We have received your information and a member of our team will be in touch shortly to schedule your free inspection.
        </p>

        {/* Back Button */}
        <Link href="/">
          <Button className="w-full bg-[#EA580C] hover:bg-[#c2410c] text-white font-semibold h-12 shadow-md hover:shadow-lg transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
