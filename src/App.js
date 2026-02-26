import { useState } from 'react';
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import './App.css';

import imgMain from './img/caua-main.png'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const splashRef = useRef(null);

  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);

  const [activeSection, setActiveSection] = useState('inicio');
  const [language, setLanguage] = useState('pt');

  useEffect(() => {
    if (!splashRef.current) return;

    const roles = splashRef.current.querySelectorAll(
      ".splash-screen__roles span"
    );

    const heroImage = heroImageRef.current?.querySelector("img");
    const heroContent = heroContentRef.current;

    const tl = gsap.timeline({
      onComplete: () => setIsLoading(false)
    });

    // 🔹 Roles aparecem
    tl.to(roles, {
      opacity: 1,
      y: 0,
      stagger: 0.4,
      duration: 0.8,
      ease: "power4.out"
    });

    // 🔹 Pequena pausa
    tl.to({}, { duration: 0.4 });

    // 🔹 Splash começa a subir
    tl.to(splashRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

    // 🔥 HERO COMEÇA ANTES DO SPLASH TERMINAR
    tl.to(heroImage, {
      scale: 1,
      duration: 1.4,
      ease: "power4.out"
    }, "-=1"); // começa 1 segundo antes do splash acabar

    tl.to(heroContent, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=1");

    return () => tl.kill();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Criar Lenis
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Conectar Lenis com ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? lenis.scrollTo(value)
          : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      }
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">

      {isLoading && (
        <div className="splash-screen" ref={splashRef}>
          <div className="splash-screen__content">
            <h1 className="splash-screen__logo">
              cauã <span>•</span> dev
            </h1>

            <div className="splash-screen__roles">
              <span>WEB</span>
              <span>DESENVOLVEDOR</span>
              <span>ANALISTA</span>
            </div>
          </div>
        </div>
      )}

      <header className="portfolio-header">
        <div className="portfolio-header__container">

          <div>
            <h1 className="portfolio-header__logo">cauã • dev</h1>
          </div>

          <nav className="portfolio-header__nav">
            <button
              className={`portfolio-header__button ${activeSection === 'inicio' ? 'portfolio-header__button--active' : ''
                }`}
              onClick={() => setActiveSection('inicio')}
            >
              Início
            </button>

            <button
              className={`portfolio-header__button ${activeSection === 'sobre' ? 'portfolio-header__button--active' : ''
                }`}
              onClick={() => setActiveSection('sobre')}
            >
              Sobre
            </button>

            <button
              className={`portfolio-header__button ${activeSection === 'projetos' ? 'portfolio-header__button--active' : ''
                }`}
              onClick={() => setActiveSection('projetos')}
            >
              Projetos
            </button>

            <button className="portfolio-header__button portfolio-header__button--primary">
              <span className="portfolio-header__button-content">
                <span className="portfolio-header__button-text">
                  Entre em Contato
                </span>

                <span className="portfolio-header__button-icon">
                  <Icon icon="solar:arrow-right-linear" />
                </span>
              </span>
            </button>

            <div className="language-switch">
              <button
                className={`language-switch__button ${language === 'pt' ? 'active' : ''}`}
                onClick={() => setLanguage('pt')}
              >
                PT
              </button>

              <div className="language-switch__divider" />

              <button
                className={`language-switch__button ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
            </div>
          </nav>

        </div>
      </header>

      <main className="portfolio-main">

        <section className="portfolio-hero">
          <div className="section-container portfolio-hero__container">
            <div
              className="portfolio-hero__content"
              ref={heroContentRef}
            >
              <div className='portfolio-hero__mission'>portfólio</div>
              <h1 className="portfolio-hero__title">
                Olá, eu sou <spam>Cauã!</spam>
              </h1>
              <div className="portfolio-hero__roles">
                <span>WEB</span>
                <span className="portfolio-hero__roles--highlight">
                  DESENVOLVEDOR
                </span>
                <span>ANALISTA</span>
              </div>
              <p className="portfolio-hero__description">
                Cauã Gonçalves de Almeida é estudante de Análise e Desenvolvimento de Sistemas (FATEC) e formado pelo SENAI. Desenvolvedor full-stack em formação, focado em criar aplicações modernas, organizadas e eficientes.
              </p>
            </div>

            <div className="portfolio-hero__image">
              <div
                className="portfolio-hero__image-mask"
                ref={heroImageRef}
              >
                <img src={imgMain} alt="Foto" />
              </div>
            </div>

          </div>
        </section>

        <section className="portfolio-about">
          <div className="section-container">
            SOBRE
          </div>
        </section>

        <section className="portfolio-projects">
          <div className="section-container">
            PROJETOS
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;