
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import GlitchText from '@/components/ui/GlitchText';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Cette fonction sera remplacée par l'authentification Supabase
    toast({
      title: "Fonctionnalité en cours de développement",
      description: "L'authentification sera bientôt disponible via Supabase.",
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Cette fonction sera remplacée par l'enregistrement Supabase
    toast({
      title: "Fonctionnalité en cours de développement",
      description: "L'enregistrement sera bientôt disponible via Supabase.",
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
              <GlitchText intensity="low">Espace Personnel</GlitchText>
            </CardTitle>
            <CardDescription>
              Accédez à votre compte pour profiter des avantages de l'écosystème EVRGRN
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="votre@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a 
                        href="#" 
                        className="text-xs text-evrgrn-accent hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          toast({
                            title: "Réinitialisation du mot de passe",
                            description: "Cette fonctionnalité sera disponible prochainement.",
                          });
                        }}
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Se connecter
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input id="firstName" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input id="lastName" required />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email</Label>
                    <Input id="registerEmail" type="email" placeholder="votre@email.com" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Mot de passe</Label>
                    <Input id="registerPassword" type="password" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input id="confirmPassword" type="password" required />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Créer un compte
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-evrgrn-accent/10">
            <div className="text-center w-full text-sm text-muted-foreground">
              ou continuer avec
            </div>
            
            <div className="grid grid-cols-2 gap-4 w-full">
              <Button variant="outline" onClick={() => toast({
                title: "Connexion Google",
                description: "Cette fonctionnalité sera disponible prochainement."
              })}>
                Google
              </Button>
              
              <Button variant="outline" onClick={() => toast({
                title: "Connexion Facebook",
                description: "Cette fonctionnalité sera disponible prochainement."
              })}>
                Facebook
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
