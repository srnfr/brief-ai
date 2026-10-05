# Audit cyber de code dans un environnement maîtrisé

## Objet de l’offre

BlueTrusty propose une analyse de sécurité du code logiciel mis à sa disposition par le client. L’objectif est d’identifier les vulnérabilités et les scénarios de risque qui méritent une correction ou une investigation complémentaire, puis de les restituer dans un rapport exploitable.

L’intervention s’adresse notamment aux applications métier, aux API, aux composants exposés, aux produits en préparation et aux patrimoines logiciels qui concentrent des enjeux de confidentialité ou de disponibilité.

Elle est particulièrement adaptée aux organisations qui ne souhaitent pas exposer leur base de code à des services externes, afin de préserver la confidentialité et leur propriété intellectuelle. Elle répond aussi aux cas où l’usage d’outils d’IA en cloud reste inacceptable, y compris lorsque ces outils proposent une configuration ZDR, ou *Zero Data Retention*.

Ces préoccupations rejoignent la [controverse récente autour de travaux mathématiques non publiés et des conditions dans lesquelles OpenAI aurait pu en avoir connaissance](https://www.wired.com/story/openai-navier-stokes-math-discovery-academics/). Les faits sont contestés, mais cet épisode rappelle l’importance de maîtriser précisément où circulent le code, les échanges et les résultats de recherche.

## Un environnement adapté aux codes sensibles

Le code source, les dépendances, les configurations et la documentation utile sont étudiés dans une enclave située en Union européenne. Le matériel IA mobilisé est réservé à cette fonction. L’analyse ne repose pas sur un service cloud mutualisé et ne nécessite pas de transmettre le code à une plateforme d’IA commerciale.

Le périmètre est défini avant le transfert. Les modalités de remise, les règles de manipulation et le canal de restitution sont convenus avec le client afin de s’aligner sur ses contraintes de confidentialité.

Selon le volume du périmètre, l’enclave s’appuie sur des capacités NVIDIA de dernière génération, notamment Blackwell, ou sur des châssis DGX. Ces ressources sont réservées pour la durée de l’audit et louées à l’heure. Elles apportent la puissance de calcul nécessaire sans transformer l’intervention en un service IA mutualisé.

Les interactions éventuellement nécessaires avec Internet, par exemple pour consulter une documentation technique ou télécharger un outil spécifique, passent par un proxy dédié. Les destinations autorisées relèvent d’une liste blanche stricte et particulièrement surveillée. Ce contrôle des flux sortants vise à prévenir toute transmission non autorisée de code, de données ou de propriété intellectuelle hors de l’enclave.

## Une analyse qui suit les relations dans le code

Les vulnérabilités se révèlent souvent dans les relations entre composants plutôt que dans une instruction isolée. L’analyse examine donc les flux de données, les contrôles d’accès, les secrets, les dépendances et les hypothèses de configuration qui peuvent former un chemin d’attaque plausible.

Plusieurs agents spécialisés travaillent en parallèle sur les zones les plus pertinentes du périmètre. Cette organisation permet de traiter de grandes bases de code sans limiter l’investigation à quelques fichiers ou à une lecture séquentielle.

Le dispositif utilise du matériel IA de dernière génération et un modèle frontière de type MoE, fine-tuné à partir de nos audits anonymisés et d’une documentation cybersécurité sélectionnée. Les éléments anonymisés sont conservés dans un espace de stockage raw dédié, afin d’améliorer progressivement les capacités du moteur d’audit cyber. Les résultats produits par les agents sont rapprochés, contextualisés et structurés pour former une vue cohérente des risques.

## Déroulé de l’audit

1. **Cadrage**. Définition du périmètre, des composants sensibles, des hypothèses de menace et des attentes de restitution.
2. **Cartographie**. Lecture de l’architecture, des frontières de confiance, des dépendances et des flux qui portent les données sensibles.
3. **Investigation**. Recherche des faiblesses et des enchaînements qui pourraient être exploités dans le contexte applicatif.
4. **Qualification**. Mise en perspective de chaque constat selon son impact potentiel, sa plausibilité et sa priorité de traitement.
5. **Restitution**. Présentation des résultats aux décideurs et aux équipes techniques afin de préparer les remédiations.

## Un rapport conçu pour la décision et la correction

Le rapport, réalisé avec l’assistance de l’IA dans cet environnement maîtrisé, distingue les constats selon leur niveau de priorité. Pour chacun, il précise le contexte concerné, le scénario de risque, l’impact potentiel, les éléments de preuve utiles et une orientation de remédiation. Une synthèse facilite les arbitrages de pilotage, tandis que les équipes techniques disposent des informations nécessaires pour organiser les corrections.

Des annexes techniques détaillées accompagnent le rapport. Elles peuvent notamment présenter des propositions de correction de code, afin d’aider les équipes à préparer et à accélérer les remédiations.

Une restitution permet ensuite d’échanger sur les conclusions, de préciser les points sensibles et de définir les prochaines étapes.

## Cadre et limites

L’IA apporte une capacité d’exploration adaptée aux périmètres étendus et accélère l’investigation. Le service ne constitue pas une certification du logiciel ni une garantie d’absence de vulnérabilité. Les résultats sont communiqués dans le cadre précis du périmètre audité et des éléments mis à disposition.

## Références pour approfondir le sujet

Le cadre méthodologique est aussi présenté dans les ressources suivantes :

- [Formation ORSYS : Plateforme IA d’entreprise, construire une architecture hybride](https://www.orsys.fr/formation/ahi)
- [Formation Institut Capgemini : construire sa plateforme IA d’entreprise souveraine et maîtrisée](https://www.institut.capgemini.fr/formation/construire-sa-plateforme-ia-d-entreprise-souveraine-et-maitrisee/)
- [Article ChannelNews : ITS Group formalise une offre d’accompagnement à la construction de plateformes IA souveraines](https://www.channelnews.fr/its-group-formalise-une-offre-daccompagnement-a-la-construction-de-plateformes-ia-souveraines-159132)

## Certification

BlueTrusty est certifié ISO 27001.
