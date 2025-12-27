
import React, { useState, useRef, useEffect } from 'react';
import { virtualTryOn, estimateMeasurement } from '../services/geminiService';

interface TryOnProduct {
  id: string;
  name: string;
  category: 'personal' | 'space';
  prompt: string;
  thumbnail: string;
}

const MOCK_PRODUCTS: TryOnProduct[] = [
  { 
    id: 'h1', 
    name: 'Essential Oversized Hoodie', 
    category: 'personal', 
    prompt: 'a minimalist oversized premium heavy-cotton black hoodie with a structured hood', 
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=200&h=200&q=80' 
  },
  { 
    id: 'g1', 
    name: 'Aero-Vision Smart Glasses', 
    category: 'personal', 
    prompt: 'sleek futuristic matte black smart glasses with thin blue LED accents on the frame', 
    thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=200&h=200&q=80' 
  },
  { 
    id: 'w1', 
    name: 'Horizon Chrono Watch', 
    category: 'personal', 
    prompt: 'a luxury titanium mechanical watch with a deep blue dial and silver linked strap', 
    thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=200&h=200&q=80' 
  },
  { 
    id: 's1', 
    name: 'Cloud-Comfort Modular Sofa', 
    category: 'space', 
    prompt: 'a modern beige low-profile modular l-shaped sofa with soft textured fabric', 
    thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=200&h=200&q=80' 
  },
  { 
    id: 'd1', 
    name: 'Abstract Marble Coffee Table', 
    category: 'space', 
    prompt: 'a round white marble coffee table with geometric gold-finish metal legs', 
    thumbnail: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=200&h=200&q=80' 
  }
];

const DEMO_PHOTOS = {
  personal: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
  space: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
};

const VirtualTryOn: React.FC = () => {
  const [mode, setMode] = useState<'personal' | 'space' | 'measure'>('personal');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<TryOnProduct>(MOCK_PRODUCTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [measurementResult, setMeasurementResult] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCapturedImage(null);
    setProcessedImage(null);
    setMeasurementResult(null);
    setIsCameraActive(true);
  };

  const useDemoPhoto = () => {
    const demoUrl = mode === 'space' ? DEMO_PHOTOS.space : DEMO_PHOTOS.personal;
    // We fetch and convert to base64 so Gemini can process it
    fetch(demoUrl)
      .then(res => res.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setCapturedImage(reader.result as string);
          setIsCameraActive(false);
        };
        reader.readAsDataURL(blob);
      });
  };

  useEffect(() => {
    async function setupStream() {
      if (isCameraActive && videoRef.current && !streamRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: mode === 'space' ? 'environment' : 'user',
              width: { ideal: 1280 },
              height: { ideal: 720 }
            } 
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access denied", err);
          setIsCameraActive(false);
          alert("Could not access camera. Please check permissions or use a Demo Photo.");
        }
      }
    }
    setupStream();
  }, [isCameraActive, mode]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const captureFrame = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      if (mode !== 'space') {
        ctx?.translate(canvasRef.current.width, 0);
        ctx?.scale(-1, 1);
      }
      ctx?.drawImage(videoRef.current, 0, 0);
      const data = canvasRef.current.toDataURL('image/jpeg', 0.8);
      setCapturedImage(data);
      stopCamera();
    }
  };

  const handleAction = async () => {
    if (!capturedImage) return;
    setIsProcessing(true);
    setProcessedImage(null);
    setMeasurementResult(null);

    const base64Data = capturedImage.split(',')[1];

    try {
      if (mode === 'measure') {
        const result = await estimateMeasurement(base64Data, "target object");
        setMeasurementResult(result);
      } else {
        const result = await virtualTryOn(base64Data, selectedProduct.prompt, mode);
        setProcessedImage(result);
      }
    } catch (err) {
      console.error("AI Action failed", err);
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setCapturedImage(null);
    setProcessedImage(null);
    setMeasurementResult(null);
    if (!isCameraActive) setIsCameraActive(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-black text-slate-800 tracking-tighter mb-4">Pulse Vision Studio</h2>
        <p className="text-slate-500 max-w-2xl mx-auto">Experience products in your real world with hyper-realistic AI visualization and dimension mapping.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Interaction Stage */}
        <div className="lg:w-[70%] space-y-6">
          <div className="bg-slate-900 rounded-[3rem] overflow-hidden aspect-video relative group shadow-2xl border-[8px] border-white ring-1 ring-slate-200">
            
            {/* Initial State / Welcome */}
            {!isCameraActive && !capturedImage && !processedImage && !isProcessing && !measurementResult && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-slate-800 to-slate-950">
                <div className="w-24 h-24 bg-indigo-500/20 rounded-full flex items-center justify-center mb-6 border border-indigo-400/30">
                  <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <h3 className="text-white text-3xl font-black mb-4">Ready to See the Future?</h3>
                <p className="text-slate-400 text-sm max-w-md leading-relaxed mb-8">Take a photo or use a demo image to start visualizing the <strong>{selectedProduct.name}</strong> on yourself or in your home.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={startCamera}
                    className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl flex items-center gap-3 justify-center"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
                    Start Real Camera
                  </button>
                  <button 
                    onClick={useDemoPhoto}
                    className="px-10 py-4 bg-white/10 text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all flex items-center gap-3 justify-center"
                  >
                    Try with Demo Photo
                  </button>
                </div>
              </div>
            )}

            {/* Camera View */}
            {isCameraActive && (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className={`w-full h-full object-cover ${mode !== 'space' ? 'scale-x-[-1]' : ''}`} 
                />
                <div className="absolute inset-0 border-[2px] border-white/30 m-6 rounded-3xl pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-indigo-500/50 rounded-full animate-pulse"></div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6">
                  <button onClick={stopCamera} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-red-500 transition-all">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                  <button 
                    onClick={captureFrame}
                    className="w-24 h-24 bg-white rounded-full border-[8px] border-indigo-600/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
                  >
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/></svg>
                    </div>
                  </button>
                  <div className="w-12 h-12"></div>
                </div>
              </>
            )}

            {/* Photo Review / Process Request */}
            {capturedImage && !processedImage && !isProcessing && (
              <div className="relative h-full">
                <img src={capturedImage} className="w-full h-full object-cover" alt="Captured" />
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center p-8">
                  <div className="bg-white rounded-[2rem] p-8 shadow-2xl max-w-sm text-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                    <h4 className="text-xl font-black text-slate-800 mb-2">Looks Good?</h4>
                    <p className="text-slate-500 text-xs mb-8">AI will now synthesize the <strong>{selectedProduct.name}</strong> onto this frame.</p>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={handleAction}
                        className="w-full py-4 bg-indigo-600 text-white font-black rounded-xl shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
                      >
                        Apply {mode === 'measure' ? 'AI Measurement' : 'Virtual Fit'}
                      </button>
                      <button onClick={reset} className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all">Retake Photo</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-center p-12">
                 <div className="relative w-32 h-32 mb-8">
                    <div className="absolute inset-0 border-[6px] border-indigo-500/10 rounded-full"></div>
                    <div className="absolute inset-0 border-[6px] border-t-indigo-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-4 bg-indigo-500/5 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-indigo-500 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                    </div>
                 </div>
                 <h3 className="text-white text-3xl font-black mb-2 italic">Vision Engine Active</h3>
                 <p className="text-indigo-300 font-black uppercase text-[10px] tracking-[0.3em] animate-pulse">Gemini 2.5 Multi-Modal Synthesis</p>
                 <div className="mt-12 max-w-xs w-full bg-white/5 h-1 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 animate-progress"></div>
                 </div>
              </div>
            )}

            {/* Final Result Render */}
            {processedImage && (
              <div className="relative h-full animate-in zoom-in duration-700">
                <img src={processedImage} className="w-full h-full object-cover" alt="Processed" />
                <div className="absolute top-6 left-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex items-center gap-3">
                   <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">Pulse Fit Verified</p>
                      <p className="text-sm font-black text-slate-800">Ready to Buy</p>
                   </div>
                </div>
                <div className="absolute bottom-8 right-8 flex gap-4">
                   <button onClick={reset} className="px-8 py-4 bg-white text-slate-800 font-black rounded-2xl shadow-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                     New Pulse
                   </button>
                   <button className="px-10 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-2xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                     Add to Cart
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z"/></svg>
                   </button>
                </div>
              </div>
            )}

            {/* Measurement Result Overlay */}
            {measurementResult && (
               <div className="absolute inset-0 bg-slate-950/90 flex flex-col items-center justify-center p-8 text-center animate-in fade-in">
                  <div className="w-24 h-24 bg-indigo-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl rotate-3">
                     <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                  </div>
                  <h3 className="text-white text-4xl font-black mb-4 tracking-tighter italic">AI Dimension Scan</h3>
                  <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] w-full max-w-md shadow-2xl">
                     <p className="text-4xl font-black text-indigo-400 mb-3">{measurementResult.split(' (')[0]}</p>
                     <p className="text-slate-400 text-sm italic leading-relaxed">"{measurementResult.includes('(') ? measurementResult.split(' (')[1].replace(')', '') : measurementResult.split(': ')[1] || 'Estimation based on perspective mapping.'}"</p>
                  </div>
                  <button onClick={reset} className="mt-12 px-12 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all shadow-xl">New Scan</button>
               </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.364-6.364l-.707-.707M6.364 18.364l.707-.707M18.364 18.364l-.707.707M12 18a6 6 0 100-12 6 6 0 000 12z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Auto-Scale</p>
                  <p className="text-sm font-bold text-slate-800">Perspective AI</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Real-Time</p>
                  <p className="text-sm font-bold text-slate-800">Latency: < 3s</p>
                </div>
             </div>
             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Secure</p>
                  <p className="text-sm font-bold text-slate-800">Private Processing</p>
                </div>
             </div>
          </div>
          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Sidebar Controls */}
        <div className="lg:w-[30%] space-y-6">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 h-full">
            <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-8">Pulse Vision Modes</h3>
            
            <div className="flex p-1 bg-slate-50 rounded-2xl mb-8">
               <button 
                onClick={() => { setMode('personal'); reset(); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'personal' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >Personal</button>
               <button 
                onClick={() => { setMode('space'); reset(); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'space' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >Space</button>
               <button 
                onClick={() => { setMode('measure'); reset(); }}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'measure' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
               >Measure</button>
            </div>

            {mode !== 'measure' ? (
              <>
                <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6">Sample Collection</h3>
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {MOCK_PRODUCTS.filter(p => p.category === mode).map(p => (
                    <div 
                      key={p.id} 
                      onClick={() => setSelectedProduct(p)}
                      className={`group flex items-center gap-4 p-4 rounded-3xl border-2 transition-all cursor-pointer ${selectedProduct.id === p.id ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-200'}`}
                    >
                      <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm flex-shrink-0">
                        <img src={p.thumbnail} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-black ${selectedProduct.id === p.id ? 'text-indigo-600' : 'text-slate-800'}`}>{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Try On →</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-8 text-center bg-indigo-50/50 rounded-3xl border border-indigo-100 border-dashed">
                 <svg className="w-12 h-12 text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v-3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"/></svg>
                 <h4 className="text-sm font-black text-indigo-900 mb-2">Measure Mode Ready</h4>
                 <p className="text-xs text-indigo-700/60 leading-relaxed">Pulse AI estimates real-world dimensions by analyzing ground planes and background anchor points.</p>
              </div>
            )}

            <div className="mt-12 p-6 bg-slate-900 rounded-[2rem] text-white">
               <h4 className="text-[10px] font-black uppercase text-indigo-400 tracking-widest mb-3">Vision Status</h4>
               <div className="flex items-center gap-3">
                  <div className="flex flex-col gap-1 flex-1">
                     <div className="h-1 w-full bg-white/10 rounded-full">
                        <div className="h-full bg-emerald-400 w-[94%]"></div>
                     </div>
                     <span className="text-[9px] font-black uppercase text-slate-500">Analysis Precision: 94%</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VirtualTryOn;
