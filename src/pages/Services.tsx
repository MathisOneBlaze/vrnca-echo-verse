
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Services = () => {
  const { toast } = useToast();
  
  // Les différents niveaux d'adhésion selon la nouvelle nomenclature
  const subscriptionTiers = [
    {
      name: 'Ceinture Blanche',
      color: 'bg-gradient-to-br from-gray-100 to-gray-300',
      price: 'Gratuit',
      period: '',
      description: 'Accès gratuit dès la création de votre compte',
      features: [
        'Accès anticipé aux ventes exclusives',
        'Accès au catalogue complet',
        'Accès aux séances de dédicaces',
        'Pop-up shops et événements',
      ],
      popular: false,
      buttonText: 'S\'inscrire gratuitement',
      buttonLink: '/register'
    },
    {
      name: 'Ceinture Verte',
      color: 'bg-gradient-to-br from-green-400 to-green-700',
      price: '19,99€',
      period: 'par mois',
      description: 'Pour les créateurs sérieux qui veulent développer leur art',
      features: [
        'Tout de la Ceinture Blanche',
        'Accès à toutes les recherches',
        'Articles et vidéos complètes',
        'Assets (PDF, schémas, sources)',
        'Tarifs préférentiels pour masterclass',
        'Remises sur les achats shop',
      ],
      popular: true,
      buttonText: 'S\'abonner',
      buttonLink: '/register'
    },
    {
      name: 'Ceinture Noire',
      color: 'bg-gradient-to-br from-gray-800 to-black',
      price: 'Sur devis',
      period: '',
      description: 'Conseil personnalisé et accompagnement VIP',
      features: [
        'Tout de la Ceinture Verte',
        'Accès aux applications exclusives',
        'Pass VIP gratuits pour les événements',
        'Conseil personnalisé',
        'Coaching sur mesure',
        'Accompagnement de carrière',
      ],
      popular: false,
      buttonText: 'Demander un devis',
      buttonAction: () => toast({
        title: "Demande de devis",
        description: "Le formulaire de demande sera disponible prochainement."
      })
    },
  ];

  // Services de consulting
  const consultingServices = [
    {
      title: 'Consulting Production Musicale',
      description: 'Sessions de consulting personnalisées pour vos projets musicaux avec analyse détaillée et conseils techniques.',
      tags: ['Production', 'Mixage', 'Mastering'],
      level: 'Ceinture Noire'
    },
    {
      title: 'Formation Théorie Musicale',
      description: 'Cours particuliers adaptés à votre niveau pour maîtriser les fondamentaux théoriques et les appliquer à votre musique.',
      tags: ['Théorie', 'Composition', 'Harmonie'],
      level: 'Ceinture Noire'
    },
    {
      title: 'Stratégie Carrière Artistique',
      description: 'Accompagnement complet dans le développement de votre carrière artistique: positionnement, communication, business plan.',
      tags: ['Stratégie', 'Marketing', 'Développement'],
      level: 'Ceinture Noire'
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* En-tête de page */}
        <section className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <GlitchText intensity="medium">Niveaux d'Adhésion</GlitchText>
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-8">
            Rejoignez l'écosystème EVRGRN et accédez à des ressources exclusives, du mentorat personnalisé
            et un accompagnement sur mesure pour votre développement artistique.
          </p>
        </section>

        {/* Section abonnements */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-10 text-center">Niveaux d'Adhésion</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionTiers.map((tier, index) => (
              <Card key={index} className={`relative overflow-hidden border border-evrgrn-accent/20 ${tier.popular ? 'ring-2 ring-evrgrn-accent shadow-lg transform md:scale-105' : ''}`}>
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-evrgrn-accent text-white text-xs font-bold px-3 py-1 rounded-bl">
                    POPULAIRE
                  </div>
                )}
                
                <CardHeader className={`${tier.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                    {tier.popular && <Star className="h-5 w-5 fill-white" />}
                  </div>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-sm opacity-80 ml-1">{tier.period}</span>
                  </div>
                  <CardDescription className="text-white/90 mt-2">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="mt-6">
                  <ul className="space-y-3">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Check className="h-5 w-5 text-evrgrn-accent mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  {tier.buttonLink ? (
                    <Button className="w-full" variant={tier.popular ? "default" : "outline"} asChild>
                      <Link to={tier.buttonLink}>{tier.buttonText}</Link>
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      variant={tier.popular ? "default" : "outline"}
                      onClick={tier.buttonAction}
                    >
                      {tier.buttonText}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Section services consulting */}
        <section className="container mx-auto px-4 py-16 bg-evrgrn-darker/30 rounded-lg my-12">
          <h2 className="text-3xl font-bold mb-10 text-center">Services de Consulting</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {consultingServices.map((service, index) => (
              <Card key={index} className="bg-background/80 backdrop-blur border border-evrgrn-accent/20">
                <CardHeader>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="bg-evrgrn-accent/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div>
                      <p className="text-sm text-muted-foreground">Disponible pour:</p>
                      <Badge variant="outline" className="mt-1 bg-gray-800 text-white">
                        {service.level}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast({
                      title: "Demande de devis",
                      description: "Le formulaire de demande sera disponible prochainement."
                    })}>
                      Sur devis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-evrgrn-accent hover:bg-evrgrn-accent/80" onClick={() => toast({
              title: "Demande de devis personnalisé",
              description: "Le formulaire de demande sera disponible prochainement."
            })}>
              Demander un devis personnalisé
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Tous nos services de consulting sont disponibles sur devis. Contactez-nous pour une évaluation personnalisée.
            </p>
          </div>
        </section>
        
        {/* Section FAQ */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-10 text-center">Questions fréquentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comment fonctionnent les niveaux d'adhésion ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Chaque niveau d'adhésion vous donne accès à des avantages spécifiques. La Ceinture Blanche est gratuite et s'obtient dès la création d'un compte. La Ceinture Verte offre des avantages premium avec un abonnement mensuel. La Ceinture Noire propose un accompagnement personnalisé avec des services sur devis.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Puis-je changer de niveau d'adhésion ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Oui, vous pouvez passer à un niveau supérieur ou inférieur à tout moment. Les changements prendront effet à votre prochaine période de facturation.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comment se déroulent les services de consulting ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Les services de consulting de la Ceinture Noire sont personnalisés et adaptés à vos besoins spécifiques. Après votre demande de devis, nous vous contacterons pour définir précisément vos objectifs et vous proposer un accompagnement sur mesure.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
