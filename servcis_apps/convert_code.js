import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function CanvasCodeConverter() {
  const [uiLang, setUiLang] = useState("ar");
  const [inputLines, setInputLines] = useState([""]);
  const [outputLines, setOutputLines] = useState([""]);
  const [inputLang, setInputLang] = useState("");
  const [outputLang, setOutputLang] = useState("");
  const inputRefs = useRef([]);

  const getInputCode = () => {
    return inputLines.join("\n");
  };

  const setInputCode = (code) => {
    const lines = code.split("\n");
    setInputLines(lines);
  };

  const handleConversion = () => {
    const inputCode = getInputCode();
    const converted = inputCode.split("").reverse().join("");
    setOutputLines(converted.split("\n"));
  };

  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const handleLineChange = (lineIndex, value) => {
    const newLines = [...inputLines];
    newLines[lineIndex] = value;
    setInputLines(newLines);
  };

  const focusLine = (lineIndex) => {
    if (inputRefs.current[lineIndex]) {
      inputRefs.current[lineIndex].focus();
    }
  };

  const handleLineKeyDown = (lineIndex, e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newLines = [...inputLines];
      newLines.splice(lineIndex + 1, 0, "");
      setInputLines(newLines);
      setTimeout(() => {
        focusLine(lineIndex + 1);
      }, 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (lineIndex > 0) {
        focusLine(lineIndex - 1);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (lineIndex < inputLines.length - 1) {
        focusLine(lineIndex + 1);
      }
    } else if ((e.key === "Backspace" || e.key === "Delete") && inputLines[lineIndex].length === 0) {
      e.preventDefault();
      if (lineIndex > 0) {
        const newLines = [...inputLines];
        newLines.splice(lineIndex, 1);
        setInputLines(newLines);
        setTimeout(() => {
          focusLine(lineIndex - 1);
        }, 0);
      }
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, inputLines.length);
  }, [inputLines]);

  return (
    <div
      dir={uiLang === "ar" ? "rtl" : "ltr"}
      className="bg-gradient-to-r from-gray-50 to-blue-100 min-h-screen grid place-items-center p-6 relative"
    >
      <Button
        className="absolute top-6 left-6 rounded-full p-3 shadow-md"
        variant="outline"
        onClick={goBack}
      >
        <ArrowLeft className="w-5 h-5" />
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-2xl rounded-2xl border border-gray-300">
          <CardContent className="p-6">
            <div className="relative mb-4">
              <h1 className="text-3xl font-bold text-center">
                {uiLang === "ar" ? "محول الكود Canvas" : "Canvas Code Converter"}
              </h1>
              <select
                className="absolute top-0 right-0 mt-2 mr-2 text-xs p-1 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-400 cursor-pointer hover:brightness-98 transition-all"
                value={uiLang}
                onChange={(e) => setUiLang(e.target.value)}
                style={{ minWidth: "4rem" }}
              >
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>

            <label className="block mb-2 font-medium" htmlFor="inputLang">
              {uiLang === "ar" ? "اختر لغة الإدخال" : "Select Input Language"}
            </label>
            <select
              id="inputLang"
              className="w-full mb-4 p-1 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:brightness-98 transition-all"
              value={inputLang}
              onChange={(e) => setInputLang(e.target.value)}
              style={{ minWidth: "4rem" }}
            >
              <option value="">
                {uiLang === "ar" ? "-- اختر لغة --" : "-- Choose Language --"}
              </option>
              <option value="JavaScript">JavaScript</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </select>
            <label className="block mb-2 font-medium">
              {uiLang === "ar" ? "الكود المراد تحويله" : "Input Code"}
            </label>
            <div
              className="mb-4 rounded-2xl bg-white font-mono text-sm p-2 border border-gray-300 shadow-sm"
              style={{ minHeight: "160px" }}
            >
              {inputLines.map((line, index) => {
                const hideLineNumber = index === 0 && line.trim() === "";
                return (
                  <div
                    key={index}
                    className="flex items-start mb-1 leading-5"
                    style={{ direction: "ltr", textAlign: "left" }}
                  >
                    <div
                      className="text-gray-500 pointer-events-none select-none text-left pr-2"
                      style={{ minWidth: "2rem", visibility: hideLineNumber ? "hidden" : "visible" }}
                    >
                      {index + 1}
                    </div>
                    <input
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      value={line}
                      onChange={(e) => handleLineChange(index, e.target.value)}
                      onKeyDown={(e) => handleLineKeyDown(index, e)}
                      placeholder={index === 0 && line.trim() === "" ? "Enter code here" : ""}
                    />
                  </div>
                );
              })}
            </div>
            <label className="block mb-2 font-medium" htmlFor="outputLang">
              {uiLang === "ar" ? "اختر لغة الإخراج" : "Select Output Language"}
            </label>
            <select
              id="outputLang"
              className="w-full mb-4 p-1 rounded-2xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer hover:brightness-98 transition-all"
              value={outputLang}
              onChange={(e) => setOutputLang(e.target.value)}
              style={{ minWidth: "4rem" }}
            >
              <option value="">
                {uiLang === "ar" ? "-- اختر لغة --" : "-- Choose Language --"}
              </option>
              <option value="JavaScript">JavaScript</option>
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
            </select>
            <div className="flex justify-start mb-4">
              <Button
                onClick={handleConversion}
                className="rounded-full h-12 w-12 shadow-md flex items-center justify-center"
              >
                <RefreshCw className="w-5 h-5" />
              </Button>
            </div>

            <label className="block mb-2 font-medium">
              {uiLang === "ar" ? "الناتج" : "Output"}
            </label>
            <div
              className="rounded-2xl bg-white font-mono text-sm p-2 border border-gray-300 shadow-sm"
              style={{ minHeight: "160px" }}
            >
              {outputLines.map((line, index) => {
                const hideLineNumber = index === 0 && line.trim() === "";
                return (
                  <div
                    key={index}
                    className="flex items-start mb-1 leading-5"
                    style={{ direction: "ltr", textAlign: "left" }}
                  >
                    <div
                      className="text-gray-500 pointer-events-none select-none text-left pr-2"
                      style={{ minWidth: "2rem", visibility: hideLineNumber ? "hidden" : "visible" }}
                    >
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      className="w-full bg-transparent focus:outline-none resize-none"
                      readOnly
                      value={line}
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
