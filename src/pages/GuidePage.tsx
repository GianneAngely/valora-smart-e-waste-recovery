import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { SafetyBadge } from '@/components/ui/SafetyBadge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Filter, ChevronRight, Wrench, AlertCircle } from 'lucide-react';
import { VALORA_COMPONENTS, COMPONENT_CATEGORIES } from '@/data/components';
import { Component, SafetyLevel } from '@/types/valora';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function GuidePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedSafety, setSelectedSafety] = useState<SafetyLevel | 'all'>('all');
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);

  const safetyFilters: { label: string; value: SafetyLevel | 'all' }[] = [
    { label: 'Semua', value: 'all' },
    { label: 'Aman', value: 'safe' },
    { label: 'Perlu Hati-hati', value: 'caution' },
    { label: 'Jangan Bongkar', value: 'restricted' },
  ];

  const filteredComponents = VALORA_COMPONENTS.filter((comp) => {
    const matchesSearch = comp.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || comp.category === selectedCategory;
    const matchesSafety = selectedSafety === 'all' || comp.safety === selectedSafety;
    return matchesSearch && matchesCategory && matchesSafety;
  });

  const groupedByCategory = filteredComponents.reduce((acc, comp) => {
    if (!acc[comp.category]) {
      acc[comp.category] = [];
    }
    acc[comp.category].push(comp);
    return acc;
  }, {} as Record<string, Component[]>);

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Panduan Recovery</h1>
        <p className="text-sm text-muted-foreground">
          20 komponen e-waste dengan panduan keamanan dan langkah recovery.
        </p>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari komponen..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Safety Filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {safetyFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedSafety(filter.value)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-colors',
                selectedSafety === filter.value
                  ? filter.value === 'safe'
                    ? 'bg-safe text-safe-foreground border-safe'
                    : filter.value === 'caution'
                    ? 'bg-caution text-caution-foreground border-caution'
                    : filter.value === 'restricted'
                    ? 'bg-restricted text-restricted-foreground border-restricted'
                    : 'bg-primary text-primary-foreground border-primary'
                  : 'bg-muted border-border hover:border-primary/50'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {COMPONENT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors',
                  selectedCategory === cat
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </ScrollArea>

        {/* Components List */}
        <div className="space-y-4">
          {Object.entries(groupedByCategory).map(([category, components]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-sm font-medium text-muted-foreground mb-2">{category}</h3>
              <div className="space-y-2">
                {components.map((comp) => (
                  <motion.button
                    key={comp.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedComponent(comp)}
                    className="w-full floating-card p-4 flex items-center justify-between text-left hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                        <Wrench className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{comp.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{comp.safetyNote}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <SafetyBadge level={comp.safety} size="sm" showLabel={false} />
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}

          {filteredComponents.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Tidak ada komponen yang cocok dengan filter.</p>
            </div>
          )}
        </div>

        {/* Component Detail Modal */}
        <Dialog open={!!selectedComponent} onOpenChange={() => setSelectedComponent(null)}>
          <DialogContent className="max-w-md max-h-[85vh] overflow-hidden">
            {selectedComponent && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <DialogTitle>{selectedComponent.name}</DialogTitle>
                    <SafetyBadge level={selectedComponent.safety} />
                  </div>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                  <div className="space-y-4">
                    {/* Safety Note */}
                    <div
                      className={cn(
                        'p-4 rounded-xl border',
                        selectedComponent.safety === 'safe'
                          ? 'bg-safe-light border-safe/20'
                          : selectedComponent.safety === 'caution'
                          ? 'bg-caution-light border-caution/20'
                          : 'bg-restricted-light border-restricted/20'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle
                          className={cn(
                            'w-5 h-5 flex-shrink-0 mt-0.5',
                            selectedComponent.safety === 'safe'
                              ? 'text-safe'
                              : selectedComponent.safety === 'caution'
                              ? 'text-caution'
                              : 'text-restricted'
                          )}
                        />
                        <p className="text-sm">{selectedComponent.safetyNote}</p>
                      </div>
                    </div>

                    {/* Tools */}
                    {!selectedComponent.dropoffRequired && (
                      <div>
                        <h4 className="font-medium mb-2">Alat yang Dibutuhkan</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedComponent.tools.map((tool) => (
                            <span
                              key={tool}
                              className="px-3 py-1 rounded-full bg-muted text-sm"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recovery Steps */}
                    <div>
                      <h4 className="font-medium mb-2">Langkah Recovery</h4>
                      <ol className="space-y-2">
                        {selectedComponent.recoverySteps.map((step, index) => (
                          <li key={index} className="flex gap-3 text-sm">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-xs font-medium">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Key Points */}
                    <div>
                      <h4 className="font-medium mb-2">Poin Penting</h4>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Utamakan keamanan.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Reuse dulu, recycle kemudian.
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          Jika ragu, drop-off resmi.
                        </li>
                      </ul>
                    </div>

                    {selectedComponent.dropoffRequired && (
                      <Button className="w-full" variant="destructive">
                        Cari Drop-off Center
                      </Button>
                    )}
                  </div>
                </ScrollArea>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}

export { COMPONENT_CATEGORIES } from '@/data/components';
