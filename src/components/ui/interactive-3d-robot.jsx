import React, { useState, Suspense, lazy } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`${this.props.className} bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center p-8 border border-white/5 rounded-3xl relative overflow-hidden`}>
           <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent" />
           <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4 bg-white/[0.02]">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/40"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 text-white relative z-10 text-center leading-relaxed">
             Neural Link Offline<br/>
             <span className="text-[8px] opacity-60 tracking-widest">(WebGL Hardware Exception)</span>
           </span>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * InteractiveRobotSpline Component
 * 
 * @param {string} scene - The Spline scene URL
 * @param {string} className - Additional CSS classes
 * @param {function} onLoad - Callback receives the Spline app instance
 */
export function InteractiveRobotSpline({ scene, className, onLoad }) {

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-black/20 text-white ${className}`}>
          <div className="flex flex-col items-center gap-4">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
            </svg>
            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Initializing Whobee</span>
          </div>
        </div>
      }
    >
      <WebGLErrorBoundary className={className}>
        <div className="w-full h-full">
          <Spline
            scene={scene}
            className={className}
            onLoad={onLoad}
          />
        </div>
      </WebGLErrorBoundary>
    </Suspense>
  );
}

