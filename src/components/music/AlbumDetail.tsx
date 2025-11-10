
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Music, ChevronLeft, ChevronRight } from 'lucide-react';
import { Album } from '@/data/albumData';

// Helper function to parse credits into structured table data
const parseCreditsToTable = (credits: string | undefined) => {
  if (!credits) return [];
  
  const rows: { role: string; artists: string; tracks: string }[] = [];
  
  // Split by main sections
  const sections = credits.split(/(?=Production:|Featuring:|Musiciens:|Choristes:|Enregistré)/g);
  
  sections.forEach(section => {
    if (!section.trim()) return;
    
    // Extract role
    const roleMatch = section.match(/^([^:]+):/);
    if (!roleMatch) return;
    
    const role = roleMatch[1].trim();
    const content = section.substring(roleMatch[0].length).trim();
    
    // Try to split by track mentions (pattern: "Name (Track)")
    const trackPattern = /([^(,]+)\s*\(([^)]+)\)/g;
    let match;
    const entries: { artist: string; track: string }[] = [];
    
    while ((match = trackPattern.exec(content)) !== null) {
      entries.push({
        artist: match[1].trim(),
        track: match[2].trim()
      });
    }
    
    if (entries.length > 0) {
      // Has track details
      entries.forEach(entry => {
        rows.push({
          role,
          artists: entry.artist,
          tracks: entry.track
        });
      });
    } else {
      // No track details, just list artists
      rows.push({
        role,
        artists: content.replace(/\.$/, '').trim(),
        tracks: '—'
      });
    }
  });
  
  return rows;
};

// Parse credits into flexible sections (tables or text)
type CreditSection = {
  title: string;
  type: 'table' | 'text';
  content: string | { role: string; artists: string; tracks: string }[];
};

const parseCreditsToSections = (credits?: string, visualCredits?: string): CreditSection[] | null => {
  if (!credits && !visualCredits) return null;
  
  const sections: CreditSection[] = [];
  
  if (credits) {
    // Check if credits look structured (contains "Production:", "Featuring:", etc.)
    const isStructured = /Production:|Featuring:|Musiciens:|Choristes:/i.test(credits);
    
    if (isStructured) {
      // Parse into separate table sections
      const sectionMatches = credits.split(/(?=Production:|Featuring:|Musiciens:|Choristes:|Enregistré)/g);
      
      sectionMatches.forEach(section => {
        if (!section.trim()) return;
        
        const roleMatch = section.match(/^([^:]+):/);
        if (!roleMatch) return;
        
        const role = roleMatch[1].trim();
        const content = section.substring(roleMatch[0].length).trim();
        
        // Try to parse tracks
        const trackPattern = /([^(,]+)\s*\(([^)]+)\)/g;
        let match;
        const entries: { role: string; artists: string; tracks: string }[] = [];
        
        while ((match = trackPattern.exec(content)) !== null) {
          entries.push({
            role,
            artists: match[1].trim(),
            tracks: match[2].trim()
          });
        }
        
        if (entries.length > 0) {
          sections.push({
            title: role,
            type: 'table',
            content: entries
          });
        } else {
          sections.push({
            title: role,
            type: 'text',
            content: content.replace(/\.$/, '').trim()
          });
        }
      });
    } else {
      // Unstructured credits - display as text
      sections.push({
        title: 'Crédits',
        type: 'text',
        content: credits
      });
    }
  }
  
  // Add visual credits section
  if (visualCredits) {
    sections.push({
      title: 'Artwork & Design',
      type: 'text',
      content: visualCredits
    });
  }
  
  return sections.length > 0 ? sections : null;
};

// Helper to bold names in text
const boldNames = (text: string) => {
  const knownNames = [
    'Mathis OneBlaze', 'OneBlaze', 'CiD On The Track', 'CiD', 'Sedjro Wesker', 
    'Usle Belmondo', 'Hey Bony', 'Buzzy B', 'B-MAC', 'Cyril D\'Alexis',
    'STA2F', 'Spacedtime', 'ThatBoySlim97', 'RayDaPrince', 'JoBlowYourMind',
    'HsvQue', 'Oliv\'yah', 'Jao Kynx', 'DNGZ', 'TheBeatPlug', 'TazTaylor',
    'LeTrom Beats', 'itsFuckingTrack', 'AlienBeats', 'Tommy Beats',
    'Sadix Music', 'Darknown', 'Chapo', 'Timbaland', 'Swizz Beats',
    'Dirty-One', 'Nemesis', 'Raizen', 'Ti-Raizen', 'NDX', 'JKay', 'Ema',
    'Neville Pelletier', 'Passi Fresh', 'Reevside', 'Tommy On The Track',
    'EMS', 'Kizzy', 'Carbone', 'Mystère', 'Jeremy Nanette', 'YONN',
    'Edwin Noël', 'RZM', 'Laure A'
  ];
  
  knownNames.sort((a, b) => b.length - a.length);
  
  let result = text;
  knownNames.forEach(name => {
    const regex = new RegExp(`\\b(${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'g');
    result = result.replace(regex, '<strong class="text-evrgrn-accent">$1</strong>');
  });
  
  return result;
};

// Helper to split description into paragraphs
const formatDescription = (description: string) => {
  const sentences = description.split(/(?<=[.!?])\s+(?=[A-Z])/);
  const paragraphs: string[] = [];
  let currentParagraph = '';
  
  sentences.forEach((sentence, index) => {
    currentParagraph += sentence + ' ';
    
    if (
      (index + 1) % 3 === 0 || 
      sentence.includes('De ') ||
      sentence.includes('L\'album ') ||
      sentence.includes('Ces ') ||
      sentence.includes('Chaque ') ||
      index === sentences.length - 1
    ) {
      paragraphs.push(currentParagraph.trim());
      currentParagraph = '';
    }
  });
  
  if (currentParagraph) {
    paragraphs.push(currentParagraph.trim());
  }
  
  return paragraphs.length > 0 ? paragraphs : [description];
};

const AlbumDetail: React.FC<Album> = ({
  id,
  title,
  year,
  month,
  collaborators,
  image = "/placeholder.svg",
  additionalImages = [],
  isUnreleased = false,
  spotifyLink,
  format,
  description = "Description non disponible pour le moment.",
  credits,
  visualConcept,
  visualCredits,
  musicCharacteristics = {
    calmDancing: 50,
    engagedSilly: 30,
    realityFiction: 70
  }
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const allImages = [image, ...additionalImages].filter(img => 
    img && img !== "/placeholder.svg"
  );
  
  const encodedImages = allImages.map(img => encodeURI(img));
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };
  
  const descriptionParagraphs = formatDescription(description);
  const creditRows = parseCreditsToTable(credits);
  const creditSections = parseCreditsToSections(credits, visualCredits);
  const visualConceptParagraphs = visualConcept ? formatDescription(visualConcept) : [];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero Image Slider */}
      <div className="relative w-full aspect-square max-h-[600px] bg-black rounded-lg overflow-hidden mb-8 border border-evrgrn-accent/20">
        {encodedImages.length > 0 ? (
          <>
            <img
              src={encodedImages[currentImageIndex]}
              alt={title}
              className="w-full h-full object-contain"
            />
            
            {allImages.length > 1 && (
              <>
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm" 
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm" 
                    onClick={handleNextImage}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </div>
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {allImages.map((_, index) => (
                    <button 
                      key={index} 
                      className={`h-2 w-2 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-evrgrn-accent w-8' 
                          : 'bg-white/50 hover:bg-white/80'
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      aria-label={`Image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Image non disponible</p>
          </div>
        )}
        
        {isUnreleased && (
          <div className="absolute top-4 left-4 bg-evrgrn-accent/90 text-black text-sm font-bold py-2 px-6 rounded-full">
            À VENIR
          </div>
        )}
      </div>

      {/* Header Info */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-4">{title}</h1>
        <p className="text-2xl text-evrgrn-accent mb-3">
          {year}{month && `.${month}`}
        </p>
        
        {collaborators && (
          <p className="text-lg text-muted-foreground mb-2">
            En collaboration avec <strong className="text-foreground">{collaborators}</strong>
          </p>
        )}

        {format && (
          <p className="text-base font-medium text-evrgrn-accent/80 mb-6">
            {format}
          </p>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          {!isUnreleased ? (
            <>
              {spotifyLink ? (
                <Button 
                  size="lg"
                  className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80 px-8"
                  onClick={() => window.open(spotifyLink, '_blank')}
                >
                  <Music className="mr-2 h-5 w-5" />
                  Écouter sur Spotify
                </Button>
              ) : (
                <Button 
                  size="lg"
                  className="bg-evrgrn-accent text-black hover:bg-evrgrn-accent/80 px-8"
                >
                  Écouter
                </Button>
              )}
              <Button 
                size="lg"
                variant="outline"
                className="border-evrgrn-accent/50 text-evrgrn-accent hover:bg-evrgrn-accent/10 px-8"
              >
                Acheter
              </Button>
            </>
          ) : (
            <Button 
              size="lg"
              className="bg-evrgrn-muted text-evrgrn-accent hover:bg-evrgrn-muted/80 px-8"
              disabled
            >
              Prochainement
            </Button>
          )}
        </div>
      </div>

      {/* Description Section with Interleaved Images */}
      <div className="mb-16">
        <h2 className="text-3xl font-serif text-foreground mb-6 border-b border-evrgrn-accent/20 pb-3">
          À propos de l'album
        </h2>
        
        <div className="space-y-6">
          {descriptionParagraphs.map((paragraph, index) => (
            <div key={index}>
              <p 
                className="text-lg text-muted-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: boldNames(paragraph) }}
              />
              
              {encodedImages[index + 1] && index < descriptionParagraphs.length - 1 && (
                <div className="my-8 rounded-lg overflow-hidden border border-evrgrn-accent/20">
                  <img 
                    src={encodedImages[index + 1]} 
                    alt={`${title} - Visuel ${index + 2}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Credits Section - Flexible (Tables or Text) */}
      {creditSections && creditSections.length > 0 && (
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-foreground mb-6 border-b border-evrgrn-accent/20 pb-3">
            Crédits
          </h2>
          
          <div className="space-y-8">
            {creditSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-xl font-semibold text-evrgrn-accent mb-4">
                  {section.title}
                </h3>
                
                {section.type === 'table' && Array.isArray(section.content) ? (
                  <div className="bg-evrgrn-muted/30 rounded-lg overflow-hidden border border-evrgrn-accent/10">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-evrgrn-muted border-b border-evrgrn-accent/10">
                          <th className="text-left py-3 px-6 text-foreground/80 font-medium text-sm">Artiste</th>
                          <th className="text-left py-3 px-6 text-foreground/80 font-medium text-sm">Titre(s)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.content.map((row, rowIndex) => (
                          <tr 
                            key={rowIndex}
                            className="border-b border-evrgrn-accent/5 hover:bg-evrgrn-muted/50 transition-colors"
                          >
                            <td 
                              className="py-3 px-6 text-muted-foreground"
                              dangerouslySetInnerHTML={{ __html: boldNames(row.artists) }}
                            />
                            <td className="py-3 px-6 text-muted-foreground text-sm">{row.tracks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-evrgrn-muted/30 rounded-lg p-6 border border-evrgrn-accent/10">
                    <p 
                      className="text-base text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: boldNames(typeof section.content === 'string' ? section.content : '') }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Visual Concept with Images */}
      {(visualConcept || encodedImages.length > 1) && (
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-foreground mb-6 border-b border-evrgrn-accent/20 pb-3">
            Concept Visuel
          </h2>
          
          {visualConceptParagraphs.length > 0 && (
            <div className="space-y-6 mb-8">
              {visualConceptParagraphs.map((paragraph, index) => (
                <p 
                  key={index}
                  className="text-lg text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: boldNames(paragraph) }}
                />
              ))}
            </div>
          )}
          
          {encodedImages.length > descriptionParagraphs.length && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {encodedImages.slice(descriptionParagraphs.length + 1).map((img, index) => (
                <div 
                  key={index} 
                  className="rounded-lg overflow-hidden border border-evrgrn-accent/20 hover:border-evrgrn-accent/40 transition-all cursor-pointer"
                  onClick={() => setCurrentImageIndex(descriptionParagraphs.length + index + 1)}
                >
                  <img 
                    src={img} 
                    alt={`${title} - Galerie ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Music Characteristics */}
      {musicCharacteristics && (
        <div className="mb-16">
          <h2 className="text-3xl font-serif text-foreground mb-6 border-b border-evrgrn-accent/20 pb-3">
            Caractéristiques Musicales
          </h2>
          
          <div className="bg-evrgrn-muted/30 rounded-lg p-8 border border-evrgrn-accent/10">
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground">Calme</span>
                  <span className="text-foreground">Dansant</span>
                </div>
                <Progress value={musicCharacteristics.calmDancing} className="h-3 bg-evrgrn-darker" />
                <div className="text-center text-xs text-muted-foreground">
                  {musicCharacteristics.calmDancing}%
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground">Engagé</span>
                  <span className="text-foreground">Décontracté</span>
                </div>
                <Progress value={musicCharacteristics.engagedSilly} className="h-3 bg-evrgrn-darker" />
                <div className="text-center text-xs text-muted-foreground">
                  {musicCharacteristics.engagedSilly}%
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-foreground">Réalité</span>
                  <span className="text-foreground">Fiction</span>
                </div>
                <Progress value={musicCharacteristics.realityFiction} className="h-3 bg-evrgrn-darker" />
                <div className="text-center text-xs text-muted-foreground">
                  {musicCharacteristics.realityFiction}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;
