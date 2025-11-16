import { ShoppingBag, X, Clock, Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartItem {
  id: string;
  name: string;
  duration: number;
  price: number;
}

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onRemove, onCheckout }: CartProps) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const totalDuration = items.reduce((sum, item) => sum + item.duration, 0);

  return (
    <Card className="sticky top-8 luxury-card border-gold/20">
      <CardHeader className="gradient-gold text-white">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5" />
          <CardTitle className="text-white">Your Booking</CardTitle>
        </div>
        <CardDescription className="text-white/90">
          {items.length} {items.length === 1 ? "service" : "services"} selected
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-sm text-muted-foreground">
              Your cart is empty.<br />Add services to get started.
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="max-h-[300px] pr-4">
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="group">
                    <div className="flex items-start justify-between gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {item.name}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.duration}m
                          </span>
                          <span className="text-sm font-semibold text-primary">
                            ${item.price}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 opacity-60 hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onRemove(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Duration</span>
                <span className="font-medium text-foreground">{totalDuration} mins</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Total Price</span>
                <span className="gradient-gold bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}
      </CardContent>

      {items.length > 0 && (
        <CardFooter>
          <Button 
            onClick={onCheckout} 
            className="w-full gradient-gold text-white shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            Proceed to Booking
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default Cart;
