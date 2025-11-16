-- Add display_order column to services table
ALTER TABLE services ADD COLUMN display_order integer DEFAULT 0;

-- Create index for better query performance
CREATE INDEX idx_services_display_order ON services(display_order);