import React from 'react';
import { WireframeBox, WireframeButton, WireframeInput, WireframeCard, WireframeText, WireframeImageBox } from '../WireframeBox';

export function ProviderRegistrationWireframe({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  if (viewMode === 'mobile') {
    return (
      <div className="w-[375px] mx-auto border-4 border-black bg-white">
        <WireframeBox className="border-b-2">
          <WireframeText>← Back | PROVIDER REGISTRATION</WireframeText>
        </WireframeBox>

        {/* Progress Steps */}
        <WireframeBox className="border-b-2">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-1 font-mono text-xs">1</div>
              <WireframeText className="text-xs">Info</WireframeText>
            </div>
            <div className="flex-1 border-t-2 border-black mx-2" />
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-1 font-mono text-xs">2</div>
              <WireframeText className="text-xs">Services</WireframeText>
            </div>
            <div className="flex-1 border-t-2 border-black mx-2" />
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-1 font-mono text-xs">3</div>
              <WireframeText className="text-xs">Docs</WireframeText>
            </div>
          </div>
        </WireframeBox>

        <div className="p-4 space-y-4">
          <WireframeText>STEP 1: PERSONAL & BUSINESS DETAILS</WireframeText>

          <div>
            <WireframeText className="text-xs mb-1">FULL NAME</WireframeText>
            <WireframeInput placeholder="Enter name" />
          </div>

          <div>
            <WireframeText className="text-xs mb-1">BUSINESS NAME</WireframeText>
            <WireframeInput placeholder="Enter business name" />
          </div>

          <div>
            <WireframeText className="text-xs mb-1">PHONE NUMBER</WireframeText>
            <WireframeInput placeholder="Enter phone" />
          </div>

          <div>
            <WireframeText className="text-xs mb-1">ADDRESS</WireframeText>
            <WireframeInput placeholder="Enter address" />
          </div>

          <div className="flex gap-2 pt-4">
            <WireframeButton secondary className="flex-1">BACK</WireframeButton>
            <WireframeButton className="flex-1">NEXT</WireframeButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto border-4 border-black bg-white">
      <WireframeBox className="border-b-2">
        <div className="flex items-center justify-between">
          <WireframeText>← BACK TO LOGIN</WireframeText>
          <WireframeText>PROVIDER REGISTRATION</WireframeText>
          <WireframeText>LOGO</WireframeText>
        </div>
      </WireframeBox>

      {/* Progress Indicator */}
      <WireframeBox className="border-b-2">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-2 font-mono">1</div>
            <WireframeText className="text-xs">Personal Info</WireframeText>
          </div>
          <div className="flex-1 border-t-4 border-black mx-4" />
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-black rounded-full flex items-center justify-center mx-auto mb-2 font-mono">2</div>
            <WireframeText className="text-xs">Services</WireframeText>
          </div>
          <div className="flex-1 border-t-4 border-dashed border-zinc-300 mx-4" />
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-zinc-300 rounded-full flex items-center justify-center mx-auto mb-2 font-mono text-zinc-300">3</div>
            <WireframeText className="text-xs text-zinc-300">Schedule</WireframeText>
          </div>
          <div className="flex-1 border-t-4 border-dashed border-zinc-300 mx-4" />
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-zinc-300 rounded-full flex items-center justify-center mx-auto mb-2 font-mono text-zinc-300">4</div>
            <WireframeText className="text-xs text-zinc-300">Documents</WireframeText>
          </div>
        </div>
      </WireframeBox>

      <div className="p-8">
        <WireframeText className="mb-6">STEP 1: PERSONAL & BUSINESS DETAILS</WireframeText>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <WireframeText className="mb-2">FULL NAME *</WireframeText>
            <WireframeInput placeholder="Enter your full name" />
          </div>

          <div>
            <WireframeText className="mb-2">BUSINESS NAME *</WireframeText>
            <WireframeInput placeholder="Enter business name" />
          </div>

          <div>
            <WireframeText className="mb-2">EMAIL *</WireframeText>
            <WireframeInput placeholder="Enter email" />
          </div>

          <div>
            <WireframeText className="mb-2">PHONE NUMBER *</WireframeText>
            <WireframeInput placeholder="Enter phone" />
          </div>

          <div className="col-span-2">
            <WireframeText className="mb-2">BUSINESS ADDRESS *</WireframeText>
            <WireframeInput placeholder="Enter complete address" />
          </div>

          <div>
            <WireframeText className="mb-2">NUMBER OF WORKERS</WireframeText>
            <WireframeInput placeholder="e.g., 5" />
          </div>

          <div>
            <WireframeText className="mb-2">YEARS OF EXPERIENCE</WireframeText>
            <WireframeInput placeholder="e.g., 10" />
          </div>

          <div className="col-span-2">
            <WireframeText className="mb-2">BUSINESS DESCRIPTION</WireframeText>
            <WireframeBox className="h-24 bg-white">
              <WireframeText className="text-zinc-400">Tell us about your business...</WireframeText>
            </WireframeBox>
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <WireframeButton secondary className="px-8">CANCEL</WireframeButton>
          <WireframeButton className="px-8">NEXT: SERVICES →</WireframeButton>
        </div>
      </div>

      {/* Step 2 Preview */}
      <WireframeBox className="border-t-4 p-8 bg-zinc-50">
        <WireframeText className="mb-6">STEP 2: SERVICES & PRICING (PREVIEW)</WireframeText>
        
        <div className="space-y-4">
          <div>
            <WireframeText className="mb-2">SELECT SERVICES OFFERED *</WireframeText>
            <div className="grid grid-cols-3 gap-2">
              {['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'HVAC', 'Cleaning'].map((service) => (
                <WireframeCard key={service} className="text-center py-2">
                  <WireframeText className="text-xs">{service}</WireframeText>
                </WireframeCard>
              ))}
            </div>
          </div>

          <div>
            <WireframeText className="mb-2">MINIMUM CHARGES PER SERVICE</WireframeText>
            <div className="grid grid-cols-2 gap-4">
              <WireframeInput placeholder="$ Plumbing" />
              <WireframeInput placeholder="$ Electrical" />
            </div>
          </div>
        </div>
      </WireframeBox>

      {/* Step 4 Preview */}
      <WireframeBox className="border-t-4 p-8 bg-zinc-50">
        <WireframeText className="mb-6">STEP 4: DOCUMENT VERIFICATION (PREVIEW)</WireframeText>
        
        <div className="space-y-4">
          <div>
            <WireframeText className="mb-2">UPLOAD VERIFICATION DOCUMENTS *</WireframeText>
            <div className="grid grid-cols-2 gap-4">
              <WireframeBox dashed className="h-32 flex items-center justify-center cursor-pointer">
                <WireframeText className="text-zinc-400">+ ID PROOF</WireframeText>
              </WireframeBox>
              <WireframeBox dashed className="h-32 flex items-center justify-center cursor-pointer">
                <WireframeText className="text-zinc-400">+ BUSINESS LICENSE</WireframeText>
              </WireframeBox>
            </div>
          </div>

          <div>
            <WireframeText className="mb-2">UPLOAD WORK/SHOP PHOTOS</WireframeText>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <WireframeBox key={i} dashed className="aspect-square flex items-center justify-center cursor-pointer">
                  <WireframeText className="text-zinc-400">+</WireframeText>
                </WireframeBox>
              ))}
            </div>
          </div>

          <WireframeCard className="bg-yellow-50 border-yellow-500">
            <WireframeText className="text-xs">⚠️ STATUS: PENDING VERIFICATION</WireframeText>
            <WireframeText className="text-xs mt-1">Your application will be reviewed within 24-48 hours</WireframeText>
          </WireframeCard>
        </div>
      </WireframeBox>
    </div>
  );
}
