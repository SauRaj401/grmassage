import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  duration: number;
  price: number;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  note?: string;
}

interface BookingFormProps {
  cartItems: CartItem[];
  onSubmit: (data: BookingFormData) => void;
  onBack: () => void;
  isSubmitting: boolean;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const BookingForm = ({ cartItems, onSubmit, onBack, isSubmitting }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalDuration = cartItems.reduce((sum, item) => sum + item.duration, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !selectedTime) return;

    onSubmit({
      name,
      email,
      phone,
      date,
      time: selectedTime,
      note,
    });
  };

  const isFormValid = name && email && phone && date && selectedTime;

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Services
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Summary */}
        <Card className="luxury-card lg:col-span-1 h-fit">
          <CardHeader className="gradient-gold text-white">
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Booking Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm p-3 bg-muted/50 rounded-lg">
                  <span className="text-foreground font-medium">{item.name}</span>
                  <span className="text-primary font-semibold">${item.price}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium">{totalDuration} mins</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="gradient-gold bg-clip-text text-transparent">${total.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Form */}
        <Card className="luxury-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Booking</CardTitle>
            <CardDescription>Fill in your details to confirm your appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0412 345 678"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  Choose Date & Time
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Select Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Select Time *</Label>
                    <div className="grid grid-cols-3 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-lg">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className="h-9"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  Additional Information
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="note">Special Requests (Optional)</Label>
                  <Textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Any allergies, preferences, or special requests..."
                    rows={4}
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full gradient-gold text-white shadow-lg hover:shadow-xl transition-all"
                disabled={!isFormValid || isSubmitting}
              >
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingForm;
