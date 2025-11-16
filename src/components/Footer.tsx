import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-gold bg-clip-text text-transparent">
              Diamond Beauty & Massage Therapy
            </h3>
            <p className="text-sm text-muted-foreground">
              Experience luxury beauty treatments and therapeutic massage services. Founded by Geeta Shahi.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>502 Grand Blvd, Craigieburn 3064, Melbourne</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:0475182307" className="hover:text-primary transition-colors">
                  0475 182 307
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:diamondbeauty@gmail.com" className="hover:text-primary transition-colors">
                  diamondbeauty@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              Opening Hours
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span className="font-medium">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Follow Us</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated with our latest offers and beauty tips
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/diamondbeauty"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all hover:scale-110"
                aria-label="Instagram @diamondbeauty"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Diamond Beauty & Massage Therapy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
