@echo off
rd /s /q "web\src"
md "web\src"
npm install typescript & npx tsc -p tsconfig.json --outDir "web\src" --noCheck true & rd /s /q node_modules & del package-lock.json & del package.json
exit
