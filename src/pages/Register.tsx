
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import GlitchText from '@/components/ui/GlitchText';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Cette fonction sera remplacée par l'authentification Supabase
    toast({
      title: "Fonctionnalité en cours de développement",
      description: "L'inscription sera bientôt disponible via Supabase.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 flex items-center justify-center px-4">
        <Card className="w-full max-w-md border border-evrgrn-accent/20 bg-background/80 backdrop-blur">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">
              <GlitchText intensity="low">Créer un compte</GlitchText>
            </CardTitle>
            <CardDescription>
              Rejoignez l'écosystème EVRGRN pour accéder à du contenu exclusif
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Votre nom" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="votre@email.com" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input id="password" type="password" required />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  J'accepte les{" "}
                  <a href="/mentions-legales" className="text-evrgrn-accent hover:underline">
                    conditions d'utilisation
                  </a>{" "}
                  et la{" "}
                  <a href="/confidentialite" className="text-evrgrn-accent hover:underline">
                    politique de confidentialité
                  </a>
                </label>
              </div>
              
              <Button type="submit" className="w-full">
                S'inscrire
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-evrgrn-accent/10">
            <div className="text-center w-full text-sm text-muted-foreground">
              ou s'inscrire avec
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full">
              <Button variant="outline" onClick={() => toast({
                title: "Inscription Google",
                description: "Cette fonctionnalité sera disponible prochainement."
              })}>
                Google
              </Button>
              
              <Button variant="outline" onClick={() => toast({
                title: "Inscription Facebook",
                description: "Cette fonctionnalité sera disponible prochainement."
              })}>
                Facebook
              </Button>
              
              <Button variant="outline" onClick={() => toast({
                title: "Inscription Twitter",
                description: "Cette fonctionnalité sera disponible prochainement."
              })}>
                Twitter
              </Button>
            </div>
            
            <div className="text-center pt-4 text-sm">
              Vous avez déjà un compte?{" "}
              <a className="text-evrgrn-accent hover:underline cursor-pointer" onClick={() => navigate('/login')}>
                Se connecter
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
