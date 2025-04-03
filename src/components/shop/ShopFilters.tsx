
import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ShopFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
  activeCategory: string;
  setActiveCategory: (value: string) => void;
}

const ShopFilters: React.FC<ShopFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  activeCategory,
  setActiveCategory
}) => {
  return (
    <div className="bg-evrgrn-muted border border-evrgrn-accent/10 rounded-lg p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 bg-evrgrn-dark border border-evrgrn-accent/20 rounded-md focus:outline-none focus:border-evrgrn-accent/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <div className="w-40">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
                <SelectItem value="name">Alphabétique</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-40">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                <SelectItem value="clothing">Vêtements</SelectItem>
                <SelectItem value="accessories">Accessoires</SelectItem>
                <SelectItem value="music">Musique</SelectItem>
                <SelectItem value="merch">Merch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;
