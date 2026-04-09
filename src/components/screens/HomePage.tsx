import { WireframeMap } from '../wireframe/WireframeMap';
import { WireframeInput } from '../wireframe/WireframeInput';
import { WireframeButton } from '../wireframe/WireframeButton';
import { WireframeCard } from '../wireframe/WireframeCard';
import { WireframeIcon } from '../wireframe/WireframeIcon';
import { WireframeBox } from '../wireframe/WireframeBox';

interface HomePageProps {
  isMobile: boolean;
}

export function HomePage({ isMobile }: HomePageProps) {
  return isMobile ? <MobileView /> : <DesktopView />;
}

// --- Sub-Components ---

function ProviderCard({ name, distance, rating, reviews }: any) {
  return (
    <WireframeCard className="min-w-[280px] lg:min-w-0">
      <div className="flex gap-3">
        <WireframeIcon size={48} label="IMG" />
        <div className="flex-1">
          <div className="font-mono text-sm mb-1">{name}</div>
          <div className="font-mono text-[10px] text-gray-500">{distance} km away</div>
          <div className="flex items-center gap-1 mt-1">
            <WireframeIcon size={12} label="★" />
            <span className="font-mono text-[10px]">{rating} ({reviews})</span>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <WireframeButton size="sm" variant="secondary" className="flex-1">Profile</WireframeButton>
        <WireframeButton size="sm" className="flex-1">Book</WireframeButton>
      </div>
    </WireframeCard>
  );
}

function MobileView() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b-2 border-black p-3 space-y-3">
        <div className="flex justify-between items-center">
          <WireframeIcon size={32} label="LOGO" />
          <WireframeIcon size={24} label="☰" />
        </div>
        <div className="flex gap-2 border-2 border-black p-2 bg-zinc-50">
          <WireframeIcon size={16} label="📍" />
          <span className="font-mono text-xs">Current Location</span>
        </div>
        <WireframeInput placeholder="Search services..." />
      </header>

      <main className="flex-1 relative overflow-hidden">
        <WireframeMap height="100%" pinCount={8} />
        <div className="absolute bottom-0 w-full bg-white border-t-2 border-black p-4">
          <div className="w-12 h-1 bg-gray-300 mx-auto mb-4 rounded" />
          <div className="flex gap-3 overflow-x-auto snap-x">
            {[1, 2, 3].map(i => <ProviderCard key={i} name={`Provider ${i}`} distance="2.5" rating="4.8" reviews="120" />)}
          </div>
        </div>
      </main>
    </div>
  );
}

function DesktopView() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="border-b-2 border-black p-4 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <WireframeIcon size={40} label="LOGO" />
          <span className="font-bold">SERVICELY</span>
        </div>
        <div className="flex-1 flex gap-4">
          <div className="w-64 border-2 border-black p-2 flex items-center gap-2">
            <WireframeIcon size={16} label="📍" />
            <span className="text-sm">Current Location</span>
          </div>
          <WireframeInput placeholder="Search for plumbers, electricians..." className="flex-1" />
        </div>
        <div className="flex gap-2">
          <WireframeButton variant="ghost">Login</WireframeButton>
          <WireframeButton>Sign Up</WireframeButton>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 border-r-2 border-black p-4 overflow-y-auto bg-zinc-50">
          <div className="font-bold mb-4">FILTERS</div>
          <FilterSection label="Service Type" items={['Plumber', 'Electrician', 'Carpenter']} />
          <FilterSection label="Rating" items={['4+ Stars', '3+ Stars']} />
          <WireframeButton className="w-full mt-4">Apply Filters</WireframeButton>
        </aside>
        
        <section className="flex-1 relative">
          <WireframeMap height="100%" pinCount={12} />
        </section>

        <aside className="w-96 border-l-2 border-black p-4 overflow-y-auto">
          <div className="font-mono text-sm mb-4">12 Results Found</div>
          <div className="space-y-4">
             {[1, 2, 3, 4].map(i => <ProviderCard key={i} name={`Pro Provider ${i}`} distance="1.2" rating="4.9" reviews="85" />)}
          </div>
        </aside>
      </div>
    </div>
  );
}

function FilterSection({ label, items }: { label: string, items: string[] }) {
  return (
    <WireframeBox label={label.toUpperCase()} className="mb-4">
      <div className="p-3 space-y-2">
        {items.map(item => (
          <div key={item} className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 border-2 border-black" /> {item}
          </div>
        ))}
      </div>
    </WireframeBox>
  );
}