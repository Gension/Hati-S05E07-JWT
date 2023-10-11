# Challenge du Soir: Implémentation d'Utilisateurs et Sécurisation avec JWT

## Objectif:
Sécurisation de l'API Todo List réalisée hier en ajoutant un modèle `User` et en sécurisant certaines routes avec JWT (JSON Web Tokens).

## Instructions:

### 1. **Modèle User:**
   - Créez un modèle (Schema) `User` avec Mongoose.
   - Les champs requis sont `username` et `password`.
   - Assurez-vous de hasher les mots de passe avant de les stocker dans la base de données. (`bcrypt` 😉😉)

### 2. **Routes User:**
   - Implémentez une route `POST /users/register` pour créer un nouvel utilisateur.
     - Cette route doit valider les données reçues, hasher le mot de passe, et créer un nouvel utilisateur dans la base de données.
   - Implémentez une route `POST /users/login` pour connecter un utilisateur.
     - Cette route doit vérifier les crédentials, générer un JWT, et le renvoyer au client.

### 3. **Middleware JWT:**
   - Créez un middleware pour vérifier les JWT sur certaines routes.
   - Utilisez le package `jsonwebtoken` pour générer et vérifier les tokens.

> **Pour les étapes 2 et 3 regardez le fichier `middlewares/jwt.js`**

### 4. **Sécurisation des Routes:**
   - Sécurisez toutes les routes des catégories avec le middleware JWT.
   - Sécurisez uniquement les routes en écriture des todos (POST, PUT, DELETE) avec le middleware JWT.
   - Les routes en lecture des todos doivent vérifier le JWT et n'afficher les categories **que si l'utilisateur est authentifié**.

## Conseils:
- Testez chaque partie de votre code progressivement pour vous assurer qu'elle fonctionne comme prévu.
- Consultez la documentation des packages et des technologies que vous utilisez si nécessaire.

## BONUS (Optionnel):
- Implémentez un mécanisme de rôle utilisateur (par exemple, admin et user) et sécurisez certaines routes pour qu'elles soient accessibles uniquement par les administrateurs.