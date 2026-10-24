import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Electronic Devices Lab',
  description: 'Hệ thống học chuyên sâu & giải tích sách Electronic Devices (Thomas L. Floyd - 10th Edition)',
  lang: 'vi-VN',
  markdown: {
    math: true
  },
  themeConfig: {
    nav: [
      { text: '🏠 Trang chủ & Tiến độ', link: '/' },
      { text: '📝 Tạo Bài Kiểm Tra', link: '/exam-center' },
      { text: '📘 Ch. 1: Bán dẫn', link: '/chapters/ch01-semiconductors' },
      { text: '⚡ Ch. 2: Diode', link: '/chapters/ch02-diodes' },
      { text: '🎛️ Ch. 4-7: BJT', link: '/chapters/ch04-bjt' },
      { text: '🔬 Ch. 8-9: FET', link: '/chapters/ch08-fet-mosfet' },
      { text: '📐 Công Thức', link: '/cheat-sheet' }
    ],
    sidebar: [
      {
        text: '🎯 Tổng quan & Kiểm tra',
        items: [
          { text: '📊 Bảng điều khiển & Tiến độ học', link: '/' },
          { text: '📝 Tạo Bài Kiểm Tra (Sinh đề tự động)', link: '/exam-center' },
          { text: '📐 Bảng tra cứu công thức (Cheat Sheet)', link: '/cheat-sheet' },
          { text: '🚀 Hướng dẫn đưa lên GitHub Pages', link: '/github-guide' }
        ]
      },
      {
        text: 'Phần I: Vật lý Bán dẫn & Diode (Ch. 1–3)',
        collapsed: false,
        items: [
          { text: 'Ch. 1: Vật lý Chất rắn & Chuyển tiếp P-N', link: '/chapters/ch01-semiconductors' },
          { text: 'Ch. 2: Giải tích Diode & Mạch chỉnh lưu/xén/ghim', link: '/chapters/ch02-diodes' },
          { text: 'Ch. 3: Vật lý lượng tử Zener, Varactor & Quang điện tử', link: '/chapters/ch03-special-diodes' }
        ]
      },
      {
        text: 'Phần II: Transistor Lưỡng cực BJT (Ch. 4–7)',
        collapsed: false,
        items: [
          { text: 'Ch. 4 & 5: Vật lý BJT, Hiệu ứng Early & Phân cực Thevenin', link: '/chapters/ch04-bjt' },
          { text: 'Ch. 6 & 7: Khuếch đại tín hiệu nhỏ (r\'_e / Hybrid-π) & Công suất', link: '/chapters/ch06-bjt-amplifiers' }
        ]
      },
      {
        text: 'Phần III: FET, MOSFET & Hệ thống (Ch. 8–18)',
        collapsed: false,
        items: [
          { text: 'Ch. 8 & 9: Vật lý JFET, MOSFET & Khuếch đại trường', link: '/chapters/ch08-fet-mosfet' },
          { text: 'Ch. 10–18: Đáp ứng tần số, Thyristor, Op-Amp & Mạch lọc/Dao động', link: '/chapters/Roadmap-part2' }
        ]
      }
    ],
    outline: {
      level: [2, 3],
      label: 'Mục lục chuyên đề này'
    },
    search: {
      provider: 'local'
    },
    docFooter: {
      prev: 'Chuyên đề trước',
      next: 'Chuyên đề tiếp theo'
    }
  }
})
