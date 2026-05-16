import Link from 'next/link';

export const metadata = {
  title: 'Termos de Uso — Flagship Viagens',
};

export default function Termos() {
  return (
    <>
      <header className="legal-nav">
        <div className="legal-nav__inner">
          <Link className="legal-nav__brand" href="/" aria-label="Flagship Viagens">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/flagship-logo-white.png" alt="Flagship" />
          </Link>
          <Link className="legal-nav__back" href="/">← Voltar ao site</Link>
        </div>
      </header>

      <main className="legal">
        <div className="container legal__inner">
          <p className="eyebrow">Documento legal</p>
          <h1 className="legal__title">Termos de Uso</h1>
          <p className="legal__updated">Última atualização: 16 de maio de 2026</p>

          <section>
            <h2>1. Aceitação dos Termos</h2>
            <p>Ao acessar e utilizar o site da Flagship Viagens ("nós", "nossa", "Flagship"), você ("cliente", "usuário", "você") concorda integralmente com estes Termos de Uso. Caso não concorde com qualquer disposição, recomendamos que não utilize nossos serviços.</p>
          </section>

          <section>
            <h2>2. Sobre a Flagship Viagens</h2>
            <p>A Flagship Viagens é uma agência de viagens boutique, especializada no planejamento de viagens sob medida e em serviços de gestão de milhas e concierge para clientes private por meio do produto Private 360. Atuamos como intermediários entre o cliente e fornecedores de serviços de viagem, como companhias aéreas, redes hoteleiras, operadoras de cruzeiros e prestadores locais.</p>
          </section>

          <section>
            <h2>3. Natureza dos Serviços</h2>
            <p>Nossos serviços compreendem consultoria de viagem, elaboração de roteiros personalizados, intermediação de reservas, gestão de programas de milhas e suporte ao cliente durante e após a viagem. Os preços, condições e disponibilidade são definidos pelos fornecedores parceiros e podem sofrer alterações sem aviso prévio.</p>
          </section>

          <section>
            <h2>4. Contratação e Pagamento</h2>
            <p>A contratação dos nossos serviços é formalizada por proposta escrita, enviada por e-mail ou WhatsApp, e confirmada mediante aceite expresso e pagamento conforme condições acordadas. Os valores cobrados pela Flagship Viagens referem-se aos honorários da agência e podem ser separados dos valores pagos diretamente aos fornecedores.</p>
          </section>

          <section>
            <h2>5. Responsabilidades do Cliente</h2>
            <p>É de responsabilidade do cliente: (i) fornecer informações corretas e completas, incluindo nomes conforme documento de viagem; (ii) verificar exigências de passaporte, visto, vacinação e demais documentos para o destino; (iii) contratar seguro-viagem adequado; (iv) cumprir prazos de pagamento e check-in.</p>
          </section>

          <section>
            <h2>6. Cancelamentos e Alterações</h2>
            <p>Cancelamentos e alterações estão sujeitos às políticas dos fornecedores envolvidos (companhias aéreas, hotéis, operadoras). A Flagship Viagens auxiliará o cliente em todas as gestões necessárias, mas não se responsabiliza por penalidades, multas ou diferenças tarifárias aplicadas pelos fornecedores.</p>
          </section>

          <section>
            <h2>7. Limitação de Responsabilidade</h2>
            <p>A Flagship Viagens atua como intermediária e não se responsabiliza por eventos de força maior, alterações de itinerário por parte das companhias aéreas, condições climáticas, atrasos, perdas de bagagem, falhas de fornecedores ou prejuízos decorrentes do descumprimento, pelo cliente, de exigências documentais ou sanitárias.</p>
          </section>

          <section>
            <h2>8. Propriedade Intelectual</h2>
            <p>Todo o conteúdo deste site — incluindo textos, fotografias, logotipos, identidade visual "Flagship" e "Private 360" — é de propriedade da Flagship Viagens ou de seus respectivos licenciantes e está protegido pela legislação de propriedade intelectual aplicável. É proibida a reprodução sem autorização prévia e por escrito.</p>
          </section>

          <section>
            <h2>9. Comunicação</h2>
            <p>O canal oficial de comunicação com a Flagship Viagens é o WhatsApp e o e-mail informados neste site. A Flagship não solicita dados bancários, senhas ou códigos por outros meios.</p>
          </section>

          <section>
            <h2>10. Foro e Legislação</h2>
            <p>Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São Bernardo do Campo — SP, para dirimir quaisquer questões oriundas destes Termos, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
          </section>

          <section>
            <h2>11. Contato</h2>
            <p>Dúvidas sobre estes Termos podem ser enviadas para <a href="mailto:contato@flagshipviagens.com">contato@flagshipviagens.com</a>.</p>
          </section>
        </div>
      </main>

      <footer className="legal-foot">
        <div className="container legal-foot__inner">
          <span>© 2026 Flagship Viagens.</span>
          <span>
            <Link href="/termos">Termos</Link>
            {' · '}
            <Link href="/privacidade">Privacidade</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
