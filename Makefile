# Define variables
TSC = npx tsc
SRC_DIR = src
OUT_DIR = dist

# Default target
all: build

# Build target: compile TypeScript files
build:
	mkdir -p $(OUT_DIR)
	$(TSC) -p tsconfig.json --outDir $(OUT_DIR) --inDir $(SRC_DIR)

# Clean target: remove output directory
clean:
	rm -rf $(OUT_DIR)

# Watch target: automatically recompile on changes
watch:
	$(TSC) -w -p tsconfig.json --outDir $(OUT_DIR)

# Install dependencies
install:
	npm install
