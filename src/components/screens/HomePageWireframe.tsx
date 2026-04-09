import React from 'react';
import { WireframeBox, WireframeButton, WireframeInput, WireframeCard, WireframeText, WireframeMapPin } from '../WireframeBox';

export function HomePageWireframe({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  if (viewMode === 'mobile') {
    return (
      <div className="w-[375px] mx-auto border-4 border-black bg-white">
        {/* Mobile Header */}
        <WireframeBox className="border-b-2">
          <div className="flex items-center justify-between">
            <WireframeText>☰ MENU</WireframeText>
            <WireframeText>LOGO</WireframeText>
            <WireframeText>PROFILE</WireframeText>
          </div>
        </WireframeBox>

        {/* Search & Filters */}
        <WireframeBox className="border-b-2">
          <WireframeInput placeholder="📍 Current Location" className="mb-2" />
          <WireframeInput placeholder="🔍 Search service..." className="mb-2" />
          <WireframeButton secondary className="w-full">FILTERS</WireframeButton>
        </WireframeBox>

        {/* Map */}
        <WireframeBox label="FULL-SCREEN MAP" height="h-96" className="relative">
          <div className="absolute top-4 left-4">
            <WireframeMapPin number={1} />
          </div>
          <div className="absolute top-12 right-8">
            <WireframeMapPin number={2} />
          </div>
          <div className="absolute bottom-20 left-12">
            <WireframeMapPin number={3} />
          </div>
          <div className="absolute bottom-8 right-4">
            <WireframeMapPin number={4} />
          </div>
        </WireframeBox>

        {/* Bottom Sheet - Provider Cards */}
        <WireframeBox className="border-t-4">
          <WireframeText className="mb-3">NEARBY PROVIDERS (12)</WireframeText>
          <div className="space-y-2 max-h-40 overflow-hidden">
            <WireframeCard>
              <div className="flex gap-2">
                <div className="w-16 h-16 border-2 border-black bg-zinc-100 flex-shrink-0" />
                <div className="flex-1">
                  <WireframeText>Provider Name</WireframeText>
                  <WireframeText className="text-xs text-zinc-500">★★★★★ (45) • 2.5 km</WireframeText>
                  <WireframeText className="text-xs text-zinc-500">Plumbing • Available</WireframeText>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <WireframeButton className="flex-1 text-xs py-1">BOOK</WireframeButton>
                <WireframeButton secondary className="flex-1 text-xs py-1">VIEW</WireframeButton>
              </div>
            </WireframeCard>
            <WireframeCard>
              <div className="flex gap-2">
                <div className="w-16 h-16 border-2 border-black bg-zinc-100 flex-shrink-0" />
                <div className="flex-1">
                  <WireframeText>Provider Name</WireframeText>
                  <WireframeText className="text-xs text-zinc-500">★★★★☆ (28) • 3.1 km</WireframeText>
                  <WireframeText className="text-xs text-zinc-500">Electrical • Offline</WireframeText>
                </div>
              </div>
            </WireframeCard>
          </div>
        </WireframeBox>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto border-4 border-black bg-white">
      {/* Desktop Header */}
      <WireframeBox className="border-b-2">
        <div className="flex items-center justify-between">
          <WireframeText>LOGO</WireframeText>
          <div className="flex gap-4">
            <WireframeText>How It Works</WireframeText>
            <WireframeText>Become a Provider</WireframeText>
            <WireframeButton secondary className="px-3 py-1">LOGIN</WireframeButton>
            <WireframeButton className="px-3 py-1">SIGN UP</WireframeButton>
          </div>
        </div>
      </WireframeBox>

      <div className="flex">
        {/* Left Sidebar - Filters */}
        <WireframeBox className="w-80 border-r-2 min-h-screen">
          <WireframeText className="mb-4">SEARCH & FILTERS</WireframeText>
          
          <WireframeBox dashed className="mb-4">
            <WireframeInput placeholder="📍 Enter location" />
          </WireframeBox>

          <WireframeBox dashed className="mb-4">
            <WireframeInput placeholder="🔍 Search service type" />
          </WireframeBox>

          <div className="space-y-3">
            <div>
              <WireframeText className="text-xs mb-2">DISTANCE (km)</WireframeText>
              <div className="border-2 border-black h-2 bg-zinc-100 relative">
                <div className="absolute left-1/2 top-0 w-4 h-4 bg-black -mt-1" />
              </div>
            </div>

            <div>
              <WireframeText className="text-xs mb-2">RATING</WireframeText>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black" />
                  <WireframeText className="text-xs">★★★★★</WireframeText>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black" />
                  <WireframeText className="text-xs">★★★★☆ & up</WireframeText>
                </div>
              </div>
            </div>

            <div>
              <WireframeText className="text-xs mb-2">AVAILABILITY</WireframeText>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black bg-black" />
                <WireframeText className="text-xs">Online Now</WireframeText>
              </div>
            </div>

            <div>
              <WireframeText className="text-xs mb-2">PRICE RANGE</WireframeText>
              <div className="flex gap-2">
                <WireframeInput placeholder="Min" className="flex-1" />
                <WireframeInput placeholder="Max" className="flex-1" />
              </div>
            </div>

            <WireframeButton className="w-full mt-4">APPLY FILTERS</WireframeButton>
            <WireframeButton secondary className="w-full">RESET</WireframeButton>
          </div>
        </WireframeBox>

        {/* Map Area */}
        <div className="flex-1">
          <WireframeBox label="INTERACTIVE MAP (GOOGLE MAPS API)" height="h-[600px]" className="relative border-0">
            {/* Map Pins */}
            <div className="absolute top-20 left-32">
              <WireframeMapPin number={1} />
            </div>
            <div className="absolute top-40 right-40">
              <WireframeMapPin number={2} />
            </div>
            <div className="absolute bottom-40 left-48">
              <WireframeMapPin number={3} />
            </div>
            <div className="absolute top-32 right-64">
              <WireframeMapPin number={4} />
            </div>
            <div className="absolute bottom-32 right-32">
              <WireframeMapPin number={5} />
            </div>

            {/* Hover Card Example */}
            <div className="absolute top-24 left-48">
              <WireframeCard className="w-64">
                <div className="flex gap-2 items-start">
                  <div className="w-12 h-12 border-2 border-black bg-zinc-100 flex-shrink-0" />
                  <div className="flex-1">
                    <WireframeText className="mb-1">John's Plumbing</WireframeText>
                    <WireframeText className="text-xs text-zinc-500 mb-1">★★★★★ (45 reviews)</WireframeText>
                    <WireframeText className="text-xs text-zinc-500">2.5 km away • Available</WireframeText>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <WireframeButton className="flex-1 text-xs py-1">BOOK NOW</WireframeButton>
                  <WireframeButton secondary className="flex-1 text-xs py-1">VIEW PROFILE</WireframeButton>
                </div>
              </WireframeCard>
            </div>
          </WireframeBox>

          {/* Provider List Below Map */}
          <WireframeBox className="border-t-2 p-4">
            <div className="flex justify-between items-center mb-4">
              <WireframeText>12 SERVICE PROVIDERS FOUND</WireframeText>
              <div className="flex gap-2">
                <WireframeButton secondary className="text-xs px-2 py-1">LIST VIEW</WireframeButton>
                <WireframeButton className="text-xs px-2 py-1">MAP VIEW</WireframeButton>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <WireframeCard key={i}>
                  <div className="w-full h-32 border-2 border-black bg-zinc-100 mb-2" />
                  <WireframeText className="mb-1">Provider Name {i}</WireframeText>
                  <WireframeText className="text-xs text-zinc-500 mb-1">★★★★★ (45)</WireframeText>
                  <WireframeText className="text-xs text-zinc-500 mb-2">Plumbing • 2.5 km • Available</WireframeText>
                  <WireframeText className="text-xs mb-2">From $50/service</WireframeText>
                  <div className="flex gap-2">
                    <WireframeButton className="flex-1 text-xs py-1">BOOK</WireframeButton>
                    <WireframeButton secondary className="flex-1 text-xs py-1">VIEW</WireframeButton>
                  </div>
                </WireframeCard>
              ))}
            </div>
          </WireframeBox>
        </div>
      </div>
    </div>
  );
}
