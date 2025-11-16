import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import Cart from "@/components/Cart";
import BookingForm, { BookingFormData } from "@/components/BookingForm";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import massageImg from "@/assets/massage.jpg";
import facialImg from "@/assets/facial.jpg";
import nailsImg from "@/assets/nails.jpg";
import threadingImg from "@/assets/threading.jpg";
import waxingImg from "@/assets/waxing.jpg";

interface Service {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
  price: number;
  category: string;
}

interface CartItem {
  id: string;
  name: string;
  duration: number;
  price: number;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      return data as Service[];
    },
  });

  const bookingMutation = useMutation({
    mutationFn: async (bookingData: BookingFormData & { services: CartItem[]; total: number }) => {
      // Insert booking into database
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert([{
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          booking_date: bookingData.date.toISOString().split('T')[0],
          booking_time: bookingData.time,
          services: bookingData.services as any,
          total_price: bookingData.total,
          note: bookingData.note || null,
          status: "pending",
        }])
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke("send-booking-notification", {
        body: {
          booking: {
            ...booking,
            services: bookingData.services,
          },
        },
      });

      if (emailError) {
        console.error("Email notification error:", emailError);
      }

      return booking;
    },
    onSuccess: () => {
      toast.success("Booking confirmed! You'll receive a confirmation email shortly.");
      setBookingComplete(true);
      setCartItems([]);
      setShowBookingForm(false);
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast.error("Failed to create booking. Please try again.");
    },
  });

  const addToCart = (service: Service) => {
    if (cartItems.find((item) => item.id === service.id)) {
      toast.info("Service already in cart");
      return;
    }

    setCartItems([
      ...cartItems,
      {
        id: service.id,
        name: service.name,
        duration: service.duration_minutes,
        price: service.price,
      },
    ]);
    toast.success("Added to cart");
  };

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.info("Removed from cart");
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (formData: BookingFormData) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    bookingMutation.mutate({
      ...formData,
      services: cartItems,
      total,
    });
  };

  const categories = ["All", ...Array.from(new Set(services.map((s) => s.category)))];

  const getCategoryImage = (category: string) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes("massage")) return massageImg;
    if (categoryLower.includes("facial")) return facialImg;
    if (categoryLower.includes("nail")) return nailsImg;
    if (categoryLower.includes("thread")) return threadingImg;
    if (categoryLower.includes("wax")) return waxingImg;
    return massageImg; // default
  };

  const getFilteredServices = (category: string) => {
    if (category === "All") return services;
    return services.filter((service) => service.category === category);
  };

  if (bookingComplete) {
    return (
      <div className="min-h-screen gradient-cream">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto">
            <Card className="luxury-card text-center p-8 shadow-xl">
              <div className="space-y-6">
                <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto shadow-lg">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-3">Booking Confirmed!</h1>
                  <div className="flex items-center justify-center gap-2 text-primary mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-lg font-medium">Your appointment is secured</span>
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Thank you for choosing Diamond Beauty & Massage Therapy. We've sent a confirmation email to your inbox.
                  We look forward to pampering you soon!
                </p>
                <Button 
                  onClick={() => setBookingComplete(false)} 
                  size="lg"
                  className="gradient-gold text-white shadow-lg hover:shadow-xl transition-all"
                >
                  Book Another Service
                </Button>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (showBookingForm) {
    return (
      <div className="min-h-screen gradient-cream">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <BookingForm
              cartItems={cartItems}
              onSubmit={handleBookingSubmit}
              onBack={() => setShowBookingForm(false)}
              isSubmitting={bookingMutation.isPending}
            />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-cream">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Luxury Services</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-3">Our Premium Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select your desired treatments and book your personalized beauty experience
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue={categories[0]} className="w-full">
              <TabsList className="grid w-full mb-8 h-auto p-1 bg-card shadow-md" style={{ gridTemplateColumns: `repeat(${categories.length}, minmax(0, 1fr))` }}>
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:gradient-gold data-[state=active]:text-white py-3"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {categories.map((category) => (
                <TabsContent key={category} value={category}>
                  {isLoading ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                      {getFilteredServices(category).map((service) => (
                        <ServiceCard
                          key={service.id}
                          id={service.id}
                          name={service.name}
                          description={service.description || ""}
                          duration={service.duration_minutes}
                          price={service.price}
                          category={service.category}
                          image={getCategoryImage(service.category)}
                          onAddToCart={() => addToCart(service)}
                          isInCart={!!cartItems.find((item) => item.id === service.id)}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Cart items={cartItems} onRemove={removeFromCart} onCheckout={handleCheckout} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
