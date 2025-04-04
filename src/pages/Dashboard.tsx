
import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Calendar, CreditCard, Download, Music, Settings, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import GlitchText from '@/components/ui/GlitchText';
import { Link } from 'react-router-dom';

// Cet exemple de Dashboard sera connecté à Supabase plus tard
const Dashboard = () => {
  const { toast } = useToast();
  const [membershipLevel, setMembershipLevel] = useState('blanche'); // blanche, verte, noire

  // Données factices pour le tableau de bord
  const userData = {
    name: 'Alex Dupont',
    email: 'alex.dupont@example.com',
    avatar: '/placeholder.svg',
    memberSince: '10 mars 2023',
    membership: {
      level: membershipLevel,
      nextPayment: membershipLevel === 'blanche' ? '-' : '15 juillet 2023',
      price: membershipLevel === 'blanche' ? 'Gratuit' : 
             membershipLevel === 'verte' ? '19,99€/mois' : 'Sur devis'
    }
  };
  
  const resources = [
    { id: 1, title: 'Guide de production - Introduction', type: 'PDF', size: '2.3 MB', date: '12/05/2023', access: ['blanche', 'verte', 'noire'] },
    { id: 2, title: 'Templates Ableton Live - Pack 1', type: 'ZIP', size: '156 MB', date: '28/04/2023', access: ['verte', 'noire'] },
    { id: 3, title: 'Masterclass Mixage Vocals', type: 'VIDEO', size: '1.2 GB', date: '05/06/2023', access: ['verte', 'noire'] },
    { id: 4, title: 'Consultation privée - Réservation', type: 'BOOKING', date: '10/07/2023', access: ['noire'] },
    { id: 5, title: 'Analyse de projet personnalisée', type: 'SERVICE', date: 'Sur demande', access: ['noire'] },
  ];

  // Événements exclusifs pour les membres
  const memberEvents = [
    { 
      id: 1, 
      title: 'Masterclass Production Musicale', 
      date: '15/07/2023', 
      time: '18:00', 
      location: 'En ligne',
      access: ['verte', 'noire'],
      hasTicket: membershipLevel === 'noire'
    },
    { 
      id: 2, 
      title: 'Pop-up Shop EVRGRN', 
      date: '22/07/2023', 
      time: '14:00 - 20:00', 
      location: 'Paris',
      access: ['blanche', 'verte', 'noire'],
      hasTicket: false
    },
  ];

  // Fonctions d'interaction
  const handleUpgradeClick = () => {
    toast({
      title: "Amélioration d'abonnement",
      description: "Cette fonctionnalité sera disponible après l'intégration de Supabase."
    });
  };

  const handleDownloadResource = (resource: any) => {
    if (resource.access.includes(membershipLevel)) {
      toast({
        title: "Téléchargement démarré",
        description: `Le ${resource.type} "${resource.title}" sera bientôt disponible.`
      });
    } else {
      toast({
        title: "Accès restreint",
        description: "Veuillez passer à un abonnement supérieur pour accéder à cette ressource.",
        variant: "destructive"
      });
    }
  };

  const handleEventAction = (event: any) => {
    if (event.hasTicket) {
      toast({
        title: "Pass VIP activé",
        description: "Votre réservation a été confirmée."
      });
    } else if (event.access.includes(membershipLevel)) {
      toast({
        title: "Réservation en cours",
        description: "La réservation sera disponible prochainement."
      });
    } else {
      toast({
        title: "Accès restreint",
        description: "Ce contenu est réservé aux membres premium.",
        variant: "destructive"
      });
    }
  };

  // Simuler un changement de niveau d'adhésion pour la démo
  const changeMembershipLevel = (level: string) => {
    setMembershipLevel(level);
    toast({
      title: `Niveau d'adhésion modifié`,
      description: `Vous simulez maintenant le niveau Ceinture ${level.charAt(0).toUpperCase() + level.slice(1)}`
    });
  };

  // Fonction pour obtenir le nom complet du niveau
  const getMembershipName = (level: string) => {
    switch(level) {
      case 'blanche': return 'Ceinture Blanche';
      case 'verte': return 'Ceinture Verte';
      case 'noire': return 'Ceinture Noire';
      default: return level;
    }
  };

  // Fonction pour obtenir la couleur du badge selon le niveau
  const getMembershipColor = (level: string) => {
    switch(level) {
      case 'blanche': return 'bg-gray-300';
      case 'verte': return 'bg-green-600';
      case 'noire': return 'bg-black';
      default: return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold"><GlitchText intensity="low">Espace Personnel</GlitchText></h1>
            <p className="text-muted-foreground">Bienvenue dans votre espace membre EVRGRN</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm font-medium">Simuler le niveau:</p>
              <div className="flex space-x-2 mt-1">
                <Button 
                  variant={membershipLevel === 'blanche' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeMembershipLevel('blanche')}
                >
                  Blanche
                </Button>
                <Button 
                  variant={membershipLevel === 'verte' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeMembershipLevel('verte')}
                >
                  Verte
                </Button>
                <Button 
                  variant={membershipLevel === 'noire' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => changeMembershipLevel('noire')}
                >
                  Noire
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar du profil */}
          <div className="lg:col-span-1">
            <Card className="border border-evrgrn-accent/20">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{userData.name}</CardTitle>
                  <CardDescription>{userData.email}</CardDescription>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Badge 
                          className={`${getMembershipColor(membershipLevel)} text-white`}
                        >
                          {getMembershipName(membershipLevel)}
                        </Badge>
                        <span className="ml-2 text-sm text-muted-foreground">Niveau d'adhésion</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleUpgradeClick}
                        disabled={membershipLevel === 'noire'}
                      >
                        Améliorer
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      <p>Membre depuis: {userData.memberSince}</p>
                      {membershipLevel !== 'blanche' && (
                        <p>Prochain paiement: {userData.membership.nextPayment}</p>
                      )}
                      <p>Montant: {userData.membership.price}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Progrès du niveau</p>
                    <Progress 
                      value={membershipLevel === 'blanche' ? 30 : 
                            membershipLevel === 'verte' ? 60 : 100} 
                      className="h-2" 
                    />
                    <p className="text-xs text-muted-foreground text-right">
                      {membershipLevel === 'blanche' ? '3/10' : 
                       membershipLevel === 'verte' ? '6/10' : '10/10'} ressources consultées
                    </p>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Abonnement</span>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Paramètres</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Section principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Résumé */}
            <Card className="border border-evrgrn-accent/20">
              <CardHeader>
                <CardTitle>Résumé</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-evrgrn-darker/30 rounded-md p-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Ressources disponibles</p>
                    <p className="text-3xl font-bold mt-1">
                      {membershipLevel === 'blanche' ? '4' : 
                       membershipLevel === 'verte' ? '15' : '32'}
                    </p>
                  </div>
                  
                  <div className="bg-evrgrn-darker/30 rounded-md p-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Événements à venir</p>
                    <p className="text-3xl font-bold mt-1">
                      {memberEvents.filter(e => e.access.includes(membershipLevel)).length}
                    </p>
                  </div>
                  
                  <div className="bg-evrgrn-darker/30 rounded-md p-4 text-center">
                    <p className="text-sm font-medium text-muted-foreground">Avantages exclusifs</p>
                    <p className="text-3xl font-bold mt-1">
                      {membershipLevel === 'blanche' ? '3' : 
                       membershipLevel === 'verte' ? '8' : '12'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contenu principal avec onglets */}
            <Card className="border border-evrgrn-accent/20">
              <CardHeader>
                <CardTitle>Contenu exclusif</CardTitle>
                <CardDescription>
                  Accès à toutes vos ressources exclusives selon votre niveau d'adhésion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="resources">
                  <TabsList className="mb-4">
                    <TabsTrigger value="resources">Ressources</TabsTrigger>
                    <TabsTrigger value="events">Événements</TabsTrigger>
                    <TabsTrigger value="projects">Mes projets</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="resources">
                    <div className="space-y-4">
                      {resources.map((resource) => (
                        <div 
                          key={resource.id}
                          className={`flex items-center justify-between p-3 rounded-md border ${
                            resource.access.includes(membershipLevel) 
                              ? 'border-evrgrn-accent/20' 
                              : 'border-gray-700 opacity-50'
                          }`}
                        >
                          <div className="flex items-center">
                            {resource.type === 'PDF' && (
                              <div className="w-10 h-10 flex items-center justify-center bg-red-500/20 rounded-md text-red-500 mr-3">
                                PDF
                              </div>
                            )}
                            {resource.type === 'ZIP' && (
                              <div className="w-10 h-10 flex items-center justify-center bg-yellow-500/20 rounded-md text-yellow-500 mr-3">
                                ZIP
                              </div>
                            )}
                            {resource.type === 'VIDEO' && (
                              <div className="w-10 h-10 flex items-center justify-center bg-blue-500/20 rounded-md text-blue-500 mr-3">
                                <Music className="h-6 w-6" />
                              </div>
                            )}
                            {(resource.type === 'BOOKING' || resource.type === 'SERVICE') && (
                              <div className="w-10 h-10 flex items-center justify-center bg-purple-500/20 rounded-md text-purple-500 mr-3">
                                <Calendar className="h-6 w-6" />
                              </div>
                            )}
                            
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {resource.size && <span>{resource.size} • </span>}
                                <span>Ajouté le {resource.date}</span>
                              </p>
                            </div>
                          </div>
                          
                          <Button 
                            variant={resource.access.includes(membershipLevel) ? "outline" : "ghost"}
                            size="sm"
                            disabled={!resource.access.includes(membershipLevel)}
                            onClick={() => handleDownloadResource(resource)}
                          >
                            {resource.type === 'BOOKING' || resource.type === 'SERVICE' ? (
                              'Réserver'
                            ) : (
                              <>
                                <Download className="h-4 w-4 mr-1" />
                                Télécharger
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                      
                      {!resources.some(r => r.access.includes(membershipLevel)) && (
                        <div className="text-center p-6">
                          <p className="text-muted-foreground">
                            Améliorez votre abonnement pour accéder aux ressources exclusives
                          </p>
                          <Button onClick={handleUpgradeClick} className="mt-4">
                            Améliorer mon adhésion
                          </Button>
                        </div>
                      )}
                      
                      {membershipLevel !== 'noire' && (
                        <div className="mt-6 p-4 bg-evrgrn-darker/30 rounded-md">
                          <p className="text-sm mb-2">Débloquez plus de contenu avec un abonnement supérieur</p>
                          <Button size="sm" onClick={handleUpgradeClick}>
                            Voir les options d'abonnement
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="events">
                    {memberEvents.length > 0 ? (
                      <div className="space-y-4">
                        {memberEvents.map(event => (
                          <div 
                            key={event.id}
                            className={`p-4 rounded-md border ${
                              event.access.includes(membershipLevel) 
                                ? 'border-evrgrn-accent/20' 
                                : 'border-gray-700 opacity-50'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {event.date} à {event.time}
                                </p>
                                <p className="text-sm">
                                  Lieu: {event.location}
                                </p>
                              </div>
                              <div>
                                {event.hasTicket ? (
                                  <Badge className="bg-green-600 text-white">Pass VIP</Badge>
                                ) : event.access.includes(membershipLevel) ? (
                                  <Badge variant="outline">Accès autorisé</Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-800/50">Accès restreint</Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="mt-4 flex justify-end">
                              <Button 
                                size="sm" 
                                variant={event.access.includes(membershipLevel) ? "outline" : "ghost"}
                                disabled={!event.access.includes(membershipLevel)}
                                onClick={() => handleEventAction(event)}
                              >
                                {event.hasTicket ? 'Voir mon pass' : 'Réserver'}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-evrgrn-darker/30 rounded-md p-6 text-center">
                        <p className="text-lg font-medium mb-2">Aucun événement à venir</p>
                        <p className="text-muted-foreground mb-4">
                          Les prochains événements seront affichés ici dès qu'ils seront disponibles
                        </p>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="projects">
                    <div className="bg-evrgrn-darker/30 rounded-md p-6 text-center">
                      <p className="text-lg font-medium mb-2">Vous n'avez pas encore de projet</p>
                      <p className="text-muted-foreground mb-4">
                        Créez votre premier projet musical pour recevoir des retours personnalisés
                      </p>
                      <Button>Créer un projet</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            {/* Appel à l'action pour les fonctionnalités premium */}
            {membershipLevel === 'blanche' && (
              <Card className="border border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/10">
                <CardHeader>
                  <CardTitle>Passez à la Ceinture Verte</CardTitle>
                  <CardDescription>
                    Débloquez l'accès à toutes les recherches, articles, vidéos complètes et bien plus
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Ressources exclusives</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Tarifs préférentiels</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Articles et vidéos complètes</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span className="text-sm">Remises sur le shop</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <Link to="/services">
                        Passer à la Ceinture Verte
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
