import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="bg-gray-50 py-3 border-b" data-testid="breadcrumb-navigation">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="flex items-center text-gray-600 hover:text-pool-blue transition-colors" data-testid="breadcrumb-home">
              <Home className="h-4 w-4 mr-1" />
              Home
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-gray-600 hover:text-pool-blue transition-colors"
                  data-testid={`breadcrumb-${index}`}
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium" data-testid={`breadcrumb-current-${index}`}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}