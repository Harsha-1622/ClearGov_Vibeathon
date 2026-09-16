import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  FileCheck2,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HardDrive,
} from 'lucide-react';
import { EvidenceItem } from '../types';

interface UploadModalProps {
  item: EvidenceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (evidenceId: string, fileName?: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  item,
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen || !item) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleSimulatedSubmit = () => {
    const finalName =
      selectedFileName ||
      (item.requirementKey === 'income'
        ? 'Tahsildar_Income_Certificate_2026.pdf'
        : `${item.name.replace(/\s+/g, '_')}_Verified.pdf`);

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onUploadSuccess(item.id, finalName);
      setSelectedFileName('');
      onClose();
    }, 700);
  };

  const quickSamples = [
    'Tahsildar_Revenue_Income_Certificate_2026.pdf',
    'Certified_Annual_Income_Statement.pdf',
    'Official_State_Revenue_Affidavit.pdf',
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="simulated-upload-modal"
        className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block">
              Simulated Intake Gateway
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Upload Supporting Evidence
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="my-5 space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
            <span className="font-semibold text-slate-900 block">Target Requirement:</span>
            <span>
              {item.name} • {item.linkedRequirement}
            </span>
          </div>

          {/* Drag & Drop or Browse Box */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-blue-500 bg-blue-50/50'
                : selectedFileName
                ? 'border-emerald-400 bg-emerald-50/30'
                : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileSelect}
            />

            {selectedFileName ? (
              <div className="flex flex-col items-center justify-center">
                <FileCheck2 className="w-10 h-10 text-emerald-600 mb-2" />
                <span className="text-sm font-bold text-slate-900">{selectedFileName}</span>
                <span className="text-xs text-slate-500 mt-1">Ready for optical intake</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-10 h-10 text-slate-400 mb-2" />
                <span className="text-sm font-bold text-slate-800">
                  Click to select file or drag & drop
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  Supported formats: PDF, PNG, JPG (Simulated Intake)
                </span>
              </div>
            )}
          </div>

          {/* Quick-select presets for fast hackathon demo testing */}
          <div>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
              Or quick-select verified sample document:
            </span>
            <div className="space-y-1.5">
              {quickSamples.map((sample, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedFileName(sample)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors flex items-center justify-between ${
                    selectedFileName === sample
                      ? 'bg-blue-50 border-blue-300 text-blue-900 font-semibold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono truncate">{sample}</span>
                  <span className="text-[10px] text-slate-400">PDF • Verified Sample</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-slate-600 hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            id="btn-confirm-upload-evidence"
            type="button"
            disabled={isProcessing}
            onClick={handleSimulatedSubmit}
            className="inline-flex items-center gap-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing Extraction...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Upload & Extract Evidence</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
