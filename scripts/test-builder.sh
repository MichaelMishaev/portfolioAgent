#!/bin/bash

# Builder Test Runner Script
# Comprehensive test suite for Split-Screen Builder

set -e

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Builder All Components Test Suite Runner    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════╝${NC}"
echo ""

# Check if dev server is running
echo -e "${YELLOW}⏳ Checking if dev server is running...${NC}"
if curl -s http://localhost:3500 > /dev/null 2>&1; then
  echo -e "${GREEN}✅ Dev server is running on http://localhost:3500${NC}"
else
  echo -e "${RED}❌ Dev server is NOT running!${NC}"
  echo -e "${YELLOW}Please start the dev server first:${NC}"
  echo -e "   npm run dev"
  exit 1
fi

echo ""
echo -e "${BLUE}Select test mode:${NC}"
echo -e "  ${GREEN}1${NC} - Run all tests (Desktop + Mobile + Integration)"
echo -e "  ${GREEN}2${NC} - Run Desktop tests only"
echo -e "  ${GREEN}3${NC} - Run Mobile tests only"
echo -e "  ${GREEN}4${NC} - Run Gallery-specific tests"
echo -e "  ${GREEN}5${NC} - Run Language switching tests"
echo -e "  ${GREEN}6${NC} - Run with UI mode (recommended for debugging)"
echo -e "  ${GREEN}7${NC} - Run specific component test"
echo ""
read -p "Enter your choice (1-7): " choice

case $choice in
  1)
    echo -e "${BLUE}🚀 Running ALL tests...${NC}"
    npx playwright test builder-all-components.spec.ts
    ;;
  2)
    echo -e "${BLUE}🖥️  Running Desktop tests...${NC}"
    npx playwright test builder-all-components.spec.ts -g "Desktop"
    ;;
  3)
    echo -e "${BLUE}📱 Running Mobile tests...${NC}"
    npx playwright test builder-all-components.spec.ts -g "Mobile"
    ;;
  4)
    echo -e "${BLUE}🖼️  Running Gallery tests...${NC}"
    npx playwright test builder-all-components.spec.ts -g "Gallery"
    ;;
  5)
    echo -e "${BLUE}🌐 Running Language switching tests...${NC}"
    npx playwright test builder-all-components.spec.ts -g "Language"
    ;;
  6)
    echo -e "${BLUE}🎨 Running tests in UI mode...${NC}"
    npx playwright test builder-all-components.spec.ts --ui
    ;;
  7)
    echo -e "${BLUE}Select component to test:${NC}"
    echo -e "  ${GREEN}1${NC} - Split Hero"
    echo -e "  ${GREEN}2${NC} - Stats"
    echo -e "  ${GREEN}3${NC} - Skills"
    echo -e "  ${GREEN}4${NC} - Contact"
    echo -e "  ${GREEN}5${NC} - Hero (Generic)"
    echo -e "  ${GREEN}6${NC} - About"
    echo -e "  ${GREEN}7${NC} - Projects"
    echo -e "  ${GREEN}8${NC} - Gallery (NEW)"
    echo ""
    read -p "Enter component number (1-8): " comp_choice

    case $comp_choice in
      1) npx playwright test builder-all-components.spec.ts -g "Component 1: Split Hero" ;;
      2) npx playwright test builder-all-components.spec.ts -g "Component 2: Stats" ;;
      3) npx playwright test builder-all-components.spec.ts -g "Component 3: Skills" ;;
      4) npx playwright test builder-all-components.spec.ts -g "Component 4: Contact" ;;
      5) npx playwright test builder-all-components.spec.ts -g "Component 5: Hero" ;;
      6) npx playwright test builder-all-components.spec.ts -g "Component 6: About" ;;
      7) npx playwright test builder-all-components.spec.ts -g "Component 7: Projects" ;;
      8) npx playwright test builder-all-components.spec.ts -g "Component 8: Gallery" ;;
      *) echo -e "${RED}Invalid choice!${NC}"; exit 1 ;;
    esac
    ;;
  *)
    echo -e "${RED}Invalid choice!${NC}"
    exit 1
    ;;
esac

echo ""
echo -e "${GREEN}✅ Tests completed!${NC}"
echo -e "${BLUE}📊 Test results and screenshots are in: test-results/${NC}"
echo ""
echo -e "${YELLOW}View HTML report:${NC}"
echo -e "   npx playwright show-report"
echo ""
