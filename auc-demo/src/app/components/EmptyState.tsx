import React from "react";
import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showSearchIcon?: boolean;
}

export default function EmptyState({ 
  title = "No cars found", 
  description = "Try adjusting your search or filters to find what you're looking for.",
  showSearchIcon = true 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {showSearchIcon && (
        <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      )}
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-md mx-auto">{description}</p>
    </div>
  );
}
