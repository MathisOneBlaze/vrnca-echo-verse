
import JSZip from 'jszip';

export async function extractGame(zipUrl: string, targetElementId: string): Promise<void> {
  // Get the container element first
  const container = document.getElementById(targetElementId);
  if (!container) {
    throw new Error(`Target element with ID ${targetElementId} not found`);
  }

  try {
    console.log(`Fetching zip file from ${zipUrl}`);
    const response = await fetch(zipUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch zip file: ${response.status} ${response.statusText}`);
    }
    
    const zipData = await response.arrayBuffer();
    const zip = await JSZip.loadAsync(zipData);
    
    console.log('Extracting zip content and creating iframe');
    
    // Safely clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    
    // Create iframe to load the game
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.backgroundColor = '#000';
    
    // Append iframe to container before setting src or content
    container.appendChild(iframe);
    
    // Set a blank source to ensure we have a document to work with
    iframe.src = 'about:blank';
    
    // Wait for iframe to load
    iframe.onload = async () => {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) {
        throw new Error('Failed to access iframe document');
      }
      
      // Write basic HTML structure
      iframeDoc.open();
      iframeDoc.write('<!DOCTYPE html><html><head><meta charset="UTF-8"><title>VRNCA LAG</title><style>body { margin: 0; overflow: hidden; background: #000; }</style></head><body></body></html>');
      iframeDoc.close();
      
      const promises = [];
      
      // Extract all files with better resource management
      for (const [path, zipObj] of Object.entries(zip.files)) {
        if (!zipObj.dir) {
          try {
            const promise = (async () => {
              const content = await zipObj.async('blob');
              const url = URL.createObjectURL(content);
              
              if (path.endsWith('.html')) {
                // Load the HTML file
                const htmlResponse = await fetch(url);
                const htmlText = await htmlResponse.text();
                
                // Parse HTML to get resources
                const parser = new DOMParser();
                const doc = parser.parseFromString(htmlText, 'text/html');
                
                // Inject the content into iframe - use the safer innerHTML
                iframeDoc.body.innerHTML = doc.body.innerHTML;
                
                // Copy scripts
                const scripts = doc.querySelectorAll('script');
                scripts.forEach(script => {
                  const newScript = iframeDoc.createElement('script');
                  if (script.src) {
                    const srcPath = script.src.split('/').pop();
                    const matchingFile = Object.keys(zip.files).find(f => f.endsWith(srcPath || ''));
                    if (matchingFile) {
                      zip.files[matchingFile].async('blob').then(blob => {
                        const scriptUrl = URL.createObjectURL(blob);
                        newScript.src = scriptUrl;
                        iframeDoc.body.appendChild(newScript);
                      });
                    }
                  } else {
                    newScript.textContent = script.textContent;
                    iframeDoc.body.appendChild(newScript);
                  }
                });
                
                // Copy styles
                const styles = doc.querySelectorAll('style, link[rel="stylesheet"]');
                styles.forEach(style => {
                  if (style.tagName === 'LINK') {
                    const link = style as HTMLLinkElement;
                    const hrefPath = link.href.split('/').pop();
                    const matchingFile = Object.keys(zip.files).find(f => f.endsWith(hrefPath || ''));
                    if (matchingFile) {
                      zip.files[matchingFile].async('blob').then(blob => {
                        const styleUrl = URL.createObjectURL(blob);
                        const newLink = iframeDoc.createElement('link');
                        newLink.rel = 'stylesheet';
                        newLink.href = styleUrl;
                        iframeDoc.head.appendChild(newLink);
                      });
                    }
                  } else {
                    const newStyle = iframeDoc.createElement('style');
                    newStyle.textContent = style.textContent;
                    iframeDoc.head.appendChild(newStyle);
                  }
                });
              } else if (path.endsWith('.js')) {
                // For JS files, make them available by URL
                const script = iframeDoc.createElement('script');
                script.src = url;
                iframeDoc.body.appendChild(script);
              } else if (path.endsWith('.css')) {
                // For CSS files
                const link = iframeDoc.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                iframeDoc.head.appendChild(link);
              }
            })();
            
            promises.push(promise);
          } catch (error) {
            console.error(`Error processing file ${path}:`, error);
          }
        }
      }
      
      await Promise.all(promises);
      console.log('Game loaded in iframe');
    };
    
  } catch (error) {
    console.error('Error extracting game:', error);
    // Show error message in container - use a safer way to replace content
    if (container) {
      // Clear container safely
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      
      // Add error message
      const errorDiv = document.createElement('div');
      errorDiv.className = "p-4 bg-red-900/50 border border-red-500 rounded-lg text-white";
      errorDiv.innerHTML = `
        <h3 class="text-lg font-medium mb-2">Erreur lors du chargement du jeu</h3>
        <p>${error instanceof Error ? error.message : 'Une erreur inconnue est survenue'}</p>
      `;
      
      const retryButton = document.createElement('button');
      retryButton.className = "mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded";
      retryButton.textContent = "Réessayer";
      retryButton.onclick = () => window.location.reload();
      
      errorDiv.appendChild(retryButton);
      container.appendChild(errorDiv);
    }
    throw error; // Re-throw to allow calling code to handle the error
  }
}
