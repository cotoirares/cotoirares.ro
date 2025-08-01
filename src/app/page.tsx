"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "~/trpc/react";

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Daria-Carmen Soos",
    gender: "female",
    institution: "Admisă la Facultatea de Matematică și Informatică - UBB Cluj-Napoca",
    specializare: "Informatică Română, buget",
    pregatitLa: "Informatică",
    year: "Anul școlar 2024-2025",
    quote: "Îți mulțumesc din suflet pentru tot ajutorul oferit pe parcursul acestui an. Am început prin a lua meditații pentru admiterea la Informatică, care m-au ajutat enorm, iar datorită acestui efort am reușit să intru la Facultatea de Matematică și Informatică UBB, la buget. De asemenea, la Bacalaureat, am obținut 9.20 la Informatică, fără prea mult efort, datorită pregătirii eficiente. Țin să îți mulțumesc și pentru sprijinul oferit la Matematică – am lucrat doar o lună și am reușit să cresc de la nota 7 la 9.50 ceea ce părea imposibil pentru mine înainte. Au contat enorm atât explicațiile clare, cât și încurajările tale, care m-au ajutat să prind mai multă încredere în mine. Pentru mine, ai fost singurul profesor pe care l-am avut vreodată și care m-a ajutat pe toate planurile. Îți mulțumesc încă o dată din inimă!"
  },
  {
    id: 2,
    name: "David Muzsi Catană",
    gender: "male",
    institution: "Admis la Facultatea de Matematică și Informatică - UBB Cluj-Napoca",
    specializare: "Matematică Informatică (dublă specializare), buget",
    pregatitLa: "Matematică",
    year: "Anul școlar 2024-2025",
    quote: "Rareș a fost mai mult decât un simplu meditator pentru mine ,a fost sprijinul care m-a făcut să iau 10 in Bac la mate și să intru la două facultăți la buget. Explică clar, are răbdare și reușește să facă matematica să pară logică. Îl recomand cu toată încrederea oricărui elev care vrea performanță în matematică!"
  },
  {
    id: 3,
    name: "Mihai P.",
    gender: "male",
    institution: "Admis la Facultatea de Matematică și Informatică - UBB Cluj-Napoca",
    specializare: "Ingineria Informației (în limba engleză), buget",
    pregatitLa: "Informatică",
    year: "Anul școlar 2024-2025",
    quote: "Am inceput orele cu Rares cam tarziu, chiar si asa, in 2 luni m a ajutat enorm de mult. Are un mod inedit de a preda, fiind mai tanar, ii intelege pe elevi mult mai bine si comunicarea este mai usoara, calm si rabdator, acestea il fac un profesor de nota 10. Mi ar fi placut mult totusi sa avem si cateva sedinte fizice. Dar oricum recomand cu multa incredere!"
  },
  {
    id: 4,
    name: "Vasile Sebastian Belașcu",
    gender: "male",
    institution: "Admis la Facultatea de Automatică și Calculatoare - Universitatea Tehnică din Cluj-Napoca",
    specializare: "Calculatoare și Tehnologia Informației, buget",
    pregatitLa: "Matematică",
    year: "Anul școlar 2023-2024",
    quote: "Rares m-a lăsat plăcut surprins prin dedidacarea și profesionalismul de care a dat dovadă. Este mult mai ușor să înveți matematică când știi ca ai în spate un profesor așa pasionat, care chiar se implică și pe care chiar îl interesează situaţia şi rezultatele tale la şcoală. Daca vreodată ați simțit nevoia ca aveţi nevoie de un om să fie tot timpul acolo să vă ajute și la care să-i puteți pune orice fel de întrebări, Rares este acel om. În urma interactiunii mele cu acesta, nu am dobandit doar cunostinte si siguranta in ceea ce fac, ci un lucru mult mai important, o relatie de prietenie."
  },
  {
    id: 5,
    name: "Ionuț Ardelean",
    gender: "male",
    institution: "Admis la Facultatea de Științe Economice și Gestiunea Afacerilor - UBB Cluj-Napoca",
    specializare: "Informatică Economică, buget",
    pregatitLa: "Matematică",
    year: "Anul școlar 2023-2024",
    quote: "A fost genial, Rares explica extraordinar de bine si pe intelesul tuturor. A reusit sa ma duca de la nota 4 la nota 8.1 in cateva luni de pregatire fara teme neterminabile, fara stres, a inteles ca matematica nu este una dintre materile din care dau admitere si s-a asigurat ca imi maximizeaza nota de la matematica. Recomand maxim, e cea mai buna alegere pentru pregatirea la matematica."
  }
];

// Floating Math Symbols Background Component
function FloatingMathSymbols() {
  const symbols = ['∑', '∫', 'π', '√', '∞', '∂', 'α', 'β', 'γ', 'δ', '≈', '≠', '≤', '≥', '±', '×', '÷', '²', '³', '∆'];
  const [symbolData, setSymbolData] = useState<Array<{
    symbol: string;
    left: number;
    top: number;
    fontSize: number;
    animationDelay: number;
    animationDuration: number;
  }>>([]);

  useEffect(() => {
    // Generate random positions only on client side to avoid hydration mismatch
    const data = symbols.map((symbol) => ({
      symbol,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fontSize: Math.random() * 40 + 20,
      animationDelay: Math.random() * 10,
      animationDuration: Math.random() * 20 + 10,
    }));
    setSymbolData(data);
  }, []);

  // Return empty div during SSR to prevent hydration mismatch
  if (symbolData.length === 0) {
    return <div className="absolute inset-0 overflow-hidden pointer-events-none"></div>;
  }
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {symbolData.map((data, index) => (
        <div
          key={index}
          className="absolute text-white/10 font-bold select-none"
          style={{
            left: `${data.left}%`,
            top: `${data.top}%`,
            fontSize: `${data.fontSize}px`,
            animationDelay: `${data.animationDelay}s`,
            animationDuration: `${data.animationDuration}s`,
          }}
        >
          <div className="animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
            {data.symbol}
          </div>
        </div>
      ))}
    </div>
  );
}

// Animated Statistics Component
function AnimatedStat({ number, suffix, label, delay }: { number: number; suffix: string; label: string; delay: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAnimated) {
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const counter = setInterval(() => {
          current += increment;
          if (current >= number) {
            setCount(number);
            clearInterval(counter);
          } else {
            setCount(Math.floor(current * 10) / 10);
          }
        }, 16);

        setHasAnimated(true);
        return () => clearInterval(counter);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [number, delay, hasAnimated]);

  return (
    <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-amber-400/30 transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="text-center">
        <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent mb-3">
          {count === number ? count : Math.floor(count)}{suffix}
        </div>
        <div className="text-gray-300 text-base lg:text-lg font-medium">{label}</div>
      </div>
    </div>
  );
}



// Testimonials Carousel Component
function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = TESTIMONIALS_DATA.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false); // Stop auto-play when user manually navigates
  };

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Resume auto-play after user interaction pause
  useEffect(() => {
    if (!isAutoPlaying) {
      const timeout = setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10 seconds
      return () => clearTimeout(timeout);
    }
  }, [isAutoPlaying]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden rounded-3xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 lg:p-10 mx-2">
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-amber-400 to-blue-400 p-1">
                      <img 
                        src={testimonial.gender === 'female' ? '/girl.jpg' : '/boy.jpg'}
                        alt={testimonial.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          // Fallback to initials if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerHTML = `
                            <div class="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                              <span class="text-2xl lg:text-3xl font-bold text-white">
                                ${testimonial.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          `;
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    {/* Name */}
                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-4">
                      {testimonial.name}
                    </h3>

                    {/* Institution - Full width for longer text */}
                    <div className="mb-4 space-y-3">
                      <div className="bg-gradient-to-r from-amber-400 to-yellow-300 text-black px-4 py-3 rounded-2xl font-semibold text-sm lg:text-base leading-relaxed">
                        {testimonial.institution}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-gradient-to-r from-blue-400 to-blue-300 text-black px-4 py-3 rounded-xl font-semibold text-sm text-center">
                          <div className="text-xs opacity-80 mb-1">Specializare:</div>
                          <div className="break-words hyphens-auto">{testimonial.specializare}</div>
                        </div>
                        <div className="bg-gradient-to-r from-green-400 to-green-300 text-black px-4 py-3 rounded-xl font-semibold text-sm text-center">
                          <div className="text-xs opacity-80 mb-1">Pregătit/ă la:</div>
                          <div className="break-words hyphens-auto">{testimonial.pregatitLa}</div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-400 to-purple-300 text-black px-4 py-3 rounded-xl font-semibold text-sm text-center">
                          <div className="text-xs opacity-80 mb-1">Anul școlar:</div>
                          <div className="break-words hyphens-auto">{testimonial.year.replace('Anul școlar ', '')}</div>
                        </div>
                      </div>
                    </div>

                    {/* Quote - Italic */}
                    <blockquote className="text-base lg:text-lg text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-full p-3 transition-all duration-200 z-10"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {TESTIMONIALS_DATA.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index
                ? 'bg-gradient-to-r from-amber-400 to-blue-400'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}


const EXAM_OPTIONS = [
  { value: "bac-mate-info", label: "Bacalaureat Matematică" },
  { value: "admitere", label: "Admitere la Facultate" },
  { value: "admitere-bac", label: "Bacalaureat + Admitere" },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  examType: "bac-mate-info" | "admitere" | "admitere-bac" | "";
  faculty: string;
  message: string;
  wantToTakeExam: boolean;
}

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    examType: "",
    faculty: "",
    message: "",
    wantToTakeExam: true,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const registerMutation = api.registration.register.useMutation({
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      console.log("Form data wantToTakeExam:", formData.wantToTakeExam);
      // Only redirect to exam if student wants to take it
      if (formData.wantToTakeExam) {
        console.log("Redirecting to exam page:", `/exam/${data.registrationId}`);
        router.push(`/exam/${data.registrationId}`);
      } else {
        // Show success message instead of redirecting
        console.log("Showing success message instead of redirecting");
        setIsSubmitted(true);
      }
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      alert("Registration failed: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    if (formData.examType === "") {
      console.log("No exam type selected");
      return; // This should be caught by HTML5 validation
    }
    console.log("Calling registerMutation.mutate");
    registerMutation.mutate({
      ...formData,
      examType: formData.examType as Exclude<typeof formData.examType, "">
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? (target as HTMLInputElement).checked : target.value;
    setFormData(prev => ({
      ...prev,
      [target.name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-blue-900/15 to-black"></div>
        <FloatingMathSymbols />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Column - Main Content */}
              <div className="text-center lg:text-left">
                {/* Logo */}
                <div className="mb-8 lg:mb-12">
                  <img 
                    src="/logo-zece-la-mate.png" 
                    alt="Zece la Mate Logo" 
                    className="mx-auto lg:mx-0 h-24 lg:h-32 w-auto mb-6 hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Animated Title */}
                <div className="mb-8">
                  <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                    <span className="block bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 bg-clip-text text-transparent animate-pulse">
                      Transformă
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                      Matematica
                    </span>
                    <span className="block bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                      în Pasiune
                    </span>
                  </h1>
                </div>

                <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
                  Pregătește-te alături de mine prin <span className="text-amber-400 font-semibold">metode moderne</span> de învățare, personalizate pentru <span className="text-amber-400 font-semibold">tine</span>.
                </p>

                                 {/* CTA Buttons */}
                 <div className="flex flex-col sm:flex-row gap-4">
                   <button 
                     onClick={() => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' })}
                     className="group bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-amber-500/25"
                   >
                     <span className="flex items-center justify-center">
                       Înscrie-te aici
                       <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                       </svg>
                     </span>
                   </button>
                   <button 
                     onClick={() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })}
                     className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
                   >
                     Vezi Detalii Sesiuni
                   </button>
                 </div>
              </div>

              {/* Right Column - Statistics */}
              <div className="flex flex-col items-center justify-center">
                
                {/* Animated Statistics */}
                <div className="w-full max-w-lg px-4 lg:px-0">
                  <div className="text-center mb-8">
                    <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent mb-2">
                      Rezultate mele
                    </h3>
                    <p className="text-gray-300 text-sm">Pregătesc elevi încă din 2023, iar rezultatele obținute sunt:</p>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    <AnimatedStat number={38} suffix="" label="Elevi Pregătiți" delay={0} />
                    <AnimatedStat number={100} suffix="%" label="Elevi admiși la prima opțiune de Facultate" delay={200} />
                    <AnimatedStat number={9.2} suffix="" label="Media generală a elevilor mei la Examenul de Bacalaureat (proba de Matematică)" delay={400} />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full animate-pulse mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
                         <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
               Despre Mine
             </h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
              <div className="text-lg lg:text-xl text-gray-300 space-y-6 leading-relaxed">
                <p>
                Am copilărit în Câmpia Turzii, unde am terminat Școala Gimnazială „Avram Iancu” ca șef de promoție și cu nota <span className="text-amber-400 font-semibold">10</span> la Matematică la Evaluarea Națională. Am urmat apoi cursurile Colegiului Național „Mihai Viteazul” Turda, specializare Mate-Info (intensiv Informatică), iar la Bacalaureat 2023 am obținut cea mai mare medie din zona Turda (<span className="text-amber-400 font-semibold">9.80</span>), cu nota <span className="text-amber-400 font-semibold">10</span> la Matematică M1. În prezent sunt student la Facultatea de Matematică și Informatică a UBB Cluj-Napoca, unde am fost admis cu media <span className="text-amber-400 font-semibold">10</span>. </p>
                <p>
                În liceu m-am implicat activ în proiecte sociale și în reprezentarea elevilor: am fost Președintele Consiliului Județean al Elevilor Cluj și Secretar executiv al Consiliului Național al Elevilor. Printre rezultatele care mă definesc se numără Premiul III la Olimpiada Județeană de Informatică (2021) și activitatea academică din prezent: cele două culegeri lansate pentru pregătirea admiterii la FMI UBB, participarea în comisiile științifice ale Olimpiadei Naționale de Informatică și a Concursului Național de Matematică și Informatică "Grigore Moisil" și problemele propuse pentru Olimpiada de Matematică. </p>
                <p>
                La 18 ani am ținut primul meu TED Talk, la TEDx Lunca Argeșului Youth 2023. Cred profund în egalitate și echitate, mai ales în educație, și asta se vede în modul în care lucrez cu elevii: clar, empatic și orientat spre progres real. Dacă vrei să te pregătești cu mine, vei găsi un mentor care îți respectă ritmul, dar te și provoacă să îți atingi potențialul.                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Session Details Section */}
      <section id="results" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
              Detalii despre ședințele de pregătire
            </h2>
            
            {/* Main Features Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              
              {/* Session Types */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">Pregătire individuală</h3>
                <div className="space-y-6">
                  <p className="text-gray-300 text-center mb-6">Pregătire personalizată 1:1, adaptată nevoilor tale și examenului pe care vrei să-l susții.</p>
                  
                  <div className="text-center space-y-4">        
                    <div className="bg-white/10 rounded-xl p-4">
                      <div className="text-sm text-gray-300">Toate sesiunile se desfășoară <span className="text-amber-400 font-semibold">individual</span>, <span className="text-amber-400 font-semibold">online</span> (pe platforma Discord/Google Meet) și <span className="text-amber-400 font-semibold">săptămânal</span>.</div>
                    </div>

                    <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 rounded-2xl p-6 border border-amber-400/30">
                      <div className="text-3xl font-bold text-amber-400 mb-2">Preț: 200 RON / ședință</div>
                      <div className="text-blue-400 font-semibold">Durata unei ședințe este de 1h30 (o oră și jumătate).</div>
                    </div>
                    <p className="text-gray-300 text-center mb-6">Pentru fiecare ședință achitată se oferă factura fiscală.</p>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Cum se desfășoară sesiunile?</h3>
                <div className="space-y-4">
                <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Recapitularea noțiunilor teoretice</h4>
                      <p className="text-gray-300 text-sm">Reluăm orice noțiuni teoretice pe care nu le stăpânești.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Materiale personalizate</h4>
                      <p className="text-gray-300 text-sm">Exerciții și teme de casă adaptate nivelului tău.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Suport între sesiuni</h4>
                      <p className="text-gray-300 text-sm">Răspuns la întrebări pe WhatsApp sau Discord între sesiuni.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Planificare flexibilă</h4>
                      <p className="text-gray-300 text-sm">Stabilim orarul sesiunilor în funcție de programul tău personal/orarul tău de la școală.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Simulări de examen recurente</h4>
                      <p className="text-gray-300 text-sm">Vom susține simulări de examen recurent, pentru a te familiariza cu subiectele și condițiile de examen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
              Experiența foștilor elevi
            </h2>
            <TestimonialsCarousel />
          </div>
        </div>
      </section>

      {/* Registration Section */}
        <section id="registration" className="py-20 bg-gradient-to-b from-gray-900 to-amber-900/10">
         <div className="container mx-auto px-4">
           <div className="max-w-4xl mx-auto">
             <h2 className="text-4xl lg:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-amber-400 to-blue-400 bg-clip-text text-transparent">
               Înscrie-te la Meditații <br/>Anul școlar 2025-2026
             </h2>

             {/* Test Information Box */}
             <div className="mb-12 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-3xl p-8 lg:p-10 border border-blue-400/20">
               <div className="text-center mb-8">
                 <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                   Evaluarea inițială a cunoștințelor
                 </h3>
                 <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-amber-400 mx-auto rounded-full"></div>
               </div>
               
               <div className="grid lg:grid-cols-2 gap-8 items-center">
                 <div className="space-y-6">
                   <div className="bg-white/5 rounded-2xl p-6">
                     <h4 className="text-xl font-bold text-amber-400 mb-4 flex items-center">
                       <span className="w-8 h-8 bg-amber-400/20 rounded-full flex items-center justify-center mr-3">
                         <span className="text-amber-400 font-bold">?</span>
                       </span>
                       Care-i faza?
                     </h4>
                     <p className="text-gray-300 leading-relaxed">
                       Platforma are integrat un examen personalizat care mă ajută să îți identific punctele forte și punctele slabe înainte de a începe pregătirea. Pe baza rezultatului, pot adapta punctul de început al pregătirilor.
                     </p>
                   </div>
                   
                   <div className="bg-white/5 rounded-2xl p-6">
                     <h4 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                       <span className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center mr-3">
                         <span className="text-blue-400 font-bold">!</span>
                       </span>
                       Este obligatoriu?
                     </h4>
                     <p className="text-gray-300 leading-relaxed">
                       <span className="text-amber-400 font-semibold">Nu, testul este opțional</span>, dar este recomandat să îl susții:). Acesta mă ajută să înțeleg mai bine nivelul tău și să îți ofer o pregătire cât mai eficientă de la prima sesiune.
                     </p>
                   </div>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-6 border border-green-400/30">
                     <h4 className="text-xl font-bold text-green-400 mb-4 text-center">Detalii tehnice</h4>
                     <div className="space-y-4">
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 rounded-xl gap-2">
                         <span className="text-gray-300 font-medium">Durata:</span>
                         <span className="text-white font-bold">1 oră (60 de minute)</span>
                       </div>
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 rounded-xl gap-2">
                         <span className="text-gray-300 font-medium">Numărul de probleme:</span>
                         <span className="text-white font-bold">4 probleme</span>
                       </div>
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 rounded-xl gap-2">
                         <span className="text-gray-300 font-medium">Dificultate:</span>
                         <span className="text-white font-bold">Medie</span>
                       </div>
                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-white/10 rounded-xl gap-2">
                         <span className="text-gray-300 font-medium">Format:</span>
                         <span className="text-white font-bold break-words sm:text-right">Online, chiar după completarea formularului de înscriere de mai jos</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
            
            {isSubmitted ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-400/20 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-green-400 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-green-400 mb-4">Înregistrare Reușită!</h3>
                <p className="text-gray-300">
                  Formularul tău a fost trimis cu succes. Vei fi contactat în curând cu detaliile pentru planificarea sesiunilor de pregătire.
                </p>
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                  <p className="text-blue-300 text-sm">
                    📧 Am trimis datele tale prin email cu mențiunea că nu ai susținut testul de evaluare acum.
                  </p>
                </div>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-semibold transition-colors"
                >
                  Înregistrează alt student
                </button>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Prenume *</label>
                                             <input
                         type="text"
                         name="firstName"
                         value={formData.firstName}
                         onChange={handleInputChange}
                         required
                         className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors"
                         placeholder="Introduceți prenumele"
                       />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Nume *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="Introduceți numele"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="exemplu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Telefon *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="0722 123 456"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Vreau să mă pregătesc pentru:</label>
                                             <select
                         name="examType"
                         value={formData.examType}
                         onChange={handleInputChange}
                         required
                         className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-amber-400 focus:outline-none transition-colors"
                       >
                        <option value="" className="bg-gray-900">Selectează opțiunea potrivită</option>
                        {EXAM_OPTIONS.map(option => (
                          <option key={option.value} value={option.value} className="bg-gray-900">
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2 font-medium">Dacă ai ales Admitere, pentru ce Facultate vrei să te pregătești?</label>
                      <input
                        type="text"
                        name="faculty"
                        value={formData.faculty}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none transition-colors"
                        placeholder="ex: Facultatea de Matematică și Informatică, Facultatea de Medicină, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2 font-medium">Mesaj suplimentar</label>
                                         <textarea
                       name="message"
                       value={formData.message}
                       onChange={handleInputChange}
                       rows={4}
                       className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-amber-400 focus:outline-none transition-colors resize-none"
                       placeholder="Menționează orice informații suplimentare sau întrebări..."
                     />
                  </div>

                  {/* Exam Choice Checkbox */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="wantToTakeExam"
                        name="wantToTakeExam"
                        checked={formData.wantToTakeExam}
                        onChange={handleInputChange}
                        className="mt-1 w-5 h-5 text-amber-500 bg-white/10 border-white/30 rounded focus:ring-amber-400 focus:ring-2"
                      />
                      <div className="flex-1">
                        <label htmlFor="wantToTakeExam" className="block text-white font-medium mb-2 cursor-pointer">
                          Vreau să susțin testul de evaluare acum
                        </label>
                        <p className="text-gray-300 text-sm leading-relaxed">
                          Bifează această opțiune dacă vrei să susții testul de evaluare imediat după înregistrare. 
                          Dacă nu bifezi, formularul va fi trimis direct prin email și vei fi contactat pentru planificarea sesiunilor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={registerMutation.isPending}
                                         className="w-full bg-gradient-to-r from-amber-500 to-blue-600 hover:from-amber-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                  >
                    {registerMutation.isPending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Se procesează...
                      </span>
                    ) : (
                      "Înregistrează-te Acum"
                    )}
                  </button>
                </form>

                {registerMutation.error && (
                  <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400">
                    Eroare la înregistrare. Te rugăm să încerci din nou.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-400">
            <p className="mb-4">© 2025 Rareș Cotoi. Toate drepturile rezervate.</p>
            <p className="text-sm">
              <Link href="/termeni-conditii" className="text-blue-400 hover:text-blue-300 transition-colors">
                Termeni și condiții
              </Link>
              {" | "}
              <Link href="/politica-confidentialitate" className="text-blue-400 hover:text-blue-300 transition-colors">
                Politică de confidențialitate
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
