// Generate placeholder images using data URIs with gradients
export function getPlaceholderImage(index: number = 0): string {
  const gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
  ]

  const gradient = gradients[index % gradients.length]

  // Create SVG with gradient
  const svg = `
    <svg width="800" height="1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${getGradientColors(gradient)[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${getGradientColors(gradient)[1]};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="800" height="1000" fill="url(#grad${index})" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

function getGradientColors(gradient: string): [string, string] {
  const colorMap: Record<string, [string, string]> = {
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)': ['#667eea', '#764ba2'],
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)': ['#f093fb', '#f5576c'],
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)': ['#4facfe', '#00f2fe'],
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)': ['#43e97b', '#38f9d7'],
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)': ['#fa709a', '#fee140'],
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)': ['#30cfd0', '#330867'],
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)': ['#a8edea', '#fed6e3'],
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)': ['#ff9a9e', '#fecfef'],
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)': ['#ffecd2', '#fcb69f'],
    'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)': ['#ff6e7f', '#bfe9ff'],
  }

  return colorMap[gradient] || ['#667eea', '#764ba2']
}

// Simple placeholder for categories/hero
export function getCategoryPlaceholder(name: string): string {
  const colorMap: Record<string, string> = {
    'Women': '#f093fb',
    'Men': '#4facfe',
    'Accessories': '#43e97b',
    'Sale': '#fa709a',
    'Spring Collection 2024': '#667eea',
    'Sustainable Fashion': '#30cfd0',
  }

  const color = colorMap[name] || '#667eea'

  const svg = `
    <svg width="1920" height="1000" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad-${name}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.6" />
        </linearGradient>
      </defs>
      <rect width="1920" height="1000" fill="url(#grad-${name})" />
    </svg>
  `

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
