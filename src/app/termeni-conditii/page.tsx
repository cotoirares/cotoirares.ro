"use client";

import Link from "next/link";
import Image from "next/image";

export default function TermeniConditii() {
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
                <Image 
                  src="/logo-zece-la-mate.png" 
                  alt="Zece la Mate Logo" 
                  width={64}
                  height={64}
                  className="mx-auto h-16 w-auto mb-6 hover:scale-110 transition-transform duration-300"
                />
              </Link>
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Termeni și Condiții
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
                <p className="text-gray-300 mb-6 leading-relaxed">
                Bine ați venit pe site-ul &ldquo;cotoirares.ro&rdquo; care este deținut și operat de &ldquo;RARES&rsquo;S DIGITAL SOLUTIONS S.R.L.&rdquo;, companie identificata prin CUI: 48873530 și EUID: ROONRC.J12/4143/2023, avand sediul în Câmpia Turzii, strada Aurel Vlaicu nr. 43, 405100, jud. Cluj.
                Accesând și utilizând acest site, sunteți de acord cu acești Termeni și Condiții și vă asumați responsabilitatea de a-i respecta.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">2. Activitatea</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Website-ul &ldquo;cotoirares.ro&rdquo; este un site de prezentare a serviciilor educaționale oferite de Rareș Cotoi. Acest site nu este un site de vânzare a serviciilor, ci un site de prezentare a serviciilor oferite. În urma ocupării unui loc la sesiunile de pregătire, termenii și condițiile de desfășurare a acestora sunt stabilite în mod direct între Rareș Cotoi și elevul în cauză.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">3. Confidențialitatea</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Prin completarea formularului de înscriere și transmiterea de date personale, elevul își exprimă acordul pentru tratarea acestora în conformitate cu prevederile legale în vigoare. Informațiile dumneavoastră personale sunt supuse Politicii noastre de Confidențialitate, care este disponibilă pe site.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">4. Legislație aplicabilă</h2>
                <p className="text-gray-300 mb-8 leading-relaxed">
                 Termeni și Condițiile de utilizare a site-ului &ldquo;cotoirares.ro&rdquo; sunt guvernați de legile statului Român.
                </p>

                <h2 className="text-2xl font-bold text-amber-400 mb-6">5.Contact</h2>
                <p className="text-gray-300 leading-relaxed">
                  Pentru orice întrebări sau clarificări legate de prezenții termeni și condiții, vă rugăm să ne contactați la rares@cotoirares.ro.
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