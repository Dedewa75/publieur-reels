export const metadata = {
  title: "Politique de confidentialité – Publieur de Reels",
};

const box = { maxWidth: 680, margin: "0 auto", padding: 20, lineHeight: 1.6 };
const h2 = { fontSize: 20, marginTop: 28 };

export default function Page() {
  const contact =
    process.env.CONTACT_EMAIL || "(adresse de contact à renseigner)";
  return (
    <main style={box}>
      <h1>Politique de confidentialité</h1>
      <p>Dernière mise à jour : octobre 2026</p>
      <p>
        Publieur de Reels est un service qui permet de publier plusieurs vidéos
        sur Instagram, chacune comme un Reel indépendant. Il est exploité depuis
        la Belgique.
      </p>

      <h2 style={h2}>Données traitées</h2>
      <ul>
        <li>
          <b>Connexion Instagram</b> : lorsque tu te connectes, Instagram
          transmet au service un jeton d’accès et ton nom d’utilisateur. Le
          jeton est conservé dans un cookie de ton navigateur, pas dans une base
          de données.
        </li>
        <li>
          <b>Vidéos</b> : les vidéos que tu sélectionnes sont envoyées
          temporairement au serveur pour qu’Instagram puisse les récupérer. Elles
          sont supprimées après une publication réussie. Si une publication
          échoue, la vidéo peut rester sur le serveur jusqu’à son prochain
          redémarrage.
        </li>
        <li>
          <b>Légendes et hashtags</b> : transmis à Instagram au moment de la
          publication, non conservés par le service.
        </li>
      </ul>

      <h2 style={h2}>Finalité</h2>
      <p>
        Ces données servent uniquement à publier tes vidéos sur ton compte
        Instagram, à ta demande. Elles ne sont ni vendues ni utilisées à des fins
        publicitaires.
      </p>

      <h2 style={h2}>Partage</h2>
      <p>
        Les données sont transmises à Meta (Instagram) pour réaliser la
        publication. Le service est hébergé par Render, qui traite les fichiers
        envoyés au serveur.
      </p>

      <h2 style={h2}>Cookies</h2>
      <p>
        Le service utilise un cookie technique de connexion (durée maximale
        d’environ 50 jours, supprimé quand tu te déconnectes) et un cookie de
        sécurité temporaire (10 minutes) pendant la connexion. Il n’y a ni
        traceur publicitaire ni outil de statistiques.
      </p>

      <h2 style={h2}>Tes droits</h2>
      <p>
        Tu peux te déconnecter à tout moment avec le bouton « Se déconnecter »,
        retirer l’accès depuis Instagram, ou demander l’accès ou la suppression
        de tes données. Voir la page{" "}
        <a href="/suppression">Suppression des données</a>.
      </p>

      <h2 style={h2}>Contact</h2>
      <p>{contact}</p>
    </main>
  );
}
