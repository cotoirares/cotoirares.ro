"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "~/trpc/react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;
  
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isExamStarted, setIsExamStarted] = useState(false);
  const [isExamFinished, setIsExamFinished] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const EXAM_PDF_URL = "/exam-subject.pdf";
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const submitExamMutation = api.registration.submitExam.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      setIsUploading(false);
    },
    onError: () => {
      setIsUploading(false);
      alert("Eroare la trimiterea soluției. Te rugăm să încerci din nou.");
    },
  });

  useEffect(() => {
    setIsExamStarted(true);
  }, []);

  useEffect(() => {
    if (!isExamStarted || isExamFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExamFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isExamStarted, isExamFinished]);

  const handleSubmitExam = useCallback(async () => {
    if (!selectedFile && !isExamFinished) {
      const confirmSubmit = confirm('Nu ai încărcat nicio soluție. Ești sigur că vrei să trimiți examenul gol?');
      if (!confirmSubmit) return;
    }

    setIsUploading(true);
    
    try {
      let fileData = null;
      if (selectedFile) {
        const reader = new FileReader();
        fileData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(selectedFile);
        });
      }

      await submitExamMutation.mutateAsync({
        registrationId,
        solutionFile: fileData as string | null,
        fileName: selectedFile?.name ?? null,
        timeSpent: 3600 - timeLeft,
      });
    } catch (error) {
      console.error('Error submitting exam:', error);
    }
  }, [registrationId, selectedFile, isExamFinished, timeLeft, submitExamMutation]);

  useEffect(() => {
    if (isExamFinished && !isSubmitted) {
      void handleSubmitExam();
    }
  }, [isExamFinished, isSubmitted, handleSubmitExam]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Te rugăm să încarci doar fișiere PDF.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Fișierul este prea mare. Dimensiunea maximă este 10MB.');
        return;
      }
      setSelectedFile(file);
    }
  };

  const getTimerColor = () => {
    if (timeLeft > 1800) return 'text-green-400'; // > 30 min
    if (timeLeft > 600) return 'text-yellow-400';  // > 10 min
    return 'text-red-400'; // < 10 min
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-400/20 rounded-full flex items-center justify-center">
            <div className="w-10 h-10 bg-green-400 rounded-full"></div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Examen Trimis cu Succes!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
                              Soluția ta a fost trimisă pentru evaluare. Vei fi contactat în cel mai scurt timp.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors"
          >
            Înapoi la Pagina Principală
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header with Timer */}
      <header className="py-4 bg-gradient-to-r from-amber-900/20 to-blue-900/20 border-b border-amber-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Zece la Mate - Examen în Desfășurare
            </h1>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">Timp rămas</div>
                <div className={`text-2xl font-bold ${getTimerColor()}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
              {!isExamFinished && (
                <button
                  onClick={handleSubmitExam}
                  disabled={isUploading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  {isUploading ? 'Se trimite...' : 'Trimite Examenul'}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* PDF Viewer Section */}
        <div className="flex-1 bg-gray-900">
          <div className="h-full p-4">
            <div className="bg-white rounded-lg h-full">
              <iframe
                src={EXAM_PDF_URL}
                className="w-full h-full rounded-lg"
                title="Subiect Examen"
              />
            </div>
          </div>
        </div>

        {/* Solution Upload Section */}
        <div className="w-96 bg-gray-950 border-l border-gray-700 p-6">
          <h3 className="text-xl font-bold text-amber-400 mb-6">Încarcă Soluția</h3>
          
          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-gray-300 mb-3 font-medium">
                Fișier PDF cu soluția:
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isExamFinished}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedFile ? selectedFile.name : 'Selectează fișierul PDF'}
              </button>
              <p className="text-xs text-gray-400 mt-2">
                Format: PDF, Dimensiune max: 10MB
              </p>
            </div>

            {/* File Info */}
            {selectedFile && (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">📄</span>
                  <div>
                    <div className="text-white font-medium">{selectedFile.name}</div>
                    <div className="text-green-400 text-sm">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h4 className="text-blue-400 font-semibold mb-2">Instrucțiuni:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Scanează sau fotografiază soluția</li>
                <li>• Convertește în PDF</li>
                <li>• Asigură-te că este lizibil</li>
                <li>• Verifică că toate paginile sunt incluse</li>
              </ul>
            </div>

            {/* Time Warning */}
            {timeLeft < 600 && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                <div className="flex items-center space-x-2">
                  <span className="text-red-400">⚠️</span>
                  <div className="text-red-400 font-semibold">
                    Mai ai doar {Math.floor(timeLeft / 60)} minute!
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time Up Modal */}
      {isExamFinished && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-red-500/30 rounded-3xl p-8 max-w-md mx-4 text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Timpul s-a terminat!</h2>
            <p className="text-gray-300 mb-6">
              Examenul se va trimite automat cu soluția încărcată.
            </p>
            <div className="text-amber-400">Se trimite...</div>
          </div>
        </div>
      )}
    </div>
  );
} 