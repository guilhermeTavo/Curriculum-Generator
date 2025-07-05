
import React from 'react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-8">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-sm text-muted-foreground">
          <p>
            © Guilherme Tavares 2025 - Desenvolvido por{' '}
            <a 
              href="https://portfolio-ebon-eight-38.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline transition-colors"
            >
              Guilherme Tavares
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
