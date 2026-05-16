'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const WA_LINK =
  'https://wa.me/5547991906687?text=Ol%C3%A1%2C%20quero%20planejar%20uma%20viagem%20com%20a%20Flagship.';

const WA_ICON = (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19.05 4.91A10 10 0 0 0 4.5 18.36L3 22l3.74-1.46A10 10 0 1 0 19.05 4.91M12 20.13a8.07 8.07 0 0 1-4.11-1.13l-.3-.17l-2.22.87l.89-2.16l-.19-.31a8.13 8.13 0 1 1 15.05-4.32A8.16 8.16 0 0 1 12 20.13m4.46-6.09c-.24-.13-1.45-.72-1.67-.8s-.39-.12-.55.13s-.63.79-.78.95s-.28.18-.52.06a6.7 6.7 0 0 1-2-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5s.25-.29.37-.43a1.7 1.7 0 0 0 .25-.41a.45.45 0 0 0 0-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.92.92 0 0 0-.66.31a2.74 2.74 0 0 0-.86 2c0 1.21.88 2.38 1 2.55s1.74 2.67 4.23 3.74a14 14 0 0 0 1.41.52a3.4 3.4 0 0 0 1.56.1a2.55 2.55 0 0 0 1.67-1.18a2.06 2.06 0 0 0 .14-1.18c-.06-.1-.22-.16-.46-.28"
    />
  </svg>
);

export default function Home() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cleanups = [];

    /* reveal on enter */
    const revealEls = document.querySelectorAll('[data-reveal]');
    if (revealEls.length && 'IntersectionObserver' in window && !prefersReduced) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const delay = parseInt(e.target.dataset.revealDelay || '0', 10);
              setTimeout(() => e.target.classList.add('is-in'), delay);
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    } else {
      revealEls.forEach((el) => el.classList.add('is-in'));
    }

    /* nav scroll state */
    const nav = document.getElementById('nav');
    const onScroll = () => {
      if (!nav) return;
      nav.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener('scroll', onScroll));

    /* parallax */
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length && !prefersReduced) {
      let ticking = false;
      const tick = () => {
        parallaxEls.forEach((el) => {
          const rate = parseFloat(el.dataset.parallax || '0.2');
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - window.innerHeight / 2;
          el.style.transform = `translate3d(0,${(-center * rate).toFixed(1)}px,0) scale(1.08)`;
        });
        ticking = false;
      };
      const onP = () => {
        if (!ticking) { window.requestAnimationFrame(tick); ticking = true; }
      };
      tick();
      window.addEventListener('scroll', onP, { passive: true });
      window.addEventListener('resize', onP, { passive: true });
      cleanups.push(() => {
        window.removeEventListener('scroll', onP);
        window.removeEventListener('resize', onP);
      });
    }

    /* P360 sticky scroll */
    const scroller = document.querySelector('.p360__scroller');
    if (scroller) {
      const panels = scroller.querySelectorAll('.p360__panel');
      const steps  = scroller.querySelectorAll('.p360__step');
      const total  = steps.length;
      const counterNow  = scroller.querySelector('.p360__count-now');
      const progressBar = scroller.querySelector('.p360__progress > span');

      panels[0]?.classList.add('is-active');
      steps[0]?.classList.add('is-active');

      const setActive = (idx) => {
        panels.forEach((p, i) => p.classList.toggle('is-active', i === idx));
        steps.forEach((s, i) => s.classList.toggle('is-active', i === idx));
        if (counterNow) counterNow.textContent = String(idx + 1).padStart(2, '0');
        if (progressBar) progressBar.style.transform = `scaleX(${(idx + 1) / total})`;
      };

      if ('IntersectionObserver' in window) {
        const getBest = () => {
          let bestIdx = 0, bestDist = Infinity;
          steps.forEach((s, i) => {
            const r = s.getBoundingClientRect();
            const dist = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
            if (dist < bestDist) { bestDist = dist; bestIdx = i; }
          });
          return bestIdx;
        };
        const stepObs = new IntersectionObserver(
          () => setActive(getBest()),
          { threshold: [0.25, 0.5, 0.75], rootMargin: '-30% 0px -30% 0px' }
        );
        steps.forEach((s) => stepObs.observe(s));

        let raf = false;
        const onSc = () => {
          if (raf) return;
          raf = true;
          window.requestAnimationFrame(() => { setActive(getBest()); raf = false; });
        };
        window.addEventListener('scroll', onSc, { passive: true });
        cleanups.push(() => {
          stepObs.disconnect();
          window.removeEventListener('scroll', onSc);
        });
      }
    }

    /* smooth anchor scroll */
    const handleClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const tgt = document.querySelector(id);
      if (!tgt) return;
      e.preventDefault();
      window.scrollTo({
        top: tgt.getBoundingClientRect().top + window.scrollY - 80,
        behavior: prefersReduced ? 'auto' : 'smooth',
      });
    };
    document.addEventListener('click', handleClick);
    cleanups.push(() => document.removeEventListener('click', handleClick));

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      {/* Nav */}
      <header className="nav" id="nav">
        <div className="nav__inner">
          <a className="nav__brand" href="#top" aria-label="Flagship Viagens">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="nav__logo" src="/flagship-logo-white.png" alt="Flagship" />
          </a>
          <nav className="nav__links">
            <a href="#destinos">Destinos</a>
            <a href="#private360">Private 360</a>
            <a href="#processo">Como funciona</a>
            <a href="#sobre">Sobre</a>
          </nav>
          <a className="nav__cta" href={WA_LINK} target="_blank" rel="noopener">
            {WA_ICON}
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      <main id="top">

        {/* Hero */}
        <section className="hero" data-screen-label="01 Hero">
          <div className="hero__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero__img"
              data-parallax="0.18"
              src="/hero-bali.jpg"
              alt="Bali — Diamond Beach, Nusa Penida"
            />
            <div className="hero__veil" />
            <div className="hero__grad" />
            <div className="hero__vignette" />
          </div>
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light" data-reveal>Agência boutique · Roteiros sob medida</p>
            <h1 className="display" data-reveal data-reveal-delay="80">
              O mundo,<br /><em>do seu jeito.</em>
            </h1>
            <p className="hero__lede" data-reveal data-reveal-delay="160">
              Planejamos viagens que cabem na sua vida — de uma escapada para Fernando de Noronha a uma temporada em Maldivas. Pessoas reais, conhecimento real, conforto sem ruído.
            </p>
            <div className="hero__cta" data-reveal data-reveal-delay="220">
              <a className="btn btn--solid" href="#contato">Planejar minha viagem</a>
              <a className="btn btn--ghost" href="#private360">Conhecer o Private 360</a>
            </div>
          </div>
          <div className="hero__scroll" aria-hidden="true">
            <span>Role para explorar</span>
            <span className="hero__scroll-line" />
          </div>
        </section>

        {/* Manifesto */}
        <section className="manifesto" data-screen-label="02 Manifesto">
          <div className="container manifesto__grid">
            <p className="eyebrow" data-reveal>Manifesto</p>
            <h2 className="h2" data-reveal data-reveal-delay="60">
              Viajar bem é deixar o ruído para trás. Cada detalhe é resolvido antes mesmo de você pensar nele.
            </h2>
            <div className="manifesto__body" data-reveal data-reveal-delay="140">
              <p>A Flagship é uma agência de viagens boutique. Trabalhamos com poucos clientes por vez, porque acreditamos que uma boa viagem é construída em conversa — e não em formulário.</p>
              <p>Conhecemos os destinos, os hotéis certos, as companhias aéreas e os atalhos que só quem está dentro conhece. Quando faz sentido, usamos suas milhas. Quando não, encontramos o melhor caminho.</p>
            </div>
          </div>
        </section>

        {/* Destinos */}
        <section className="destinos" id="destinos" data-screen-label="03 Destinos">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow" data-reveal>Inspiração</p>
              <h2 className="h1" data-reveal data-reveal-delay="60">Destinos que valem a viagem.</h2>
              <p className="section-head__lede" data-reveal data-reveal-delay="120">
                Uma seleção dos lugares que nossos clientes mais visitam. Cada um deles, montado nota a nota.
              </p>
            </div>

            <div className="dest-grid">
              {/* L1: 3 cards */}
              <a className="card" href="#contato" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1400&q=85&auto=format&fit=crop" alt="Maldivas" />
                <div className="card__meta">
                  <span className="card__kicker">Oceano Índico</span>
                  <h3 className="card__title">Maldivas</h3>
                  <p className="card__desc">Bangalôs sobre a água, voo doméstico de hidroavião, jantar privativo no banco de areia.</p>
                </div>
              </a>
              <a className="card" href="#contato" data-reveal data-reveal-delay="60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=1200&q=85&auto=format&fit=crop" alt="Bali, Indonésia" />
                <div className="card__meta">
                  <span className="card__kicker">Indonésia</span>
                  <h3 className="card__title">Bali</h3>
                  <p className="card__desc">Villas em Ubud, templos ao amanhecer, cerimônias balinesas.</p>
                </div>
              </a>
              <a className="card" href="#contato" data-reveal data-reveal-delay="120">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=85&auto=format&fit=crop" alt="Santorini, Grécia" />
                <div className="card__meta">
                  <span className="card__kicker">Grécia</span>
                  <h3 className="card__title">Santorini</h3>
                  <p className="card__desc">Caldera, vinhos de assyrtiko e Mykonos para o capítulo seguinte.</p>
                </div>
              </a>

              {/* L2: wide + regular */}
              <a className="card card--wide" href="#contato" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?w=1800&q=85&auto=format&fit=crop" alt="Costa Amalfitana" />
                <div className="card__meta">
                  <span className="card__kicker">Itália</span>
                  <h3 className="card__title">Costa Amalfitana</h3>
                  <p className="card__desc">Positano, Ravello e Capri. Hotéis sobre a falésia, passeio de barco até a Gruta Azul.</p>
                </div>
              </a>
              <a className="card" href="#contato" data-reveal data-reveal-delay="60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1546412414-e1885259563a?w=1200&q=85&auto=format&fit=crop" alt="Dubai, Emirados Árabes" />
                <div className="card__meta">
                  <span className="card__kicker">Emirados Árabes</span>
                  <h3 className="card__title">Dubai</h3>
                  <p className="card__desc">Suítes panorâmicas, deserto privado ao pôr do sol, escala perfeita para a Ásia.</p>
                </div>
              </a>

              {/* L3: 3 cards */}
              <a className="card" href="#contato" data-reveal>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=1400&q=85&auto=format&fit=crop" alt="Bora Bora, Polinésia Francesa" />
                <div className="card__meta">
                  <span className="card__kicker">Polinésia Francesa</span>
                  <h3 className="card__title">Bora Bora</h3>
                  <p className="card__desc">A imagem-clichê de paraíso é real. Bangalôs Four Seasons e St. Regis.</p>
                </div>
              </a>
              <a className="card" href="#contato" data-reveal data-reveal-delay="60">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=85&auto=format&fit=crop" alt="Tóquio, Japão" />
                <div className="card__meta">
                  <span className="card__kicker">Japão</span>
                  <h3 className="card__title">Tóquio &amp; Kyoto</h3>
                  <p className="card__desc">Trens-bala, ryokans em Hakone, omakase em balcões de seis lugares.</p>
                </div>
              </a>
              <a className="card" href="#contato" data-reveal data-reveal-delay="120">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1800&q=85&auto=format&fit=crop" alt="Paris" />
                <div className="card__meta">
                  <span className="card__kicker">França</span>
                  <h3 className="card__title">Paris &amp; Provence</h3>
                  <p className="card__desc">Hotéis particulares no 6º, vinícolas em Châteauneuf-du-Pape, TGV até a Riviera.</p>
                </div>
              </a>
            </div>

            <a className="more-link" href="#contato" data-reveal>
              Não encontrou seu destino? Conta para a gente
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="none" stroke="currentColor" strokeWidth="1.5" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Private 360 */}
        <section className="p360" id="private360" data-screen-label="04 Private 360">
          <div className="p360__intro">
            <div className="container">
              <p className="eyebrow eyebrow--gold" data-reveal>Para clientes private</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="p360__logo" src="/p360-logo-transparent.png" alt="P360" data-reveal data-reveal-delay="40" />
              <h2 className="display display--gold display--small" data-reveal data-reveal-delay="60">
                Private <em>360</em>.
              </h2>
              <p className="p360__lede" data-reveal data-reveal-delay="120">
                Um serviço de gestão de viagens completo, montado para quem viaja muito, gasta no cartão e quer que cada milha vire um upgrade — sem precisar pensar nisso.
              </p>
            </div>
          </div>

          <div className="p360__scroller">
            <div className="p360__sticky">
              <div className="p360__panel" data-panel="0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1800&q=85&auto=format&fit=crop" alt="" />
              </div>
              <div className="p360__panel" data-panel="1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=85&auto=format&fit=crop" alt="" />
              </div>
              <div className="p360__panel" data-panel="2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1800&q=85&auto=format&fit=crop" alt="" />
              </div>
              <div className="p360__panel" data-panel="3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?w=1800&q=85&auto=format&fit=crop" alt="" />
              </div>
              <div className="p360__veil" />
              <div className="p360__hud">
                <div className="p360__count">
                  <span className="p360__count-now">01</span>
                  <span className="p360__count-sep">/</span>
                  <span className="p360__count-total">04</span>
                </div>
                <div className="p360__progress"><span /></div>
              </div>
            </div>

            <div className="p360__steps">
              <article className="p360__step" data-step="0">
                <span className="p360__num">01</span>
                <h3 className="h3">Gestão de milhas</h3>
                <p>Mapeamos todo o seu acúmulo — cartões, transferências, programas — e usamos as milhas onde elas pagam mais. Em geral, isso é classe executiva nos voos longos.</p>
              </article>
              <article className="p360__step" data-step="1">
                <span className="p360__num">02</span>
                <h3 className="h3">Concierge dedicado</h3>
                <p>Você tem uma pessoa. Uma só. Que conhece sua família, suas datas, seus hotéis preferidos e o jeito como você gosta de viajar.</p>
              </article>
              <article className="p360__step" data-step="2">
                <span className="p360__num">03</span>
                <h3 className="h3">Roteiros sob medida</h3>
                <p>Cada viagem é desenhada do zero. Hotéis selecionados, transfers privativos, reservas em restaurantes, experiências locais. Você só chega.</p>
              </article>
              <article className="p360__step" data-step="3">
                <span className="p360__num">04</span>
                <h3 className="h3">Suporte 24/7</h3>
                <p>Voo atrasou, hotel deu problema, mudou de planos no meio da viagem? Liga. Resolvemos do nosso lado, do seu fuso, em português.</p>
              </article>
            </div>
          </div>

          <div className="p360__roi">
            <div className="container p360__roi-grid">
              <div className="p360__roi-copy">
                <p className="eyebrow eyebrow--gold" data-reveal>Por que vale a pena</p>
                <h3 className="h2" data-reveal data-reveal-delay="60">
                  Se a sua viagem hoje custa R$&nbsp;100&nbsp;mil por ano, é provável que a gente devolva metade disso para o seu bolso.
                </h3>
                <p className="p360__roi-body" data-reveal data-reveal-delay="120">
                  O Private 360 se paga sozinho. Você delega o problema, recupera tempo, e o resultado financeiro fecha — com a viagem ficando, ainda assim, melhor do que estava.
                </p>
                <a className="btn btn--gold" href="#contato" data-reveal data-reveal-delay="180">
                  Conversar sobre o Private 360
                </a>
              </div>
              <div className="p360__roi-stats" data-reveal data-reveal-delay="180">
                <div className="stat">
                  <span className="stat__num">~50%</span>
                  <span className="stat__lbl">de redução média no custo anual de viagens</span>
                </div>
                <div className="stat">
                  <span className="stat__num">1:1</span>
                  <span className="stat__lbl">um concierge, uma família</span>
                </div>
                <div className="stat">
                  <span className="stat__num">24/7</span>
                  <span className="stat__lbl">suporte em português, em qualquer fuso</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="processo" id="processo" data-screen-label="05 Processo">
          <div className="container">
            <div className="section-head section-head--center">
              <p className="eyebrow" data-reveal>Como funciona</p>
              <h2 className="h1" data-reveal data-reveal-delay="60">Quatro passos. Sem ruído.</h2>
            </div>
            <ol className="process">
              <li className="process__item" data-reveal>
                <span className="process__num">01</span>
                <h3 className="h4">Conversa</h3>
                <p>Uma chamada pelo WhatsApp para entender o que você quer dessa viagem — e o que <em>não</em> quer.</p>
              </li>
              <li className="process__item" data-reveal data-reveal-delay="80">
                <span className="process__num">02</span>
                <h3 className="h4">Proposta</h3>
                <p>Em até 72 horas, um roteiro detalhado: voos, hotéis, experiências, valores. Tudo em um único documento.</p>
              </li>
              <li className="process__item" data-reveal data-reveal-delay="160">
                <span className="process__num">03</span>
                <h3 className="h4">Ajustes</h3>
                <p>Ajustamos junto com você até estar perfeito. Mudou de ideia? Trocamos. Sem perguntas.</p>
              </li>
              <li className="process__item" data-reveal data-reveal-delay="240">
                <span className="process__num">04</span>
                <h3 className="h4">Embarque</h3>
                <p>Você embarca. Nós ficamos no seu fuso, com suporte 24/7 até você voltar para casa.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Testimonial */}
        <section className="depoimento" data-screen-label="06 Depoimento">
          <div className="container depoimento__inner">
            <p className="eyebrow" data-reveal>Quem viaja com a Flagship</p>
            <blockquote className="depoimento__quote" data-reveal data-reveal-delay="80">
              <p>
                &ldquo;Eu não tenho tempo de ficar planejando viagem. Tenho dois filhos, três empresas e uma família que merece o meu fim de semana. A Flagship resolveu — desde a Disney com as crianças até as Maldivas com a minha esposa. Eu só chego e curto.&rdquo;
              </p>
              <footer>
                <span className="depoimento__name">José M.</span>
                <span className="depoimento__role">Empresário · Mato Grosso · Cliente Private 360</span>
              </footer>
            </blockquote>
          </div>
        </section>

        {/* CTA */}
        <section className="cta" id="contato" data-screen-label="07 Contato">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="cta__bg" data-parallax="0.15" src="/cta-bali-beach.jpg" alt="" />
          <div className="cta__veil" />
          <div className="container cta__inner">
            <p className="eyebrow eyebrow--light" data-reveal>Vamos planejar</p>
            <h2 className="display" data-reveal data-reveal-delay="80">
              A sua próxima viagem<br /><em>começa em uma conversa.</em>
            </h2>
            <p className="cta__lede" data-reveal data-reveal-delay="160">
              Conta para a gente o que você tem em mente. Em até 24 horas você fala com um especialista — sem compromisso, sem formulário interminável.
            </p>
            <div className="cta__buttons" data-reveal data-reveal-delay="220">
              <a className="btn btn--solid btn--lg" href={WA_LINK} target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.5 18.36L3 22l3.74-1.46A10 10 0 1 0 19.05 4.91M12 20.13a8.07 8.07 0 0 1-4.11-1.13l-.3-.17l-2.22.87l.89-2.16l-.19-.31a8.13 8.13 0 1 1 15.05-4.32A8.16 8.16 0 0 1 12 20.13m4.46-6.09c-.24-.13-1.45-.72-1.67-.8s-.39-.12-.55.13s-.63.79-.78.95s-.28.18-.52.06a6.7 6.7 0 0 1-2-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5s.25-.29.37-.43a1.7 1.7 0 0 0 .25-.41a.45.45 0 0 0 0-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.92.92 0 0 0-.66.31a2.74 2.74 0 0 0-.86 2c0 1.21.88 2.38 1 2.55s1.74 2.67 4.23 3.74a14 14 0 0 0 1.41.52a3.4 3.4 0 0 0 1.56.1a2.55 2.55 0 0 0 1.67-1.18a2.06 2.06 0 0 0 .14-1.18c-.06-.1-.22-.16-.46-.28" />
                </svg>
                Falar pelo WhatsApp
              </a>
              <a className="btn btn--ghost btn--lg btn--ghost-light" href="mailto:contato@flagshipviagens.com">
                contato@flagshipviagens.com
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer" id="sobre" data-screen-label="08 Sobre">
          <div className="container footer__grid">
            <div className="footer__brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="footer__logo" src="/flagship-logo-white.png" alt="Flagship" />
              <p className="footer__tag">Agência boutique de viagens sob medida.</p>
            </div>
            <div className="footer__col">
              <p className="footer__h">Navegar</p>
              <a href="#destinos">Destinos</a>
              <a href="#private360">Private 360</a>
              <a href="#processo">Como funciona</a>
            </div>
            <div className="footer__col">
              <p className="footer__h">Contato</p>
              <a href="https://wa.me/5547991906687" target="_blank" rel="noopener">WhatsApp</a>
              <a href="mailto:contato@flagshipviagens.com">contato@flagshipviagens.com</a>
            </div>
            <div className="footer__col">
              <p className="footer__h">Endereço</p>
              <p className="footer__body">Av. Pereira Barreto, 1479, Sala 2108<br />Baeta Neves · São Bernardo do Campo — SP<br />CEP 09.751-000</p>
              <p className="footer__body">Atendimento de segunda a sábado</p>
            </div>
          </div>
          <div className="container footer__legal">
            <span>© 2026 Flagship Viagens Ltda · CNPJ 55.835.485/0001-25 · Todos os direitos reservados.</span>
            <span className="footer__legal-right">
              <Link href="/termos">Termos</Link>
              <Link href="/privacidade">Privacidade</Link>
            </span>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp */}
      <a className="wa-float" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
          <path fill="currentColor" d="M19.05 4.91A10 10 0 0 0 4.5 18.36L3 22l3.74-1.46A10 10 0 1 0 19.05 4.91M12 20.13a8.07 8.07 0 0 1-4.11-1.13l-.3-.17l-2.22.87l.89-2.16l-.19-.31a8.13 8.13 0 1 1 15.05-4.32A8.16 8.16 0 0 1 12 20.13m4.46-6.09c-.24-.13-1.45-.72-1.67-.8s-.39-.12-.55.13s-.63.79-.78.95s-.28.18-.52.06a6.7 6.7 0 0 1-2-1.22a7.4 7.4 0 0 1-1.37-1.7c-.14-.25 0-.38.11-.5s.25-.29.37-.43a1.7 1.7 0 0 0 .25-.41a.45.45 0 0 0 0-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.92.92 0 0 0-.66.31a2.74 2.74 0 0 0-.86 2c0 1.21.88 2.38 1 2.55s1.74 2.67 4.23 3.74a14 14 0 0 0 1.41.52a3.4 3.4 0 0 0 1.56.1a2.55 2.55 0 0 0 1.67-1.18a2.06 2.06 0 0 0 .14-1.18c-.06-.1-.22-.16-.46-.28" />
        </svg>
      </a>
    </>
  );
}
