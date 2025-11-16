-- Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create bookings table
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  services JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for services (public read)
CREATE POLICY "Services are viewable by everyone" 
ON public.services 
FOR SELECT 
USING (true);

-- Create policies for bookings (anyone can create)
CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

-- Insert sample services
INSERT INTO public.services (name, description, duration_minutes, price, category) VALUES
('Swedish Massage', 'Relaxing full body massage with gentle pressure', 60, 85.00, 'Massage'),
('Deep Tissue Massage', 'Therapeutic massage targeting deep muscle layers', 60, 95.00, 'Massage'),
('Hot Stone Massage', 'Massage using heated stones for deep relaxation', 90, 120.00, 'Massage'),
('Aromatherapy Massage', 'Massage with essential oils for relaxation', 60, 90.00, 'Massage'),
('Classic Facial', 'Deep cleansing and moisturizing facial treatment', 60, 75.00, 'Facial'),
('Anti-Aging Facial', 'Advanced facial with anti-aging serums', 75, 110.00, 'Facial'),
('Acne Treatment Facial', 'Specialized facial for acne-prone skin', 60, 85.00, 'Facial'),
('Manicure', 'Complete nail care and polish', 45, 35.00, 'Nails'),
('Pedicure', 'Foot spa and nail care treatment', 60, 45.00, 'Nails'),
('Gel Nails', 'Long-lasting gel nail application', 60, 55.00, 'Nails'),
('Eyebrow Threading', 'Precise eyebrow shaping', 15, 15.00, 'Threading'),
('Full Face Threading', 'Complete facial hair removal', 30, 30.00, 'Threading'),
('Lip Threading', 'Upper lip hair removal', 10, 10.00, 'Threading'),
('Brazilian Wax', 'Complete bikini area waxing', 45, 65.00, 'Waxing'),
('Leg Wax', 'Full leg hair removal', 45, 55.00, 'Waxing'),
('Underarm Wax', 'Underarm hair removal', 15, 20.00, 'Waxing');