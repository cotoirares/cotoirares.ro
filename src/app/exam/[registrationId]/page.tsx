"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ExamDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const registrationId = params.registrationId as string;
  const [isStarting, setIsStarting] = useState(false);

  const handleBeginExam = () => {
    setIsStarting(true);
    // Redirect to the actual exam page
    router.push(`/exam/${registrationId}/start`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 bg-gradient-to-r from-amber-900/20 to-blue-900/20 border-b border-amber-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Zece la Mate - Examen Evaluare
            </h1>
            <div className="text-sm text-gray-400">
              ID Înregistrare: {registrationId}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Bine ai venit la evaluarea inițială!
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              Înainte de a începe examenul, te rog să citești cu atenție instrucțiunile de mai jos.
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-amber-500/20 mb-12">
            <h3 className="text-2xl font-bold text-amber-400 mb-6">Instrucțiuni pentru examen:</h3>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">1</div>
                <p>Examenul are o durată de <strong className="text-white">60 de minute</strong> (1 oră) din momentul în care apeși "Începe Examenul".</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">2</div>
                <p>Vei avea acces la subiectul de examen în format PDF direct în platformă.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">3</div>
                <p>La finalul examenului, va trebui să încarci soluția ta în format PDF. Poți folosi aplicația CamScanner pentru a scana foile direct de pe telefon.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">4</div>
                <p>Cronometrul nu poate fi oprit sau resetat odată pornit.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">5</div>
                <p>Asigură-te că ai o conexiune stabilă la internet pe toată durata examenului.</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">6</div>
                                        <p>Soluția ta va fi trimisă automat pentru evaluare.</p>
              </div>
            </div>
          </div>

          {/* Technical Requirements */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-blue-500/20 mb-12">
            <h3 className="text-2xl font-bold text-blue-400 mb-6">Cerințe tehnice:</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-white mb-2">Browser recomandat:</h4>
                <p>Chrome, Firefox, Safari (versiuni recente)</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Format soluție:</h4>
                <p>PDF (maximum 10MB)</p>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Conexiune internet:</h4>
                <p>Stabilă pe toată durata examenului</p>
              </div>
            </div>
          </div>

          {/* Begin Exam Button */}
          <div className="text-center">
            <button
              onClick={handleBeginExam}
              disabled={isStarting}
              className="bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl font-bold text-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-2xl"
            >
              {isStarting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Se încarcă examenul...
                </span>
              ) : (
                "Începe Examenul"
              )}
            </button>
            <p className="text-gray-400 mt-4 text-sm">
              Odată apăsat, cronometrul va porni automat și nu poate fi oprit!
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>© 2025 Rares Cotoi. Mult succes la examen!</p>
        </div>
      </footer>
    </div>
  );
} 