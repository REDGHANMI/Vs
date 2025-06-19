
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('admin@medma.ma');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin@medma.ma' && password === '1AQWxsz2') {
      onLogin();
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Login Form */}
      <div className="flex-1 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Console Décisionnelle
            </h1>
            <div className="flex items-center space-x-2 mb-6">
              <span className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MEDMA
              </span>
            </div>

            {/* MEDMA Logos - Repositioned */}
            <div className="flex items-center justify-start space-x-4 mb-8">
              <img 
                src="https://i.ibb.co/0jdyg7D9/medma-energy.png" 
                alt="MEDMA Energy" 
                className="h-10 object-contain"
              />
              <img 
                src="https://i.ibb.co/DfmL9Fdd/medma-gestion.png" 
                alt="MEDMA Gestion" 
                className="h-10 object-contain"
              />
              <img 
                src="https://i.ibb.co/Q7Pm83WF/WIFAK-3.jpg" 
                alt="WIFAK" 
                className="h-10 object-contain"
              />
            </div>

            {/* Professional Features List */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 font-medium">Suivi indicateurs clés multi-stations</p>
                  <p className="text-slate-500 text-sm">Monitoring en temps réel de vos performances</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 font-medium">Tableaux de bord dynamiques & analytiques</p>
                  <p className="text-slate-500 text-sm">Visualisation avancée de vos données métier</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-700 font-medium">Cloud GED centralisé</p>
                  <p className="text-slate-500 text-sm">Gestion documentaire intelligente et sécurisée</p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Adresse e-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Mot de passe
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Accéder à la console
              </Button>
            </form>

            {/* SAP Business One Logo - Repositioned */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 mb-3">Propulsé par</p>
              <img 
                src="https://sharpthinkit.com/wp-content/uploads/2023/09/SAP-Business-One-Cloud-01-edited.png" 
                alt="SAP Business One" 
                className="h-12 mx-auto object-contain"
              />
            </div>
          </div>

          {/* Footer with MEDYDATA - Repositioned */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
              <span>Développé par</span>
              <img 
                src="https://media.licdn.com/dms/image/v2/C4D0BAQHtmzLMJWHKSQ/company-logo_200_200/company-logo_200_200/0/1631358906244/medydata_logo?e=2147483647&v=beta&t=FMPqc09oHyWKjY2tca7xfwXBNgBcRuXcxUyRLw1gPZU" 
                alt="MEDYDATA" 
                className="h-6 object-contain"
              />
              <span className="font-semibold">MEDYDATA</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-900/20 z-10"></div>
        <img 
          src="https://images.pexels.com/photos/30067367/pexels-photo-30067367.jpeg?cs=srgb&dl=pexels-orbital101studio-30067367.jpg&fm=jpg"
          alt="Modern Business"
          className="w-full h-full object-cover"
        />
        
        {/* Overlay Content */}
        <div className="absolute inset-0 z-20 flex items-end justify-start p-12">
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-2">Excellence Opérationnelle</h2>
            <p className="text-lg text-white/90">
              Optimisez vos performances avec notre solution intégrée
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
