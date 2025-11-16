import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  booking: {
    id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    booking_date: string;
    booking_time: string;
    services: Array<{
      name: string;
      duration: number;
      price: number;
    }>;
    total_price: number;
    note?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { booking }: BookingNotificationRequest = await req.json();

    console.log("Processing booking notification:", booking.id);

    // Format services list
    const servicesList = booking.services
      .map(
        (service) =>
          `- ${service.name} (${service.duration} mins) - $${service.price.toFixed(2)}`
      )
      .join("\n");

    // Send email to business owner
    const emailResponse = await resend.emails.send({
      from: "Diamond Beauty <onboarding@resend.dev>",
      to: ["diamondbeauty@gmail.com"],
      subject: `New Booking: ${booking.customer_name} - ${booking.booking_date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #C9A868 0%, #B8935F 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0;">💎 New Booking Received</h1>
          </div>
          
          <div style="background: #FAF8F5; padding: 30px;">
            <h2 style="color: #2C2C2C; border-bottom: 2px solid #C9A868; padding-bottom: 10px;">
              Booking Details
            </h2>
            
            <div style="margin: 20px 0;">
              <p style="margin: 10px 0;"><strong>Booking ID:</strong> ${booking.id}</p>
              <p style="margin: 10px 0;"><strong>Date:</strong> ${booking.booking_date}</p>
              <p style="margin: 10px 0;"><strong>Time:</strong> ${booking.booking_time}</p>
            </div>

            <h3 style="color: #2C2C2C; margin-top: 30px;">Customer Information</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${booking.customer_name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> ${booking.customer_email}</p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${booking.customer_phone}</p>
            </div>

            <h3 style="color: #2C2C2C; margin-top: 30px;">Selected Services</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
              <pre style="margin: 0; font-family: Arial, sans-serif; white-space: pre-wrap;">${servicesList}</pre>
              <hr style="border: none; border-top: 1px solid #E5E5E5; margin: 15px 0;">
              <p style="margin: 0; font-size: 18px;"><strong>Total: $${booking.total_price.toFixed(2)}</strong></p>
            </div>

            ${
              booking.note
                ? `
              <h3 style="color: #2C2C2C; margin-top: 30px;">Additional Notes</h3>
              <div style="background: white; padding: 15px; border-radius: 8px; margin: 10px 0;">
                <p style="margin: 0;">${booking.note}</p>
              </div>
            `
                : ""
            }

            <div style="margin-top: 30px; padding: 20px; background: #FFF8E7; border-left: 4px solid #C9A868; border-radius: 4px;">
              <p style="margin: 0; color: #666;">
                Please contact the customer to confirm the appointment.
              </p>
            </div>
          </div>

          <div style="background: #2C2C2C; padding: 20px; text-align: center;">
            <p style="color: #C9A868; margin: 0;">Diamond Beauty & Massage Therapy</p>
            <p style="color: white; margin: 5px 0; font-size: 14px;">502 Grand Blvd, Craigieburn 3064, Melbourne</p>
            <p style="color: white; margin: 5px 0; font-size: 14px;">0475 182 307 | diamondbeauty@gmail.com</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-notification function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
