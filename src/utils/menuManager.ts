// Menu state and animation management utility
export const ANIMATION_DURATION = 300

export interface MenuElements {
  menu: HTMLElement
  hamburger: HTMLElement
  lines: NodeListOf<Element>
}

export function getMenuElements(): MenuElements | null {
  const menu = document.getElementById('nav-menu')
  const hamburger = document.getElementById('hamburger')
  const lines = document.querySelectorAll('.hamburger-line')

  if (!menu || !hamburger) return null

  return { menu, hamburger, lines }
}

export function isMenuOpen(menu: HTMLElement): boolean {
  return !menu.classList.contains('hidden')
}

export function toggleMenuVisibility(menu: HTMLElement, isOpen: boolean): void {
  if (isOpen) {
    menu.classList.remove('hidden')
    menu.classList.add('flex')
  } else {
    menu.classList.add('hidden')
    menu.classList.remove('flex')
  }
}

export function updateAriaExpanded(hamburger: HTMLElement, isOpen: boolean): void {
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
}

export function animateHamburgerLines(lines: NodeListOf<Element>, toOpen: boolean): void {
  const line1 = lines[0] as HTMLElement
  const line2 = lines[1] as HTMLElement
  const line3 = lines[2] as HTMLElement

  if (!line1 || !line2 || !line3) return

  if (toOpen) {
    // Transform to cross
    line1.style.transform = 'rotate(45deg) translateY(10px)'
    line2.style.opacity = '0'
    line3.style.transform = 'rotate(-45deg) translateY(-10px)'
  } else {
    // Transform back to hamburger
    line1.style.transform = 'rotate(0) translateY(0)'
    line2.style.opacity = '1'
    line3.style.transform = 'rotate(0) translateY(0)'
  }
}
