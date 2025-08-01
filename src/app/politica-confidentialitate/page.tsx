"use client";

import Link from "next/link";

export default function PoliticaConfidentialitate() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-blue-900/15 to-black"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8">
              <Link href="/">
                <img 
                  src="/logo-zece-la-mate.png" 
                  alt="Zece la Mate Logo" 
                  className="mx-auto h-16 w-auto mb-6 hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Politică de Confidențialitate
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Ultimă actualizare: 1 August 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
              <div className="prose prose-invert prose-lg max-w-none">
                
                <h2 className="text-2xl font-bold text-amber-400 mb-6">1. Introducere</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                Bine ați venit pe site-ul "cotoirares.ro" care este deținut și operat de "RARES'S DIGITAL SOLUTIONS S.R.L.", companie identificata prin CUI: 48873530 și EUID: ROONRC.J12/4143/2023, avand sediul în Câmpia Turzii, strada Aurel Vlaicu nr. 43, 405100, jud. Cluj.
                Noi ne angajăm să protejăm confidențialitatea datelor dumneavoastră personale și să respectăm legislația în vigoare privind protecția datelor.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">2. Informații despre colectare</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                Informațiile personale colectate de pe site sunt:
                </p>
                <ul className="text-gray-300 mb-8 space-y-2">
                  <li>• Nume și prenume</li>
                  <li>• Adresa de email</li>
                  <li>• Număr de telefon</li>
                  <li>• Informații despre facultatea dorită (opțional)</li>
                  <li>• Cookie-uri: Utilizăm cookie-uri și tehnologii similare pentru a îmbunătăți experiența dumneavoastră pe site. Puteți controla setările cookie-urilor în browserul dumneavoastră.</li>
                </ul>
                <p className="text-gray-300 mb-8 leading-relaxed">
                Toate informațiile sunt colectate prin intermediul formularului de înscriere.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">3. Scopul colectării datelor</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Colectăm datele personale numai în scopul furnizării serviciilor de pregătire educațională.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">4. Partajarea Datelor</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                Nu vindem, nu închiriem și nu dezvăluim datele dumneavoastră personale altor terțe părți, cu excepția cazurilor în care este necesar pentru furnizarea serviciilor sau în conformitate cu legile aplicabile.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">5. Securitatea datelor</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                Luăm măsuri tehnice și organizatorice adecvate pentru a proteja datele dumneavoastră personale împotriva accesului neautorizat sau a pierderii.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">6. Drepturile dumneavoastră</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                Aveți dreptul să solicitați acces la datele dumneavoastră personale, să le corectați, să le ștergeți sau să le restricționați prelucrarea. Puteți face acest lucru prin intermediul contului dvs. sau contactându-ne.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">7. Politica privind copiii</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                Site-ul nostru nu este destinat copiilor cu vârsta sub 18 ani. Nu colectăm intenționat informații de la copii.</p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">8. Actualizări la Politica de Confidențialitate</h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                Această politică de confidențialitate poate fi actualizată periodic. Orice modificări semnificative vor fi aduse la cunoștința dvs. prin intermediul site-ului sau prin e-mail.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">9.Contact</h2>
                <p className="text-gray-300 leading-relaxed">
                  Pentru orice întrebări sau clarificări legate de prelucrarea datelor cu caracter personal, vă rugăm să ne contactați la rares@cotoirares.ro.
                </p>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">
            <Link href="/" className="text-amber-400 hover:text-amber-300 transition-colors">
              ← Înapoi la pagina principală
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 