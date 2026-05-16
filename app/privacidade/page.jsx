import Link from 'next/link';

export const metadata = {
  title: 'Política de Privacidade — Flagship Viagens',
};

export default function Privacidade() {
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
          <h1 className="legal__title">Política de Privacidade</h1>
          <p className="legal__updated">Última atualização: 16 de maio de 2026</p>

          <section>
            <h2>1. Quem somos</h2>
            <p>A <strong>Flagship Viagens Ltda</strong>, inscrita no CNPJ sob o nº 55.835.485/0001-25, com sede na Av. Pereira Barreto, 1479, Sala 2108, Baeta Neves, São Bernardo do Campo — SP, CEP 09.751-000, e-mail <a href="mailto:contato@flagshipviagens.com">contato@flagshipviagens.com</a>, é a controladora dos dados pessoais coletados por meio deste site, do WhatsApp oficial e do e-mail de atendimento. Esta política descreve como tratamos seus dados de acordo com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).</p>
          </section>

          <section>
            <h2>2. Dados que coletamos</h2>
            <p>Coletamos apenas os dados necessários para prestar nossos serviços:</p>
            <ul>
              <li><strong>Dados de contato:</strong> nome, e-mail, telefone, cidade.</li>
              <li><strong>Dados de viagem:</strong> destino desejado, datas, número de passageiros, preferências de hotel e companhia aérea.</li>
              <li><strong>Dados documentais:</strong> nome completo, RG, CPF, passaporte e data de nascimento — exigidos para emissão de bilhetes e reservas.</li>
              <li><strong>Dados de fidelidade:</strong> programas de milhas e cartões de crédito vinculados, quando aplicável ao serviço Private 360.</li>
              <li><strong>Dados de navegação:</strong> informações anônimas de uso do site (páginas visitadas, dispositivo, origem do acesso), por meio de cookies e ferramentas analíticas.</li>
            </ul>
          </section>

          <section>
            <h2>3. Como usamos seus dados</h2>
            <p>Utilizamos seus dados exclusivamente para: (i) elaborar propostas de viagem e roteiros personalizados; (ii) realizar reservas e emissões junto a fornecedores; (iii) gerenciar seu programa de milhas no contexto do Private 360; (iv) entrar em contato sobre sua viagem; (v) cumprir obrigações legais e fiscais.</p>
          </section>

          <section>
            <h2>4. Compartilhamento</h2>
            <p>Compartilhamos dados apenas com fornecedores diretamente envolvidos na sua viagem — companhias aéreas, hotéis, operadoras de turismo, operadoras de cartões de milhas — e com autoridades, quando legalmente exigido. Não comercializamos seus dados sob nenhuma hipótese.</p>
          </section>

          <section>
            <h2>5. Armazenamento e segurança</h2>
            <p>Seus dados são armazenados em ambientes controlados, com criptografia em trânsito e em repouso. Adotamos medidas técnicas e administrativas para proteger seus dados contra acesso não autorizado, perda ou alteração.</p>
          </section>

          <section>
            <h2>6. Retenção</h2>
            <p>Mantemos seus dados pelo tempo necessário para a prestação dos serviços e cumprimento de obrigações legais. Após esse período, os dados são anonimizados ou eliminados de forma segura.</p>
          </section>

          <section>
            <h2>7. Seus direitos</h2>
            <p>Você pode, a qualquer momento: confirmar a existência de tratamento; acessar seus dados; corrigi-los; solicitar anonimização, bloqueio ou eliminação; portabilidade; informações sobre compartilhamento; e revogação do consentimento. Para exercer qualquer direito, envie uma solicitação para <a href="mailto:contato@flagshipviagens.com">contato@flagshipviagens.com</a>.</p>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos para entender, de forma anônima, como o site é utilizado. Você pode desativar cookies nas configurações do seu navegador.</p>
          </section>

          <section>
            <h2>9. Mudanças nesta Política</h2>
            <p>Esta Política pode ser atualizada periodicamente. Recomendamos a revisão regular. A data da última atualização está sempre indicada no topo deste documento.</p>
          </section>

          <section>
            <h2>10. Encarregado e Contato</h2>
            <p>Para qualquer questão relacionada à privacidade dos seus dados, entre em contato com nosso Encarregado de Proteção de Dados pelo e-mail <a href="mailto:contato@flagshipviagens.com">contato@flagshipviagens.com</a> ou pelo WhatsApp <a href="https://wa.me/5547991906687">+55 47 99190-6687</a>.</p>
            <p><strong>Flagship Viagens Ltda</strong> · CNPJ 55.835.485/0001-25<br />Av. Pereira Barreto, 1479, Sala 2108 — Baeta Neves · São Bernardo do Campo — SP · CEP 09.751-000</p>
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
