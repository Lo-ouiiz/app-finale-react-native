## 🔰 Démarche pendant le développement

Pour implémenter les différentes fonctionnalités de l'app, j'ai choisi de créer un fil de conversation unique avec ChatGPT que j'ai conservé pour tout le projet.

Lien vers le chat : [Conversation ChatGPT](https://chatgpt.com/share/68fa38be-71ec-8012-84cb-d640c73c9ae9)

Cette manière de faire a plusieurs avantages :

- elle permet à Chat de garder en mémoire les fonctionnalités ajoutées juste avant, donc il était plus facile d'intégrer les nouvelles fonctionnalités
- elle évite de devoir répéter constamment les mêmes infos ou le contexte, ce qui peut être utile lorsque le projet devient un peu plus complexe

Par contre, cette méthode a aussi des inconvénients :

- le fil de conversation est rapidement devenu long et peut être difficile à gérer
- si à un moment donné, la discussion va dans une direction qui ne correspond pas à mes ce que je veux ou qui introduit des erreurs, il faut créer un nouveau fil et fournir à Chat tout le contexte à nouveau

Quand j'ai rédigé les prompts, j'ai essayé de fournir un contexte assez complet et précis. J'essayais de lui donner toutes les infos nécessaires pour qu'il comprenne ce que j'attendais de lui.
Il fallait un peu anticiper tout ce qui était incompréhensions et structurer les demandes pour que ses réponses soient pertinentes.
Quand les réponses de Chat ne correspondaient pas totalement à mes attentes, je reformulais les prompts ou j'ajoutais des détails pour le guider un peu mieux.

Donc pour résumer ma manière de procéder :

- demander une fonctionnalité avec le contexte précédant ou le contexte de base pour le 1er prompt
- si ok, demander à l'intégrer dans le fichier du projet / si erreur ou incompréhension, reformuler ou donner l'erreur pour avancer
- recommencer pour chaque fonctionnalité

## 🔰 Retour d'expérience

Si je devais refaire le projet plus proprement, je ferais plusieurs modification dans ma manière de procéder :

- créer une branche par fonctionnalité pour travailler de manière isolée et tester sans risquer de casser le projet
- mieux structurer les prompts pour donner un contexte complet et précis dès le début pour limiter les reformulations
- réinitialiser le fil de conversation si nécessaire pour éviter qu’il devienne confus et perde en pertinence
- prioriser les fonctionnalités pour l’implémentation pour mieux gérer le fil de conversation et éviter les allers-retours
- vérifier ce que ChatGPT dit car il donne parfois des informations obsolètes (exemple avec le son du chat pour lequel j'aurais dû utiliser un autre module)
