import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Package } from 'lucide-react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Button } from '@/components/ui/button';
import { getCheckoutSession } from '../services/StripeService';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchSession = async () => {
      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const data = await getCheckoutSession(sessionId);
        setSessionData(data);
      } catch (error) {
        console.error('Failed to fetch session:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  return (
    <div className="bg-evrgrn-dark text-foreground min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center py-16">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-evrgrn-accent"></div>
              </div>
            ) : sessionData && sessionData.status === 'paid' ? (
              <>
                <div className="flex justify-center mb-6">
                  <CheckCircle className="h-20 w-20 text-green-500" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif mb-4">
                  Paiement réussi !
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Merci pour votre commande. Vous allez recevoir un email de confirmation à{' '}
                  <span className="text-evrgrn-accent">{sessionData.customerEmail}</span>
                </p>

                <div className="bg-evrgrn-muted border border-evrgrn-accent/20 rounded-lg p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Package className="h-8 w-8 text-evrgrn-accent mr-3" />
                    <h2 className="text-xl font-medium">Détails de la commande</h2>
                  </div>
                  
                  <div className="text-left space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Montant total:</span>
                      <span className="font-medium text-evrgrn-accent">
                        {sessionData.amountTotal?.toFixed(2)} {sessionData.currency?.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Statut:</span>
                      <span className="text-green-400">Payé</span>
                    </div>
                  </div>
                </div>

                <div className="bg-evrgrn-muted/50 border border-evrgrn-accent/10 rounded-lg p-6 mb-8">
                  <h3 className="font-medium mb-3">Prochaines étapes</h3>
                  <ul className="text-left space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">1.</span>
                      Vous recevrez un email de confirmation avec les détails de votre commande
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">2.</span>
                      Votre commande sera traitée et produite par Printful
                    </li>
                    <li className="flex items-start">
                      <span className="text-evrgrn-accent mr-2">3.</span>
                      Vous recevrez un numéro de suivi une fois l'expédition effectuée
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/shop">
                    <Button className="bg-evrgrn-accent text-black hover:bg-evrgrn-light">
                      Continuer mes achats
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" className="border-evrgrn-accent/20">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Retour à l'accueil
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <Package className="h-20 w-20 text-evrgrn-accent/30" />
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif mb-4">
                  Session de paiement introuvable
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8">
                  Nous n'avons pas pu retrouver votre session de paiement.
                </p>

                <Link to="/shop">
                  <Button className="bg-evrgrn-accent text-black hover:bg-evrgrn-light">
                    Retour à la boutique
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
