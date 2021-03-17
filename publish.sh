# Publish site in "prod" to gh-pages

git branch -f gh-deploy
git checkout gh-deploy
git add -f prod
git commit -m "Deploying"
git branch -D gh-pages
git subtree split --prefix prod -b gh-pages
git push -f origin gh-pages:gh-pages

