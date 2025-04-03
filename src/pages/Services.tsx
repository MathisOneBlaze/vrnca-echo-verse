
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ParticleBackground from '@/components/ui/ParticleBackground';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';
import GlitchText from '@/components/ui/GlitchText';

const Services = () => {
  // Les différents niveaux d'adhésion
  const subscriptionTiers = [
    {
      name: 'Argent',
      color: 'bg-gradient-to-br from-gray-300 to-gray-500',
      price: '9,99€',
      period: 'par mois',
      description: 'Accès de base aux ressources exclusives EVRGRN',
      features: [
        'Accès aux recherches',
        'Accès aux données statistiques',
        'Accès aux schémas',
        'Newsletters exclusives',
      ],
      popular: false,
      buttonText: 'Commencer',
    },
    {
      name: 'Or',
      color: 'bg-gradient-to-br from-yellow-300 to-amber-600',
      price: '19,99€',
      period: 'par mois',
      description: 'Pour les créateurs sérieux qui veulent développer leur art',
      features: [
        'Tout du niveau Argent',
        'Applications personnalisées',
        'Ressources exclusives',
        'Remises sur les produits',
        'Sessions de Q&R mensuelles',
      ],
      popular: true,
      buttonText: 'S\'abonner',
    },
    {
      name: 'Diamant',
      color: 'bg-gradient-to-br from-blue-300 to-purple-600',
      price: '49,99€',
      period: 'par mois',
      description: 'Relation directe et privilégiée avec Mathis OneBlaze',
      features: [
        'Tout du niveau Or',
        'Extraits de livre en avant-première',
        'Comptes rendus de conférences',
        'Consulting direct avec Mathis OneBlaze',
        'Accès au numéro de téléphone personnel',
        'Accompagnement personnalisé',
      ],
      popular: false,
      buttonText: 'Devenir Membre Premium',
    },
  ];

  // Services de consulting et formation
  const consultingServices = [
    {
      title: 'Consulting Production Musicale',
      description: 'Sessions de consulting personnalisées pour vos projets musicaux avec analyse détaillée et conseils techniques.',
      price: 'À partir de 150€',
      duration: 'Session de 2 heures',
      tags: ['Production', 'Mixage', 'Mastering'],
    },
    {
      title: 'Formation Théorie Musicale',
      description: 'Cours particuliers adaptés à votre niveau pour maîtriser les fondamentaux théoriques et les appliquer à votre musique.',
      price: 'À partir de 80€',
      duration: 'Session de 1 heure',
      tags: ['Théorie', 'Composition', 'Harmonie'],
    },
    {
      title: 'Stratégie Carrière Artistique',
      description: 'Accompagnement complet dans le développement de votre carrière artistique: positionnement, communication, business plan.',
      price: 'Sur devis',
      duration: 'Programme personnalisé',
      tags: ['Stratégie', 'Marketing', 'Développement'],
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
            <GlitchText intensity="medium">Services & Abonnements</GlitchText>
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
                  <Button className="w-full" variant={tier.popular ? "default" : "outline"}>
                    {tier.buttonText}
                  </Button>
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
                      <p className="text-lg font-bold">{service.price}</p>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <Button variant="outline" size="sm">En savoir plus</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-evrgrn-accent hover:bg-evrgrn-accent/80">
              Demander un devis personnalisé
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Chaque service peut être adapté à vos besoins spécifiques. Contactez-nous pour une évaluation personnalisée.
            </p>
          </div>
        </section>
        
        {/* Section FAQ */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-10 text-center">Questions fréquentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Comment choisir mon niveau d'adhésion ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Votre choix dépend de vos objectifs artistiques et professionnels. Le niveau Argent est idéal pour découvrir l'écosystème, Or pour les artistes engagés dans leur développement, et Diamant pour ceux qui souhaitent un accompagnement personnalisé direct avec Mathis OneBlaze.</p>
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
                <CardTitle className="text-xl">Comment se déroulent les sessions de consulting ?</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Les sessions se déroulent en visioconférence ou en présentiel selon les disponibilités. Vous recevrez un questionnaire préalable pour préparer la session et maximiser son efficacité. Un suivi post-session est également inclus.</p>
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
