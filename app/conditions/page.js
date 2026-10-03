export const metadata = {
  title: "Conditions d'utilisation – Publieur de Reels",
};

const box = { maxWidth: 680, margin: "0 auto", padding: 20, lineHeight: 1.6 };
const h2 = { fontSize: 20, marginTop: 28 };

export default function Page() {
  const contact =
    process.env.CONTACT_EMAIL || "(adresse de contact à renseigner)";
  return (
    <main style={box}>
      <h1>Conditions d’utilisation</h1>
      <p>Dernière mise à jour : octobre 2026</p>

      <h2 style={h2}>Le service</h2>
      <p>
        Publieur de Reels permet de sélectionner plusieurs vidéos et de les
        publier sur ton compte Instagram professionnel, chacune sous la forme
        d’un Reel indépendant. Le service est fourni tel quel, sans garantie de
        disponibilité.
      </p>

      <h2 style={h2}>Ton compte et tes contenus</h2>
      <ul>
        <li>
          Tu dois utiliser un compte Instagram professionnel que tu as le droit
          de gérer.
        </li>
        <li>
          Tu restes seul responsable des vidéos, légendes et hashtags que tu
          publies, et tu confirmes détenir les droits nécessaires (images, sons,
          musiques).
        </li>
        <li>
          Tu dois respecter les conditions d’utilisation et les règles de la
          communauté d’Instagram et de Meta.
        </li>
      </ul>

      <h2 style={h2}>Usages interdits</h2>
      <p>
        Il est interdit d’utiliser le service pour publier des contenus
        illégaux, trompeurs, haineux ou portant atteinte aux droits de tiers,
        pour envoyer du spam, ou pour tenter de perturber le service.
      </p>

      <h2 style={h2}>Limites</h2>
      <p>
        Les publications dépendent d’Instagram, qui peut refuser une vidéo ou
        limiter le nombre de publications. Le service ne peut pas être tenu
        responsable d’un échec, d’un retard ou d’une suppression décidés par
        Instagram, ni d’une interruption de l’hébergement.
      </p>

      <h2 style={h2}>Fin de l’accès</h2>
      <p>
        Tu peux te déconnecter ou retirer l’accès depuis Instagram à tout
        moment. L’accès peut être suspendu en cas d’abus.
      </p>

      <h2 style={h2}>Données personnelles</h2>
      <p>
        Voir la <a href="/confidentialite">politique de confidentialité</a>.
      </p>

      <h2 style={h2}>Contact</h2>
      <p>{contact}</p>
    </main>
  );
          }
