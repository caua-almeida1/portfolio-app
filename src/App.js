import { useState } from 'react';
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { useRef } from "react";
import { Icon } from "@iconify/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Contact from "./pages/Contact";
import './App.css';

import imgMain from './img/caua-main.png'
import imgAbout from './img/caua-about-me.png'

import imgDifferencial1 from './img/img1.svg'
import imgDifferencial2 from './img/img2.svg'
import imgDifferencial3 from './img/img3.svg'
import gestockImg from './img/gestockImg.png'
import markfyImg from './img/markfyImg.png'
import bravopizzaImg from './img/bravopizzaImg.png'
import edtechImg from './img/edtechImg.png'

// ======= GESTOCK FILES
import gestock1 from "./img/gestockfiles/1.jpg"
import gestock2 from "./img/gestockfiles/2.jpg"
import gestock3 from "./img/gestockfiles/3.jpg"
import gestock4 from "./img/gestockfiles/4.jpg"
import gestock5 from "./img/gestockfiles/5.jpg"
import gestock6 from "./img/gestockfiles/6.jpg"

// ======= BRAVO PIZZA FILES
import bravopizza1 from "./img/bravopizzafiles/1.png";
import bravopizza2 from "./img/bravopizzafiles/2.png";
import bravopizza3 from "./img/bravopizzafiles/3.png";
import bravopizza4 from "./img/bravopizzafiles/4.png";
import bravopizza5 from "./img/bravopizzafiles/5.png";
import bravopizza6 from "./img/bravopizzafiles/6.png"

// ======= EXPERIENCE FILES
import senaiLogo from "./img/experiencefiles/senaiLogo.png";
import fatecLogo from "./img/experiencefiles/fatecLogo.png";
import sesiLogo from "./img/experiencefiles/sesiLogo.png";
import modularLogo from "./img/experiencefiles/modularLogo.png";
import firstLogo from "./img/experiencefiles/firstLogo.png";

// ======= STACK FILES
import imgStack from "./img/stackfiles/stackImg.jpg";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(true);
  const splashRef = useRef(null);

  const heroImageRef = useRef(null);
  const heroContentRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  const [, setActiveSection] = useState('inicio');
  const [language, setLanguage] = useState('pt');

  const [activeProject, setActiveProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  const scrollToSection = (id) => {

    setActiveSection(id);

    const section = document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  };

  useEffect(() => {

    const heroImage =
      heroImageRef.current?.querySelector("img");

    const heroContent =
      heroContentRef.current;

    // VOLTOU DE ROTA
    if (hasAnimatedRef.current) {

      gsap.set(heroImage, {
        scale: 1
      });

      gsap.set(heroContent, {
        opacity: 1,
        y: 0
      });

      setIsLoading(false);

      return;
    }

    // PRIMEIRO LOAD
    if (!splashRef.current) return;

    const roles = splashRef.current.querySelectorAll(
      ".splash-screen__roles span"
    );

    gsap.set(heroImage, {
      scale: 0.8
    });

    gsap.set(heroContent, {
      opacity: 0,
      y: 40
    });

    gsap.set(roles, {
      opacity: 0,
      y: 40
    });

    const tl = gsap.timeline({
      onComplete: () => {

        hasAnimatedRef.current = true;

        setIsLoading(false);
      }
    });

    tl.to(roles, {
      opacity: 1,
      y: 0,
      stagger: 0.4,
      duration: 0.8,
      ease: "power4.out"
    });

    tl.to({}, { duration: 0.4 });

    tl.to(splashRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

    tl.to(heroImage, {
      scale: 1,
      duration: 1.4,
      ease: "power4.out"
    }, "-=1");

    tl.to(heroContent, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.out"
    }, "-=1");

    return () => tl.kill();

  }, [location.pathname]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

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

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {

      gsap.utils.toArray(".reveal").forEach((el) => {

        const delay = el.dataset.delay
          ? parseFloat(el.dataset.delay)
          : 0;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            }
          }
        );

      });

    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };

  }, []);

  const openModal = (project) => {
    setActiveProject(project);
    setCurrentImage(0);

    setTimeout(() => {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power4.out" }
      );

      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }, 10);
  };

  const closeModal = () => {
    gsap.to(modalRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: "power4.in"
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setActiveProject(null)
    });
  };

  const projectsData = {
    Gestock: {
      images: [gestock1, gestock2, gestock3, gestock4, gestock5, gestock6],
      description: "GesTock é uma plataforma desenvolvida para auxiliar alunos e professores nas disciplinas de Logística e Administração por meio de simulações de gestão de estoque. Atualmente, é utilizado no SENAI Suzana Dias, contribuindo para a dinâmica das aulas. O projeto reforçou minha capacidade de transformar necessidades reais em soluções funcionais e de gerar impacto prático no ambiente educacional.",
      github: "https://github.com/caua-almeida1/gestock"
    },

    Markfy: {
      images: [gestock1],
      description: "Aplicativo de agendamento moderno.",
      github: "https://github.com/caua-almeida1/Markfy"
    },

    BravoPizzas: {
      images: [
        bravopizza1,
        bravopizza2,
        bravopizza3,
        bravopizza4,
        bravopizza5,
        bravopizza6
      ],
      description:
        "Bravo Pizza's é um e-commerce moderno desenvolvido para pizzarias, com foco em experiência do usuário, performance e interface premium. O projeto possui busca dinâmica, carrinho inteligente, animações fluidas e uma arquitetura pensada para escalabilidade e navegação intuitiva.",
      github:
        "https://github.com/caua-almeida1/bravo-pizzas"
    },

    Edtech: {
      images: [edtechImg],
      description:
        "EdTech é uma plataforma educacional moderna focada em organização de conteúdos, acessibilidade e experiência do usuário. O projeto está atualmente em fase beta e segue em desenvolvimento ativo, com melhorias constantes de UI/UX e novas funcionalidades.",
      github:
        "https://github.com/caua-almeida1/edtech"
    },
  };

  const experienceCompanies = [
    {
      name: "SENAI",
      image: senaiLogo
    },

    {
      name: "FATEC",
      image: fatecLogo
    },

    {
      name: "SESI",
      image: sesiLogo
    },

    {
      name: "MODULAR",
      image: modularLogo
    },

    {
      name: "FIRST",
      image: firstLogo
    },
  ];

  const nextImage = () => {
    const images = projectsData[activeProject].images;
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = projectsData[activeProject].images;
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const repeatedCompanies = Array(12)
    .fill(experienceCompanies)
    .flat();

  useEffect(() => {

    const wrapper = document.querySelector(
      ".portfolio-stack__image-wrapper"
    );

    const image = document.querySelector(
      ".portfolio-stack__image"
    );

    if (!wrapper || !image) return;

    const handleScroll = () => {

      const rect = wrapper.getBoundingClientRect();

      const windowHeight = window.innerHeight;

      const progress =
        (rect.top + rect.height) / (windowHeight + rect.height);

      const move = (progress - 0.5) * 80;

      image.style.transform =
        `translateY(${move}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  const [openFaq, setOpenFaq] = useState(null);

  const faqItems = {
    pt: [
      {
        question: "Quais tecnologias você mais utiliza?",
        answer:
          "Trabalho principalmente com React, JavaScript, TypeScript, Node.js, Python e Firebase."
      },

      {
        question: "Como você se destaca trabalhando em equipe?",
        answer:
          "Tenho facilidade em trabalhar em equipe, me adaptar a diferentes desafios e manter uma comunicação clara durante o desenvolvimento dos projetos. Também valorizo organização, aprendizado constante e colaboração no processo criativo e técnico."
      },

      {
        question: "Você possui experiência profissional?",
        answer:
          "Sim, atuei como estagiário na Modular Data Centers e também desenvolvi projetos utilizados em ambientes educacionais, como o SENAI."
      },

      {
        question: "Quais áreas você mais gosta?",
        answer:
          "Tenho maior foco em front-end moderno, criando interfaces premium, animações e experiências digitais. Ainda assim, também possuo conhecimentos em back-end e design, o que me permite desenvolver projetos de forma mais completa e estratégica."
      },
    ],

    en: [
      {
        question: "Which technologies do you use the most?",
        answer:
          "I mainly work with React, JavaScript, TypeScript, Node.js, Python, and Firebase."
      },

      {
        question: "How do you stand out when working in a team?",
        answer:
          "I adapt easily to different challenges, work well in teams, and maintain clear communication throughout project development. I also value organization, continuous learning, and collaboration in both creative and technical processes."
      },

      {
        question: "Do you have professional experience?",
        answer:
          "Yes, I worked as an intern at Modular Data Centers and also developed projects used in educational environments such as SENAI."
      },

      {
        question: "Which areas do you enjoy the most?",
        answer:
          "My main focus is modern front-end development, creating premium interfaces, animations, and digital experiences. I also have back-end and design knowledge, allowing me to develop projects in a more complete and strategic way."
      },
    ]
  };

  const playSplashAnimation = () => {

    if (!splashRef.current) return;

    const roles = splashRef.current.querySelectorAll(
      ".splash-screen__roles span"
    );

    gsap.set(splashRef.current, {
      yPercent: 0
    });

    gsap.set(roles, {
      opacity: 0,
      y: 40
    });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      }
    });

    tl.to(roles, {
      opacity: 1,
      y: 0,
      stagger: 0.4,
      duration: 0.8,
      ease: "power4.out"
    });

    tl.to({}, { duration: 0.4 });

    tl.to(splashRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut"
    });

  };

  const changeLanguage = (lang) => {

    if (lang === language) return;

    setLanguage(lang);

    setIsLoading(true);

    setTimeout(() => {
      playSplashAnimation();
    }, 50);

  };

  const translations = {
    pt: {
      nav: {
        home: "Início",
        projects: "Projetos",
        about: "Sobre",
        contact: "Entre em Contato",
      },

      hero: {
        portfolio: "portfólio",
        title: "Olá, eu sou",
        role1: "WEB",
        role2: "DESENVOLVEDOR",
        role3: "ANALISTA",

        description:
          "Cauã Gonçalves de Almeida é estudante de Análise e Desenvolvimento de Sistemas (FATEC) e formado pelo SENAI. Desenvolvedor full-stack em formação, focado em criar aplicações modernas, organizadas e eficientes."
      },

      differentials: {
        label: "Como eu trabalho",
        title: "Mais que código, soluções inteligentes",

        cards: [
          {
            title: "Performance",
            text: "Aplicações rápidas, organizadas e escaláveis."
          },

          {
            title: "Lógica & Estrutura",
            text: "Código limpo, arquitetura bem definida e fácil manutenção."
          },

          {
            title: "Foco em Resultado",
            text: "Sistemas pensados para resolver problemas reais."
          }
        ]
      },

      projects: {
        title: "Projetos",

        items: {
          gestock: {
            badge1: "React",
            badge2: "Node",
            badge3: "UI/UX"
          },

          markfy: {
            status: "Em desenvolvimento"
          },

          bravopizzas: {
            badge1: "React",
            badge2: "Node",
            badge3: "UI/UX"
          },

          edtech: {
            status: "Beta",
            badge1: "Python",
            badge2: "JSON",
            badge3: "Figma"
          }
        }
      },

      modal: {
        beta: "Versão Beta",
        access: "Acessar Aplicação",
        repository: "Visitar Repositório GitHub",

        descriptions: {
          Gestock:
            "GesTock é uma plataforma desenvolvida para auxiliar alunos e professores nas disciplinas de Logística e Administração por meio de simulações de gestão de estoque. Atualmente, é utilizado no SENAI Suzana Dias, contribuindo para a dinâmica das aulas. O projeto reforçou minha capacidade de transformar necessidades reais em soluções funcionais e de gerar impacto prático no ambiente educacional.",

          BravoPizzas:
            "Bravo Pizza's é um e-commerce moderno desenvolvido para pizzarias, com foco em experiência do usuário, performance e interface premium. O projeto possui busca dinâmica, carrinho inteligente, animações fluidas e uma arquitetura pensada para escalabilidade e navegação intuitiva.",

          Edtech:
            "EdTech é uma plataforma educacional moderna focada em organização de conteúdos, acessibilidade e experiência do usuário. O projeto está atualmente em fase beta e segue em desenvolvimento ativo, com melhorias constantes de UI/UX e novas funcionalidades.",

          Markfy:
            "Aplicativo de agendamento moderno."
        }
      },

      experience: {
        text:
          "Empresas e instituições que fazem parte da minha trajetória."
      },

      about: {
        label: "Sobre mim",

        title:
          "Desenvolvedor focado em tecnologia e experiências digitais.",

        description:
          "Sou desenvolvedor front-end e estudante de Análise e Desenvolvimento de Sistemas na FATEC Santana de Parnaíba, apaixonado por tecnologia e desenvolvimento web. Tenho formação técnica em Desenvolvimento de Sistemas pelo SENAI junto ao SESI, além de experiência profissional como estagiário na Modular Data Centers. Também participei do mundial de robótica da FIRST LEGO League, experiência que fortaleceu minhas habilidades em tecnologia, criatividade e trabalho em equipe. Atualmente, foco no desenvolvimento de aplicações modernas, responsivas e intuitivas."
      },

      stack: {
        label: "Linguagens & Ferramentas",
        title: "Tecnologias que utilizo..."
      },

      contact: {
        question: "Quer conhecer melhor meu trabalho?",

        title: {
          normal: "Entre em",
          highlight: "contato",
          end: "comigo"
        },

        label: "O que você encontrará",

        cards: [
          {
            title: "Front-end moderno",
            text:
              "Interfaces responsivas utilizando React, animações e componentização."
          },

          {
            title: "Evolução constante",
            text:
              "Sempre buscando aprender novas tecnologias e criar experiências melhores."
          }
        ],

        button: "Vamos Começar"
      },

      footer: {
        label: "Obrigado pela visita",

        title: {
          normal: "Vamos criar algo",
          highlight: "incrível juntos."
        },

        button: "Entrar em Contato",

        contact: "Contato",
        projects: "Projetos",

        developed: "Desenvolvido com React"
      },

      contactPage: {
        label: "Contato",

        title: {
          normal: "Vamos criar algo",
          highlight: "incrível juntos."
        },

        description:
          "Entre em contato comigo para oportunidades, projetos ou networking.",

        emailButton: "Enviar Email",

        form: {
          name: "Nome",
          namePlaceholder: "Digite seu nome",

          email: "Email",
          emailPlaceholder: "Digite seu email",

          message: "Mensagem",
          messagePlaceholder: "Digite sua mensagem",

          button: "Enviar mensagem",

          helperText:
            "Caso encontre algum problema com o formulário, entre em contato diretamente pelo"
        },


      },

    },

    en: {
      nav: {
        home: "Home",
        projects: "Projects",
        about: "About",
        contact: "Contact Me",
      },

      hero: {
        portfolio: "portfolio",
        title: "Hello, I'm",
        role1: "WEB",
        role2: "DEVELOPER",
        role3: "ANALYST",

        description:
          "Cauã Gonçalves de Almeida is a Systems Analysis and Development student at FATEC and a SENAI graduate. A full-stack developer in training, focused on building modern, organized, and efficient applications."
      },

      differentials: {
        label: "How I work",
        title: "More than code, smart solutions",

        cards: [
          {
            title: "Performance",
            text: "Fast, organized and scalable applications."
          },

          {
            title: "Logic & Structure",
            text: "Clean code and maintainable architecture."
          },

          {
            title: "Result Focus",
            text: "Systems designed to solve real problems."
          }
        ]
      },

      projects: {
        title: "Projects",

        items: {
          gestock: {
            badge1: "React",
            badge2: "Node",
            badge3: "UI/UX"
          },

          markfy: {
            status: "In development"
          },

          bravopizzas: {
            badge1: "React",
            badge2: "Node",
            badge3: "UI/UX"
          },

          edtech: {
            status: "Beta",
            badge1: "Python",
            badge2: "JSON",
            badge3: "Figma"
          }
        }
      },

      modal: {
        beta: "Beta Version",
        access: "Access Application",
        repository: "Visit GitHub Repository",

        descriptions: {
          Gestock:
            "GesTock is a platform developed to assist students and teachers in Logistics and Administration classes through inventory management simulations. It is currently used at SENAI Suzana Dias, contributing to classroom dynamics. The project strengthened my ability to transform real needs into functional solutions and create practical impact in educational environments.",

          BravoPizzas:
            "Bravo Pizza's is a modern e-commerce platform developed for pizzerias, focused on user experience, performance, and premium interface design. The project includes dynamic search, smart cart functionality, fluid animations, and an architecture designed for scalability and intuitive navigation.",

          Edtech:
            "EdTech is a modern educational platform focused on content organization, accessibility, and user experience. The project is currently in beta phase and remains under active development, with constant UI/UX improvements and new features.",

          Markfy:
            "Modern scheduling application."
        }
      },

      experience: {
        text:
          "Companies and institutions that are part of my journey."
      },

      about: {
        label: "About me",

        title:
          "Developer focused on technology and digital experiences.",

        description:
          "I'm a front-end developer and Systems Analysis and Development student at FATEC Santana de Parnaíba, passionate about technology and web development. I have a technical degree in Systems Development from SENAI alongside SESI, as well as professional experience as an intern at Modular Data Centers. I also participated in the FIRST LEGO League World Championship, an experience that strengthened my skills in technology, creativity, and teamwork. Currently, I focus on developing modern, responsive, and intuitive applications."
      },

      stack: {
        label: "Languages & Tools",
        title: "Technologies I use..."
      },

      contact: {
        question: "Want to know more about my work?",

        title: {
          normal: "Get in",
          highlight: "touch",
          end: "with me"
        },

        label: "What you'll find",

        cards: [
          {
            title: "Modern front-end",
            text:
              "Responsive interfaces using React, animations, and component-based architecture."
          },

          {
            title: "Constant growth",
            text:
              "Always seeking new technologies and creating better experiences."
          }
        ],

        button: "Let's Start"
      },

      footer: {
        label: "Thanks for visiting",

        title: {
          normal: "Let's create something",
          highlight: "amazing together."
        },

        button: "Contact Me",

        contact: "Contact",
        projects: "Projects",

        developed: "Developed with React"
      },

      contactPage: {
        label: "Contact",

        title: {
          normal: "Let's create something",
          highlight: "amazing together."
        },

        description:
          "Get in touch with me for opportunities, projects or networking.",

        emailButton: "Send Email",

        form: {
          name: "Name",
          namePlaceholder: "Enter your name",

          email: "Email",
          emailPlaceholder: "Enter your email",

          message: "Message",
          messagePlaceholder: "Enter your message",

          button: "Send message",

          helperText:
            "If you experience any issues with the form, feel free to contact me directly through"
        },


      },
    }
  };

  const t = translations[language];
  const currentFaqItems = faqItems[language];

  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 768
  );

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);

  }, []);


  return (
    <Routes>

      <Route
        path="/"
        element={
          <div className="app">

            {isLoading && (
              <div className="splash-screen" ref={splashRef}>
                <div className="splash-screen__content">
                  <h1 className="splash-screen__logo">
                    cauã <span>•</span> dev
                  </h1>

                  <div className="splash-screen__roles">

                    {language === "pt" ? (
                      <>
                        <span>WEB</span>
                        <span>DESENVOLVEDOR</span>
                        <span>ANALISTA</span>
                      </>
                    ) : (
                      <>
                        <span>WEB</span>
                        <span>DEVELOPER</span>
                        <span>ANALYST</span>
                      </>
                    )}

                  </div>
                </div>
              </div>
            )}

            <Header
              t={t}
              language={language}
              changeLanguage={changeLanguage}
              scrollToSection={scrollToSection}
            />

            <main className="portfolio-main">

              <section id="inicio" className="portfolio-hero">

                <div className="section-container portfolio-hero__container">

                  <div
                    className="portfolio-hero__content"
                    ref={heroContentRef}
                  >

                    <div className='portfolio-hero__mission'>
                      {t.hero.portfolio}
                    </div>

                    <h1 className="portfolio-hero__title">
                      {t.hero.title} <spam>Cauã!</spam>
                    </h1>

                    <div className="portfolio-hero__roles">

                      <span>{t.hero.role1}</span>

                      <span className="portfolio-hero__roles--highlight">
                        {t.hero.role2}
                      </span>

                      <span>{t.hero.role3}</span>

                    </div>

                    <p className="portfolio-hero__description">
                      {t.hero.description}
                    </p>

                  </div>

                  {!isMobile && (
                    <div className="portfolio-hero__image">

                      <div
                        className="portfolio-hero__image-mask"
                        ref={heroImageRef}
                      >

                        <img src={imgMain} alt="Foto" />

                      </div>

                    </div>
                  )}

                </div>

              </section>

              {isMobile && (

                <section className="portfolio-hero-mobile-image">

                  <div className="portfolio-hero__image">

                    <div
                      className="portfolio-hero__image-mask"
                      ref={heroImageRef}
                    >

                      <img src={imgMain} alt="Foto" />

                    </div>

                  </div>

                </section>

              )}
              <section className="portfolio-differentials">
                <div className="section-container portfolio-differentials__container">

                  <div className="portfolio-differentials__header ">
                    <span className="portfolio-differentials__label reveal">
                      {t.differentials.label}
                    </span>

                    <h2 className="portfolio-differentials__title reveal">
                      {t.differentials.title}
                    </h2>
                  </div>

                  <div className="portfolio-differentials__grid">

                    <div className="portfolio-differentials__card reveal" data-delay="0.2">
                      <img src={imgDifferencial1}  alt="" />
                      <h3>{t.differentials.cards[0].title}</h3>
                      <p>
                        {t.differentials.cards[0].text}
                      </p>
                    </div>

                    <div className="portfolio-differentials__card reveal" data-delay="0.35">
                      <img src={imgDifferencial2}  alt="" />
                      <h3>{t.differentials.cards[1].title}</h3>
                      <p>
                        {t.differentials.cards[1].text}
                      </p>
                    </div>

                    <div className="portfolio-differentials__card reveal" data-delay="0.5">
                      <img src={imgDifferencial3} alt=""  />
                      <h3>{t.differentials.cards[2].title}</h3>
                      <p>
                        {t.differentials.cards[2].text}
                      </p>
                    </div>

                  </div>
                </div>
              </section>

              <section id="projetos" className="portfolio-projects">
                <div className="section-container portfolio-projects__container">
                  <h2 className="portfolio-projects__title reveal">{t.projects.title}</h2>

                  <div className="portfolio_grid">
                    <div
                      className="portfolio-projects__item portfolio-projects__item--one reveal"
                      data-delay="0.2"
                      onClick={() => openModal("Gestock")}
                    >
                      <img src={gestockImg} alt="Gestock" />

                      <div className="portfolio-projects__overlay">
                        <h3 className="portfolio-projects__name" >Gestock</h3>

                        <div className="portfolio-projects__labels">
                          <span className="portfolio-projects__label">
                            {t.projects.items.gestock.badge1}
                          </span>

                          <span className="portfolio-projects__label">
                            {t.projects.items.gestock.badge2}
                          </span>

                          <span className="portfolio-projects__label">
                            {t.projects.items.gestock.badge3}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="portfolio-projects__item portfolio-projects__item--two reveal"
                      data-delay="0.3"
                    // onClick={() => openModal("Markfy")}
                    >
                      <img src={markfyImg}  alt="" />

                      <div className="portfolio-projects__overlay">
                        <div className="portfolio-projects__title-group">

                          <h3 className="portfolio-projects__name">
                            Markfy
                          </h3>

                          <div className="portfolio-projects__dev-badge">
                            <Icon icon="solar:danger-triangle-linear" />
                            <span>
                              {t.projects.items.markfy.status}
                            </span>
                          </div>

                        </div>

                        <div className="portfolio-projects__labels">
                          <span className="portfolio-projects__label">React</span>
                          <span className="portfolio-projects__label">Node</span>
                          <span className="portfolio-projects__label">UI/UX</span>
                        </div>
                      </div>
                    </div>

                    <div className="portfolio-projects__item portfolio-projects__item--three reveal"
                      data-delay="0.4"
                      onClick={() => openModal("BravoPizzas")}
                    >
                      <img src={bravopizzaImg} alt=""  />

                      <div className="portfolio-projects__overlay">
                        <h3 className="portfolio-projects__name">BravoPizza's</h3>

                        <div className="portfolio-projects__labels">
                          <span className="portfolio-projects__label">React</span>
                          <span className="portfolio-projects__label">Node</span>
                          <span className="portfolio-projects__label">UI/UX</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="portfolio-projects__item portfolio-projects__item--four reveal"
                      data-delay="0.5"
                      onClick={() => openModal("Edtech")}
                    >
                      <img src={edtechImg} alt=""  />

                      <div className="portfolio-projects__overlay">

                        <div className="portfolio-projects__title-group">

                          <h3 className="portfolio-projects__name">
                            Edtech
                          </h3>

                          <div className="portfolio-projects__dev-badge">
                            <Icon icon="basil:flask-outline" />
                            <span>
                              {t.projects.items.edtech.status}
                            </span>
                          </div>

                        </div>

                        <div className="portfolio-projects__labels">
                          <span className="portfolio-projects__label">Python</span>
                          <span className="portfolio-projects__label">JSON</span>
                          <span className="portfolio-projects__label">Figma</span>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="portfolio-experience">
                <div className="section-container">

                  <p className="portfolio-experience__text reveal">
                    {t.experience.text}
                  </p>

                  <div className="portfolio-experience__marquee reveal">

                    <div className="portfolio-experience__track">

                      {repeatedCompanies.map((company, index) => (
                        <div
                          className="portfolio-experience__item"
                          key={`${company.name}-${index}`}
                        >
                          <img
                            src={company.image}
                            alt={company.name}
                          />
                        </div>
                      ))}

                    </div>

                  </div>

                </div>
              </section>

              <section id="sobre" className="portfolio-about">

                <div className="portfolio-about__container">

                  <div className="portfolio-about__content">

                    <div className="portfolio-about__content-inner">

                      <span className="portfolio-about__label reveal" data-delay="0.2">
                        {t.about.label}
                      </span>

                      <h2 className="portfolio-about__title reveal" data-delay="0.35">
                        {t.about.title}
                      </h2>

                      <p className="portfolio-about__description reveal" data-delay="0.5">
                        {t.about.description}
                      </p>
                    </div>
                  </div>

                  <div
                    className="portfolio-about__image-wrapper"
                  >
                    <div className="portfolio-about__image-mask">

                      <img
                        src={imgAbout}
                        alt="Cauã"
                        className="portfolio-about__image"
                      />

                    </div>
                  </div>

                </div>

              </section>

              <section className="portfolio-stack">

                <div className="portfolio-stack__container">

                  <div className="portfolio-stack__image-wrapper">

                    <div className="portfolio-stack__image-mask">

                      <img
                        src={imgStack}
                        alt="Tecnologias"
                        className="portfolio-stack__image"
                      />

                    </div>

                  </div>

                  <div className="portfolio-stack__content">

                    <div className="portfolio-stack__content-inner">

                      <span
                        className="portfolio-differentials__label reveal"
                        data-delay="0.2"
                      >
                        {t.stack.label}
                      </span>

                      <h2
                        className="portfolio-stack__title reveal"
                        data-delay="0.3"
                      >
                        {t.stack.title}
                      </h2>

                      <div
                        className="portfolio-stack__groups reveal"
                        data-delay="0.4"
                      >

                        {/* FRONT-END */}
                        <div className="portfolio-stack__group">

                          <div className="portfolio-stack__group-header">

                            <span className="portfolio-stack__group-title">
                              Front-end
                            </span>

                          </div>

                          <div className="portfolio-stack__items">

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=react" alt="React" />
                              <span>React</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=js" alt="JavaScript" />
                              <span>JavaScript</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=ts" alt="TypeScript" />
                              <span>TypeScript</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=html" alt="HTML" />
                              <span>HTML</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=css" alt="CSS" />
                              <span>CSS</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=figma" alt="Figma" />
                              <span>Figma</span>
                            </div>

                          </div>

                        </div>

                        {/* BACK-END */}
                        <div className="portfolio-stack__group">

                          <div className="portfolio-stack__group-header">

                            <span className="portfolio-stack__group-title">
                              Back-end
                            </span>

                          </div>

                          <div className="portfolio-stack__items">

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=nodejs" alt="Node.js" />
                              <span>Node.js</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=python" alt="Python" />
                              <span>Python</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=mysql" alt="MySQL" />
                              <span>MySQL</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=firebase" alt="Firebase" />
                              <span>Firebase</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=git" alt="Git" />
                              <span>Git</span>
                            </div>

                            <div className="portfolio-stack__item">
                              <img src="https://skillicons.dev/icons?i=github" alt="GitHub" />
                              <span>GitHub</span>
                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </section>

              <section className="portfolio-faq">

                <div className="section-container">

                  <div className="portfolio-faq__header">

                    <h2
                      className="portfolio-faq__title reveal"
                      data-delay="0.15"
                    >
                      FAQs
                    </h2>

                  </div>

                  <div className="portfolio-faq__items">

                    {currentFaqItems.map((item, index) => {

                      const isOpen = openFaq === index;

                      return (

                        <div
                          className="portfolio-faq__item reveal"
                          data-delay={0.2 + index * 0.1}
                          key={index}
                        >

                          <button
                            className="portfolio-faq__question"
                            onClick={() =>
                              setOpenFaq(isOpen ? null : index)
                            }
                          >

                            <span>{item.question}</span>

                            <div
                              className={`portfolio-faq__plus ${isOpen
                                ? "portfolio-faq__plus--open"
                                : ""
                                }`}
                            >
                              <span />
                              <span />
                            </div>

                          </button>

                          <div
                            className={`portfolio-faq__answer ${isOpen
                              ? "portfolio-faq__answer--open"
                              : ""
                              }`}
                          >

                            <div className="portfolio-faq__answer-inner">
                              <p>{item.answer}</p>
                            </div>

                          </div>

                        </div>

                      );

                    })}

                  </div>

                </div>

              </section>

              <section id="contato" className="portfolio-contact">

                <p className="portfolio-contact__question reveal">
                  {t.contact.question}
                </p>

                <h2 className="portfolio-contact__title reveal" data-delay="0.15">

                  {t.contact.title.normal}{" "}

                  <span>
                    {t.contact.title.highlight}
                  </span>{" "}

                  {t.contact.title.end}

                </h2>

                <span className="portfolio-differentials__label reveal" data-delay="0.3">
                  {t.contact.label}
                </span>

                <div className="portfolio-contact__cards reveal" data-delay="0.45">

                  <div className="portfolio-contact__card">

                    <span className="portfolio-contact__number">
                      01
                    </span>

                    <h3>
                      {t.contact.cards[0].title}
                    </h3>

                    <p>
                      {t.contact.cards[0].text}
                    </p>

                  </div>

                  <div className="portfolio-contact__card">

                    <span className="portfolio-contact__number">
                      02
                    </span>

                    <h3>
                      {t.contact.cards[1].title}
                    </h3>

                    <p>
                      {t.contact.cards[1].text}
                    </p>

                  </div>

                </div>

                <button className="portfolio-contact__button"
                        onClick={() => navigate("/contact")}
                >

                  <span className="portfolio-contact__button-content">

                    <span className="portfolio-contact__button-text">
                      {t.contact.button}
                    </span>

                    <span className="portfolio-contact__button-icon">
                      <Icon icon="solar:arrow-right-linear" />
                    </span>

                  </span>

                </button>

              </section>

              <section className="portfolio-footer">

                <div className="portfolio-footer__content">

                  <div className="portfolio-footer__left">

                    <p className="portfolio-footer__label">
                      {t.footer.label}
                    </p>

                    <h2 className="portfolio-footer__title">

                      {t.footer.title.normal}{" "}

                      <span>
                        {t.footer.title.highlight}
                      </span>

                    </h2>

                    <button className="portfolio-footer__button"
                            onClick={() => navigate("/contact")}
                    >

                      <span className="portfolio-footer__button-content">

                        <span className="portfolio-footer__button-text">
                          {t.footer.button}
                        </span>

                        <span className="portfolio-footer__button-icon">
                          <Icon icon="solar:arrow-right-linear" />
                        </span>

                      </span>

                    </button>

                  </div>

                  <div className="portfolio-footer__right">

                    <div className="portfolio-footer__column">

                      <span className="portfolio-footer__heading">
                        {t.footer.contact}
                      </span>

                      <a href="mailto:cauagonalmeida@gmail.com">
                        cauagonalmeida@gmail.com
                      </a>

                      <a
                        href="https://www.linkedin.com/in/caua-goncalves-de-almeida-44866a324/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>

                      <a href="tel:+5511989414218">
                        +55 (11) 99841-4218
                      </a>

                    </div>

                    <div className="portfolio-footer__column">

                      <span className="portfolio-footer__heading">
                        {t.footer.projects}
                      </span>

                      <button
                        className="portfolio-footer__project-link"
                        onClick={() => openModal("Gestock")}
                      >
                        Gestock
                      </button>

                      <button
                        className="portfolio-footer__project-link"
                        onClick={() => openModal("BravoPizzas")}
                      >
                        Bravo Pizza's
                      </button>

                      <button
                        className="portfolio-footer__project-link"
                        onClick={() => openModal("Edtech")}
                      >
                        Edtech
                      </button>

                    </div>

                  </div>

                </div>

                <div className="portfolio-footer__bottom">

                  <span>
                    © 2026 • Cauã Gonçalves de Almeida
                  </span>

                  <span>
                    {t.footer.developed}
                  </span>

                </div>

              </section>
            </main>

            {activeProject && (
              <div className="portfolio-modal">

                <div
                  className="portfolio-modal__backdrop"
                  ref={backdropRef}
                  onClick={closeModal}
                />

                <div className="portfolio-modal__content" ref={modalRef}>

                  <button
                    className="portfolio-modal__close"
                    onClick={closeModal}
                  >
                    ✕
                  </button>

                  <div className="portfolio-modal__carousel">

                    <img
                      key={currentImage}
                      src={projectsData[activeProject].images[currentImage]}
                      alt=""
                      className="portfolio-modal__image"
                    />

                    {projectsData[activeProject].images.length > 1 && (
                      <>
                        <button
                          className="portfolio-modal__arrow portfolio-modal__arrow--left"
                          onClick={prevImage}
                        >
                          ‹
                        </button>

                        <button
                          className="portfolio-modal__arrow portfolio-modal__arrow--right"
                          onClick={nextImage}
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>

                  <h2>{activeProject}</h2>
                  {activeProject === "Edtech" && (
                    <div className="portfolio-modal__beta-badge">
                      <Icon icon="solar:flask-linear" />
                      <span>{t.modal.beta}</span>
                    </div>
                  )}

                  <p>
                    {t.modal.descriptions[activeProject]}
                  </p>

                  {activeProject === "BravoPizzas" ? (

                    <div className="portfolio-modal__actions">

                      <a
                        href="https://bravopizzas.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-modal__github"
                      >
                        <span className="portfolio-modal__github-left">
                          <Icon icon="solar:rocket-linear" />
                          <span>{t.modal.access}</span>
                        </span>

                        <Icon icon="solar:arrow-right-linear" />
                      </a>

                      <a
                        href={projectsData[activeProject].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-modal__github"
                      >
                        <span className="portfolio-modal__github-left">
                          <Icon icon="mdi:github" />
                          <span>{t.modal.repository}</span>
                        </span>

                        <Icon icon="solar:arrow-right-linear" />
                      </a>

                    </div>

                  ) : (

                    <a
                      href={projectsData[activeProject].github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="portfolio-modal__github"
                    >
                      <span className="portfolio-modal__github-left">
                        <Icon icon="mdi:link-variant" />
                        <span>{t.modal.repository}</span>
                      </span>

                      <Icon icon="solar:arrow-right-linear" />
                    </a>

                  )}

                </div>
              </div>
            )}
          </div>
        }
      />
      <Route
        path="/contact"
        element={
          <div className="app">

            <Header
              t={t}
              language={language}
              changeLanguage={changeLanguage}
              scrollToSection={scrollToSection}
            />

            <Contact t={t} language={language} />

          </div>
        }
      />

    </Routes>
  );
}

export default App;