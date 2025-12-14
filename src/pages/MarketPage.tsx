import { useState } from 'react';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, Bookmark, MapPin, Tag, Filter } from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useValoraToast } from '@/hooks/useToast';
import { MarketListing, ActivityLog } from '@/types/valora';
import { MOCK_LISTINGS, MARKET_CATEGORIES, LISTING_CONDITIONS } from '@/data/mockData';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function MarketPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [listings, setListings] = useLocalStorage<MarketListing[]>('valora-listings', MOCK_LISTINGS);
  const [activityLogs, setActivityLogs] = useLocalStorage<ActivityLog[]>('valora-activity-logs', []);
  const { toast } = useValoraToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '' as MarketListing['condition'] | '',
    price: '',
    location: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || listing.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleSave = (id: string) => {
    setListings(
      listings.map((l) => (l.id === id ? { ...l, saved: !l.saved } : l))
    );
    const listing = listings.find((l) => l.id === id);
    if (listing) {
      if (!listing.saved) {
        toast('Tersimpan! Kamu bisa cek lagi nanti.', 'success');
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Wajib diisi.';
    if (!formData.category) newErrors.category = 'Wajib diisi.';
    if (!formData.condition) newErrors.condition = 'Wajib diisi.';
    if (!formData.price.trim()) {
      newErrors.price = 'Wajib diisi.';
    } else if (isNaN(Number(formData.price))) {
      newErrors.price = 'Harga harus berupa angka.';
    }
    if (!formData.location.trim()) newErrors.location = 'Lokasi wajib diisi.';
    if (!formData.description.trim()) newErrors.description = 'Wajib diisi.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newListing: MarketListing = {
      id: Date.now().toString(),
      title: formData.title,
      category: formData.category,
      condition: formData.condition as MarketListing['condition'],
      price: Number(formData.price),
      location: formData.location,
      description: formData.description,
      createdAt: new Date().toISOString().split('T')[0],
      saved: false,
    };

    setListings([newListing, ...listings]);

    const newLog: ActivityLog = {
      id: Date.now().toString(),
      action: `Buat listing ${formData.title}`,
      result: 'Listing dipublikasikan ke Pasar.',
      timestamp: new Date().toISOString(),
    };
    setActivityLogs([newLog, ...activityLogs]);

    toast('Listing dibuat. Semoga cepat ketemu pemilik baru!', 'success');

    setFormData({
      title: '',
      category: '',
      condition: '',
      price: '',
      location: '',
      description: '',
    });
    setShowCreateModal(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <PageTransition>
      <div className="page-container pt-4 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Pasar Komponen</h1>
            <p className="text-sm text-muted-foreground">Temukan atau listing komponen reuse.</p>
          </div>
          <Button onClick={() => setShowCreateModal(true)} size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Buat
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari listing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            {MARKET_CATEGORIES.map((cat) => (
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

        {/* Listings Grid */}
        <div className="grid gap-3">
          {filteredListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="floating-card p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{listing.title}</h3>
                  <p className="text-xl font-bold text-primary">{formatPrice(listing.price)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleSave(listing.id)}
                  className={listing.saved ? 'text-primary' : ''}
                >
                  <Bookmark className={cn('w-5 h-5', listing.saved && 'fill-current')} />
                </Button>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {listing.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs">
                  <Tag className="w-3 h-3" />
                  {listing.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-xs">
                  <MapPin className="w-3 h-3" />
                  {listing.location}
                </span>
                <span
                  className={cn(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    listing.condition === 'Tested'
                      ? 'bg-safe-light text-safe'
                      : listing.condition === 'Untested'
                      ? 'bg-caution-light text-caution'
                      : 'bg-muted'
                  )}
                >
                  {listing.condition}
                </span>
              </div>
            </motion.div>
          ))}

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Tidak ada listing yang cocok.</p>
            </div>
          )}
        </div>

        {/* Create Listing Modal */}
        <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Buat Listing Baru</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Judul</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Contoh: RAM DDR4 8GB"
                />
                {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Kategori</label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {MARKET_CATEGORIES.filter((c) => c !== 'Semua').map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-xs text-destructive mt-1">{errors.category}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium">Kondisi</label>
                  <Select
                    value={formData.condition}
                    onValueChange={(v) => setFormData({ ...formData, condition: v as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih" />
                    </SelectTrigger>
                    <SelectContent>
                      {LISTING_CONDITIONS.map((cond) => (
                        <SelectItem key={cond} value={cond}>
                          {cond}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.condition && <p className="text-xs text-destructive mt-1">{errors.condition}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Harga (Rp)</label>
                  <Input
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="150000"
                    type="number"
                  />
                  {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="text-sm font-medium">Lokasi</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Jakarta Selatan"
                  />
                  {errors.location && <p className="text-xs text-destructive mt-1">{errors.location}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Deskripsi</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Jelaskan kondisi dan spesifikasi komponen..."
                  rows={3}
                />
                {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Batal
              </Button>
              <Button onClick={handleSubmit}>Simpan Listing</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}
