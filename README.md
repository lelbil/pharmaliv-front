Le projet a été bootstraper à l'aide de [Create React App](https://github.com/facebookincubator/create-react-app).
La documentation à jour pour create-react-app se trouve [ici](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Guide d'installation:

  #### Pré-requis: 
  * docker
  
  #### Etapes d'installation:  
  1. ```git clone https://github.com/lelbil/pharmaliv-front```
  2. ```cd pharmaliv-front```
  3. ```docker build -t <nomDuContainer> .``` où `<nomDuContainer>` est remplacer par le nom souhaité du container
  4. ```docker run -p <portHôte>:3000 <nomDuContainer>``` où `<nomDuContainer>` est remplacer par le nom du container choisi lors de l'étape précédente, et `portHôte` est remplacer par le port sur lequel vous souhaitez connecter l'appli
  5. Bravo! aller sur `localhost:<portHôte>` dans votre navigateur pour voir l'appli
