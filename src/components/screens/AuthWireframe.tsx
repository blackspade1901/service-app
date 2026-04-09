import React from 'react';
import { WireframeBox, WireframeButton, WireframeInput, WireframeCard, WireframeText } from '../WireframeBox';

export function AuthWireframe({ viewMode }: { viewMode: 'desktop' | 'mobile' }) {
  if (viewMode === 'mobile') {
    return (
      <div className="w-[375px] mx-auto border-4 border-black bg-white min-h-screen">
        <WireframeBox className="border-b-2 text-center py-4">
          <WireframeText>LOGO</WireframeText>
        </WireframeBox>

        <div className="p-4">
          {/* Tabs */}
          <div className="flex border-2 border-black mb-6">
            <div className="flex-1 bg-black text-white py-2 text-center font-mono text-sm">CUSTOMER</div>
            <div className="flex-1 border-l-2 border-black py-2 text-center font-mono text-sm">PROVIDER</div>
          </div>

          {/* Login/Register Tabs */}
          <div className="flex border-2 border-black mb-6">
            <div className="flex-1 bg-black text-white py-2 text-center font-mono text-sm">LOGIN</div>
            <div className="flex-1 border-l-2 border-black py-2 text-center font-mono text-sm">REGISTER</div>
          </div>

          {/* Login Form */}
          <div className="space-y-3">
            <div>
              <WireframeText className="text-xs mb-1">EMAIL</WireframeText>
              <WireframeInput placeholder="Enter email" />
            </div>
            <div>
              <WireframeText className="text-xs mb-1">PASSWORD</WireframeText>
              <WireframeInput placeholder="Enter password" />
            </div>
            <WireframeText className="text-xs text-right">Forgot Password?</WireframeText>
            <WireframeButton className="w-full mt-4">LOGIN</WireframeButton>
            <WireframeButton secondary className="w-full">LOGIN WITH GOOGLE</WireframeButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto border-4 border-black bg-white">
      <WireframeBox className="border-b-2 text-center py-4">
        <WireframeText>LOGO</WireframeText>
      </WireframeBox>

      <div className="flex min-h-[600px]">
        {/* Left Side - Image/Branding */}
        <WireframeBox label="HERO IMAGE / BRANDING" className="w-1/2 border-r-2 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-32 h-32 border-4 border-black bg-zinc-100 mx-auto" />
            <WireframeText>FIND LOCAL SERVICE</WireframeText>
            <WireframeText>PROVIDERS NEAR YOU</WireframeText>
          </div>
        </WireframeBox>

        {/* Right Side - Auth Forms */}
        <div className="w-1/2 p-8">
          {/* User Type Tabs */}
          <div className="flex border-2 border-black mb-6">
            <div className="flex-1 bg-black text-white py-3 text-center font-mono">CUSTOMER</div>
            <div className="flex-1 border-l-2 border-black py-3 text-center font-mono">SERVICE PROVIDER</div>
          </div>

          {/* Login/Register Tabs */}
          <div className="flex border-2 border-black mb-6">
            <div className="flex-1 bg-black text-white py-3 text-center font-mono">LOGIN</div>
            <div className="flex-1 border-l-2 border-black py-3 text-center font-mono">REGISTER</div>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <div>
              <WireframeText className="mb-2">EMAIL ADDRESS</WireframeText>
              <WireframeInput placeholder="Enter your email" />
            </div>

            <div>
              <WireframeText className="mb-2">PASSWORD</WireframeText>
              <WireframeInput placeholder="Enter your password" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black" />
                <WireframeText className="text-xs">Remember me</WireframeText>
              </div>
              <WireframeText className="text-xs">Forgot Password?</WireframeText>
            </div>

            <WireframeButton className="w-full">LOGIN</WireframeButton>

            <div className="relative my-4">
              <div className="border-t-2 border-black" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                <WireframeText className="text-xs">OR</WireframeText>
              </div>
            </div>

            <WireframeButton secondary className="w-full">LOGIN WITH GOOGLE</WireframeButton>
            <WireframeButton secondary className="w-full">LOGIN WITH FACEBOOK</WireframeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
