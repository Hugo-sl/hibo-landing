import Link from 'next/link';

export const metadata = {
  title: "Politique de confidentialité — Hibo",
  description: "Engagement de Hibo concernant la protection de vos données personnelles et votre vie privée.",
};

export default function PolitiqueConfidentialite() {
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
          Politique de confidentialité
        </h1>

        <div className="legal-content" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          <p style={{ marginBottom: '2rem', fontStyle: 'italic' }}>Dernière mise à jour : 22 avril 2026</p>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>1. Introduction</h2>
            <p>
              La protection de vos données personnelles est une priorité pour Hibo. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations dans le cadre de l’utilisation du site hibo.app et de l’application mobile Hibo.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>2. Responsable du traitement</h2>
            <p>
              Le responsable du traitement des données est :<br />
              <strong>Sallé Hugo</strong>, micro-entrepreneur<br />
              Adresse : Tresses 33370, France<br />
              Email : <a href="mailto:contact@hibo.app" style={{ color: 'var(--primary)' }}>contact@hibo.app</a>
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>3. Données collectées</h2>
            <p>Nous collectons les données suivantes nécessaires à la fourniture de notre service :</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Identité : Prénom, Nom</li>
              <li>Contact : Adresse email, Numéro de téléphone (obligatoire pour le système d'alerte)</li>
              <li>Données d'utilisation : Statistiques de base via l'application mobile</li>
            </ul>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>4. Finalités et Base légale</h2>
            <p>
              Vos données sont traitées uniquement pour les finalités suivantes :
            </p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li>Fonctionnement du service d'alerte et de sécurité Hibo.</li>
              <li>Gestion et support technique des utilisateurs.</li>
              <li>Information sur les évolutions du service.</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>
              La base légale du traitement est <strong>l'exécution du contrat</strong> (Art. 6.1.b du RGPD), le traitement étant nécessaire pour vous fournir le service Hibo.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>5. Conservation des données</h2>
            <p>
              Les données personnelles sont conservées pendant toute la durée de l’existence de votre compte utilisateur. En cas de suppression du compte ou d'inactivité prolongée, vos données sont conservées pendant un maximum de <strong>3 ans</strong> à des fins de preuve et de support avant d'être définitivement supprimées.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>6. Sous-traitants et Destinataires</h2>
            <p>Nous utilisons des services tiers de confiance pour assurer le bon fonctionnement de Hibo :</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              <li><strong>Cloudflare Inc.</strong> : Hébergement du site et sécurité.</li>
              <li><strong>Supabase</strong> : Hébergement de la base de données sécurisée.</li>
              <li><strong>Twilio</strong> : Envoi automatisé des alertes par SMS.</li>
              <li><strong>Resend</strong> : Envoi des emails de service.</li>
            </ul>
            <p style={{ marginTop: '1rem' }}>Ces prestataires ont accès à vos données uniquement pour réaliser les missions que nous leur confions, dans le respect du RGPD.</p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>7. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, portabilité, opposition, et limitation du traitement.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Pour exercer vos droits, contactez-nous simplement par email : <a href="mailto:contact@hibo.app" style={{ color: 'var(--primary)' }}>contact@hibo.app</a>.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Vous avez également le droit d'introduire une réclamation auprès de la CNIL sur leur site internet : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>www.cnil.fr</a>.
            </p>
          </section>

          <section style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>8. Cookies et Publicité</h2>
            <p>
              Hibo n'utilise aucun cookie tiers à des fins publicitaires ou de ciblage. Nous n'affichons aucune publicité sur notre plateforme.
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
