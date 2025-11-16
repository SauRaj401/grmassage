import { Sparkles, MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import heroImage from "@/assets/hero-spa.jpg";

const Header = () => {
  return (
    <header className="relative">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroImage} 
          alt="Luxury spa interior" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Sparkles className="w-5 h-5 text-gold-light" />
              <span className="text-sm font-medium">Premium Beauty & Wellness</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              Diamond Beauty & Massage Therapy
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Experience luxury beauty treatments at 502 Grand Blvd, Craigieburn
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-4 text-sm mb-6">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <MapPin className="w-4 h-4 text-gold-light" />
                <span>502 Grand Blvd, Craigieburn 3064</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Phone className="w-4 h-4 text-gold-light" />
                <a href="tel:0475182307" className="hover:underline">0475 182 307</a>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <Mail className="w-4 h-4 text-gold-light" />
                <a href="mailto:diamondbeauty@gmail.com" className="hover:underline">diamondbeauty@gmail.com</a>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center gap-3">
              <a
                href="https://instagram.com/diamondbeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Follow us on Instagram @diamondbeauty"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
