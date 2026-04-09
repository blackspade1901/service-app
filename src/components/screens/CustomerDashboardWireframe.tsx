import React from 'react';
import { WireframeBox, WireframeButton, WireframeCard, WireframeText } from '../WireframeBox';

export function CustomerDashboardWireframe({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  if (viewMode === 'mobile') {
    return (
      <div className="w-[375px] mx-auto border-4 border-black bg-white min-h-screen p-4">
        <WireframeBox className="border-b-2 pb-4 mb-4">
          <WireframeText className="text-xl">DASHBOARD</WireframeText>
          <WireframeText className="text-xs text-zinc-500">Welcome back, Sarah!</WireframeText>
        </WireframeBox>
        
        <WireframeCard className="mb-4">
          <WireframeText>UPCOMING BOOKING</WireframeText>
          <WireframeText className="text-xs text-zinc-500 mt-2">Plumbing Repair - Tomorrow, 10:00 AM</WireframeText>
          <WireframeButton className="w-full mt-4 text-xs">VIEW DETAILS</WireframeButton>
        </WireframeCard>

        <div className="grid grid-cols-2 gap-2">
          <WireframeButton secondary className="text-xs">HISTORY</WireframeButton>
          <WireframeButton secondary className="text-xs">FAVORITES</WireframeButton>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto border-4 border-black bg-white p-8">
      <WireframeBox className="border-b-2 pb-6 mb-6 flex justify-between items-center">
        <div>
          <WireframeText className="text-2xl">CUSTOMER DASHBOARD</WireframeText>
          <WireframeText className="text-zinc-500">Welcome back, Sarah!</WireframeText>
        </div>
        <WireframeButton secondary>EDIT PROFILE</WireframeButton>
      </WireframeBox>

      <div className="flex gap-6">
        <div className="w-2/3 space-y-6">
          <WireframeCard>
            <div className="flex justify-between items-center mb-4">
              <WireframeText>ACTIVE BOOKINGS (1)</WireframeText>
            </div>
            <WireframeBox dashed className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <WireframeText>Plumbing Repair</WireframeText>
                  <WireframeText className="text-sm text-zinc-500">John's Plumbing • Tomorrow, 10:00 AM</WireframeText>
                </div>
                <WireframeButton>MANAGE</WireframeButton>
              </div>
            </WireframeBox>
          </WireframeCard>

          <WireframeCard>
            <div className="flex justify-between items-center mb-4">
              <WireframeText>RECENT HISTORY</WireframeText>
              <WireframeButton secondary className="text-xs">VIEW ALL</WireframeButton>
            </div>
            <div className="space-y-2">
              <WireframeBox dashed className="p-3 flex justify-between">
                <WireframeText className="text-sm">Electrical Inspection</WireframeText>
                <WireframeText className="text-sm text-zinc-500">Completed</WireframeText>
              </WireframeBox>
            </div>
          </WireframeCard>
        </div>

        <div className="w-1/3 space-y-6">
          <WireframeCard>
            <WireframeText className="mb-4">FAVORITE PROVIDERS</WireframeText>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border-2 border-black bg-zinc-100" />
                <div>
                  <WireframeText className="text-sm">John's Plumbing</WireframeText>
                  <WireframeText className="text-xs text-zinc-500">★★★★★</WireframeText>
                </div>
              </div>
              <WireframeButton secondary className="w-full text-xs">VIEW SAVED</WireframeButton>
            </div>
          </WireframeCard>
        </div>
      </div>
    </div>
  );
}