import { Link } from "wouter";
import { ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@assets/generated_images/dark_cinematic_roofing_background.png";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <section className="relative h-screen flex items-center overflow-hidden">
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
            <div className="inline-flex items-center gap-2 bg-[#EA580C] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 shadow-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>Buckeye Roof Rescue</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 drop-shadow-md">
              Free Emergency <br />
              <span className="text-[#EA580C]">Roof Inspection</span>
            </h1>

            <div className="flex items-center gap-2 text-slate-200 text-lg mb-8 font-medium">
              <MapPin className="w-5 h-5 text-[#EA580C]" />
              <span>New Albany • Granville • Pataskala</span>
            </div>

            <h2 className="text-2xl text-white font-semibold mb-2">
              Leaking roof? Ice dams? Wind damage?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-xl leading-relaxed">
              Get a trusted local roofer at your door fast — no obligation, no sales pressure.
            </p>

            <Link href="/form" className="inline-block">
              <span 
                className="inline-flex items-center bg-[#EA580C] hover:bg-[#c2410c] text-white text-lg px-8 py-4 rounded-md font-semibold transition-all shadow-xl hover:translate-y-[-2px] hover:shadow-2xl cursor-pointer"
              >
                Get My Free Inspection
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
