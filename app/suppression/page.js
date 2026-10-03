export const metadata = {
  title: "Suppression des données – Publieur de Reels",
};

const box = { maxWidth: 680, margin: "0 auto", padding: 20, lineHeight: 1.6 };
const h2 = { fontSize: 20, marginTop: 28 };

export default function Page() {
  const contact =
    process.env.CONTACT_EMAIL || "(adresse de contact à renseigner)";
  return (
    <main style={box}>
      <h1>Suppression des données</h1>
      <p>Dernière mise à jour : octobre 2026</p>
      <p>
        Publieur de Reels ne conserve pas tes données dans une base de données.
        Voici comment supprimer ce que le service peut détenir à ton sujet.
      </p>

      <h2 style={h2}>1. Te déconnecter du service</h2>
      <p>
        Sur le site, appuie sur « Se déconnecter ». Cela supprime le cookie qui
        contient ton jeton d’accès Instagram dans ton navigateur.
      </p>

      <h2 style={h2}>2. Retirer l’accès depuis Instagram</h2>
      <ol>
        <li>Ouvre l’application Instagram et va sur ton profil.</li>
        <li>Menu ☰, puis « Paramètres et activité ».</li>
        <li>Cherche « Applications et sites Web ».</li>
        <li>Sélectionne « Publieur Reels » et appuie sur « Supprimer ».</li>
      </ol>
      <p>Le service perd alors tout accès à ton compte Instagram.</p>

      <h2 style={h2}>3. Vidéos envoyées au serveur</h2>
      <p>
        Les vidéos sont temporaires : elles sont supprimées après une
        publication réussie, ou lors du prochain redémarrage du serveur.
      </p>

      <h2 style={h2}>4. Demander une suppression</h2>
      <p>
        Pour toute demande d’accès ou de suppression de données, écris à :{" "}
        {contact}. Indique ton nom d’utilisateur Instagram.
      </p>

      <p>
        Voir aussi la <a href="/confidentialite">politique de confidentialité</a>{" "}
        et les <a href="/conditions">conditions d’utilisation</a>.
      </p>
    </main>
  );
          }
