import Link from 'next/link';

export const metadata = {
  title: "Mentions Légales — Hibo",
  description: "Informations légales concernant l’éditeur et l’hébergeur du site hibo.app.",
};

export default function MentionsLegales() {
  return (
    <main className="section" style={{ paddingTop: '8rem', backgroundColor: '#fff', minHeight: '100vh' }}>
      <div className="section-container" style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: '1.1',
          marginBottom: '3rem',
          fontFamily: 'var(--font-heading)',
          fontWeight: '800'
        }}>
          Mentions Légales
        </h1>

        <div className="legal-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Éditeur du site</h2>
            <p>
              Le site hibo.app est édité par Sallé Hugo, agissant en tant que Micro-entrepreneur.<br />
              SIRET : 93435565200017<br />
              Email : contact@hibo.app
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Hébergement</h2>
            <p>
              Le site est hébergé par :<br />
              <strong>Cloudflare Inc.</strong><br />
              101 Townsend St, San Francisco, CA 94107, États-Unis.<br />
              Site web : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>www.cloudflare.com</a>
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Propriété intellectuelle</h2>
            <p>
              L’ensemble de ce site relève de la législation française et internationale sur le droit d’auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Données personnelles</h2>
            <p>
              Hibo s’engage à ce que la collecte et le traitement de vos données, effectués à partir du site hibo.app, soient conformes au règlement général sur la protection des données (RGPD).
            </p>
            <p style={{ marginTop: '1rem' }}>
              Pour toute information sur le traitement de vos données personnelles, vous pouvez consulter notre <Link href="/politique-de-confidentialite" style={{ color: 'var(--primary)', fontWeight: '600' }}>Politique de confidentialité</Link>.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Contact</h2>
            <p>
              Pour toute question, vous pouvez nous contacter à l'adresse suivante : contact@hibo.app.
            </p>
          </section>
        </div>

        <div style={{ marginTop: '5rem', padding: '2rem 0', borderTop: '1px solid #eee' }}>
          <Link href="/" style={{ color: 'var(--primary)', fontWeight: '700', textDecoration: 'none' }}>
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
