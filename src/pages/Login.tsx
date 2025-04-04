
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
import { Facebook, Twitter, UserCheck } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

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

  const handleSocialAuth = (provider: string) => {
    // Cette fonction sera remplacée par l'authentification sociale Supabase
    toast({
      title: `Connexion via ${provider}`,
      description: "L'authentification sociale sera bientôt disponible via Supabase.",
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
                <div className="text-center py-2">
                  <p>Pour créer un compte complet, veuillez utiliser la page d'inscription</p>
                  <Button className="mt-4" onClick={() => navigate('/register')}>
                    <UserCheck className="mr-2 h-4 w-4" />
                    Créer un compte
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-4 border-t border-evrgrn-accent/10">
            <div className="text-center w-full text-sm text-muted-foreground">
              ou continuer avec
            </div>
            
            <div className="grid grid-cols-3 gap-4 w-full">
              <Button 
                variant="outline" 
                className="flex items-center justify-center"
                onClick={() => handleSocialAuth('Google')}
              >
                <FaGoogle className="mr-2 h-4 w-4" />
                Google
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center justify-center" 
                onClick={() => handleSocialAuth('Facebook')}
              >
                <Facebook className="mr-2 h-4 w-4" />
                Facebook
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center justify-center" 
                onClick={() => handleSocialAuth('Twitter')}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
            
            <div className="text-center pt-4 text-sm">
              Pas encore de compte ?{" "}
              <a className="text-evrgrn-accent hover:underline cursor-pointer" onClick={() => navigate('/register')}>
                S'inscrire
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
