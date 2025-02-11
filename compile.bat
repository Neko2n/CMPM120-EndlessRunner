@echo off
rd /s /q "docs\src"
md "docs\src"
npm install typescript & npx tsc -p tsconfig.json --outDir "docs\src" --noCheck true & rd /s /q node_modules & del package-lock.json & del package.json
exit
