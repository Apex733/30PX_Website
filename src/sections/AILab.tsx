import React from 'react';
import {
    Upload,
    Cpu,
    Sparkles,
    CheckCircle2,
    Video,
    Image as ImageIcon,
    ArrowRight,
    FileImage,
    Maximize,
    HardDrive,
    Palette,
    Loader2,
    Download
} from 'lucide-react';
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";

export function AILab() {
    return (
        <section className="py-12 md:py-16 bg-background overflow-hidden" id="ai-lab">
            <div className="container mx-auto px-4 md:px-12 flex flex-col items-center justify-center">

                {/* Title Section */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <SectionHeading
                        badge="AI Lab"
                        title="From Concept to Campaign"
                        description="See exactly how we use AI to accelerate our workflow so we can deliver production-ready assets in seconds. We run AI—it doesn't run us."
                        align="center"
                    />
                </div>

                {/* Main Horizontal Scrollable Pipeline */}
                <div className="w-full max-w-7xl pb-10 px-4 xl:px-0">
                    <div className="flex flex-col lg:flex-row items-stretch justify-center lg:justify-center gap-8 lg:gap-8 mx-auto w-full lg:w-fit relative z-10 py-6">

                        {/* =========================================
                STAGE 1: INPUT
            ========================================= */}
                        <div className="bg-card border border-border rounded-[5px] p-6 w-full lg:w-[320px] shrink-0 flex flex-col relative shadow-sm hover:shadow-md transition-shadow flex-1">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card border border-border text-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">1</div>

                            <div className="flex items-center justify-between mb-5 mt-2">
                                <h2 className="text-sm font-bold text-foreground tracking-widest flex items-center gap-2">
                                    <Upload size={16} className="text-muted-foreground" /> Upload Images
                                </h2>
                                <Badge variant="secondary" className="text-[10px] font-medium px-2 py-0">Original</Badge>
                            </div>

                            <div className="relative w-full aspect-square rounded-[5px] overflow-hidden border border-border bg-muted/30 p-1.5 mb-5 group">
                                <img
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600"
                                    alt="Raw Asset"
                                    className="w-full h-full object-cover rounded-[5px] opacity-90 transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 border border-black/5 rounded-[5px] pointer-events-none" />
                            </div>

                            {/* Detailed Metadata */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <div className="flex items-center gap-2 bg-muted/20 border border-border/50 p-2 rounded-[5px]">
                                    <FileImage size={14} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-[9px] text-muted-foreground uppercase font-semibold">Format</p>
                                        <p className="text-[11px] text-foreground font-medium">JPEG Image</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-muted/20 border border-border/50 p-2 rounded-[5px]">
                                    <Maximize size={14} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-[9px] text-muted-foreground uppercase font-semibold">Resolution</p>
                                        <p className="text-[11px] text-foreground font-medium">1080 x 1080</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-muted/20 border border-border/50 p-2 rounded-[5px]">
                                    <HardDrive size={14} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-[9px] text-muted-foreground uppercase font-semibold">Size</p>
                                        <p className="text-[11px] text-foreground font-medium">2.4 MB</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 bg-muted/20 border border-border/50 p-2 rounded-[5px]">
                                    <Palette size={14} className="text-muted-foreground" />
                                    <div>
                                        <p className="text-[9px] text-muted-foreground uppercase font-semibold">Color</p>
                                        <p className="text-[11px] text-foreground font-medium">sRGB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Animated Down/Right Connector 1 */}
                        <div className="flex lg:items-center justify-center w-8 h-8 lg:w-16 lg:h-auto shrink-0 relative self-center rotate-90 lg:rotate-0">
                            <div className="w-full h-[2px] bg-border relative overflow-hidden rounded-full">
                                <div className="absolute top-0 left-0 h-full w-1/2 bg-primary animate-[slide_1.5s_linear_infinite]" />
                            </div>
                            <ArrowRight className="absolute text-primary bg-background px-1" size={20} />
                        </div>

                        {/* =========================================
                STAGE 2: AI MAGIC
            ========================================= */}
                        <div className="bg-card border border-border rounded-[5px] p-6 w-full lg:w-[320px] shrink-0 flex flex-col relative shadow-sm hover:shadow-md transition-shadow flex-1">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card border border-border text-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">2</div>

                            <div className="flex items-center justify-between mb-6 mt-2">
                                <h2 className="text-sm font-bold text-foreground tracking-widest flex items-center gap-2">
                                    <Cpu size={16} className="text-muted-foreground" /> Processing Engine
                                </h2>
                                <div className="flex gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse delay-75" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {/* Visual Node - Flow representation */}
                                <div className="relative w-full h-24 flex items-center justify-center gap-4 bg-muted/10 border border-border/50 rounded-[5px] overflow-hidden">
                                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-50" />

                                    {/* Node 1 */}
                                    <div className="relative">
                                        <div className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center shadow-md relative z-10">
                                            <Sparkles size={16} className="text-primary/70" />
                                        </div>
                                        <div className="absolute inset-0 w-10 h-10 border border-primary/30 rounded-full animate-ping opacity-50" />
                                    </div>

                                    {/* Flow line */}
                                    <div className="w-8 h-[2px] bg-border relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary/40 animate-[slide_1s_linear_infinite]" />
                                    </div>

                                    {/* Node 2 */}
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg relative z-10">
                                            <Sparkles size={20} className="text-primary animate-pulse" />
                                        </div>
                                        <div className="absolute inset-[-6px] w-[calc(100%+12px)] h-[calc(100%+12px)] border border-primary/20 rounded-full animate-[ping_3s_ease-in-out_infinite]" />
                                    </div>
                                </div>

                                {/* Processing Checklist */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 size={16} className="text-green-500" />
                                        <span className="text-[12px] text-muted-foreground font-medium">Subject Isolation & Analysis</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Loader2 size={16} className="text-primary animate-spin" />
                                        <span className="text-[12px] text-foreground font-semibold">Dynamic Prompt Generation</span>
                                    </div>
                                    <div className="flex items-center gap-3 opacity-40">
                                        <div className="w-4 h-4 rounded-full border-2 border-muted-foreground/50 ml-0.5" />
                                        <span className="text-[12px] text-muted-foreground font-medium ml-[-2px]">High-Fidelity Rendering</span>
                                    </div>
                                </div>

                                {/* Model Tags */}
                                <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Midjourney</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Sora</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Gemini</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Claude</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Nano Banana Pro</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Kling AI</Badge>
                                    <Badge variant="secondary" className="text-[9px] tracking-wider uppercase bg-muted/50 rounded-[3px] px-2">Google VEO</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Animated Down/Right Connector 2 */}
                        <div className="flex lg:items-center justify-center w-8 h-8 lg:w-16 lg:h-auto shrink-0 relative self-center rotate-90 lg:rotate-0">
                            <div className="w-full h-[2px] bg-border relative overflow-hidden rounded-full">
                                <div className="absolute top-0 left-0 h-full w-1/2 bg-primary animate-[slide_1.5s_linear_infinite]" />
                            </div>
                            <ArrowRight className="absolute text-primary bg-background px-1" size={20} />
                        </div>

                        {/* =========================================
                STAGE 3: OUTPUT
            ========================================= */}
                        <div className="bg-card border border-border rounded-[5px] p-6 w-full lg:w-[320px] shrink-0 flex flex-col relative shadow-sm hover:shadow-md transition-shadow flex-1">
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-card border border-border text-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                                <CheckCircle2 size={18} className="text-green-500" />
                            </div>

                            <div className="flex items-center justify-between mb-5 mt-2">
                                <h2 className="text-sm font-bold text-foreground tracking-widest flex items-center gap-2">
                                    <ImageIcon size={16} className="text-muted-foreground" /> Delivery
                                </h2>
                                <Badge variant="outline" className="text-[10px] text-green-600 dark:text-green-400 border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 px-2 py-0">Ready</Badge>
                            </div>

                            <div className="w-full flex flex-col gap-2 relative z-10">
                                {/* Main Image 1:1 */}
                                <div className="w-full aspect-square rounded-[5px] overflow-hidden relative group border border-border bg-muted/30">
                                    <img
                                        src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800"
                                        alt="Final Hero"
                                        className="w-full h-full object-cover rounded-[5px] transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 bg-background/90 backdrop-blur border border-border px-2 py-1 rounded text-[9px] font-bold flex items-center gap-1 text-foreground shadow-sm">
                                        4K HDR
                                    </div>
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="pt-5 flex items-center justify-between border-t border-border/50 mt-auto">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-muted-foreground uppercase font-semibold">Total Time</span>
                                    <span className="text-xs text-foreground font-bold">45 Seconds</span>
                                </div>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-[11px] font-bold hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-sm">
                                    <Download size={14} /> Download All
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <style>{`
          /* Smooth infinite sliding animation for the horizontal connector lines */
          @keyframes slide {
            0% { left: -50%; }
            100% { left: 100%; }
          }
          
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }
        `}</style>
            </div>
        </section>
    );
}
