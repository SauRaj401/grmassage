import { Clock, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  image: string;
  onAddToCart: () => void;
  isInCart: boolean;
}

const ServiceCard = ({ name, description, duration, price, category, image, onAddToCart, isInCart }: ServiceCardProps) => {
  return (
    <Card className="luxury-card overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-primary-foreground shadow-lg">
            {category}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <div className="flex items-center gap-1 text-gold shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
        </div>
        <CardDescription className="text-sm line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{duration} mins</span>
          </div>
          <div className="text-2xl font-bold gradient-gold bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </div>
        </div>
        
        <Button 
          onClick={onAddToCart} 
          disabled={isInCart}
          className="w-full shadow-md hover:shadow-lg transition-shadow"
          variant={isInCart ? "secondary" : "default"}
        >
          {isInCart ? "✓ Added to Cart" : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
