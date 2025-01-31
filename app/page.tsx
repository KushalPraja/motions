'use client';

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/ui/color-picker";
import Canvas from "@/components/canvas";


export default function DrawingApp() {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [panelVisible, setPanelVisible] = useState(false); // To control panel visibility
  const canvasRef = useRef<any>(null);

  const clearCanvas = () => {
    canvasRef.current?.clearCanvas();
  };

  return (
    <div className="relative w-full h-full">
      {/* Full-screen Canvas */}
      <Canvas ref={canvasRef} color={color} brushSize={brushSize} />

      {/* Floating Settings Panel */}
      <div
        className={`absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1 p-4 bg-white shadow-lg z-10 rounded-lg transition-all duration-300 ease-in-out ${panelVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ width: "300px" }}
      >
        <div className="space-y-4">
          <ColorPicker value={color} onChange={setColor} />
          <div className="w-48">
            <Slider
              min={1}
              max={20}
              step={1}
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
            />
          </div>
          <Button onClick={clearCanvas}>Clear</Button>
        </div>
      </div>
      
      {/* Toggle Button to Show/Hide the Settings Panel */}
      <div
        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gray-800 text-white rounded-full flex justify-center items-center z-20 cursor-pointer"
        onClick={() => setPanelVisible(!panelVisible)}
      >
        {panelVisible ? "△" : "▽"} 
        
      </div>
    </div>
  );
}
